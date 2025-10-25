import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret } from '../config/general.js';

export const auth = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    };

    try {
        const decodedToken = jsonwebtoken.verify(token, jwtSecret)

        req.user = decodedToken;

        next();
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/users/login');
    }
}; 