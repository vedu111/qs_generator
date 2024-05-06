const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { questionsubSchema } = require('../models/question.js');
const Subinfo = require('../models/subinfo');

const { SimilarityCheck } = require("../Cluster-QS/SimilarityCheck.js");
const { Cluster } = require("../Cluster-QS/Cluster.js");
const { prepRating } = require("../Cluster-QS/prepRating.js");
const { sort_cluster } = require("../Cluster-QS/sort_cluster.js");
const { lastOccurrence } = require("../Cluster-QS/lastOccurrence.js");
const { seprateCluster } = require("../Cluster-QS/seprateCluster.js");
const { SelectQuestions } = require("../Cluster-QS/selectQuestions.js");
const {pickQuestions} = require("../Cluster-QS/pickQuestions.js");
const {Final_Validation} = require("../Cluster-QS/Final_Validation/Final_Validation.js");


async function generateQuestionPaper(subject, chapter, marks, count, type, flag) {
    if (flag) {
      try {
        // Pick questions
        let questions = await pickQuestions(subject, chapter, marks);
  
        // Check if questions were fetched
        if (!questions || questions.length === 0) {
          console.log('Failed to fetch questions');
          return;
        }
  
        // Check similarity
        let averageSimilarity = SimilarityCheck(questions);
  
        // Cluster questions
        let { questions: cluster, clusterCount } = Cluster(questions, averageSimilarity);
  
        // Prepare ratings
        let prepCluster = prepRating(cluster, clusterCount);
  
        // Sort clusters
        let sorted_cluster = sort_cluster(prepCluster);
  
        // Find last occurrence
        let clusterlastOccurence = lastOccurrence(sorted_cluster, clusterCount);
  
        // Separate clusters
        const [cluster1, cluster2, cluster3] = seprateCluster(sorted_cluster, clusterlastOccurence);
  
        // Select questions for the question paper
        const [set1, set2, set3] = SelectQuestions(cluster3, cluster2, cluster1, cluster, count, type);
  
        // Return selected questions
        return { set1, set2, set3 };
      } catch (err) {
        console.error(err);
        return;
      }
    }
  }
  

// http://localhost:3000/quesgen?sub=daa&ise1=true&ise2=false&ese=false&bool=false
router.get('/quesgen', async (req, res) => {
    try {
      const { sub, ise1, ise2, ese, bool } = req.query;
      pickQuestions(sub , 1 , 2);
      const subinfo = await Subinfo.findOne({ sub });
  
      if (!subinfo) {
        return res.status(404).json({ message: 'Subinfo not found' });
      }
  
      let chapters, weights, chpNumericalRatio, TnRatio;
  
      if (ise1 === 'true') {
        chapters = subinfo.ise1;
        weights = subinfo.ise1.map(chapter => subinfo.weights[chapter.toString()]);
        chpNumericalRatio = subinfo.ise1.map(chapter => subinfo.eachchapNum[chapter.toString()]);
        TnRatio = subinfo.ise1_TN.TH;
      } else if (ise2 === 'true') {
        chapters = subinfo.ise2;
        weights = subinfo.ise2.map(chapter => subinfo.weights[chapter.toString()]);
        chpNumericalRatio = subinfo.ise2.map(chapter => subinfo.eachchapNum[chapter.toString()]);
        TnRatio = subinfo.ise2_TN.TH;
      } else if (ese === 'true') {
        chapters = subinfo.ese;
        weights = subinfo.ese.map(chapter => subinfo.weights[chapter.toString()]);
        chpNumericalRatio = subinfo.ese.map(chapter => subinfo.eachchapNum[chapter.toString()]);
        TnRatio = subinfo.ese_TN.TH;
      } else {
        return res.status(400).json({ message: 'Invalid request parameters' });
      }


// Arrays to hold the generated question papers
let qp1 = [];
let qp2 = [];
let qp3 = [];

let nqAT = Math.round(TnRatio * 0.01 * 7);
let nqBT = Math.round(TnRatio * 0.01 * 4);

let nqAN = 7 - nqAT;
let nqBN = 4 - nqBT;

console.log(nqAT)
console.log(nqBT)
console.log(nqAN)
console.log(nqBN)


let maxiIndex = 0;
for (let i = 1; i < weights.length; i++) { 
    if (weights[i] > weights[maxiIndex]) {
        maxiIndex = i;
    }
}

let chpMaxi = chapters[maxiIndex];

const chapterRatioDict = {};
for (let i = 0; i < chapters.length; i++) {
    chapterRatioDict[chapters[i]] = chpNumericalRatio[i];
}

let chapterRatioArray = Object.entries(chapterRatioDict); 

chapterRatioArray.sort((a, b) => b[1] - a[1]); 


console.log(chapterRatioArray);

//populate sectionA theory
let dictAT = {};
chapters.forEach(chapter => dictAT[chapter] = 0);

let indexAT = 0;
let questionCountAT = 0;


if (nqAT % 2 === 0) {
    while (questionCountAT < nqAT) {
        dictAT[chapters[indexAT]] += 1; 
        indexAT = (indexAT + 1) % chapters.length; 
        questionCountAT++;
    }
} else { 
    while (questionCountAT < (nqAT - 1)) {
        dictAT[chapters[indexAT]] += 1;
        indexAT = (indexAT + 1) % chapters.length;
        questionCountAT++;
    }
    dictAT[chpMaxi] += 1; 
}

console.log(dictAT);

//populating questions(Theory) in section B
let dictBT = {};
chapters.forEach(chapter => dictBT[chapter] = 0); 


let indexBT = 0;
let questionCountBT = 0;


if (nqBT % 2 === 0) {
    while (questionCountBT < nqBT) { 
        dictBT[chapters[indexBT]] += 1; 
        indexBT = (indexBT + 1) % chapters.length; 
        questionCountBT++; 
    }
} else { 
    while (questionCountBT < (nqBT - 1)) { 
        dictBT[chapters[indexBT]] += 1;
        indexBT = (indexBT + 1) % chapters.length;
        questionCountBT++;
    }
    dictBT[chpMaxi] += 1; 
}

console.log(dictBT); 


//populating questions(numeric) in section A

let dictAN = {};
chapters.forEach(chapter => dictAN[chapter] = 0); 

let indexAN = 0;
let questionCountAN = 0;


if (nqAN % 2 === 0) { 
    while (questionCountAN < nqAN) {
        let chapter = chapterRatioArray[indexAN][0]; 
        dictAN[chapter] += 1; 
        indexAN = (indexAN + 1) % chapters.length; 
        questionCountAN++;
    }
} else {
    while (questionCountAN < (nqAN - 1)) {
        let chapter = chapterRatioArray[indexAN][0];
        dictAN[chapter] += 1;
        indexAN = (indexAN + 1) % chapters.length;
        questionCountAN++;
    }
    dictAN[chpMaxi] += 1; 
}

console.log(dictAN); 

//populating questions(numeric) in section B
// Correct initialization for Section B
let dictBN = {};
chapters.forEach(chapter => dictBN[chapter] = 0); 

let indexBN = 0;
let questionCountBN = 0;

// Correct even/odd check
if (nqBN % 2 === 0) { // Use nqBN for Section B
    while (questionCountBN < nqBN) {
        let chapter = chapterRatioArray[indexBN][0]; 
        dictBN[chapter] += 1; 
        indexBN = (indexBN + 1) % chapters.length; 
        questionCountBN++;
    }
} else {
    while (questionCountBN < (nqBN - 1)) { 
        let chapter = chapterRatioArray[indexBN][0];
        dictBN[chapter] += 1;
        indexBN = (indexBN + 1) % chapters.length;
        questionCountBN++;
    }
    dictBN[chpMaxi] += 1; 
}

console.log(dictBN); 

// // Generate question papers and store them in arrays
for (let i = 1; i <= 3; i++) {
    const { set1, set2, set3 } = await generateQuestionPaper(sub, i, 2, parseInt(dictAT[i]), "T", true); //module marks count 
    qp1.push(set1);
    
    qp2.push(set2);
    
    qp3.push(set3);
    
  }
  
  for (let i = 1; i <= 3; i++) {
    const { set1, set2, set3 } = await generateQuestionPaper(sub,i, 2, parseInt(dictAN[i]), "N", true); //module marks count 
    qp1.push(set1);
    
    qp2.push(set2);
    
    qp3.push(set3);
    
  }
  
  // Generate question papers and store them in arrays
  for (let i = 1; i <= 3; i++) {
    const { set1, set2, set3 } = await generateQuestionPaper(sub,i, 5, parseInt(dictBT[i]), "T", true); //module marks count 
    qp1.push(set1);
    
    qp2.push(set2);
    
    qp3.push(set3);
    
  }
  
  // // Generate question papers and store them in arrays
  for (let i = 1; i <= 3; i++) {
    const { set1, set2, set3 } = await generateQuestionPaper(sub,i, 5, parseInt(dictBN[i]), "N", true); //module marks count 
    qp1.push(set1);
    
    qp2.push(set2);
    
    qp3.push(set3);
    
  }

        
// itterate over each set:
qp1 = Final_Validation(qp1)
qp2 = Final_Validation(qp2)
qp3 = Final_Validation(qp3)

console.log('qp1:', qp1);
console.log('qp2:', qp2);
console.log('qp3:', qp3);

let result = {
    chapters,
    weights,
    chpNumericalRatio,
    TnRatio,
    qp1, qp2, qp3
  };

  res.json({ result});

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch subinfo and questions' });
    }
 
  });
  
module.exports = router;
