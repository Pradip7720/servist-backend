import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    console.log("middle")
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('decodeddd', decoded)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
