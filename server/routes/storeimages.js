const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { questionsubSchema } = require('../models/question');

// Set up multer storage to store images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { sub } = req.body;
    const folderPath = `uploads/${sub.toLowerCase()}/`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'sub', maxCount: 1 },
  { name: 'sr_no' },
  { name: 'images' },
]);

let subjectFolder;

// Route to store images for multiple questions
router.post('/storeImage', upload, async (req, res) => {
  try {
    const { sub, sr_no } = req.body;
    const images = req.files.images || [];
    subjectFolder = `uploads/${sub.toLowerCase()}`;

    const SubjectModel = mongoose.model(sub.toLowerCase(), questionsubSchema);
    const uniqueSrNos = Object.values(sr_no).filter(
      (value, index, self) => self.indexOf(value) === index
    );

    for (let i = 0; i < uniqueSrNos.length; i++) {
      const currentSrNo = uniqueSrNos[i];
      const imageIndex = Object.values(sr_no).indexOf(currentSrNo);

      if (images[imageIndex]) {
        const imageFile = images[imageIndex];
        const filePath = imageFile.path;

        if (fs.existsSync(filePath)) {
          const imageData = {
            data: fs.readFileSync(filePath),
            contentType: imageFile.mimetype,
          };

          await SubjectModel.findOneAndUpdate(
            { sr_no: currentSrNo },
            { $push: { images: imageData } },
            { upsert: true, new: true }
          );

          fs.unlinkSync(filePath);
        } else {
          console.error(`File not found: ${filePath}`);
        }
      }
    }

    res.status(201).json({ message: 'Images stored successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Delete the uploads directory after processing all files
    if (fs.existsSync(subjectFolder)) {
      fs.rmdir(subjectFolder, { recursive: true }, (err) => {
        if (err) {
          console.error(`Error deleting ${subjectFolder}: ${err}`);
        } else {
          console.log(`Deleted ${subjectFolder} successfully`);
        }
      });
    }
  }
});

module.exports = router;
