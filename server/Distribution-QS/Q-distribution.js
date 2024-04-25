// Define the function
module.exports.DistributionQ = (chapters, weights, ratioTN, type) => {   
  let TheoryQuestionsA = Math.round(ratioTN * 7 *0.01);
  let TheoryQuestionsB = Math.round(ratioTN * 4 *0.01);
  let NumericalQuestionsA = Math.round(7 - TheoryQuestionsA);
  let NumericalQuestionsB = Math.round(4 - TheoryQuestionsB);
  // Return or do something with the calculated values
  return {
      TheoryQuestionsA,
      TheoryQuestionsB,
      NumericalQuestionsA,
      NumericalQuestionsB
  };
};

// Call the function with arguments
const result = DistributionQ([1,2,3], [1,2,3,4,5,6], 80 , "ISE");

// Log the result to the console
console.log(result);
