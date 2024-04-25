// picking questions randomly
const { shuffle } = require("./shuffle.js");
module.exports.seprateCluster=(sorted_cluster, clusterlastOccurence)=> {
  let cluster1 = [];
  let cluster2 = [];
  let cluster3 = [];

  for (let i = 0; i <= clusterlastOccurence[3]; i++) {
    cluster3.push(sorted_cluster[i]);
  }

  for (let i = clusterlastOccurence[3] + 1; i <= clusterlastOccurence[2]; i++) {
    cluster2.push(sorted_cluster[i]);
  }

  for (let i = clusterlastOccurence[2] + 1; i <= clusterlastOccurence[1]; i++) {
    cluster1.push(sorted_cluster[i]);
  }

  cluster1 = shuffle(cluster1);
  cluster2 = shuffle(cluster2);
  cluster3 = shuffle(cluster3);

  return [cluster1, cluster2, cluster3];
}
//picking up questions
function SelectQuestions(cluster1, cluster2, cluster3, cluster, count,type ) {
  let questionCount = 0;
  let selectedQuestions = [];
  let set1 = [];
  let set2 = [];
  let set3 = [];
  for (let i = 1; i <= 3; i++) {
    if (questionCount === count) {
      break;
    }

    let cluster_in = eval(`cluster${i}`);
    for (let j = 1; j <= 3; j++) {
      if (cluster_in[j - 1] && (cluster_in[j-1].type===type)) {
        eval(`set${j}`).push(cluster_in[j - 1]);
        selectedQuestions.push(cluster_in[j- 1])
      }
    }
    questionCount++;
  }

  //set1
  //deal with remaining questions:
  while (set1.length < count) {
    //create similarity
    let dict = {};
    for (let i = 0; i < cluster.length; i++) {
      let max_similarity = -1;
      for (let j = 0; j < selectedQuestions.length; j++) {
        const similarity = compareTwoStrings(
          cluster[i].questions,
          selectedQuestions[j].questions
        );
        if (similarity > max_similarity) {
          max_similarity = similarity;
        }
      }
      dict[i] = max_similarity;
    }

    //convert to array and sort
    const entries = Object.entries(dict);

    entries.sort((a, b) => a[1] - b[1]);

    // console.log(entries);

    // console.log("==================================");
   
    //check and push
    for (let i = 0; i < entries.length; i++) {

      //edge case :
      if(selectedQuestions.length === cluster.length){
        break
      }


      if (
        !selectedQuestions.find((question) => question === cluster[entries[i][0]])
      ) {
        set1.push(cluster[entries[i][0]]);
        selectedQuestions.push(cluster[entries[i][0]])
        break;
      }

    }
     //edge case :
     if(selectedQuestions.length === cluster.length){
      break
    }
  }

  //set2
  //deal with remaining questions:
  while (set2.length < count) {
    //create similarity
    let dict = {};
    for (let i = 0; i < cluster.length; i++) {
      let max_similarity = -1;
      for (let j = 0; j < selectedQuestions.length; j++) {
        const similarity = compareTwoStrings(
          cluster[i].questions,
          selectedQuestions[j].questions
        );
        if (similarity > max_similarity) {
          max_similarity = similarity;
        }
      }
      dict[i] = max_similarity;
    }

    //convert to array and sort
    const entries = Object.entries(dict);

    entries.sort((a, b) => a[1] - b[1]);

    // console.log(entries);

    // console.log("==================================");

    //check and push
    
    for (let i = 0; i < entries.length; i++) {
       //edge case :
       if(selectedQuestions.length === cluster.length){
        break
      }
      if (
        !selectedQuestions.find((question) => question === cluster[entries[i][0]])
      ) {
        set2.push(cluster[entries[i][0]]);
        selectedQuestions.push(cluster[entries[i][0]])
        break;
      }
    }
     //edge case :
     if(selectedQuestions.length === cluster.length){
      break
    }
     //edge case :
     if(selectedQuestions.length === cluster.length){
      break
    }
  }

  //set3
  //deal with remaining questions:
  while (set3.length < count) {
    //create similarity
    let dict = {};
    for (let i = 0; i < cluster.length; i++) {
      let max_similarity = -1;
      for (let j = 0; j < selectedQuestions.length; j++) {
        const similarity = compareTwoStrings(
          cluster[i].questions,
          selectedQuestions[j].questions
        );
        if (similarity > max_similarity) {
          max_similarity = similarity;
        }
      }
      dict[i] = max_similarity;
    }

    //convert to array and sort
    const entries = Object.entries(dict);

    entries.sort((a, b) => a[1] - b[1]);

    // console.log(entries);

    // console.log("==================================");

    //check and push
    
    for (let i = 0; i < entries.length; i++) {
       //edge case :
       if(selectedQuestions.length === cluster.length){
        break
      }
      if (
        !selectedQuestions.find((question) => question === cluster[entries[i][0]])
      ) {
        set3.push(cluster[entries[i][0]]);
        selectedQuestions.push(cluster[entries[i][0]])
        break;
      }
    }
     //edge case :
     if(selectedQuestions.length === cluster.length){
      break
    }
  }

  //if(selectedQuestions.length === cluster.length):  set3

  while (set3.length < count) {
    //create similarity //special case compare with set3 instast of selectedquestions
    let dict = {};
    for (let i = 0; i < cluster.length; i++) {
      let max_similarity = -1;
      for (let j = 0; j < set3.length; j++) {
        const similarity = compareTwoStrings(
          cluster[i].questions,
          set3[j].questions
        );
        if (similarity > max_similarity) {
          max_similarity = similarity;
        }
      }
      dict[i] = max_similarity;
    }

    //convert to array and sort
    const entries = Object.entries(dict);

    entries.sort((a, b) => a[1] - b[1]);

    // console.log(entries);

    // console.log("==================================");

    //check and push //special case compare with set3 instast of selectedquestions
    
    for (let i = 0; i < entries.length; i++) {
      
      set3.push(cluster[entries[i][0]]);
        if(set3.length === count){
          break;
        }
    }
  }

  //if(selectedQuestions.length === cluster.length):  set2

  while (set2.length < count) {
    //create similarity //special case compare with set2 instast of selectedquestions
    let dict = {};
    for (let i = 0; i < cluster.length; i++) {
      let max_similarity = -1;
      for (let j = 0; j < set2.length; j++) {
        const similarity = compareTwoStrings(
          cluster[i].questions,
          set2[j].questions
        );
        if (similarity > max_similarity) {
          max_similarity = similarity;
        }
      }
      dict[i] = max_similarity;
    }

    //convert to array and sort
    const entries = Object.entries(dict);

    entries.sort((a, b) => a[1] - b[1]);

    // console.log(entries);

    // console.log("==================================");

    //check and push //special case compare with set2 instast of selectedquestions
    
    for (let i = 0; i < entries.length; i++) {
      
      set2.push(cluster[entries[i][0]]);
        if(set2.length === count){
          break;
        }
    }
  }

  //if(selectedQuestions.length === cluster.length):  set1

  while (set1.length < count) {
    //create similarity //special case compare with set1 instast of selectedquestions
    let dict = {};
    for (let i = 0; i < cluster.length; i++) {
      let max_similarity = -1;
      for (let j = 0; j < set1.length; j++) {
        const similarity = compareTwoStrings(
          cluster[i].questions,
          set1[j].questions
        );
        if (similarity > max_similarity) {
          max_similarity = similarity;
        }
      }
      dict[i] = max_similarity;
    }

    //convert to array and sort
    const entries = Object.entries(dict);

    entries.sort((a, b) => a[1] - b[1]);

    // console.log(entries);

    // console.log("==================================");

    //check and push //special case compare with set1instast of selectedquestions
    
    for (let i = 0; i < entries.length; i++) {
      
      set1.push(cluster[entries[i][0]]);
        if(set1.length === count){
          break;
        }
    }
  }


  return [set1, set2, set3];
}
