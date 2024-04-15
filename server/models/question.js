const mongoose = require('mongoose');

const questionsubSchema = new mongoose.Schema({
    type: String,
    sr_no: String,
    questions: String,
    co: String,
    rbt: String,
    pi: String,
    marks: String,
    subject: String // Added subject field to schema
}); // Specify the collection name explicitly as 'questions'

const Question = mongoose.model('Question', questionsubSchema);

module.exports = { Question, questionsubSchema };
