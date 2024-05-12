import { Button } from "@/components/ui/button";
const Actions = ({
  currentAction,
  setCurrentAction,
  actionActive,
}: {
  currentAction: string;
  setCurrentAction: (action: string) => void;
  actionActive: boolean;
}) => {
  return (
    <div>
      <div className="flex gap-5">
        <Button
          disabled={actionActive}
          onClick={() => setCurrentAction("startNode")}
        >
          Select a Start Node
        </Button>
        <Button
          disabled={actionActive}
          onClick={() => setCurrentAction("endNode")}
        >
          Select an End Node
        </Button>
        <Button
          disabled={actionActive}
          onClick={() => setCurrentAction("walls")}
        >
          Select Walls
        </Button>
        <Button
          disabled={actionActive}
          onClick={() => setCurrentAction("clear")}
        >
          Reset
        </Button>

        <Button disabled={actionActive}>Visualize</Button>
      </div>

      <p className="mt-5 h-1">
        {currentAction === "startNode"
          ? "Select a Start Node"
          : currentAction === "endNode"
          ? "Select an End Node"
          : currentAction === "walls"
          ? "Select Walls"
          : ""}
      </p>
    </div>
  );
};

export default Actions;
