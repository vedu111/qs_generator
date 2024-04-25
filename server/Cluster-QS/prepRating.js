// //processing rating
// module.exports.prepRating = (cluster, clusterCount) => {
//   let dict = {};
//   for (let i = 0; i < clusterCount; i++) {
//     let maxi = 0;
//     for (let j = 0; j < cluster.length; j++) {
//       if (cluster[j].clusterID === `cluster ${i}`) {
//         if (cluster[j].rating > maxi) {
//           maxi = cluster[j].rating;
//         }
//       }
//     }
//     dict[i] = maxi;
//   }
//   //assigning this cluster rating
//   for (let i = 0; i < clusterCount; i++) {
//     for (let j = 0; j < cluster.length; j++) {
//       if (cluster[j].clusterID === `cluster ${i}`) {
//         cluster[j].preference = dict[i];
//       }
//     }
//   }
//   return cluster;
// }


module.exports.prepRating = (cluster, clusterCount) => {
  let ratings = [];
  for (let i = 0; i < clusterCount; i++) {
    let maxi = 0;
    for (let j = 0; j < cluster.length; j++) {
      if (cluster[j].clusterID === `cluster ${i}`) {
        if (cluster[j].rating > maxi) {
          maxi = cluster[j].rating;
        }
      }
    }
    ratings.push(maxi);
  }
  return ratings;
}
