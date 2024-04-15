
const { ContactUsQuery } = require('../models');
export const createContactQuery = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            subject,
            phoneNumber,
            countryCode,
            description,
        } = req.body;
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