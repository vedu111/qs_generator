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

require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // 'mongodb://localhost:27017/qsGen'
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to database:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB database');
});

app.use(cors());

app.use(express.json());
app.set('view engine', 'ejs');

app.use('/', uploadRoute);
app.use('/', subInfoRouter);
app.use('/', questionsWithImagesRouter);
app.use('/', storeImagesRouter);
app.use('/', quesgenRouter);
app.use('/', flushRoute);
app.use('/', listCollectionsRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
