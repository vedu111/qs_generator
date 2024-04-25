const express = require('express');
const mongoose = require('mongoose');
const { questionsubSchema } = require('../models/question');

// Define the function to fetch questions
async function pickQuestions(subject, chapter, marks) {
    try {
        const formattedChapter = `CO${chapter}`;
        const SubjectModel = mongoose.model(subject, questionsubSchema);
        let questions = await SubjectModel.find({ co: formattedChapter, marks: marks }).exec();
        // console.log(questions);
        return questions;
    } catch (err) {
        console.error(err);
        return [];
    }
}

module.exports = { pickQuestions };


