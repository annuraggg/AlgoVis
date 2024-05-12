import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type Card = {
  name: string;
  description: string;
  path: string;
};

function Pathfinding() {
  const navigate = useNavigate();
  const cardArray: Card[] = [
    
    {
      name: "Dijkstra's Algorithm",
      description:
        "Dijkstra's Algorithm is a pathfinding algorithm that finds the shortest path between two nodes.",
      path: "/pathfinding/dijkstra",
    },/*
    {
      name: "A* Search Algorithm",
      description:
        "A* Search Algorithm is a pathfinding algorithm that finds the shortest path between two nodes.",
      path: "/pathfinding/a-star",
    },
    {
      name: "Breadth First Search",
      description:
        "Breadth First Search is a pathfinding algorithm that finds the shortest path between two nodes.",
      path: "/pathfinding/bfs",
    },
    {
      name: "Depth First Search",
      description:
        "Depth First Search is a pathfinding algorithm that finds the shortest path between two nodes.",
      path: "/pathfinding/dfs",
    },
    {
      name: "Bellman-Ford Algorithm",
      description:
        "Bellman-Ford Algorithm is a pathfinding algorithm that finds the shortest path between a source node and all other nodes in a weighted graph.",
      path: "/pathfinding/bellman-ford",
    },
    {
      name: "Floyd-Warshall Algorithm",
      description:
        "Floyd-Warshall Algorithm is a pathfinding algorithm that finds the shortest paths between all pairs of vertices in a weighted graph.",
      path: "/pathfinding/floyd-warshall",
    },
    {
      name: "Bidirectional Search",
      description:
        "Bidirectional Search is a pathfinding algorithm that simultaneously performs two breadth-first searches, one starting from the source node and the other starting from the destination node, meeting in the middle.",
      path: "/pathfinding/bidirectional",
    },
    {
      name: "Greedy Best-First Search",
      description:
        "Greedy Best-First Search is a pathfinding algorithm that selects the path which appears to be the best, based on a heuristic evaluation function, at each step.",
      path: "/pathfinding/greedy-best-first",
    },*/
  ];

  interface Card {
    name: string;
    description: string;
    path: string;
  }

  return (
    <>
      <div className="p-10 text-center flex items-center flex-col gap-4">
        <h1 className="text-2xl">Pathfinding Algorithms</h1>

        <div className="flex flex-wrap justify-around p-10 gap-10">
          {cardArray.map((card, index) => (
            <Card key={index} className="w-[400px] mt-10 h-[220px] relative">
              <CardHeader>
                <CardTitle>{card.name}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>

              <CardFooter className=" bottom-0 absolute">
                <Button onClick={() => navigate(card.path)}>Visualize!</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pathfinding;
