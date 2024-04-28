const mongoose = require('mongoose');



const questionsubSchema = new mongoose.Schema({
    sr_no: String,
    type: String,
    questions: String,
    co: String,
    rbt: String,
    pi: String,
    marks: String,
    subject: String,
    is_image: String,
    images: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    Rating: { type: String, default: null },
  });


const Question = mongoose.model('Question', questionsubSchema);

module.exports = { Question, questionsubSchema };
