const { body, validationResult } = require('express-validator');

const validateSumToValue = (target) => (obj) => {
  const sum = Object.values(obj).reduce((total, num) => total + num, 0); 
  return sum === target; 
};
const validateEachChapNum = (obj) => {
  const expectedKeys = ["1", "2", "3", "4", "5", "6"];
  const keys = Object.keys(obj);

  return (
    keys.length === 6 &&
    expectedKeys.every((key) => keys.includes(key)) &&
    keys.every((key) => typeof obj[key] === 'number')
  );
};

const validateSumTo100 = (th, n) => {
  return th + n === 100; 
};

const validateSubinfo = [
  body('sub')
    .isString()
    .withMessage('sub must be a string')
    .notEmpty()
    .withMessage('sub is required'),

  body('ise1')
    .isArray({ min: 3, max: 3 })
    .withMessage('ise1 must contain exactly 3 elements')
    .custom((arr) => arr.every(Number.isFinite))
    .withMessage('ise1 must contain only numbers'),

  body('ise2')
    .isArray({ min: 3, max: 3 })
    .withMessage('ise2 must contain exactly 3 elements')
    .custom((arr) => arr.every(Number.isFinite))
    .withMessage('ise2 must contain only numbers'),

  body('ese')
    .isArray({ min: 6, max: 6 })
    .withMessage('ese must contain exactly 6 elements')
    .custom((arr) => arr.every(Number.isFinite))
    .withMessage('ese must contain only numbers'),

  body('weights')
    .custom((value) => validateEachChapNum(value))
    .withMessage('weights must contain keys 1-6 with all values as numbers')
    .custom(validateSumToValue(45)) 
    .withMessage('weights must sum to 45'),
   

  body('ise1_TN.TH')
    .isFloat({ min: 0, max: 100 })
    .withMessage('ise1_TN.TH must be between 0 and 100'),

  body('ise1_TN.N')
    .custom((_, { req }) => 100 - req.body.ise1_TN.TH),

  body('ise2_TN.TH')
    .isFloat({ min: 0, max: 100 })
    .withMessage('ise2_TN.TH must be between 0 and 100'),

  body('ise2_TN.N')
    .custom((_, { req }) => 100 - req.body.ise2_TN.TH),

  body('ese_TN.TH')
    .isFloat({ min: 0, max: 100 })
    .withMessage('ese_TN.TH must be between 0 and 100'),

  body('ese_TN.N')
    .custom((_, { req }) => 100 - req.body.ese_TN.TH),

  body('ise1_TN')
    .custom(({ TH, N }) => validateSumTo100(TH, N))
    .withMessage('ise1_TN TH + N must sum to 100'),

  body('ise2_TN')
    .custom(({ TH, N }) => validateSumTo100(TH, N))
    .withMessage('ise2_TN TH + N must sum to 100'),

  body('ese_TN')
    .custom(({ TH, N }) => validateSumTo100(TH, N))
    .withMessage('ese_TN TH + N must sum to 100'),

    body('eachchapNum') 
    .custom((value) => validateEachChapNum(value))
    .withMessage('eachChapterNum must contain keys 1-6 with all values as numbers'),

];

module.exports = { validateSubinfo };