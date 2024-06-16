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

const InsertionSort = () => {
  const [barWidth, setBarWidth] = useState<number>(window.innerWidth / 10);
  const [barCount, setBarCount] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(10);
  const [array, setArray] = useState<number[]>([]);

  const [key, setKey] = useState<number>(0);
  const [prev, setPrev] = useState<number>(0);

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
    let i, j, key;
    const tempArray = [...array];

    for (i = 1; i < tempArray.length; i++) {
      key = tempArray[i];
      j = i - 1;

      setKey(i);
      setPrev(j);
      await new Promise((r) => setTimeout(r, speed));

      while (j >= 0 && tempArray[j] > key) {
        tempArray[j + 1] = tempArray[j];
        j--;
        setArray(tempArray);
        setPrev(j);
        await new Promise((r) => setTimeout(r, 100));
      }
      tempArray[j + 1] = key;
      setArray(tempArray);
      await new Promise((r) => setTimeout(r, speed));
    }

    setArray(tempArray);
  };

  return (
    <div className="px-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-5">Insertion Sort</h1>
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
          <Slider min={5} max={1000} onValueChange={(e) => setSpeed(e[0])} />
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
                  className={`min-w-1 max-w-20 text-black border border-black flex justify-center items-end pb-2
                  ${
                    index === key
                      ? "bg-green-500"
                      : index === prev
                      ? "bg-red-500"
                      : "bg-accent"
                  }
                  `}
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
                <span>function</span> <span>insertionSort</span>(
                <span>arr</span>) {"{"}
                {"\n"} <span>let</span> n = arr.<span>length</span>;{"\n"}{" "}
                <span>for</span> (<span>let</span> i = 1; i {"<"} n; i++) {"{"}
                {"\n"} <span>let</span> key = arr[i];{"\n"} <span>let</span> j =
                i - 1;{"\n"}{" "}
                <span>while</span> (j {">="} 0 && arr[j] {">"} key) {"{"}{"\n"}{" "}
                arr[j + 1] = arr[j];{"\n"} j = j - 1;{"\n"} {"}"}{"\n"} arr[j +
                1] = key;{"\n"} {"}"}{"\n"} <span>return</span> arr;{"\n"} {"}"}
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
                Best Case: O(n)
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
                Start from the second element (index 1), assume the first element is sorted.
              </li>
            </ul>
          </li>
          <br />
          <li>
            <strong>Insertion Sort:</strong>
            <ul>
              <li>For each element from the second to the last:</li>
              <ul>
                <li>
                  Set <code>key</code> to the current element.
                </li>
                <li>
                  Compare the current element (<code>key</code>) with the elements before it.
                </li>
                <li>
                  Shift all elements that are greater than <code>key</code> to one position to their right.
                </li>
                <li>
                  Place <code>key</code> in its correct position.
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
          href="https://www.geeksforgeeks.org/insertion-sort/"
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

export default InsertionSort;
