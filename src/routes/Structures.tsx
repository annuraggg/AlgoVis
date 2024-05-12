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

function Sort() {
  const navigate = useNavigate();
  const cardArray: Card[] = [
    {
      name: "Array",
      description: "A collection of elements identified by index or key",
      path: "/data-structures/array",
    },
    {
      name: "Linked List",
      description: "A collection of elements stored in a linear fashion",
      path: "/data-structures/linked-list",
    },
    {
      name: "Stack",
      description: "A collection of elements with LIFO access",
      path: "/data-structures/stack",
    },
    {
      name: "Queue",
      description: "A collection of elements with FIFO access",
      path: "/data-structures/queue",
    },/*
    {
      name: "Hash Table",
      description: "A collection of elements with key-value access",
      path: "/data-structures/hash-table",
    },
    {
      name: "Binary Tree",
      description: "A collection of elements with a hierarchical structure",
      path: "/data-structures/binary-tree",
    },
    {
      name: "Binary Search Tree",
      description: "A collection of elements with a hierarchical structure and a unique root node",
      path: "/data-structures/binary-search-tree",
    },
    {
      name: "Heap",
      description: "A collection of elements stored in a heap data structure",
      path: "/data-structures/heap",
    },
    {
      name: "Graph",
      description: "A collection of elements with a hierarchical structure",
      path: "/data-structures/graph",
    },*/
  ];

  return (
    <>
      <div className="p-10 text-center flex items-center flex-col gap-4">
        <h1 className="text-2xl">Data Structures</h1>

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

export default Sort;
