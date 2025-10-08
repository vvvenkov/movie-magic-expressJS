import express from 'express';
import movieService from '../services/movieService.js';
import movieController from './movieController.js';

const homeController = express.Router();

homeController.get('/', async (req, res) => {
    const movies = await movieService.getAll();

    res.render('home', { movies });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});


export default homeController;