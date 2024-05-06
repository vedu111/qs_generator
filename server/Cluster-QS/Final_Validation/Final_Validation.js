const { compareTwoStrings } = require("string-similarity");
const { pickQuestions } = require("../pickQuestions");
const { Cluster } = require("../Cluster.js");

module.exports.Final_Validation = async (qp) => {
  try {
    const flattened = qp.flat(Infinity);

    for (let idx1 = 0; idx1 < flattened.length; idx1++) {
      const question1 = flattened[idx1].questions;
      if (!question1) {
        console.warn(`No question found at index ${idx1}. Skipping.`);
        continue;
      }

      for (let idx2 = idx1 + 1; idx2 < flattened.length; idx2++) {
        const question2 = flattened[idx2].questions;
        if (!question2) {
          console.warn(`No question found at index ${idx2}. Skipping.`);
          continue;
        }

        const similarity = compareTwoStrings(question1, question2);

        if (similarity === 1) {
          console.log(
            "=================================================================="
          );
          console.log(
            `Duplicate found! Indices: ${idx1} and ${idx2}, CO: ${flattened[idx2].co}, Marks: ${flattened[idx2].marks}`
          );

          
          const formattedChapter = flattened[idx2].co.replace("CO", "");

          const extracted_questions = await pickQuestions(
            flattened[idx2].subject,
            formattedChapter,
            parseInt(flattened[idx2].marks)
          );


          let dict = {};
          for (let eq_idx = 0; eq_idx < extracted_questions.length; eq_idx++) {
            let max_similarity = -1;
            for (let fq_idx = 0; fq_idx < flattened.length; fq_idx++) {
              const similarity = compareTwoStrings(
                extracted_questions[eq_idx].questions,
                flattened[fq_idx].questions
              );
              if (similarity > max_similarity) {
                max_similarity = similarity;
              }
            }
            dict[eq_idx] = max_similarity;
          }

          const entries = Object.entries(dict);
          if (entries.length === 0) {
            console.warn("No similar question found in extracted questions.");
            continue;
          }

          entries.sort((a, b) => a[1] - b[1]);
          flattened[idx2] = extracted_questions[entries[0][0]];
        }
      }
    }

    return flattened;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};
