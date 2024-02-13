import { sign } from 'jsonwebtoken';
import * as helpers from '../../helpers';

import {
  User
} from '../../models';

export const register = async (req, res) => {
  try {

    const { firstName, lastName, email } = req.body;
    const user = await User.findOne(
      {
        where: { email: email },
      },
    );

    if (user) {
      return res.status(409).json({ message: "User with email already exists." });
    }

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email
    });

    res.status(201).json(newUser);

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne(
      {
        where: {
          email: email,
          isArchived: false,
        },
      },
    );
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials." });
    }

    const encryptedPassword = helpers.encryptPassword(req.body.password);
    if (encryptedPassword !== user.password) {
      return res.status(404).json({ message: "Invalid credentials." });
    }

    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.verifyToken,
      { expiresIn: '1d' },
    );

    const result = {
      userDetails: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePic: user.profilePic,
        isActive: user.isActive,
        isVerified: user.isVerified,
        roleId: user.roleId,
        isLicenceAdded: user.isLicenceAdded
      },
      auth: {
        accessToken: token
      }
    };

    return res.status(200).json({ message: "User login successfully.", data: result });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};


