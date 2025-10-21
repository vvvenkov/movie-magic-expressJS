import User from "../models/User.js"

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(loginData) {
        // get user from database

        // Check if user exists

        // Validate password

        // Return error if not 

        // If valid generate token

        //return token
        return '';
    }
}