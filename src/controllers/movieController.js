import express from 'express'
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    //Get current userId
    const userId = req.user.id;

    //Get movie data
    const newMovie = req.body;

    // Save Movie
    await movieService.create(newMovie, userId);

    // Redirect to home page
    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    // Get movie id from params
    const movieId = req.params.movieId;

    // Get current user 
    const userId = req.user?.id;

    // Get movie data with populated casts
    const movie = await movieService.getOne(movieId);

    //Verify is the user is owner
    const isOwner = movie.owner?.equals(userId);

    res.render('movie/details', { movie, isOwner });
});

movieController.get('/search', async (req, res) => {
    // Get querystring
    const filter = req.query;

    // Get all movies
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    //Get Movie by id
    const movie = await movieService.getOne(movieId);

    //Get all casts
    const casts = await castService.getAll({ exclude: movie.casts })

    //Pass casts to template
    res.render('movie/attach', { movie, casts });
});


movieController.post('/:movieId/attach', async (req, res) => {
    // Get movie id 
    const movieId = req.params.movieId;

    // Get cast id 
    const castId = req.body.cast;

    // Attach cast to movie
    await movieService.attach(movieId, castId);

    //Redirect to movie details page
    res.redirect(`/movies/${movieId}/details`);
})

movieController.get('/:movieId/delete', async (req, res) => {
    // Get movie id
    const movieId = req.params.movieId;

    // Call service
    await movieService.delete(movieId);
    // return redirect

    res.redirect('/')

});

movieController.get("/:movieId/edit", async (req, res) => {
    //Get movie id 
    const movieId = req.params.movieId;

    // Get movie by id
    const movie = await movieService.getOne(movieId);

    //Get userId
    const userId = req.user?.id;

    //Check if owner
    const isOwner = movie.owner?.equals(userId);

    if (!isOwner) {
        //TODO: add errro handlign
        return res.status(403).end();
    }

    //Pass movie data to template

    res.render("movie/edit", { movie })
});

movieController.post('/:movieId/edit', async (req, res) => {
    // Get movie Id
    const movieId = req.params.movieId;

    // Get updatedd movie data
    const movieData = req.body;

    // Get userId
    //const userId = req.user?.id;

    // TODO: Check if owner

    //Update movie
    await movieService.update(movieId, movieData);

    //Redirect to movie details page
    res.redirect(`/movies/${movieId}/details`)

})

export default movieController; 