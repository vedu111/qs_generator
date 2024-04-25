//sort based on preference
module.exports.sort_cluster = (prepCluster) => {
  let sortPrepCluster = prepCluster.sort((a, b) => b.preference - a.preference);
  return sortPrepCluster;
}