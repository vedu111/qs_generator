const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsxtojson = require('xlsx-to-json-lc');
const xlstojson = require('xls-to-json-lc');
const fs = require('fs');
const mongoose = require('mongoose');
const { Question, questionsubSchema } = require('../models/question'); // Import questionsubSchema

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage }).single('file');

router.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.status(500).json({ error: 'File upload failed', details: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        let exceltojson;
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }

        try {
            exceltojson({
                input: req.file.path,
                output: null,
                lowerCaseHeaders: true
            }, function(err, result) {
                if (err) {
                    return res.status(500).json({ error: 'Error parsing Excel file', details: err.message });
                }

                const dataArray = result;
                const subject = req.body.subject;

                if (!subject) {
                    return res.status(400).json({ error: 'Subject is required' });
                }

                // Create a model based on the schema
                const Question = mongoose.model(subject.toLowerCase(), questionsubSchema);
                
                // Iterate over the questions and save them to the database
                for (let i = 0; i < dataArray.length; i++) {
                    const questionData = dataArray[i];
                    questionData.subject = subject;
                    const question = new Question(questionData);
                    question.save().catch(err => {
                        console.error("Error saving question: ", err);
                    });
                }

                // Delete the file after parsing
                fs.unlink(req.file.path, function(err) {
                    if (err) {
                        console.error("Error deleting file: ", err);
                    } else {
                        console.log("File deleted successfully");
                    }
                });

                res.status(200).json({ message: 'Data stored successfully' });
            });
        } catch (e) {
            res.status(500).json({ error: 'Error processing Excel file', details: e.message });
        }
    });
});

module.exports = router;
