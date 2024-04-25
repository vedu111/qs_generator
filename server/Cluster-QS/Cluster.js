const { compareTwoStrings } = require("string-similarity");
//cluster
module.exports.Cluster = (questions, avgSimilarity) => {
  // console.log("comparison-test");
  let cluster_index = 0;
  let selectedQuestions = [];
  let threshold = 0.5;
  for (let i = 0; i < questions.length; i++) {
    if (!selectedQuestions.find((question) => question === questions[i])) {
      questions[i].clusterID = `cluster ${cluster_index}`;
      cluster_index = cluster_index + 1;
      selectedQuestions.push(questions[i]);

      for (let j = 0; j < questions.length; j++) {
        if (!selectedQuestions.find((question) => question === questions[j])) {
          let similarity = compareTwoStrings(
            questions[i].questions,
            questions[j].questions
          );
          if (similarity > threshold && similarity > avgSimilarity[i]) {
            questions[j].clusterID = `cluster ${cluster_index - 1}`;
            selectedQuestions.push(questions[j]);
          }
        }
      }
    }
  }

  return { questions, clusterCount: cluster_index };
}

