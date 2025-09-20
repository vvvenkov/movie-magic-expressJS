import express from 'express';
import movieService from '../services/movieService.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const newMovie = req.body;

    //Save movie
    movieService.create(newMovie);

    //Redirect to home page
    res.redirect('/');
})

export default movieController;