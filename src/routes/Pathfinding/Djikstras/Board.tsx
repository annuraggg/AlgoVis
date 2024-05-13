import { useEffect, useState } from "react";
import Actions from "./Actions";
import Node from "./Node";
import { useHotkeys } from "react-hotkeys-hook";
import preDefinedWalls from "../preDefinedWalls";

const Board = ({
  rows,
  cols,
  visitedNodes,
  setVisitedNodes,
  shortestPath,
  setShortestPath,
  startNode,
  setStartNode,
  endNode,
  setEndNode,
  walls,
  setWalls,
  algorithm,
  visualizationActive,
  delayFactor,
  setDelayFactor,
}: {
  rows: number;
  cols: number;
  visitedNodes: { row: number; col: number }[];
  setVisitedNodes: (
    value: React.SetStateAction<{ row: number; col: number }[]>
  ) => void;
  shortestPath: { row: number; col: number }[];
  setShortestPath: (
    value: React.SetStateAction<{ row: number; col: number }[]>
  ) => void;
  startNode: { row: number; col: number };
  setStartNode: React.Dispatch<
    React.SetStateAction<{ row: number; col: number }>
  >;
  endNode: { row: number; col: number };
  setEndNode: React.Dispatch<
    React.SetStateAction<{ row: number; col: number }>
  >;
  walls: { row: number; col: number }[];
  setWalls: React.Dispatch<
    React.SetStateAction<{ row: number; col: number }[]>
  >;
  algorithm: () => void;
  visualizationActive: boolean;
  delayFactor: number;
  setDelayFactor: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentAction, setCurrentAction] = useState("");
  const [actionActive, setActionActive] = useState(false);

  const [wallActive, setWallActive] = useState(false);
  const [preDefinedWall, setPreDefinedWall] = useState("");

  useEffect(() => {
    if (visualizationActive) {
      setCurrentAction("visualize");
      setActionActive(true);
    } else {
      setCurrentAction("");
      setActionActive(false);
    }
  }, [visualizationActive]);

  useEffect(() => {
    if (preDefinedWall !== "") {
      setWalls(
        preDefinedWalls.find((wall) => wall.name === preDefinedWall)?.walls ||
          []
      );
    }
  }, [preDefinedWall, setWalls]);

  useHotkeys("w", () => {
    if (currentAction === "walls") {
      setWallActive((prev) => !prev);
    }
  });

  useHotkeys("r", () => {
    setCurrentAction("removeWall");
  });

  useEffect(() => {
    if (currentAction === "clear") {
      setStartNode({ row: 6, col: 5 });
      setEndNode({ row: 6, col: 40 });
      setVisitedNodes([]);
      setShortestPath([]);
      setWalls([]);
      return;
    }

    if (currentAction === "visualize") {
      setVisitedNodes([]);
      setShortestPath([]);
      algorithm();
      return;
    }

    if (currentAction !== "") setActionActive(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAction, setEndNode, setStartNode, setWalls]);

  const doAction = (row: number, col: number) => {
    if (currentAction === "startNode") setStartNode({ row, col });
    if (currentAction === "endNode") setEndNode({ row, col });
    if (currentAction === "removeWall") {
      if (wallActive) {
        setWallActive(false);
      } else {
        setWalls((prev) =>
          prev.filter((wall) => wall.row !== row || wall.col !== col)
        );
        setWallActive(true);
        return;
      }
    }
    if (currentAction === "walls") {
      if (wallActive) {
        setWallActive(false);
      } else {
        setWalls((prev) => [...prev, { row, col }]);
        setWallActive(true);
        return;
      }
    }

    setCurrentAction("");
    setActionActive(false);
  };

  return (
    <div className="p-10">
      <Actions
        currentAction={currentAction}
        setCurrentAction={setCurrentAction}
        actionActive={actionActive}
        setWall={setPreDefinedWall}
        delayFactor={delayFactor}
        setDelayFactor={setDelayFactor}
      />

      <div className="flex flex-col mt-10">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex">
            {Array.from({ length: cols }).map((_, j) => (
              <div
                onClick={() => doAction(i, j)}
                onMouseOver={() => {
                  if (currentAction === "walls" && wallActive) {
                    setWalls((prev) => [...prev, { row: i, col: j }]);
                  } else if (currentAction === "removeWall" && wallActive) {
                    setWalls((prev) =>
                      prev.filter((wall) => wall.row !== i || wall.col !== j)
                    );
                  }
                }}
              >
                <Node
                  key={j}
                  color={
                    startNode.row === i && startNode.col === j
                      ? "red"
                      : endNode.row === i && endNode.col === j
                      ? "green"
                      : walls.some((wall) => wall.row === i && wall.col === j)
                      ? "gray"
                      : shortestPath.some((n) => n.row === i && n.col === j)
                      ? "yellow"
                      : visitedNodes.some((n) => n.row === i && n.col === j)
                      ? "blue"
                      : ""
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
