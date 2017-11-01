// BFS shortestPaths
const shortestPaths = function(graph, start, end){
  const visited = {[start]: 0};//value represents depth where the vertex was first visited
  const queue = [start];
  let paths = [[start]];
  let exploreNeighborsSwitch = true;

  const addToPaths = function(pathsArr, currentVertex, neighbor){
    for (const pathArr of pathsArr){
      if (pathArr[pathArr.length - 1] === currentVertex){
        pathsArr.push(pathArr.concat(neighbor));
      }
    }
  };

  while (queue.length){
    const currentVertex = queue.shift();
    if (currentVertex === end) exploreNeighborsSwitch = false;
    const currentDepth = visited[currentVertex];
    if (exploreNeighborsSwitch){
      for (const neighbor of graph[currentVertex]){
        if (visited[neighbor] === undefined){
          visited[neighbor] = currentDepth + 1;
          queue.push(neighbor);
          addToPaths(paths, currentVertex, neighbor);
        }
        else if (visited[neighbor] === currentDepth + 1){//for edge cases where there are more than one (same length) routes to a vertex
          addToPaths(paths, currentVertex, neighbor);
        }
      }
    }
  }

  paths = paths.filter(pathArr => pathArr[pathArr.length - 1] === end);
  return paths;
};

//DFS shortestPaths
// let shortestPaths = function(graph, current, end, path = []){
//   path = path.concat(current);//DO NOT push... dont want to mutate the path
//   let workingPathsArr = [];
//   let shortestPathsArr = [];
//   if (current === end) return [path];//base case
//   else {
//     for (let neighbor of graph[current]){
//       if (path.indexOf(neighbor) === -1){//recursive (and base case): if neighbor IS in path, don't do anything.., otherwise call shortestPaths
//         workingPathsArr = workingPathsArr.concat(shortestPaths(graph, neighbor, end, path));
//       }
//     }
//     let shortestlength = Infinity;
//     for ( let i = 0; i < workingPathsArr.length; i++){
//       if (workingPathsArr[i].length < shortestlength){
//         shortestlength = workingPathsArr[i].length;
//         shortestPathsArr = [workingPathsArr[i]];
//       }
//       else if (workingPathsArr[i].length === shortestlength){
//         shortestPathsArr.push(workingPathsArr[i]);
//       }
//     }
//     return shortestPathsArr;
//   }
// };
