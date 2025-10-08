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

movieController.post('/:movieId/attach', async (req, res) => {
    // Get movie id 
    const movieId = req.params.movieId;

    // Get cast id 
    const castId = req.body.cast;

    // Attach cast to movie
    
})

export default homeController;