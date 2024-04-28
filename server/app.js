const express = require('express');
const mongoose = require('mongoose');
const uploadRoute = require('./routes/upload');
const path = require('path');
const { Question, questionsubSchema } = require('./models/question'); // Import questionsubSchema
const subInfoRouter = require('./routes/subinfo');
const questionsWithImagesRouter = require('./routes/questionswithimages');
const storeImagesRouter = require('./routes/storeimages');
const quesgenRouter = require('./routes/questiongen');
const cors = require('cors');
const app = express();
const endpointLogger = require('./middleware/endpointLogger.js')


// MongoDB setup
mongoose.connect('mongodb://localhost:27017/qsGen', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to database:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB database');
});

app.use(cors());
app.use(endpointLogger)
// Middleware for parsing JSON bodies
app.use(express.json());
app.set('view engine', 'ejs');

// Routes
app.use('/', uploadRoute);
app.use('/', subInfoRouter);
app.use('/', questionsWithImagesRouter);
app.use('/', storeImagesRouter);
app.use('/', quesgenRouter);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
