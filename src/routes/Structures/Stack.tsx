import { useEffect, useMemo, useState } from "react";
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

class StackStruct {
  items: number[];
  constructor() {
    this.items = [];
  }

  push(element: number) {
    this.items.push(element);
  }

  pop() {
    if (this.items.length == 0) return "Underflow";
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}

const Stack = () => {
  const [stack, setStack] = useState<StackStruct>(new StackStruct());
  const [inputVal, setInputVal] = useState<number>(0);

  useEffect(() => {
    console.log(stack);
  }, [stack]);

  const push = (val: number = 0) => {
    if (val === 0) {
      toast.error("Please enter a value");
      return;
    }
    const stackCopy = new StackStruct();
    stackCopy.items = [...stack.items];
    stackCopy.push(val);
    setStack(stackCopy);
    setInputVal(0);
  };

  const pop = () => {
    const stackCopy = new StackStruct();
    stackCopy.items = [...stack.items];
    if (stackCopy.pop() === "Underflow") {
      toast.error("Stack Underflow");
      return;
    }
    setStack(stackCopy);
  };

  return (
    <div className="px-10 flex flex-col items-center justify-center">
      <Toaster />
      <h1 className="text-2xl mb-5">Stack</h1>
      <div className="flex gap-10 items-center mb-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button>Push</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex gap-5">
              <Input
                placeholder="Enter value"
                value={inputVal}
                onChange={(e) => setInputVal(Number(e.target.value))}
              />
              <Button onClick={() => push(inputVal)}>Push</Button>
            </div>
          </PopoverContent>
        </Popover>
        <Button onClick={() => pop()}>Pop</Button>
      </div>
      <Separator />

      <h3 className="mt-5">Last Element: {stack.peek() || "none"}</h3>
      <div className="flex mt-5 h-20 mb-[20vh]">
        <div className="flex px-5 border border-gray-400 border-r-0 items-center">
          {stack.items.length === 0 ? (
            "Stack Empty"
          ) : (
            <>
              {stack.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center h-10 w-10 border border-gray-700 rounded-md"
                >
                  {item}
                </div>
              ))}
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
                <span className="hljs-title class_">StackStruct</span> {"{"}
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
                {"  "}push(element: number) {"{"}
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
                {"  "}pop() {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .items.length =={" "}
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
                .items.pop();{"\n"}
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
                .items[
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .items.length -{" "}
                <span style={{ color: "rgb(209, 154, 102)", fontWeight: 400 }}>
                  1
                </span>
                ];
                {"\n"}
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
              <CardTitle>Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Stack is a linear data structure that follows a particular order
                in which the operations are performed. The order may be
                LIFO(Last In First Out) or FILO(First In Last Out). LIFO implies
                that the element that is inserted last, comes out first and FILO
                implies that the element that is inserted first, comes out last.
                <br />
                <br />
              </p>
              <p>
                There are many real-life examples of a stack. Consider an
                example of plates stacked over one another in the canteen. The
                plate which is at the top is the first one to be removed, i.e.
                the plate which has been placed at the bottommost position
                remains in the stack for the longest period of time. So, it can
                be simply seen to follow LIFO(Last In First Out)/FILO(First In
                Last Out) order.
              </p>
            </CardContent>
          </Card>

          <div className="my-5">
            <h1 className="text-lg">Read More: </h1>
            <a
              href="https://www.geeksforgeeks.org/stack-data-structure/"
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

export default Stack;
