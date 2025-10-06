import Movie from '../models/Movie.js';

export default {
    async getAll(filter = {}) {
        let result = await Movie.find({});

        if (filter.search) {
            result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        }

        if (filter.genre) {
            // result = result.filter(movie => movie.genre.localeCompare(filter.genre, undefined, { sensitivity: 'accent' }) === 0)
            result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase())
        }

        if (filter.year) {
            result = result.filter(movie => movie.year === filter.year);
        }

        return result;
    },
    create(movieData) {
        const movie = new Movie(movieData);

        // return createdMovie
        return movie.save();
    },
    async getOne(movieId) {
        const movie = await Movie.findById(movieId);

        return movie;
    },
}