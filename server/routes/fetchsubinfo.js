const express = require('express');
const router = express.Router();
const Subinfo = require('../models/subinfo');

//http://localhost:3000/fetchSubinfo?sub=os&ise1=false&ise2=false&ese=true&bool=false
router.get('/fetchSubinfo', async (req, res) => {
    try {
      const { sub, ise1, ise2, ese, bool } = req.query;
      let chapterWeights = {};
  
      const subinfo = await Subinfo.findOne({ sub });
  
      if (!subinfo) {
        return res.status(404).json({ message: 'Subinfo not found' });
      }
  
      if (ise1 === 'true') {
        chapterWeights = subinfo.ise1.reduce((acc, cur) => {
          acc[cur.toString()] = subinfo.weights[cur.toString()];
          return acc;
        }, {});
      } else if (ise2 === 'true') {
        chapterWeights = subinfo.ise2.reduce((acc, cur) => {
          acc[cur.toString()] = subinfo.weights[cur.toString()];
          return acc;
        }, {});
      } else if (ese === 'true') {
        chapterWeights = subinfo.ese.reduce((acc, cur) => {
          acc[cur.toString()] = subinfo.weights[cur.toString()];
          return acc;
        }, {});
      } else {
        return res.status(400).json({ message: 'Invalid request parameters' });
      }
  
      res.status(200).json(chapterWeights);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch subinfo' });
    }
  });
  

module.exports = router;
