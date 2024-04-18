const mongoose = require('mongoose');

const questionsubSchema = new mongoose.Schema({
    sr_no: String, // Added sr_no field to schema
    type: String,
    questions: String,
    co: String,
    rbt: String,
    pi: String,
    marks: String,
    subject: String, // Added subject field to schema
    is_image: String
});

const Question = mongoose.model('Question', questionsubSchema);

module.exports = { Question, questionsubSchema };
