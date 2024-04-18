const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { questionsubSchema } = require('../models/question');

// {
//     "questions": [
//       {
//         "sr_no": "2",
//         "type": "T",
//         "questions": "Classify data types used.",
//         "co": "CO1",
//         "rbt": "U",
//         "pi": "1.3.1",
//         "marks": "2",
//         "subject": "MATHS"
//       },
//       {
//         "sr_no": "2",
//         "type": "T",
//         "questions": "Classify data types used.",
//         "co": "CO1",
//         "rbt": "U",
//         "pi": "1.3.1",
//         "marks": "2",
//         "subject": "MATHS"
//       }
//     ]
//   }

// Route to store questions
router.post('/storeqb', async (req, res) => {
    const { questions } = req.body;

    try {
        for (let i = 0; i < questions.length; i++) {
            const questionData = questions[i];
            const { subject } = questionData;
            const SubjectModel = mongoose.model(`${subject}_QB`, questionsubSchema);
            const newQuestion = new SubjectModel(questionData);
            await newQuestion.save();
        }

        res.status(201).json({ message: 'Questions saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;