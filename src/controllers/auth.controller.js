import { sign } from 'jsonwebtoken';
import * as helpers from '../helpers';
import * as errorMessages from '../constants/errorMessages';
import * as resMessages from '../constants/successMessages';

import {
  User
} from '../models';
import { generateOTP } from '../helpers/otp-gen.helper';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, pincode, roleId, mobileCountryCode, phoneNumber, theme, isLicenceAdded, passwordUpdatedAt } = req.body;
    const existingUser = await User.findOne({
      where: {
        email: email
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: resMessages.EMAIL_ALREADY_EXISTS });
    }

    const encryptedPassword = helpers.encryptPassword(password);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      pincode,
      roleId,
      mobileCountryCode,
      phoneNumber,
      theme,
      isLicenceAdded,
      passwordUpdatedAt,
    });

    res.status(201).json({ message: resMessages.REGISTRATION_SUCCESS, data: newUser });
  } catch (error) {
    console.log('Error: ', error);
    return res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};


export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.scope('withSecretColumns').findOne(
      {
        where: {
          email: email
        }
      },
    );
    if (!user) {
      return res.status(404).json({ message: errorMessages.INVALID_CREDENTIALS });
    }

    const encryptedPassword = helpers.encryptPassword(req.body.password);

    if (encryptedPassword !== user.password) {
      return res.status(404).json({ message: errorMessages.INVALID_CREDENTIALS });
    }

    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '10y' },
    );

    const result = {
      userDetails: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      auth: {
        accessToken: token
      }
    };

    res.status(200).json({ message: successMessages.LOGIN_SUCCESS, data: result });

  } catch (error) {
    console.log('Error: ', error);
    return res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
  }
};

export const changePassword = (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (oldPassword === user.password) {
      user.password = newPassword;
      res.status(200).json({ message: resMessages.PASSWORD_CHANGED_SUCCESS });
    } else {
      res.status(401).json({ message: 'Incorrect old password.' });
    }
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Password change failed.' });
  }
};

export const forgotPassword = (req, res) => {
  try {
    const { email } = req.body;
    // Check if the email exists in the user data
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Generate and store OTP
    const otp = generateOTP();
    otpStore[email] = otp;

    // Send OTP to the user's email
    // const otpSent = sendEmail(email, otp);

    if (otpSent) {
      return res.status(200).json({ message: 'OTP sent successfully.' });
    } else {
      return res.status(500).json({ message: 'Error sending OTP.' });
    }
  } catch (error) {
    console.error('Error processing forgot password request:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const verifyOTP = (req, res) => {
  try {
    const { email, otp } = req.body;

    // Retrieve stored OTP for the given email
    const storedOTP = otpStore[email];

    if (!storedOTP || otp !== storedOTP) {
      return res.status(401).json({ message: resMessages.INVALID_OTP, isVerified: false });
    }

    // Clear the stored OTP after successful verification (optional)
    delete otpStore[email];

    res.status(200).json({ message: resMessages.OTP_VERIFIED_SUCCESS, isVerified: true });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal server error.', isVerified: false });
  }
};

