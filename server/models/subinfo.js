const mongoose = require('mongoose');

const subinfoSchema = new mongoose.Schema({
  sub: {
    type: String,
    required: true,
    unique: true,
  },
  ise1: {
    type: [Number], 
    required: true,
  },
  ise2: {
    type: [Number], 
    required: true,
  },
  ese: {
    type: [Number], 
    required: true,
  },
  ise1_TN: {
    TH: {
      type: Number,
      min: 0,
      max: 100, 
      required: true,
    },
    N: {
      type: Number,
      default: function () {
        return 100 - this.TH; 
      },
    },
  },
  ise2_TN: {
    TH: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    N: {
      type: Number,
      default: function () {
        return 100 - this.TH; 
      },
    },
  },
  ese_TN: {
    TH: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    N: {
      type: Number,
      default: function () {
        return 100 - this.TH; 
      },
    },
  },
  weights: {
    '1': { type: Number, required: true },
    '2': { type: Number, required: true },
    '3': { type: Number, required: true },
    '4': { type: Number, required: true },
    '5': { type: Number, required: true },
    '6': { type: Number, required: true },
  },
  eachchapNum: {
    '1': { type: Number, required: true },
    '2': { type: Number, required: true },
    '3': { type: Number, required: true },
    '4': { type: Number, required: true },
    '5': { type: Number, required: true },
    '6': { type: Number, required: true },
  },
});

const Subinfo = mongoose.model('Subinfo', subinfoSchema);

module.exports = Subinfo;
