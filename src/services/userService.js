import bcrypt from 'bcrypt';

import User from "../models/User.js";
import { generateToken } from '../utils/authUtils.js';

export default {
    async register(userData) {

        //TODO: Check if user exists


        const user = await User.create(userData);

        const token = generateToken(user);

        return token;
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
        const token = generateToken(user);

        //Return token
        return token;
    }
}

