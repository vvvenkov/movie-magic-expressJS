import { Router } from "express";
import userService from "../services/userService.js";

const userController = Router();

userController.get('/register', (req, res) => {
    res.render('user/register');
})

userController.post('/register', async (req, res) => {
    // Get data from request
    const userData = req.body;

    //Register user
    await userService.register(userData)

    //Redirect to login
    res.redirect('/users/login')
});

userController.get('/login', (req, res) => {
    res.render('user/login');
});

userController.post('/login', async (req, res) => {
    //Get login data
    const loginData = req.body;

    //Call service login
    const token = await userService.login(loginData);

    //set auth cookie

    res.redirect('/');
});

export default userController;