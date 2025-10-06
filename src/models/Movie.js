import { Schema, model } from 'mongoose';

const maxYearAllowed = new Date().getFullYear() + 5;


const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'imageUrl is required!'],
    },
    category: {
        type: String,
        required: [true, 'imageUrl is required!'],
    },
    genre: {
        type: String,
        required: [true, 'imageUrl is required!'],
    },
    director: {
        type: String,
        required: [true, 'imageUrl is required!'],
    },
    year: {
        type: Number,
        required: [true, 'imageUrl is required!'],
        min: 1970,
        max: [maxYearAllowed, `Year cannot be larger than ${maxYearAllowed}!`],
    },
    imageUrl: {
        type: String,
        required: [true, 'imageUrl is required!'],
        validate: [/^https?:\/\//, 'Indalid image URL!']
    },
    rating: {
        type: Number,
        required: [true, 'imageUrl is required!'],
        min: [1, 'Rating should be equal or more than 1'],
        max: [10, 'Rating should be equal or less than 10'],
    },
    description: {
        type: String,
        required: [true, 'imageUrl is required!'],
        maxLength: [100, 'Description is too long!'],
    },
});

const Movie = model('Movie', movieSchema);

export default Movie;


// import fs from 'node:fs/promises'
// import { v4 as uuid } from 'uuid'

// const moviesJson = await fs.readFile('./src/database.json');
// export const movies = JSON.parse(moviesJson);

// export default class Movie {
//     constructor(data) {
//         this.data = data;
//     }

//     async save() {
//         // Set unique id
//         this.data.id = uuid();

//         // Convert rating from string to number
//         this.data.rating = Number(this.data.rating);

//         movies.push(this.data);

//         await fs.writeFile('./src/database.json', JSON.stringify(movies, null, 4));

//         return this.data;
//     }
// }

