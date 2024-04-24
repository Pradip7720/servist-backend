import { userThemeValidation, userUpdateSchema, userValidateSchema } from '../validators/user.validator';
const { User, Post, UserProfile, BlockedUser, PostComment } = require('../models');

export const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: ['job_title', 'profile_pic', 'cover_photo', 'bio', 'user_handle'],
            }],
            attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number', 'mobile_country_code'],
        });
        if (user) {
            const responseData = {
                user_id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                phoneNumber: user.mobile_country_code,
                countryCode: user.country_code,
                bio: user.profile.bio,
                profilePic: user.profile.profile_pic,
                coverPhoto: user.profile.cover_photo,
                jobTitle: user.profile.job_title,
                userHandle: user.profile.user_handle,
            };
            return res.json({ message: 'User profile retrieved successfully', data: responseData });
        } else {
            return res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        console.error(`Error fetching user profile: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const editProfile = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { userHandle, bio, firstName, lastName, email, phoneNumber, countryCode } = req.body;
        const { error } = userUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const userPayload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
            mobile_country_code: countryCode
        }
        const updatedUserCount = await User.update(userPayload, {
            where: { id: user_id }
        });
        if (updatedUserCount > 0) {
            if (userHandle || bio) {
                let userProfile = await UserProfile.findOne({ where: { user_id } });
                if (!userProfile) {
                    userProfile = await UserProfile.create({ user_id });
                }
                const data = {
                    user_handle: userHandle,
                    bio: bio
                }
                await userProfile.update(data);
            }
            return res.json({ message: 'User profile updated successfully' });
        } else {
            return res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        console.error(`Error updating user profile: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const editImages = async (req, res) => {
    const profilePicFile = req.files['profilePic'][0];
    const bannerImageFile = req.files['bannerImage'][0];

    console.log('Profile Pic:', profilePicFile.filename);
    console.log('Banner Image:', bannerImageFile.filename);

    res.json({ message: 'Images uploaded successfully' });
}
export const blockUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const existingBlock = await BlockedUser.findOne({
            where: {
                user_id: req.user.id,
                block_user_id: userId
            }
        });

        if (existingBlock) {
            return res.status(400).json({ message: 'User is already blocked' });
        }
        await BlockedUser.create({
            user_id: req.user.id,
            block_user_id: userId
        });

        return res.json({ message: 'User blocked successfully' });
    } catch (error) {
        console.error('Error blocking user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const unblockUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const existingBlock = await BlockedUser.findOne({
            where: {
                user_id: req.user.id,
                block_user_id: userId
            }
        });
        if (!existingBlock) {
            return res.status(400).json({ message: 'User is not blocked' });
        }
        await existingBlock.destroy();
        return res.json({ message: 'User unblocked successfully.' });
    } catch (error) {
        console.error(`Error unblocking user: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const getBlockedUser = async (req, res) => {
    try {
        const blockedUsers = await BlockedUser.findAll({
            where: { user_id: req.user.id },
            include: [
                {
                    model: User,
                    as: 'blockUser',
                    attributes: ['id', 'first_name', 'last_name'],
                    include: [{
                        model: UserProfile,
                        as: 'profile',
                        attributes: ['profile_pic']
                    }]
                }
            ]
        });
        const blockedUsersData = blockedUsers.map(blockedUser => ({
            id: blockedUser.blockUser.id,
            firstName: blockedUser.blockUser.first_name,
            lastName: blockedUser.blockUser.last_name,
            profilePic: blockedUser.blockUser.profile.profile_pic
        }));

        return res.json({ message: 'Blocked users fetched successfully.', data: blockedUsersData });
    } catch (error) {
        console.error('Error fetching blocked users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const isUserHandleExist = async (req, res) => {
    try {
        const { userHandle } = req.body;
        const userProfile = await UserProfile.findOne({
            where: { user_handle: userHandle }
        });

        if (userProfile) {
            return res.status(400).json({ message: 'User handle already exists' });
        } else {
            return res.status(200).json({ message: 'User handle is available' });
        }
    } catch (error) {
        console.error('Error checking user handle:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const profileMiniPreview = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userProfile = await UserProfile.findOne({
            where: { user_id: userId }
        });
        const miniPreviewData = {
            name: `${user.first_name} ${user.last_name}`,
            jobTitle: userProfile ? userProfile.job_title : '',
            email: user.email,
            userHandle: userProfile ? userProfile.user_handle : ''
        };

        return res.status(200).json({ message: 'User mini-preview retrieved successfully.', data: miniPreviewData });
    } catch (error) {
        console.error('Error retrieving user mini-preview:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const fetchUserPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                created_by: req.user.id
            },
            include: [
                {
                    model: User,
                    as: 'creator',
                    include: {
                        model: UserProfile,
                        as: 'profile',
                        attributes: ['profile_pic']
                    },
                    attributes: ['first_name', 'last_name']
                },
                {
                    model: PostComment,
                    as: 'comments',
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['first_name', 'last_name'],
                        include: {
                            model: UserProfile,
                            as: 'profile',
                            attributes: ['profile_pic']
                        }
                    },
                    attributes: ['id', 'updated_at'],
                    separate: true
                }
            ],
            attributes: ['id', 'post_title', 'message', 'post_anonymously', 'hiring_recommendation', 'is_active', 'updated_at'],
            // order: [['updatedAt', 'DESC']]
        });

        const responseData = posts.map(post => ({
            id: post.id,
            postTitle: post.post_title,
            message: post.message,
            postAnonymously: post.post_anonymously,
            hiringRecommendation: post.hiring_recommendation,
            isActive: post.is_active,
            totalUpvotes: post.total_upvotes,
            updatedAt: post.updated_at,
            createdBy: {
                firstName: post.creator.first_name,
                lastName: post.creator.last_name,
                profilePic: post.creator.profile ? post.creator.profile.profile_pic : ''
            },
            isLiked: 1,
            commentCount: post.comments.length,
            replies: post.comments && post.comments.length > 0 ? post.comments.map(comment => ({
                id: comment.id,
                firstName: comment.user.first_name,
                lastName: comment.user.last_name,
                profilePic: comment.user.profile ? comment.user.profile.profile_pic : '',
                updatedAt: comment.updatedAt,
                message: comment.message,
                isLiked: 1
            })) : []
        }));

        return res.status(200).json({ message: 'Posts retrieved successfully', data: responseData });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const fetchUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const { error } = userValidateSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const user = await User.findByPk(userId, {
            include: {
                model: UserProfile,
                as: 'profile'
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const responseData = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            bio: user.profile.bio,
            profilePic: user.profile.profile_pic,
            coverPhoto: user.profile.cover_photo,
            timezone: user.profile.timezone,
            jobTitle: user.profile.job_title,
            userHandle: user.profile.user_handle,
            isVerified: user.is_verified,
            isActive: user.is_active
        };
        return res.json({ message: 'User retrieved successfully.', data: responseData });
    } catch (error) {

        console.error('Error retrieving user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
export const userTheme = async (req, res) => {
    try {
        const { theme } = req.body;
        const { error } = userThemeValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        await User.update(
            { theme: theme },
            { where: { id: req.user.id } }
        );
        return res.json({ message: 'User theme updated successfully.' });
    } catch (error) {
        console.error(`Error updating user theme: ${error}`);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
export const fetchUsers = async (req, res) => {
    try {
        const offset = parseInt(req.query.offset, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;
        const users = await User.findAll({
            offset: offset,
            limit: limit,
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: ['profile_pic']
            }]
        });

        const responseData = users.map(user => ({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            profilePic: user.profile ? user.profile.profile_pic : ''
        }));

        const response = {
            message: 'List of users retrieved successfully.',
            data: responseData,
            page: {
                offset: offset,
                limit: limit,
                count: responseData.length
            }
        };
        res.json(response);
    } catch (error) {
        console.error(`Error fetching users: ${error}`);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const fetchDms = async (req, res) => {
    try {
        const { searchQuery } = req.query;
        const offset = parseInt(req.query.offset, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;

        const searchCondition = {
            [Op.or]: [
                { firstName: { [Op.like]: `%${searchQuery}%` } },
                { lastName: { [Op.like]: `%${searchQuery}%` } }
            ]
        };

        const users = await User.findAll({
            where: searchCondition,
            offset: offset,
            limit: limit,
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: ['profile_pic', 'job_title', 'user_handle']
            }]
        });
        const responseData = users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePic: user.profile.profile_pic,
            jobTitle: user.profile.job_title,
            userHandle: user.profile.user_handle,
            isAdmin: user.isAdmin,
            isAdded: user.isAdded,
            lastMessageTime: ""
        }));

        const response = {
            message: 'List of DMs retrieved successfully.',
            data: responseData,
            page: {
                offset: offset,
                limit: limit,
                count: responseData.length
            }
        };
        res.json(response);
    } catch (error) {
        console.error(`Error fetching DMs: ${error}`);
        res.status(500).json({ message: 'Internal server error.' });
    }
}
export const fetchFeed = async (req, res) => {

}