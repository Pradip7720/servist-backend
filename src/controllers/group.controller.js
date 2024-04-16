import { createGroupSchema } from '../validators/group.validator';

const { Group, UserGroup } = require('../models');


export const createGroup = async (req, res) => {
    try {
        console.log("dsdsd", req.body)
        const { groupName, description, profilePic, bannerFile, bannerFileType, type, members, privacy } = req.body;
        const { error } = createGroupSchema.validate(req.body);
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
            is_active: true,
            created_by: req.user.id
        });
        const postGroupIds = members.map(userId => ({ user_id: userId, group_id: newGroup.id }));
        console.log("postGroupIds", postGroupIds)
        await UserGroup.bulkCreate(postGroupIds);

        return res.status(201).json({ message: 'Group created successfully.' });
    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

