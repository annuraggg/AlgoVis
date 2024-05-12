import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaArrowLeft } from "react-icons/fa";

class QueueStruct {
  items: number[];
  constructor() {
    this.items = [];
  }

  enqueue(element: number) {
    this.items.push(element);
  }

  dequeue() {
    if (this.items.length === 0) return "Underflow";
    return this.items.shift();
  }

  peek() {
    return this.items.length > 0 ? this.items[0] : null;
  }
}

const Queue = () => {
  const [queue, setQueue] = useState<QueueStruct>(new QueueStruct());
  const [inputVal, setInputVal] = useState<number>(0);

  const enqueue = (val: number = 0) => {
    if (val === 0) {
      toast.error("Please enter a value");
      return;
    }
    const queueCopy = new QueueStruct();
    queueCopy.items = [...queue.items];
    queueCopy.enqueue(val);
    setQueue(queueCopy);
    setInputVal(0);
  };

  const dequeue = () => {
    const queueCopy = new QueueStruct();
    queueCopy.items = [...queue.items];
    if (queueCopy.dequeue() === "Underflow") {
      toast.error("Queue Underflow");
      return;
    }
    setQueue(queueCopy);
  };

  return (
    <div className="px-10 flex flex-col items-center justify-center">
      <Toaster />
      <h1 className="text-2xl mb-5">Queue</h1>
      <div className="flex gap-10 items-center mb-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button>Enqueue</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex gap-5">
              <Input
                placeholder="Enter value"
                value={inputVal}
                onChange={(e) => setInputVal(Number(e.target.value))}
              />
              <Button onClick={() => enqueue(inputVal)}>Enqueue</Button>
            </div>
          </PopoverContent>
        </Popover>
        <Button onClick={() => dequeue()}>Dequeue</Button>
      </div>
      <Separator />

      <h3 className="mt-5">First Element: {queue.peek() || "none"}</h3>
      <div className="flex mt-5 h-20 mb-[20vh]">
        <div className="flex px-5 border border-gray-400 border-l-0 border-r-0 items-center">
          {queue.items.length === 0 ? (
            "Queue Empty"
          ) : (
            <>
              <FaArrowLeft size={20} className="mr-5" />
              {queue.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center h-10 w-10 border border-gray-700 rounded-md"
                >
                  {item}
                </div>
              ))}
              <FaArrowLeft size={20} className="ml-5" />
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between ">
        <div className=" w-[58%] h-full mb-5">
          <h1 className="text-xl mb-4">Pseudocode</h1>
          <div className="daisy-mockup-code">
            <pre>
              {" "}
              <code
                id="htmlViewer"
                style={{
                  color: "rgb(171, 178, 191)",
                  fontWeight: 400,
                  display: "block",
                  padding: "0em 2em",
                }}
              >
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  class
                </span>{" "}
                <span className="hljs-title class_">QueueStruct</span> {"{"}
                {"\n"}
                {"  "}items: number[];{"\n"}
                {"  "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  constructor
                </span>
                () {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .items = [];{"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}enqueue(element: number) {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .items.push(element);{"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}dequeue() {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .items.length ==={" "}
                <span style={{ color: "rgb(209, 154, 102)", fontWeight: 400 }}>
                  0
                </span>
                ){" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  return
                </span>{" "}
                <span style={{ color: "rgb(152, 195, 121)", fontWeight: 400 }}>
                  "Underflow"
                </span>
                ;{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  return
                </span>{" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .items.shift();{"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}peek() {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  return
                </span>{" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .items[0];{"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"}"}
              </code>
            </pre>
          </div>
        </div>
        <div className=" w-[40%] h-full mb-5">
          <Card>
            <CardHeader>
              <CardTitle>Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                A queue is a linear data structure that follows a particular
                order in which the operations are performed. The order is FIFO
                (First In First Out). A good example of a queue is any queue of
                consumers for a resource where the consumer that came first is
                served first.
                <br />
                <br />
              </p>
              <p>
                For example, consider the typical queue at a ticket counter. The
                person who comes first gets the ticket first, and the person who
                comes last gets the ticket last.
              </p>
            </CardContent>
          </Card>

          <div className="my-5">
            <h1 className="text-lg">Read More: </h1>
            <a
              href="https://www.geeksforgeeks.org/queue-data-structure/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              GeeksForGeeks
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
