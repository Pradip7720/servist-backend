const { Op } = require('sequelize');
import { contactValidateSchema } from '../validators/contact.validator';
const { User, UserContact, UserProfile } = require('../models');

export const saveContact = async (req, res) => {
    try {
        const { userId } = req.body;
        const { error } = userValidateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        await UserContact.create({
            user_id: req.user.id,
            contact_id: userId
        });
        return res.json({ message: 'Contact saved successfully.' });
    } catch (error) {
        console.error(`Error saving contact: ${error}`);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
export const deleteContact = async (req, res) => {
    try {
        const { contactId } = req.params;
        console.log("contactId", contactId)
        const { error } = contactValidateSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const contact = await UserContact.findByPk(contactId);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }
        await contact.destroy();
        return res.json({ message: 'Contact deleted successfully.' });
    } catch (error) {
        console.error(`Error deleting contact: ${error}`);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
export const getContacts = async (req, res) => {
    try {
        let { offset = 0, limit = 10, orderBy = 'created_at', orderDir = 'DESC', search = '' } = req.query;
        const validOrderByColumns = ['created_at', 'updated_at'];
        const validOrderDirValues = ['ASC', 'DESC'];
        if (!validOrderByColumns.includes(orderBy)) {
            orderBy = 'created_at';
        }
        if (!validOrderDirValues.includes(orderDir.toUpperCase())) {
            orderDir = 'DESC';
        }
        const contacts = await UserContact.findAll({
            include: [
                {
                    model: User,
                    as: 'contact',
                    attributes: ['id', 'first_name', 'last_name'],
                    include: {
                        model: UserProfile,
                        as: 'profile',
                        attributes: ['job_title', 'profile_pic', 'user_handle'],
                    },
                },
            ],
            where: {
                '$contact.first_name$': { [Op.iLike]: `%${search}%` }, // Use the 'contact' alias
                [Op.or]: [
                    { '$contact.first_name$': { [Op.iLike]: `%${search}%` } },
                    { '$contact.last_name$': { [Op.iLike]: `%${search}%` } },
                ],
                user_id: req.user.id,
            },
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [[orderBy, orderDir]],
        });
        const responseData = contacts.map(contact => ({
            id: contact.contact.id,
            firstName: contact.contact.first_name,
            lastName: contact.contact.last_name,
            jobTitle: contact.contact.profile ? contact.contact.profile.job_title : '',
            profilePic: contact.contact.profile ? contact.contact.profile.profile_pic : '',
            userHandle: contact.contact.profile ? contact.contact.profile.user_handle : ''
        }));
        console.log("contacts", responseData);
        return res.json({ message: 'Contact list fetched successfully.', data: { contacts: responseData } });
    } catch (error) {
        console.error(`Error fetching contacts: ${error}`);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};