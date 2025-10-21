import express from 'express';
import movieService from '../services/movieService.js';
import movieController from './movieController.js';

const homeController = express.Router();

homeController.get('/', async (req, res) => {
    const movies = await movieService.getAll();

    // Get cookie token
    const authToken = req.cookies['auth'];

    // Validate token

    // Error handling


    res.render('home', { movies });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});


export default homeController;