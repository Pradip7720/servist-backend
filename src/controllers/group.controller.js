import Sequelize from 'sequelize';
import { addUserToGroupSchema, createGroupSchema, groupValidateSchema, messageSchema, removeUserGroupSchema } from '../validators/group.validator';
const { Group, UserGroup, GroupJoinRequest, User, UserProfile, GroupChat } = require('../models');

export const createGroup = async (req, res) => {
    try {
        const { groupName, description, profilePic, bannerFile, bannerFileType, type, members, privacy } = req.body;
        const { error } = createGroupSchema.validate(req.body);
        const users = JSON.parse(members);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const newGroup = await Group.create({
            group_name: groupName,
            description,
            profile_image: profilePic,
            banner_file: bannerFile,
            banner_file_type: bannerFileType,
            type,
            privacy: privacy,
            created_by: req.user.id
        });
        const postGroupIds = users.map(userId => ({ user_id: userId, group_id: newGroup.id }));
        console.log("postGroupIds", postGroupIds)
        await UserGroup.bulkCreate(postGroupIds);

        return res.status(201).json({ message: 'Group created successfully.' });
    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const groupJoinRequest = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { error } = groupValidateSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        console.log(" req.params", req.params);
        await GroupJoinRequest.create({
            group_id: groupId,
            user_id: req.user.id
        });
        res.json({ message: 'Request sent successfully.' });
    } catch (error) {
        console.error('Error sending join request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const addUser = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { userIds } = req.body;
        const { error: paramsError } = groupValidateSchema.validate(req.params);
        const { error: bodyError } = addUserToGroupSchema.validate(req.body);
        if (paramsError || bodyError) {
            return res.status(400).json({ error: paramsError ? paramsError.details[0].message : bodyError.details[0].message });
        }
        const existingUsers = await UserGroup.findAll({
            where: {
                group_id: groupId,
                user_id: userIds
            }
        });
        const newUsers = userIds.filter(userId => !existingUsers.find(user => user.user_id === userId));
        const bulkData = newUsers.map(userId => ({
            group_id: groupId,
            user_id: userId
        }));
        if (bulkData.length > 0) {
            await UserGroup.bulkCreate(bulkData);
        }
        let message;
        if (newUsers.length === 0) {
            message = 'User already added in group.';
        } else if (newUsers.length === userIds.length) {
            message = 'Users added in group successfully.';
        } else {
            message = 'Some users added to the group successfully.';
        }
        return res.status(200).json({ message });
    } catch (error) {
        console.error(`Error adding users to group: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const leaveGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { error } = groupValidateSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const userGroup = await UserGroup.findOne({
            where: {
                user_id: req.user.id,
                group_id: groupId
            }
        });
        if (!userGroup) {
            return res.status(404).json({ message: "User is not a member of this group." });
        }
        await userGroup.destroy();
        return res.json({ message: "User successfully left the group." });
    } catch (error) {
        console.error(`Error leaving group: ${error}`);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
export const removeUserFromGroup = async (req, res) => {
    try {
        const { groupId, userId } = req.params;
        const { error } = removeUserGroupSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const userGroup = await UserGroup.findOne({
            where: {
                group_id: groupId,
                user_id: userId
            }
        });

        if (!userGroup) {
            return res.status(404).json({ message: 'User is not a member of the group.' });
        }
        const user = await User.findByPk(req.user.id);
        if (!user || user.role !== 1) {
            return res.status(403).json({ message: 'You do not have permission to remove users from the group.' });
        }
        await userGroup.destroy();
        return res.json({ message: 'User successfully removed from the group by admin.' });
    } catch (error) {
        console.error(`Error removing user from group: ${error}`);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
export const fetchGroupInfo = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { error } = groupValidateSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const userGroups = await UserGroup.findAll({
            where: {
                group_id: groupId,
                is_admin: true
            },
            attributes: ['user_id']
        });
        const adminUserIds = userGroups.map(userGroup => userGroup.user_id);
        const group = await Group.findByPk(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found.' });
        }
        const admins = await User.findAll({
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: ['job_title', 'user_handle', 'profile_pic']
            }],
            where: {
                id: adminUserIds
            }
        });
        const responseData = {
            id: group.id,
            groupName: group.group_name,
            description: group.description,
            bannerFile: group.banner_file,
            bannerFileType: group.banner_file_type,
            admin: admins.map(admin => ({
                id: admin.id,
                profilePic: admin.profile.profile_image ? admin.profile.profile_image : '',
                firstName: admin.first_name,
                lastName: admin.last_name,
                jobTitle: admin.profile ? admin.profile.job_title : '',
                userHandle: admin.profile ? admin.profile.user_handle : ''
            }))
        };
        return res.json({ message: 'Group details retrieved successfully.', data: responseData });
    } catch (error) {
        console.error(`Error fetching group details: ${error}`);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
export const createSubGroup = async (req, res) => {
    try {
        const { groupName, description, profilePic, bannerFile, bannerFileType, type, members, privacy } = req.body;
        const { groupId } = req.params;
        const { error } = createGroupSchema.validate(req.body);
        const users = JSON.parse(members);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const newGroup = await Group.create({
            group_name: groupName,
            description,
            parent_group: groupId,
            profile_image: profilePic,
            banner_file: bannerFile,
            banner_file_type: bannerFileType,
            type,
            privacy: privacy,
            created_by: req.user.id,
            updated_by: req.user.id
        });
        const postGroupIds = users.map(userId => ({ user_id: userId, group_id: newGroup.id }));
        console.log("postGroupIds", postGroupIds)
        await UserGroup.bulkCreate(postGroupIds);

        return res.status(201).json({ message: 'SubGroup created successfully.' });
    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const myGroups = async (req, res) => {
    try {
        console.log("hello0", req.user.id)
        const { offset = 0, limit = 10 } = req.query;
        const userGroups = await Group.findAll({
            where: {
                created_by: req.user.id
            },
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        let responseData = [];
        for (const userGroup of userGroups) {
            const subGroups = await Group.findAll({
                where: {
                    parent_group_id: userGroup.id
                }
            });
            const groupData = {
                id: userGroup.id,
                groupName: userGroup.group_name,
                profilePic: userGroup.profile_image,
                subGroup: subGroups.map(subGroup => ({
                    id: subGroup.id,
                    groupName: subGroup.group_name,
                    profilePic: subGroup.profile_image
                }))
            };
            responseData.push(groupData);
        }
        return res.json({
            message: 'List of groups retrieved successfully.',
            data: responseData,
            page: {
                offset: offset,
                limit: limit,
                count: userGroups.length
            }
        });
    } catch (error) {
        console.error(`Error fetching user groups: ${error}`);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
export const fetchGroupMembers = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { error } = groupValidateSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { search, offset, limit } = req.query;
        const searchCriteria = {
            group_id: groupId
        };
        if (search) {
            // search by first name
            searchCriteria['$User.first_name$'] = { [Sequelize.Op.like]: `%${search}%` };
        }
        const offsetValue = parseInt(offset) || 0;
        const limitValue = parseInt(limit) || 10;

        const groupMembers = await UserGroup.findAll({
            where: searchCriteria,
            include: [
                {
                    model: User,
                    include: [
                        {
                            model: UserProfile,
                            as: 'profile',
                            attributes: ['profile_pic', 'job_title', 'user_handle']
                        }
                    ],
                    attributes: ['first_name', 'last_name']
                }
            ],
            offset: offsetValue,
            limit: limitValue
        });
        const responseData = groupMembers.map(member => ({
            id: member.user_id,
            firstName: member.User.first_name,
            lastName: member.User.last_name,
            profilePic: member.User.profile ? member.User.profile.profile_pic : '',
            jobTitle: member.User.profile ? member.User.profile.job_title : '',
            userHandle: member.User.profile ? member.User.profile.user_handle : '',
            isAdmin: member.is_admin,
            isAdded: true
        }))
        return res.json({
            message: 'List of group members retrieved successfully.',
            data: responseData,
            page: {
                offset: offsetValue,
                limit: limitValue,
                count: responseData.length
            }
        });
    } catch (error) {
        console.error(`Error fetching group members: ${error}`);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
export const sendGroupChatMessage = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { message, attachment, attachment_type } = req.body;
        const { error } = messageSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const senderDetails = req.user;
        const user = await User.findByPk(senderDetails.id, {
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: ['profile_pic']
            }],
            attributes: ['first_name', 'last_name']
        });
        const newMessage = await GroupChat.create({
            group_id: groupId,
            message: message,
            attachment: attachment,
            attachment_type: attachment_type,
            user_id: senderDetails.id
        });
        const responseData = {
            groupId: groupId,
            message: newMessage.message,
            type: newMessage.attachment_type || 'text',
            createAt: newMessage.sent_date,
            senderDetails: {
                id: senderDetails.id,
                firstName: user.first_name,
                lastName: user.last_name,
                profilePic: user.profile ? user.profile.profile_pic : null
            }
        };
        return res.json({
            message: 'Message sent successfully.',
            data: responseData
        });
    } catch (error) {
        console.error(`Error sending group chat message: ${error}`);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};