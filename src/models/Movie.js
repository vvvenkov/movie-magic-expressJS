import { Schema, model, Types } from 'mongoose';

const maxYearAllowed = new Date().getFullYear() + 5;
const validCharactersPattern = /^[a-zA-Z0-9]+$/;

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'imageUrl is required!'],
        validate: [validCharactersPattern, 'Only English letters and digits are allowed'],
        minLength: [5, 'Title should be at least 5 characters long!']
    },
    category: {
        type: String,
        required: [true, 'imageUrl is required!'],
    },
    genre: {
        type: String,
        required: [true, 'imageUrl is required!'],
        lowerCase: true, //not a validator, but a sanitizer
        validate: [validCharactersPattern, 'Only English letters and digits are allowed'],
        minLength: [5, 'Genre should be at least 5 characters long!']
    },
    director: {
        type: String,
        required: [true, 'imageUrl is required!'],
        validate: [validCharactersPattern, 'Only english letter, digits are allowed'],
        minLength: [5, 'Director should be at least 5 characters long!']
    },
    year: {
        type: Number,
        required: [true, 'imageUrl is required!'],
        min: [1900, 'Movie year canne be less than year 1900'],
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
        maxLength: [1000, 'Description is too long!'],
        minLength: [20, 'Description is too short!'],
        validate: [validCharactersPattern, 'Only English letters and digits are allowed'],


    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast',
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
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

