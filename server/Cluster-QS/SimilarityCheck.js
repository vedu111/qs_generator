const { compareTwoStrings } = require("string-similarity");

module.exports.SimilarityCheck = (questions) => {
  const avgSimilarity = [];

  //similarity check
  for (let i = 0; i < questions.length; i++) {
    let sum = 0;
    for (let j = 0; j < questions.length; j++) {
      sum += compareTwoStrings(questions[i].questions, questions[j].questions);
    }
    sum = (sum - 1) / questions.length;
    avgSimilarity.push(sum);
  }

  // console.log(avgSimilarity);

  return avgSimilarity;
}