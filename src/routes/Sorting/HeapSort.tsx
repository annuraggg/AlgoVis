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

const HeapSort = () => {
  const [barWidth, setBarWidth] = useState<number>(window.innerWidth / 10);
  const [barCount, setBarCount] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(10);
  const [array, setArray] = useState<number[]>([]);
  const [currentComparison, setCurrentComparison] = useState<number[]>([]);
  const [currentSwap, setCurrentSwap] = useState<number[]>([]);

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
    setCurrentSwap([]);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const sort = async () => {
    const heapify = async (arr: number[], n: number, i: number) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) {
        setCurrentComparison([left, largest]);
        await delay(speed);
        largest = left;
      }

      if (right < n && arr[right] > arr[largest]) {
        setCurrentComparison([right, largest]);
        await delay(speed);
        largest = right;
      }

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setArray([...arr]);
        setCurrentSwap([i, largest]);
        await delay(speed);
        await heapify(arr, n, largest);
      }
    };

    const heapSort = async (arr: number[]) => {
      const n = arr.length;

      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
      }

      for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        setArray([...arr]);
        setCurrentSwap([0, i]);
        await delay(speed);
        await heapify(arr, i, 0);
      }
    };

    const newArray = [...array];
    await heapSort(newArray);
  };

  return (
    <div className="px-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-5">Heap Sort</h1>
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
                      : currentSwap.includes(index)
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
                <span>function</span> <span>heapSort</span>(<span>arr</span>){" "}
                {"{"}
                {"\n"} {"\t"} <span>let</span> n = arr.length;{"\n"}
                {"\n"} {"\t"} <span>for</span> (<span>let</span> i =
                Math.floor(n / 2) - 1; i {"\u003E="} 0; i--) {"{"}
                {"\n"} {"\t\t"} heapify(arr, n, i);{"\n"} {"\t"} {"}"} {"\n"}
                {"\n"} {"\t"} <span>for</span> (<span>let</span> i = n - 1; i{" "}
                {"\u003E"} 0; i--) {"{"}
                {"\n"} {"\t\t"} [arr[0], arr[i]] = [arr[i], arr[0]];{"\n"}{" "}
                {"\t\t"} heapify(arr, i, 0);{"\n"} {"\t"} {"}"} {"\n"}
                {"}"} {"\n"}
                {"\n"} <span>function</span> <span>heapify</span>(
                <span>arr</span>, <span>n</span>, <span>i</span>) {"{"}
                {"\n"} {"\t"} <span>let</span> largest = i;{"\n"} {"\t"}{" "}
                <span>let</span> left = 2 * i + 1;{"\n"} {"\t"} <span>let</span>{" "}
                right = 2 * i + 2;{"\n"}
                {"\n"} {"\t"} <span>if</span> (left {"\u003C"} n && arr[left]{" "}
                {"\u003E"} arr[largest]) {"{"} {"\n"} {"\t\t"} largest = left;
                {"\n"} {"\t"} {"}"} {"\n"}
                {"\n"} {"\t"} <span>if</span> (right {"\u003C"} n && arr[right]{" "}
                {"\u003E"} arr[largest]) {"{"} {"\n"} {"\t\t"} largest = right;
                {"\n"} {"\t"} {"}"} {"\n"}
                {"\n"} {"\t"} <span>if</span> (largest !== i) {"{"} {"\n"}{" "}
                {"\t\t"} [arr[i], arr[largest]] = [arr[largest], arr[i]];{"\n"}{" "}
                {"\t\t"} heapify(arr, n, largest);{"\n"} {"\t"} {"}"} {"\n"}
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
              <p>Best Case: O(n log n)</p>
              <p>Worst Case: O(n log n)</p>
              <p>Average: O(n log n)</p>
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
              <li>
                A list of elements <code>arr</code> (with <code>n</code>{" "}
                elements).
              </li>
            </ul>
          </li>
          <li>
            <strong>Output:</strong>
            <ul>
              <li>A sorted list of elements in non-decreasing order.</li>
            </ul>
          </li>
          <li>
            <strong>Steps:</strong>
            <ol>
              <li>
                <strong>Heapify the array:</strong>
                <ul>
                  <li>
                    Start from the last non-leaf node, i.e.,{" "}
                    <code>Math.floor(n / 2) - 1</code>, to the root node.
                  </li>
                  <li>
                    Perform heapify operation on each node to ensure that the
                    subtree rooted at that node satisfies the heap property
                    (parent node is greater than its children for max heap).
                  </li>
                </ul>
              </li>
              <li>
                <strong>Extract elements from the heap:</strong>
                <ul>
                  <li>
                    Swap the root (maximum element for max heap) with the last
                    element of the heap and reduce the heap size.
                  </li>
                  <li>
                    Heapify the root element to maintain heap property again.
                  </li>
                  <li>Repeat until the entire array is sorted.</li>
                </ul>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HeapSort;
