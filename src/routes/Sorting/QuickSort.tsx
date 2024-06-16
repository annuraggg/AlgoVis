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

const QuickSort = () => {
  const [barWidth, setBarWidth] = useState<number>(window.innerWidth / 10);
  const [barCount, setBarCount] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(10);
  const [array, setArray] = useState<number[]>([]);
  const [currentComparison, setCurrentComparison] = useState<number[]>([]);
  const [currentPivot, setCurrentPivot] = useState<number | null>(null);

  useEffect(() => {
    configBar(4);
  }, []);

  const configBar = (value: number) => {
    setBarWidth(window.innerWidth / 1.5 / value);
    setBarCount(value);
    const newArray = [];

    if (value < 101) {
      for (let i = 0; i < value; i++) {
        newArray.push(Math.floor(Math.random() * 100) + 1);
      }
    }
    setArray(newArray);
    setCurrentComparison([]);
    setCurrentPivot(null);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const sort = async () => {
    const quickSort = async (
      array: number[],
      low: number,
      high: number
    ): Promise<void> => {
      if (low < high) {
        const pivotIndex = await partition(array, low, high);
        await Promise.all([
          quickSort(array, low, pivotIndex - 1),
          quickSort(array, pivotIndex + 1, high),
        ]);
      }
    };

    const partition = async (
      array: number[],
      low: number,
      high: number
    ): Promise<number> => {
      const pivot = array[high];
      setCurrentPivot(high);

      let i = low;
      for (let j = low; j < high; j++) {
        setCurrentComparison([j, i]);
        await delay(speed);

        if (array[j] < pivot) {
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;

          setArray([...array]);
          i++;
        }
      }

      const temp = array[i];
      array[i] = array[high];
      array[high] = temp;

      setArray([...array]);
      setCurrentComparison([]);
      setCurrentPivot(null);

      return i;
    };

    const newArray = [...array];
    await quickSort(newArray, 0, newArray.length - 1);
  };

  return (
    <div className="px-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-5">Quick Sort</h1>
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
                  className={`min-w-1 max-w-20 text-white border border-black flex justify-center items-end pb-2 ${
                    currentComparison.includes(index)
                      ? "bg-blue-500"
                      : index === currentPivot
                      ? "bg-red-500"
                      : "bg-accent"
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
                <span>function</span> <span>quickSort</span>(<span>arr</span>, <span>low</span>, <span>high</span>) {"{"}
                {"\n"} <span>if</span> (low {"<"} high) {"{"} {"\n"}
                {"\t"} <span>let</span> pivotIndex = partition(arr, low, high);{"\n"}
                {"\t"} quickSort(arr, low, pivotIndex - 1);{"\n"}
                {"\t"} quickSort(arr, pivotIndex + 1, high);{"\n"}
                {"}"} {"\n"}
                {"}"} {"\n"}
                {"\n"} <span>function</span> <span>partition</span>(<span>arr</span>, <span>low</span>, <span>high</span>) {"{"} {"\n"}
                {"\t"} <span>let</span> pivot = arr[high];{"\n"}
                {"\t"} <span>let</span> i = low;{"\n"}
                {"\n"} {"\t"} <span>for</span> (<span>let</span> j = low; j {"<"} high; j++) {"{"} {"\n"}
                {"\t\t"} <span>if</span> (arr[j] {"<"} pivot) {"{"} {"\n"}
                {"\t\t\t"} [arr[i], arr[j]] = [arr[j], arr[i]];{"\n"}
                {"\t\t\t"} i++;{"\n"}
                {"\t\t"} {"}"} {"\n"}
                {"\t"} {"}"} {"\n"}
                {"\t"} [arr[i], arr[high]] = [arr[high], arr[i]];{"\n"}
                {"\t"} <span>return</span> i;{"\n"}
                {"}"}
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
                Best Case: O(n log n)
              </p>
              <p>
                Worst Case: O(n^2)
              </p>
              <p>
                Average: O(n log n)
              </p>
              <Separator className="my-5" />
              <p>
                <b>Space Complexity</b>
              </p>
              <p>O(log n)</p>
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
              <li>Choose a pivot element from the list.</li>
            </ul>
          </li>
          <br />
          <li>
            <strong>Partition:</strong>
            <ul>
              <li>
                Reorder the list so that elements less than the pivot are on the
                left, elements greater than the pivot are on the right.
              </li>
              <li>Return the pivot index.</li>
            </ul>
          </li>
          <br />
          <li>
            <strong>Quick Sort:</strong>
            <ul>
              <li>Recursively apply the above steps to the sub-lists.</li>
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
          href="https://www.geeksforgeeks.org/quick-sort/"
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

export default QuickSort;
