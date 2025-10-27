import { jwtSecret } from '../config/general.js';
import jsonwebtoken from 'jsonwebtoken';


export function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
    };

    const token = jsonwebtoken.sign(payload, jwtSecret, { expiresIn: '2h' });

    return token;
}