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
    upload(req, res, async function(err) {
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
            }, async function(err, result) {
                if (err) {
                    return res.status(500).json({ error: 'Error parsing Excel file', details: err.message });
                }

                const dataArray = result;
                const subject = req.body.subject;

                if (!subject) {
                    return res.status(400).json({ error: 'Subject is required' });
                }

                try {
                    // Check if the exact requested collection name exists
                    const collectionExists = await mongoose.connection.db.listCollections().toArray()
                        .then(collections => collections.some(collection => collection.name === subject));

                    if (!collectionExists) {
                        // Check if the pluralized form of the collection name exists
                        const pluralCollectionExists = await mongoose.connection.db.listCollections().toArray()
                            .then(collections => collections.some(collection => collection.name === `${subject}s`));

                        if (!pluralCollectionExists) {
                            // Check if the pluralized form with an extra 's' exists
                            const extraSPluralCollectionExists = await mongoose.connection.db.listCollections().toArray()
                                .then(collections => collections.some(collection => collection.name === `${subject}es`));

                            if (extraSPluralCollectionExists) {
                                return res.status(400).json({ error: `Question Bank for ${subject} already exists` });
                            }
                        } else {
                            return res.status(400).json({ error: `Question Bank for ${subject} already exists` });
                        }
                    } else {
                        return res.status(400).json({ error: `Question Bank for ${subject} already exists` });
                    }

                    // Create a model based on the schema
                    const Question = mongoose.model(subject.toLowerCase(), questionsubSchema);
                    
                    // Iterate over the questions and save them to the database
                    for (let i = 0; i < dataArray.length; i++) {
                        const questionData = dataArray[i];
                        questionData.subject = subject;
                        const question = new Question(questionData);
                        await question.save();
                    }

                    res.status(200).json({ message: 'Data stored successfully' });
                } catch (error) {
                    console.error("Error processing data or saving to database: ", error);
                    res.status(500).json({ error: 'Error processing data or saving to database', details: error.message });
                } finally {
                    // Delete the file after parsing
                    try {
                        fs.unlinkSync(req.file.path);
                        console.log("File deleted successfully");
                    } catch (deleteErr) {
                        console.error("Error deleting file: ", deleteErr);
                    }
                }
            });
        } catch (e) {
            res.status(500).json({ error: 'Error processing Excel file', details: e.message });
        }
    });
});

module.exports = router;
