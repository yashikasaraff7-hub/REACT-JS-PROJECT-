// Breadth First Search finds the shortest route through audit checkpoints.
export function findShortestPath(graph, start, end) {
  if (!start || !end || !graph[start] || !graph[end]) {
    return [];
  }

  const queue = [[start]];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const path = queue.shift();
    const currentCheckpoint = path[path.length - 1];

    if (currentCheckpoint === end) {
      return path;
    }

    graph[currentCheckpoint].forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    });
  }

  return [];
}
