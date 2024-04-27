const express = require('express');
const {validationResult,matchedData } = require('express-validator');
const router = express.Router();
const Subinfo = require('../models/subinfo');
const { validateSubinfo } = require('../middleware/validateSubInfo.js');

router.post('/subInfo', validateSubinfo, async (req, res) => {
 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const data = matchedData(req);
    console.log(data);

    const newSubinfo = new Subinfo(data);
    try {
      const savedSubinfo = await newSubinfo.save();
      return res.status(201).json(savedSubinfo);
    } catch (err) {
      console.error(err);
      return res.status(400).send("Error saving data.");
    }
  
  

    // const { sub, ise1, ise2, ese, ise1_TN, ise2_TN, ese_TN, weights, eachchapNum } = req.body;

    // const existingSubinfo = await Subinfo.findOne({ sub });

    // if (existingSubinfo) {
    //   res.status(400).json({ message: 'Subinfo already exists' });
    // } else {

    //   const newSubinfo = new Subinfo({
    //     sub,
    //     ise1,
    //     ise2,
    //     ese,
    //     ise1_TN,
    //     ise2_TN,
    //     ese_TN,
    //     weights,
    //     eachchapNum
    //   });

    //   await newSubinfo.save();

      res.status(201).json({ message: 'Subinfo saved successfully' });
    }
  );


module.exports = router;
