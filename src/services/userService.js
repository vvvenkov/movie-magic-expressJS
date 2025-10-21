import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import User from "../models/User.js";

const jwtSecret = 'd809sad798gauwejgiwlawgjlwaijegweg0()(U(&081273#'

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password) {
        // Get user from database
        const user = await User.findOne({ email })

        // Check if user exists
        if (!user) {
            return new Error('No such user exists!')
        }
        // Validate password
        const isValid = await bcrypt.compare(password, user.password);

        // Return error if not 
        if (!isValid) {
            return new Error('Invalid password');
        }
        // If valid generate token
        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = jsonwebtoken.sign(payload, jwtSecret, {expiresIn: '2h'});

        //Return token
        return token;
    }
}