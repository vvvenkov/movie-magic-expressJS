import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 12,
        age: 120,
    },
    born: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        validate: [/^https?:\/\//, 'Indalid image URL!'],
        required: true,
    }
});

const Cast = model('Cast', castSchema);

export default Cast;
