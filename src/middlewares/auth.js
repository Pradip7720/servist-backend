import jwt from 'jsonwebtoken';
import responseMessage from '../constants/res-message';
const TOKEN_KEY = process.env.SECRET;

export const generateAuthToken = (user) => {
    const token = jwt.sign({ id: user.id.toString() }, TOKEN_KEY);
    return token;
};

export const verifyToken = async (token) => {
    try {
        const payload = jwt.verify(token, TOKEN_KEY);
        if (payload) {
            const matchedUser = await User.findOne({
                where: {
                    email: payload.email,
                    role: payload.role,
                    isActive: true,
                },
                attributes: ['email', 'role'],
            });

            if (!matchedUser)
                return res.status(401).send({ message: responseMessage.NOT_EXIST });

            req.user = { id: payload.id, email: payload.email, role: payload.role };
            return next();
        }
    }
    catch (err) {
        return res.status(401).send({ message: "Unauthotized access" });
    }
}
