import { userUpdateSchema } from '../validators/user.validator';

const { User, UserProfile, BlockedUser } = require('../models');

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