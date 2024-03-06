import joi from 'joi';

const loginValidation = joi.object({
	email: joi.string().email().trim(true).required(),
	password: joi.string().trim(true).required().min(8).max(12),
});

export const loginValidate = async (req, res, next) => {
	const payload = {
		email: req.body.email,
		password: req.body.password,
	};
	const { error } = loginValidation.validate(payload);
	if (error) {
		return res.status(406).json({ message: `Validation Error: ${error.message}` });
	}
	return next();
};

const userRegistrationSchema = joi.object({
	firstName: joi.string().required(),
	lastName: joi.string(),
	email: joi.string().email().required(),
	password: joi.string().trim(true).required().min(8).max(12),
	pincode: joi.string(),
	roleId: joi.number().integer().required(),
	mobileCountryCode: joi.string(),
	phoneNumber: joi.string().min(10).max(10),
	theme: joi.string(),
	isLicenceAdded: joi.boolean().required(),
});

export const userRegistrationValidate = async (req, res, next) => {
	const { error } = userRegistrationSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: `Validation Error: ${error.message}` });
	}
	next();
};