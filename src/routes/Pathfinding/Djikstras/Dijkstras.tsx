import { useState } from "react";
import Board from "./Board";

interface Node {
  row: number;
  col: number;
  distance: number;
  visited: boolean;
  previous: Node | null;
}

const Dijkstras = () => {
  const [walls, setWalls] = useState<{ row: number; col: number }[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<
    { row: number; col: number }[]
  >([]);
  const [shortestPath, setShortestPath] = useState<
    { row: number; col: number }[]
  >([]);

  const [startNode, setStartNode] = useState<{ row: number; col: number }>({
    row: 6,
    col: 5,
  });
  const [endNode, setEndNode] = useState<{ row: number; col: number }>({
    row: 6,
    col: 40,
  });
  const [visualizationActive, setVisualizationActive] = useState(false);

  const [delayFactor, setDelayFactor] = useState(1);
  const delay = () => new Promise((res) => setTimeout(res, delayFactor));

  const rows = 15;
  const cols = 50;


  const dijkstra = async () => {
    setVisualizationActive(true);
    const grid: Node[][] = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          row: i,
          col: j,
          distance: Infinity,
          visited: false,
          previous: null,
        });
      }
      grid.push(row);
    }

    grid[startNode.row][startNode.col].distance = 0;
    const unvisitedNodes = grid.flat();

    while (unvisitedNodes.length > 0) {
      unvisitedNodes.sort((a, b) => a.distance - b.distance);
      const closestNode = unvisitedNodes.shift();

      if (closestNode === undefined) break;

      if (closestNode.distance === Infinity) break;

      closestNode.visited = true;
      setVisitedNodes((prevVisited) => [
        ...prevVisited,
        { row: closestNode.row, col: closestNode.col },
      ]);
      await delay();

      if (closestNode === grid[endNode.row][endNode.col]) break;

      const neighbors = getNeighbors(closestNode, grid);

      for (const neighbor of neighbors) {
        if (
          !neighbor.visited &&
          !walls.some(
            (wall) => wall.row === neighbor.row && wall.col === neighbor.col
          )
        ) {
          const distance = closestNode.distance + 1;
          if (distance < neighbor.distance) {
            neighbor.distance = distance;
            neighbor.previous = closestNode;
          }
        }
      }
    }

    let currentNode = grid[endNode.row][endNode.col];
    const path = [];
    while (currentNode !== null) {
      path.unshift(currentNode);
      if (currentNode.previous === null) break;
      currentNode = currentNode.previous;
    }
    animatePath(path);
  };

  const animatePath = async (path: Node[]) => {
    for (const node of path) {
      setShortestPath((prevPath) => [
        ...prevPath,
        { row: node.row, col: node.col },
      ]);
      await delay();
    }

    setVisualizationActive(false);
  };

  const getNeighbors = (node: Node, grid: Node[][]) => {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < rows - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < cols - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
  };

/*const getWall = () => {
    document.write(JSON.stringify(walls));
  };*/

  return (
    <div className="flex items-center justify-center">
      {/*      <button onClick={getWall}>get wall</button>*/}
      <Board
        visualizationActive={visualizationActive}
        rows={rows}
        cols={cols}
        startNode={startNode}
        endNode={endNode}
        walls={walls}
        visitedNodes={visitedNodes}
        setVisitedNodes={setVisitedNodes}
        shortestPath={shortestPath}
        setShortestPath={setShortestPath}
        setStartNode={setStartNode}
        setEndNode={setEndNode}
        setWalls={setWalls}
        algorithm={dijkstra}
        delayFactor={delayFactor}
        setDelayFactor={setDelayFactor}
      />
    </div>
  );
};

export default Dijkstras;
