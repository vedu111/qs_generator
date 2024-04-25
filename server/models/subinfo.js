const mongoose = require('mongoose');

const subinfoSchema = new mongoose.Schema({
  sub: String,
  ise1: [Number],
  ise2: [Number],
  ese: [Number],
  ise1_TN: {
    TH: Number,
    N: Number
  },
  ise2_TN: {
    TH: Number,
    N: Number
  },
  ese_TN: {
    TH: Number,
    N: Number
  },
  weights: {
    '1': Number,
    '2': Number,
    '3': Number,
    '4': Number,
    '5': Number,
    '6': Number
  },
  eachchapNum: {
    '1': Number,
    '2': Number,
    '3': Number,
    '4': Number,
    '5': Number,
    '6': Number
  }
});

const Subinfo = mongoose.model('Subinfo', subinfoSchema);

module.exports = Subinfo;
