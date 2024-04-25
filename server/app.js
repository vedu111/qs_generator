const express = require('express');
const mongoose = require('mongoose');
const uploadRoute = require('./routes/upload');
const fetchQuestionsRoute = require('./routes/fetchquestions'); // Import the fetchquestions route
const path = require('path');
const { Question, questionsubSchema } = require('./models/question'); // Import questionsubSchema
const subInfoRouter = require('./routes/subinfo');
const fetchSubinfoRouter = require('./routes/fetchsubinfo');
const storeQbRouter = require('./routes/storeqb');
const questionsWithImagesRouter = require('./routes/questionswithimages');
const storeImage = require('./routes/storeimages');
const cors = require('cors');
const app = express();

// MongoDB setup
mongoose.connect('mongodb+srv://dagadkhairvedant:Phw40Q017YOjZzwM@quesgenerator.k2g7m6f.mongodb.net/?retryWrites=true&w=majority&appName=QUESGENERATOR', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cors());

// Routes
app.use('/', uploadRoute);
app.use('/', fetchQuestionsRoute); // Use the fetchquestions route
app.use('/', subInfoRouter);
app.use('/', fetchSubinfoRouter);
app.use('/', storeQbRouter);
app.use('/', storeImage);
app.use('/', questionsWithImagesRouter);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});