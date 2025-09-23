import express from 'express'
import movieService from '../services/movieService.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    // Save Movie
    await movieService.create(newMovie);

    // Redirect to home page
    res.redirect('/');
});

movieController.get('/:movieId/details', (req, res) => {
    // Get movie id from params
    const movieId = req.params.movieId;
    
    // Get movie data
    const movie = movieService.getOne(movieId);

    res.render('details', { movie });
});

movieController.get('/search', (req, res) => {
    // Get querystring
    const filter = req.query;
    
    // Get all movies
    const movies = movieService.getAll(filter);

    res.render('search', { movies });
});

export default movieController;