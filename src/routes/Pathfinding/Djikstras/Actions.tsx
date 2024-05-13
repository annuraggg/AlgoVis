import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import preDefinedWalls from "../preDefinedWalls";
import { SelectValue } from "@radix-ui/react-select";

const Actions = ({
  currentAction,
  setCurrentAction,
  actionActive,
  setWall,
}: {
  currentAction: string;
  setCurrentAction: (action: string) => void;
  actionActive: boolean;
  setWall: (name: string) => void;
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
          Add Walls
        </Button>
        <Button
          disabled={actionActive}
          onClick={() => setCurrentAction("removeWall")}
        >
          Remove Wall
        </Button>
        <Button
          disabled={actionActive}
          onClick={() => setCurrentAction("clear")}
        >
          Reset
        </Button>

        <Select onValueChange={setWall}>
          <SelectTrigger className="w-[300px]" disabled={actionActive}>
            <SelectValue placeholder="Select a Wall" />
          </SelectTrigger>
          <SelectContent>
            {preDefinedWalls.map((wall, i) => (
              <SelectItem key={i} value={wall.name}>
                {wall.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          disabled={actionActive}
          onClick={() => setCurrentAction("visualize")}
        >
          Visualize
        </Button>
      </div>

      <p className="mt-5 h-1">
        {currentAction === "startNode"
          ? "Select a Start Node"
          : currentAction === "endNode"
          ? "Select an End Node"
          : currentAction === "walls"
          ? "Click on a node and then hover to add walls. Click again to stop adding walls. You can also use the hotkey 'w' to add walls."
          : ""}
      </p>
    </div>
  );
};

export default Actions;
