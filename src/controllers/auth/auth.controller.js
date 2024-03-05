import { sign } from 'jsonwebtoken';
import * as helpers from '../../helpers';
import * as errorMessages from '../../constants/errorMessages';
import * as successMessages from '../../constants/successMessages';

import {
  User
} from '../../models';


export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, pincode, roleId, mobileCountryCode, phoneNumber, theme, isLicenceAdded, passwordUpdatedAt } = req.body;

    const existingUser = await User.findOne({
      where: {
        email: email
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: errorMessages.EMAIL_ALREADY_EXISTS });
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

		res.status(201).json({ message: successMessages.REGISTRATION_SUCCESS, data: newUser });
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


