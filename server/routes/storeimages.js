const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const { questionsubSchema } = require('../models/question');

// Set up multer storage to store images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory for storing uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename for the uploaded image
  }
});
const upload = multer({ storage: storage });

// Route to store image for a particular question
router.post('/storeImage', upload.single('image'), async (req, res) => {
  try {
    const { sr_no } = req.body;
    const imageData = {
      data: fs.readFileSync(req.file.path), // Read the image data from the uploaded file
      contentType: req.file.mimetype
    };

    // Find the question by sr_no and update the image field
    const SubjectModel = mongoose.model(req.file.originalname.toLowerCase(), questionsubSchema);
    await SubjectModel.findOneAndUpdate({ sr_no: sr_no }, { image: imageData });

    // Delete the temporary file after storing the image in the database
    fs.unlinkSync(req.file.path);

    res.status(201).json({ message: 'Image stored successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
