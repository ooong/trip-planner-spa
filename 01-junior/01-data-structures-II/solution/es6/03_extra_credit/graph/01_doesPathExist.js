

const pathExists= function(graph, start, end){
  const visited={};
  const pathExistsRecursive = function(currentVertex, target) {
    console.log('current ', currentVertex)
    visited[currentVertex]=true;
    return graph[currentVertex].some(function(vertex){
      if (vertex === target) {
        return true;
      } else if (!visited[vertex]) {
        return pathExistsRecursive(vertex, target);
      } else {
        return false;
      }
    });
  };
  return pathExistsRecursive(start,end)
}
