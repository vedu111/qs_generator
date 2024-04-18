const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { questionsubSchema } = require('../models/question');

// http://localhost:3000/fetchquestions?subject=CN&chapter=1&marks=2&type=T
router.get('/fetchquestions', async (req, res) => {
    let { subject, chapter, marks, type } = req.query;

    subject = subject.toLowerCase();
    const formattedChapter = `CO${chapter}`;

    try {
        let questions;
        const SubjectModel = mongoose.model(subject, questionsubSchema);
        console.log(`Querying ${subject} model with chapter: ${formattedChapter}, marks: ${marks}, type: ${type}`);
        questions = await SubjectModel.find({ co: formattedChapter, marks: marks, type: type }).exec();
        console.log('Questions found:', questions);

        res.json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
