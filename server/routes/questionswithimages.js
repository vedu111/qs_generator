const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { questionsubSchema } = require('../models/question');

//http://localhost:3000/questionsWithImages?subject=daa
router.get('/questionsWithImages', async (req, res) => {
  try {
    const { subject } = req.query;
    const SubjectModel = mongoose.model(subject.toLowerCase(), questionsubSchema);
    const questionsWithImages = await SubjectModel.find({ is_image: 'y' }).exec();
    res.json(questionsWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;