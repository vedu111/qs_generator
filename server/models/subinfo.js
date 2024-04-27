const mongoose = require('mongoose');

// Define the schema
const subinfoSchema = new mongoose.Schema({
  sub: {
    type: String,
    required: true,
    unique: true // Ensure 'sub' is unique
  },
  ise1: {
    type: [Number] // Expecting an array of numbers
  },
  ise2: {
    type: [Number] // Expecting an array of numbers
  },
  ese: {
    type: [Number] // Expecting an array of numbers
  },
  ise1_TN: {
    TH: {
      type: Number,
      min: 0,
      max: 100 // TH should be within 0-100
    },
    N: {
      type: Number,
      default: function() {
        return 100 - this.TH; // Automatically set N based on TH
      }
    }
  },
  ise2_TN: {
    TH: {
      type: Number,
      min: 0,
      max: 100
    },
    N: {
      type: Number,
      default: function() {
        return 100 - this.TH; // Automatically set N based on TH
      }
    }
  },
  ese_TN: {
    TH: {
      type: Number,
      min: 0,
      max: 100
    },
    N: {
      type: Number,
      default: function() {
        return 100 - this.TH; // Automatically set N based on TH
      }
    }
  },
  weights: {
    type: [Number] // Expecting an array of numbers
  },
  eachchapNum: {
    '1': {
      type: Number,
      min: 1,
      max: 6 // Expected chapters 1-6
    },
    '2': {
      type: Number,
      min: 1,
      max: 6
    },
    '3': {
      type: Number,
      min: 1,
      max: 6
    },
    '4': {
      type: Number,
      min: 1,
      max: 6
    },
    '5': {
      type: Number,
      min: 1,
      max: 6
    },
    '6': {
      type: Number,
      min: 1,
      max: 6
    }
  }
});

// Create and export the model
const Subinfo = mongoose.model('Subinfo', subinfoSchema);

module.exports = Subinfo;
