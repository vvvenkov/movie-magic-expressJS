import Movie from '../models/Movie.js';

export default {
    getAll(filter = {}) {
        let query = Movie.find();

        if (filter.search) {
            query = query.find({ title: { $regex: new RegExp(filter.search, 'i') } })
        }

        if (filter.genre) {
            query = query.find({ genre: filter.genre.toLowerCase() })
        }

        if (filter.year) {
            query = query.find({ year: filter.year });
        }

        return query;
    },
    create(movieData, userId) {
        const movie = new Movie(movieData);

        movie.owner = userId;

        // return createdMovie
        return movie.save();
    },
    async getOne(movieId) {
        const movie = await Movie.findById(movieId).populate('casts');

        return movie;
    },
    async attach(movieId, castId) {
        const movie = await this.getOne(movieId);

        movie.casts.push(castId);

        return movie.save();
    },
}