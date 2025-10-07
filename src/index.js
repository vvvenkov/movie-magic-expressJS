import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose'

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import castController from './controllers/castController.js';

// Init express instance
const app = express();

// Add static middleware
app.use(express.static('./src/public'))

// Add body parser
app.use(express.urlencoded());

// Add a config view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        showRating(rating) {
            return '&#x2605;'.repeat(Math.floor(rating));
        }
    },
    //Allow mognosse to use prototype methods and properties of the base document
    runtimeOptions: {
        allowProtoPropertiesByDefault: 'true',
        allowProtoMethodsByDefault: 'true',
    }
}));

//Connect database
try {
    await mongoose.connect('mongodb://localhost:27017', { dbName: 'movie-express' });
    console.log('Successfully connected to database.')
} catch (err) {
    console.log('Cannot connect to database');
    console.log(err.message);
}

//Set default engine
app.set('view engine', 'hbs');

//Set default view folder
app.set('views', './src/views')

// Config routes
app.use(homeController);
app.use('/movies', movieController);
app.use('/casts', castController);
app.all('*url', (req, res) => {
    res.render('404');
})

//Start express web server 
app.listen(5000, () => console.log('Server is listening on http://localhost:5000....'))