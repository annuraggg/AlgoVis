import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

const SelectionSort = () => {
  const [barWidth, setBarWidth] = useState<number>(window.innerWidth / 10);
  const [barCount, setBarCount] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(10);
  const [array, setArray] = useState<number[]>([]);

  const [minIndex, setMinIndex] = useState<number>(0);
  const [swapIndex, setSwapIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    configBar(4);
  }, []);

  const configBar = (value: number) => {
    setBarWidth(window.innerWidth / 1.5 / value);
    setBarCount(value);
    const array = [];

    if (value < 101) {
      for (let i = 0; i < value; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
      }
    }
    setArray(array);
  };

  const sort = async () => {
    console.log(array);
    const arrayCopy = [...array];

    const swap = (index1: number, index2: number) => {
      const temp = arrayCopy[index1];
      arrayCopy[index1] = arrayCopy[index2];
      arrayCopy[index2] = temp;

      setArray(arrayCopy);
    };

    for (let i = 0; i < arrayCopy.length; i++) {
      let smallestIndex = i;
      setMinIndex(i);
      for (let j = i + 1; j < arrayCopy.length; j++) {
        setCurrentIndex(j);
        await new Promise((resolve) => setTimeout(resolve, speed));
        if (arrayCopy[j] < arrayCopy[smallestIndex]) {
          smallestIndex = j;
          setSwapIndex(j);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, speed));
      swap(i, smallestIndex);
    }

    setArray(arrayCopy);
  };

  return (
    <div className="px-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-5">Selection Sort</h1>
      <div className="flex gap-10 items-center mb-5">
        <Button variant="secondary" onClick={() => configBar(barCount)}>
          Randomize
        </Button>
        <div className="flex items-center">
          <p className="w-[400px]">Number of Bars (Elements)</p>
          <Slider min={4} max={100} onValueChange={(e) => configBar(e[0])} />
          <p></p>
        </div>
        <div className="flex items-center">
          <p className="w-[400px]">Duration (In Milliseconds)</p>
          <Slider min={5} max={200} onValueChange={(e) => setSpeed(e[0])} />
          <p></p>
        </div>
        <Button onClick={sort}>Sort</Button>
      </div>
      <Separator />
      <div className="flex mt-10">
        {array.map((length, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <div
                  key={index}
                  className={`min-w-1 max-w-20  text-black border border-black flex justify-center items-end pb-2 ${
                    index === minIndex
                      ? "bg-red-500"
                      : index === swapIndex
                      ? "bg-green-500"
                      : index === currentIndex
                      ? "bg-blue-500"
                      : "bg-secondary"
                  }`}
                  style={{ height: length * 4 + "px", width: barWidth + "px" }}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{length}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div className="flex justify-between mt-10 w-full">
        <div className="w-[58%]">
          <h1 className="text-xl mb-4">Pseudocode</h1>
          <div className="daisy-mockup-code">
            <pre>
              {" "}
              <code>
                <span>function</span> <span>selectionSort</span>(
                <span>arr</span>) {"{"}
                {"\n"} <span>let</span> n = arr.<span>length</span>;{"\n"}{" "}
                <span>for</span> (<span>let</span> i = 0; i {"<"} n - 1; i++){" "}
                {"{"}
                {"\n"} <span>let</span> minIndex = i;
                {"\n"} <span>for</span> (<span>let</span> j = i + 1; j {"<"} n;
                j++) {"{"}
                {"\n"} <span>if</span> (arr[j] {"<"} arr[minIndex]) {"{"}
                {"\n"} minIndex = j;
                {"\n"} {"}"}
                {"\n"} {"}"}
                {"\n"} [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                {"\n"} {"}"}
                {"\n"} <span>return</span> arr;
                {"\n"} {"}"}
              </code>
            </pre>
          </div>
        </div>
        <div className="w-[40%]">
          <Card>
            <CardHeader>
              <CardTitle>Complexity Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <b>Time Complexity</b>
              </p>
              <p>
                Best Case: O(n<sup>2</sup>)
              </p>
              <p>
                Worst Case: O(n<sup>2</sup>)
              </p>
              <p>
                Average: O(n<sup>2</sup>)
              </p>
              <Separator className="my-5" />
              <p>
                <b>Space Complexity</b>
              </p>
              <p>O(1)</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-5 w-full border p-5 rounded-lg">
        <h1 className="text-lg">Algorithm</h1>
        <ol>
          <li>
            <strong>Input:</strong>
            <ul>
              <li>
                A list of elements <code>arr</code> (with <code>n</code>{" "}
                elements).
              </li>
            </ul>
          </li>
          <br />
          <li>
            <strong>Initialization:</strong>
            <ul>
              <li>
                Set <code>minIndex</code> to the index of the first element
                (usually 0).
              </li>
            </ul>
          </li>
          <br />
          <li>
            <strong>Selection Sort:</strong>
            <ul>
              <li>For each element in the list:</li>
              <ul>
                <li>
                  Set <code>minIndex</code> to the current index.
                </li>
                <li>
                  For each subsequent element, compare it with the element at{" "}
                  <code>minIndex</code>:
                </li>
                <ul>
                  <li>
                    If it is smaller, update <code>minIndex</code> to the new
                    smallest element's index.
                  </li>
                </ul>
                <li>
                  Swap the current element with the element at{" "}
                  <code>minIndex</code>.
                </li>
              </ul>
            </ul>
          </li>
          <br />
          <li>
            <strong>Output:</strong>
            <ul>
              <li>The sorted list.</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="my-5">
        <h1 className="text-lg">Read More: </h1>
        <a
          href="https://www.geeksforgeeks.org/selection-sort/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          GeeksForGeeks
        </a>
      </div>
    </div>
  );
};

export default SelectionSort;
