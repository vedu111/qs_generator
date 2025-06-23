const express = require('express');
const mongoose = require('mongoose');
const uploadRoute = require('./routes/upload');
const path = require('path');
const { Question, questionsubSchema } = require('./models/question'); 
const subInfoRouter = require('./routes/subinfo');
const questionsWithImagesRouter = require('./routes/questionswithimages');
const storeImagesRouter = require('./routes/storeimages');
const quesgenRouter = require('./routes/questiongen');
const flushRoute = require('./routes/flush');
const listCollectionsRoute = require('./routes/listCollections');
const cors = require('cors');
const app = express();

// Hardcoded MongoDB URI (points at the Docker Compose “mongo” service)
const MONGO_URI = 'mongodb://mongo:27017/qsGen';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to database:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB database at', MONGO_URI);
});

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

// Your routes…
app.use('/', uploadRoute);
app.use('/', subInfoRouter);
app.use('/', questionsWithImagesRouter);
app.use('/', storeImagesRouter);
app.use('/', quesgenRouter);
app.use('/', flushRoute);
app.use('/', listCollectionsRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000, () => console.log("Server running on port 5000"));
