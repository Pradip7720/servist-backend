import { contactQuerySchema } from '../validators/contactus.validator';

const { ContactUsQuery } = require('../models');
export const createContactQuery = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            subject,
            phoneNumber,
            countryCode,
            description
        } = req.body;
        const { error } = contactQuerySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        await ContactUsQuery.create({
            first_name: firstName,
            last_name: lastName,
            subject: subject,
            phone_number: phoneNumber,
            country_code: countryCode,
            description: description,
        });
        res.json({
            message: 'Form submitted successfully.',
        });
    } catch (error) {
        console.error('Error creating contact query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};