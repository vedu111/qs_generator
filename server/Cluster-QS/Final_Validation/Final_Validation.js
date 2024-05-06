const { compareTwoStrings } = require("string-similarity");
const { pickQuestions } = require("../pickQuestions");
const { Cluster } = require("../Cluster.js");

module.exports.Final_Validation = (qp) => {
  try {
    const flattened = qp.flat(Infinity);
    const usedQuestions = new Set();
    const result = [];

    for (let idx1 = 0; idx1 < flattened.length; idx1++) {
      const question1 = flattened[idx1].questions;
      if (!question1) {
        console.warn(`No question found at index ${idx1}. Skipping.`);
        continue;
      }

      if (!usedQuestions.has(question1)) {
        result.push(flattened[idx1]);
        usedQuestions.add(question1);
      } else {
        console.log(`Duplicate found: ${question1}`);

        const co = flattened[idx1].co || "";
        const regex = /\d+/;
        const result = co.match(regex);
        const module_number = result ? parseInt(result[0], 10) : null;

        const extracted_questions = pickQuestions(
          flattened[idx1].subject,
          module_number,
          parseInt(flattened[idx1].marks)
        );

        let replacement = null;
        for (let eq_idx = 0; eq_idx < extracted_questions.length; eq_idx++) {
          const question_to_compare = extracted_questions[eq_idx].questions;
          if (!usedQuestions.has(question_to_compare)) {
            replacement = extracted_questions[eq_idx];
            break;
          }
        }

        if (replacement) {
          result.push(replacement);
          usedQuestions.add(replacement.questions);
        } else {
          console.warn("No suitable replacement found in extracted questions.");
        }
      }
    }

    return result;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};





