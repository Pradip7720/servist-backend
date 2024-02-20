import joi from 'joi';
import { deleteFile, errorResponse, isValidTech } from '../../helpers';
import { ADMIN } from '../../constants';

const validation = joi.object({
  firstName: joi.string().trim(true).required(),
  lastName: joi.string().trim(true).required(),
  email: joi.string().email().trim(true).required(),
  roleId: joi.number().valid(1, 2).required(),
});

export const employeeValidate = async (req, res, next) => {
  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role
  };

  const { error } = validation.validate(payload);

  if (!req.file && !req.body.edited) {
    return errorResponse(req, res, 'please upload profile pic', 406);
  }
  if (error) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    res.status(406);
    return errorResponse(req, res, `employee data validation error. ${error.message}`, 406, error.message);
  }
  if (!isValidTech(req.body.knownTech)) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return errorResponse(req, res, 'selected technology does not exists in system', 406);
  }
  return next();
};

const loginValidation = joi.object({
  email: joi.string().email().trim(true).required(),
  role: joi.string().trim(true).valid(ADMIN, DEV, PM, HR).required(),
  password: joi.string().trim(true).required().min(8)
    .max(12),
});

export const loginValidate = async (req, res, next) => {
  const payload = {
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  };
  const { error } = loginValidation.validate(payload);
  if (error) {
    return errorResponse(req, res, `Validation Error: ${error.message}`, 406);
  }
  return next();
};

const passwordValidation = joi.object({
  currentPassword: joi.string().trim(true).required().min(8)
    .max(12),
  newPassword: joi.string().trim(true).required().min(8)
    .max(12),
  reNewPassword: joi.ref('newPassword'),
});

export const passwordValidate = async (req, res, next) => {
  const payload = {
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
    reNewPassword: req.body.reNewPassword,
  };
  const { error } = passwordValidation.validate(payload);
  if (error) {
    return errorResponse(req, res, 'password validation error', 406, error.message);
  }
  return next();
};
