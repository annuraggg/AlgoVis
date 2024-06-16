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
      name: "Selection Sort",
      description:
        "An algorithm that sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.",
      path: "/sorting/selection",
    },
    {
      name: "Bubble Sort",
      description:
        "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.",
      path: "/sorting/bubble",
    },
    {
      name: "Insertion Sort",
      description:
        "It is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.",
      path: "/sorting/insertion",
    },
    {
      name: "Merge Sort",
      description:
        "Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
      path: "/sorting/merge",
    },
    {
      name: "Quick Sort",
      description:
        "QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.",
      path: "/sorting/quick",
    },
    {
      name: "Heap Sort",
      description:
        "Heap Sort is a popular and efficient sorting algorithm in computer programming. It is a comparison-based sorting technique and is based on Binary Heap data structure.",
      path: "/sorting/heap",
    },/*
    {
      name: "Radix Sort",
      description:
        "Radix Sort is a sorting algorithm designed to work on items where the key of each item is an ordered set of integers in the range 0 to (N-1) inclusive both ends.",
      path: "/sorting/radix",
    },
    {
      name: "Bucket Sort",
      description:
        "Bucket sort, or bin sort, is a sorting algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm.",
      path: "/sorting/bucket",
    },
    /*

    {
      name: "Tim Sort",
      description:
        "TimSort is a sorting algorithm based on Insertion Sort and Merge Sort. A stable sorting algorithm works in O(n Log n) time",
      path: "/sorting/tim",
    },
    {
      name: "Comb Sort",
      description:
        "Comb Sort always compares adjacent values. So all inversions are removed one by one. Comb Sort improves on Bubble Sort by using gap of size more than 1.",
      path: "/sorting/comb",
    },
    {
      name: "Cocktail Sort",
      description:
        "Cocktail Sort traverses elements from left and moves the largest element to its correct position in first iteration and second largest in second iteration and so on. Traverses through a given array in both directions alternatively.",
      path: "/sorting/cocktail",
    },
    {
      name: "Pancake Sort",
      description:
        "Pancake sorting is the colloquial term for the mathematical problem of sorting a disordered stack of pancakes in order of size when a spatula can be inserted at any point in the stack and used to flip all pancakes above it.",
      path: "/sorting/pancake",
    },
    {
      name: "Bogo Sort",
      description:
        "Bogo Sort is a sorting algorithm that works on the principles of generation and test and is not at all practical for sorting real-life problems.",
      path: "/sorting/bogo",
    },
    {
      name: "Gnome Sort",
      description:
        "Gnome sort is a sorting algorithm which is similar to insertion sort in which we move towards the beginning of the list by swapping adjacent elements which are not in order.",
      path: "/sorting/gnome",
    },
    {
      name: "Sleep Sort",
      description:
        "Sleep Sort is an algorithm that uses sleep() function to sort an array of non negative integers.",
      path: "/sorting/sleep",
    },
    {
      name: "Tree Sort",
      description:
        "Tree sort is a sorting algorithm that is based on Binary Search Tree data structure. It first creates a binary search tree from the elements of the input list or array and then performs an in-order traversal on the created binary search tree to get the elements in sorted order.",
      path: "/sorting/tree",
    },
    {
      name: "Odd-Even Sort",
      description:
        "Odd-Even Sort is divided into two phases- Odd and Even Phase. The algorithm runs until the array elements are sorted and in each iteration two phases occurs- Odd and Even Phases. In the odd phase, we perform a bubble sort on odd indexed elements and vice versa.",
      path: "/sorting/odd-even",
    },
    {
      name: "3 Way Merge Sort",
      description:
        "3 Way Merge Sort is a variation of Merge Sort Algorithm. In 3 Way Merge Sort, an array is divided into 3 parts and the merge function is used for merging these three parts.",
      path: "/sorting/3-way-merge",
    },*/
  ];

  return (
    <>
      <div className="p-10 text-center flex items-center flex-col gap-4">
        <h1 className="text-2xl">Sorting Algorithms</h1>

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
