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

const MergeSort = () => {
  const [barWidth, setBarWidth] = useState<number>(window.innerWidth / 10);
  const [barCount, setBarCount] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(10);
  const [array, setArray] = useState<number[]>([]);
  const [currentComparison, setCurrentComparison] = useState<number[]>([]);
  const [currentMerge, setCurrentMerge] = useState<number[]>([]);

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
    setCurrentMerge([]);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const sort = async () => {
    const mergeSort = async (arr: number[], left: number, right: number) => {
      if (left >= right) {
        return;
      }

      const mid = Math.floor((left + right) / 2);
      setCurrentComparison([mid]);
      await delay(speed);

      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    };

    const merge = async (
      arr: number[],
      left: number,
      mid: number,
      right: number
    ) => {
      const leftLen = mid - left + 1;
      const rightLen = right - mid;

      const array1 = [];
      const array2 = [];

      for (let i = 0; i < leftLen; i++) {
        array1[i] = arr[left + i];
      }

      for (let i = 0; i < rightLen; i++) {
        array2[i] = arr[mid + 1 + i];
      }

      let i = 0;
      let j = 0;
      let k = left;

      while (i < leftLen && j < rightLen) {
        if (array1[i] <= array2[j]) {
          arr[k] = array1[i];
          setCurrentMerge([k]);
          setArray([...arr]); // Update array state
          i++;
          await delay(speed);
        } else {
          arr[k] = array2[j];
          setCurrentMerge([k]);
          setArray([...arr]); // Update array state
          j++;
          await delay(speed);
        }
        k++;
      }

      while (i < leftLen) {
        arr[k] = array1[i];
        setCurrentMerge([k]);
        setArray([...arr]); // Update array state
        i++;
        k++;
        await delay(speed);
      }

      while (j < rightLen) {
        arr[k] = array2[j];
        setCurrentMerge([k]);
        setArray([...arr]); // Update array state
        j++;
        k++;
        await delay(speed);
      }
    };

    const arr = [...array];
    const length = arr.length;
    await mergeSort(arr, 0, length - 1);
    setCurrentComparison([]);
    setCurrentMerge([]);
  };

  return (
    <div className="px-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-5">Merge Sort</h1>
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
                  className={`min-w-1 max-w-20 text-black border border-black flex justify-center items-end pb-2 ${
                    currentComparison.includes(index)
                      ? "bg-blue-500"
                      : currentMerge.includes(index)
                      ? "bg-green-500"
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
                <span>function</span> <span>mergeSort</span>(
                <span>arr</span>, <span>left</span>, <span>right</span>) {"{"}
                {"\n"} <span>if</span> (left {"<"} right) {"{"} {"\n"}
                {"\t"} <span>let</span> mid = <span>Math</span>.
                <span>floor</span>((left + right) / 2);{"\n"}
                {"\t"} mergeSort(arr, left, mid);{"\n"}
                {"\t"} mergeSort(arr, mid + 1, right);{"\n"}
                {"\t"} merge(arr, left, mid, right);{"\n"} {"}"} {"\n"}
                {"}"} {"\n"}
                {"\n"} <span>function</span> <span>merge</span>(
                <span>arr</span>, <span>left</span>, <span>mid</span>,{" "}
                <span>right</span>) {"{"} {"\n"}
                {"\t"} <span>let</span> leftLen = mid - left + 1;{"\n"}
                {"\t"} <span>let</span> rightLen = right - mid;{"\n"}
                {"\n"} {"\t"} <span>let</span> array1 = [], array2 = [];{"\n"}
                {"\n"} {"\t"} <span>for</span> (<span>let</span> i = 0; i{" "}
                {"<"} leftLen; i++) array1[i] = arr[left + i];{"\n"}
                {"\t"} <span>for</span> (<span>let</span> i = 0; i{" "}
                {"<"} rightLen; i++) array2[i] = arr[mid + 1 + i];{"\n"}
                {"\n"} {"\t"} <span>let</span> i = 0, j = 0, k = left;{"\n"}
                {"\n"} {"\t"} <span>while</span> (i {"<"} leftLen && j{" "}
                {"<"} rightLen) {"{"} {"\n"}
                {"\t\t"} <span>if</span> (array1[i] {"<="} array2[j]) {"{"}{" "}
                {"\n"}
                {"\t\t\t"} arr[k++] = array1[i++]; {"\n"} {"\t\t"} {"}"} {"\n"}
                {"\t\t"} <span>else</span> {"{"} {"\n"}
                {"\t\t\t"} arr[k++] = array2[j++]; {"\n"} {"\t\t"} {"}"} {"\n"}
                {"\t"} {"}"} {"\n"} {"\n"}
                {"\t"} <span>while</span> (i {"<"} leftLen) arr[k++] = array1[i++];{"\n"}
                {"\t"} <span>while</span> (j {"<"} rightLen) arr[k++] = array2[j++];{"\n"}
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
                Worst Case: O(n log n)
              </p>
              <p>
                Average: O(n log n)
              </p>
              <Separator className="my-5" />
              <p>
                <b>Space Complexity</b>
              </p>
              <p>O(n)</p>
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
                If the list has only one element, return it.
              </li>
              <li>
                Else, divide the list into two halves.
              </li>
            </ul>
          </li>
          <br />
          <li>
            <strong>Merge Sort:</strong>
            <ul>
              <li>Recursively sort each half.</li>
              <li>Merge the two sorted halves into one sorted list.</li>
            </ul>
          </li>
          <br />
          <li>
            <strong>Merge:</strong>
            <ul>
              <li>Compare the elements of both halves one by one.</li>
              <li>Insert the smaller element into the result list.</li>
              <li>Repeat the process until all elements from both halves are compared and inserted.</li>
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
          href="https://www.geeksforgeeks.org/merge-sort/"
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

export default MergeSort;
