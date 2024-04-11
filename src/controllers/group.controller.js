// Import necessary modules
const express = require('express');
const router = express.Router();
const { Group } = require('../models');


export const createGroup = async (req, res) => {
    try {
        console.log("dsdsd", req.body)
        const { groupName, description, profilePic, bannerFile, bannerFileType, type, members,privacy } = req.body;
        // if (!groupName || !type || !members || !Array.isArray(members)) {
        //     return res.status(400).json({ message: 'Missing required fields or invalid data.' });
        // }
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
        await Promise.all(members.map(memberId => newGroup.addUser(memberId)));
        return res.status(201).json({ message: 'Group created successfully.' });
    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

