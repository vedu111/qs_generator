const express = require('express');
const router = express.Router();
const Subinfo = require('../models/subinfo');

// {
//     "sub": "os",
//     "ise1": [1, 2, 3],
//     "ise2": [4, 5, 6],
//     "ese": [1, 2, 3, 4, 5, 6],
//     "ise1_TN": {
//       "TH": 84,
//       "N": 16
//     },
//     "ise2_TN": {
//       "TH": 80,
//       "N": 20
//     },
//     "ese_TN": {
//       "TH": 70,
//       "N": 30
//     },
//     "weights": {
//       "1": 10,
//       "2": 8,
//       "3": 9,
//       "4": 7,
//       "5": 6,
//       "6": 4
//     }
//   }
router.post('/subInfo', async (req, res) => {
  try {
    const { sub, ise1, ise2, ese, ise1_TN, ise2_TN, ese_TN, weights } = req.body;

    const newSubinfo = new Subinfo({
      sub,
      ise1,
      ise2,
      ese,
      ise1_TN,
      ise2_TN,
      ese_TN,
      weights
    });

    await newSubinfo.save();

    res.status(201).json({ message: 'Subinfo saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save subinfo' });
  }
});

module.exports = router;
