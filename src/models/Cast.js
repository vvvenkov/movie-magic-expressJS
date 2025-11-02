import { Schema, model } from "mongoose";

const validCharactersPattern = /^[a-zA-Z0-9]+$/;


const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: [validCharactersPattern, 'Only English letters and digits are allowed'],
        minLength: [5, 'Name should be at least 5 characters long!'],
    },
    age: {
        type: Number,
        required: true,
        min: [1, 'Age should be at least 1 year old!'],
        age: [120, 'Age should be less than 120 years old!'],
    },
    born: {
        type: String,
        required: true,
        minLength: [10, 'Born should be at least 10 characters long!'],

    },
    imageUrl: {
        type: String,
        validate: [/^https?:\/\//, 'Indalid image URL!'],
        required: true,
    }
});

const Cast = model('Cast', castSchema);

export default Cast;
