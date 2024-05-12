import { useEffect, useState } from "react";
import Actions from "./Actions";
import Node from "./Node";

const Board = () => {
  const rows = 10;
  const cols = 25;

  const [currentAction, setCurrentAction] = useState("");
  const [actionActive, setActionActive] = useState(false);

  const [startNode, setStartNode] = useState<{ row: number; col: number }>({
    row: 4,
    col: 5,
  });
  const [endNode, setEndNode] = useState<{ row: number; col: number }>({
    row: 4,
    col: 20,
  });
  const [walls, setWalls] = useState<{ row: number; col: number }[]>([]);

  useEffect(() => {
    if (currentAction === "clear") {
      setStartNode({ row: 4, col: 5 });
      setEndNode({ row: 4, col: 20 });
      setWalls([]);
      return;
    }
    if (currentAction !== "") setActionActive(true);
  }, [currentAction]);

  const doAction = (row: number, col: number) => {
    if (currentAction === "startNode") setStartNode({ row, col });
    if (currentAction === "endNode") setEndNode({ row, col });
    if (currentAction === "walls") setWalls([...walls, { row, col }]);

    setCurrentAction("");
    setActionActive(false);
  };

  return (
    <div className="p-10">
      <Actions
        currentAction={currentAction}
        setCurrentAction={setCurrentAction}
        actionActive={actionActive}
      />

      <div className="flex flex-col mt-10">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex">
            {Array.from({ length: cols }).map((_, j) => (
              <div
                onClick={() => doAction(i, j)}
                // Case if user clicks and drags to create walls
                onDragEnter={() => {
                  if (currentAction === "walls")
                    setWalls([...walls, { row: i, col: j }]);
                }}
                onDragEnd={
                  currentAction === "walls"
                    ? () => {
                        setCurrentAction("");
                        setActionActive(false);
                      }
                    : undefined
                }
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
