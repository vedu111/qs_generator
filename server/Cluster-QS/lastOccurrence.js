// lastOccurence dict
module.exports.lastOccurrence=(sorted_cluster, clusterCount)=> {
  let dict = {};

  for (let i = 1; i < clusterCount + 1; i++) {
    for (let j = sorted_cluster.length - 1; j >= 0; j--) {
      if (parseInt(sorted_cluster[j].preference) === i) {
        if (dict[i] === undefined) {
          dict[i] = j;
        }
      }
    }
  }
  return dict;
}