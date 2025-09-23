import express from 'express';
import movieService from '../services/movieService.js';

const homeController = express.Router();

homeController.get('/', (req, res) => {
    const movies = movieService.getAll();

    res.render('home', { movies });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;