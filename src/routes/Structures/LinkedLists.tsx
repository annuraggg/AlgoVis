import { useEffect, useState } from "react";
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

class Node {
  value: number;
  next: Node | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  insertAtBeginning(value: number) {
    if (Number.isNaN(value)) return toast.error("Please enter a valid number");
    const newNode = new Node(value);
    if (!this.head) {
      console.log(this.head);
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else {
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
    }
  }

  insertAfter(value: number, after: number) {
    if (Number.isNaN(value)) return toast.error("Please enter a valid number");
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else {
      let currentNode = this.head;
      while (currentNode?.value !== after && currentNode?.next) {
        // @ts-ignore
        currentNode = currentNode?.next;
      }
      if (!currentNode?.next) {
        toast.error("Value not found");
      } else {
        newNode.next = currentNode?.next;
        currentNode!.next = newNode;
        this.length++;
      }
    }
  }

  insertAtEnd(value: number) {
    if (Number.isNaN(value)) return toast.error("Please enter a valid number");
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
      this.length++;
    }
  }

  deleteAtBeginning() {
    if (!this.head) {
      toast.error("List is empty");
    } else {
      this.head = this.head?.next;
      this.length--;
    }
  }

  deleteNode(value: number) {
    if (!this.head) {
      toast.error("List is empty");
    } else {
      let currentNode = this.head;
      while (currentNode?.next?.value !== value && currentNode?.next) {
        // @ts-ignore
        currentNode = currentNode?.next;
      }
      if (!currentNode?.next) {
        toast.error("Value not found");
      } else {
        currentNode!.next = currentNode?.next?.next;
        this.length--;
      }
    }
  }

  deleteAtEnd() {
    if (!this.head) {
      toast.error("List is empty");
    } else {
      let currentNode = this.head;
      let nextNode = this.head?.next;
      while (nextNode?.next) {
        currentNode = nextNode;
        nextNode = nextNode.next;
      }
      console.log(currentNode);
      console.log(nextNode);
      currentNode!.next = null;
      this.tail = currentNode;
      this.length--;
    }
  }

  getAt(index: number) {
    let counter = 0;
    let currentNode = this.head;
    while (counter < index) {
      // @ts-ignore
      currentNode = currentNode?.next;
      counter++;
    }
    return currentNode;
  }

  map() {
    let currentNode = this.head;
    let list = [];
    while (currentNode) {
      list.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return list;
  }
}

const NodeComponent = ({ value, next }: { value: number; next: boolean }) => {
  return (
    <div className="flex items-center justify-center">
      <span className="w-20 h-20 border rounded-md flex items-center justify-center">
        {value}
      </span>
      {next && (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ width: "30px", height: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

const LL = new LinkedList();
LL.insertAtEnd(1);
LL.insertAtEnd(2);
LL.insertAtEnd(3);
LL.insertAtEnd(4);
LL.insertAtEnd(5);
LL.insertAtEnd(6);

const LinkedLists = () => {
  const [list, setList] = useState<LinkedList>(LL);

  const updateList = () => {
    const newList = new LinkedList();
    newList.head = LL.head;
    newList.tail = LL.tail;
    newList.length = LL.length;
    setList(newList);

    setInsertAfterInputRef("");
    setInsertInputRef("");
    setDeleteInputRef("");
  };

  const [insertInputRef, setInsertInputRef] = useState<string>("");
  const [deleteInputRef, setDeleteInputRef] = useState<string>("");

  const [insertAfterInputRef, setInsertAfterInputRef] = useState<string>("");

  return (
    <div className="px-10 flex flex-col items-center justify-center">
      <Toaster />
      <h1 className="text-2xl mb-5">Linked Lists</h1>
      <div className="flex gap-10 items-center mb-5">
        <Input
          placeholder="Enter a number to Insert"
          type="number"
          value={insertInputRef}
          onChange={(e) => setInsertInputRef(e.target.value)}
        />
        <Button
          onClick={() => {
            LL.insertAtBeginning(parseInt(insertInputRef));
            updateList();
          }}
        >
          Insert at Beginning
        </Button>
        <Popover>
          <PopoverTrigger>
            <Button>Insert After</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Input
              placeholder="Enter a number to Insert After"
              value={insertAfterInputRef}
              type="number"
              onChange={(e) => setInsertAfterInputRef(e.target.value)}
            />
            <Button
              onClick={() => {
                LL.insertAfter(
                  parseInt(insertInputRef),
                  parseInt(insertAfterInputRef)
                );
                updateList();
              }}
              className="mt-3"
            >
              Insert After
            </Button>
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => {
            LL.insertAtEnd(parseInt(insertInputRef));
            updateList();
          }}
        >
          Insert at End
        </Button>

        <div className="bg-gray-500 w-1 h-8"></div>

        <Popover>
          <PopoverTrigger>
            <Button>Delete</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Input
              placeholder="Enter a number to Delete"
              type="number"
              value={deleteInputRef}
              onChange={(e) => setDeleteInputRef(e.target.value)}
            />
            <Button
              onClick={() => {
                LL.deleteNode(parseInt(deleteInputRef));
                updateList();
              }}
              className="mt-3"
            >
              Delete
            </Button>
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => {
            LL.deleteAtBeginning();
            updateList();
          }}
        >
          Delete at Beginning
        </Button>
        <Button
          onClick={() => {
            LL.deleteAtEnd();
            updateList();
          }}
        >
          Delete at End
        </Button>
      </div>
      <Separator />
      <p className="mt-5">Linked List Length: {list.length}</p>
      <p>Head: {list.head?.value}</p>
      <p>Tail: {list.tail?.value}</p>
      <div className="flex mt-5 h-20 mb-[20vh]">
        {list.map().map((item, index) => (
          <NodeComponent
            key={index}
            value={item}
            next={index !== list.map().length - 1}
          />
        ))}
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
                  display: "block",
                  overflowX: "auto",
                  padding: "1em 2em",
                  color: "rgb(214, 222, 235)",
                  borderRadius: "5px",
                  fontSize: "1em",
                  lineHeight: "1.5",
                  fontFamily:
                    "Menlo, Monaco, Consolas, 'Courier New', monospace"
                }}
              >
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  class
                </span>{" "}
                <span className="hljs-title class_">Node</span> {"{"}
                {"\n"}
                {"  "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  constructor
                </span>
                (value) {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .value = value;{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .next ={" "}
                <span style={{ color: "rgb(86, 182, 194)", fontWeight: 400 }}>
                  null
                </span>
                ;{"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"}"}
                {"\n"}
                {"\n"}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  class
                </span>{" "}
                <span className="hljs-title class_">LinkedList</span> {"{"}
                {"\n"}
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
                .head ={" "}
                <span style={{ color: "rgb(86, 182, 194)", fontWeight: 400 }}>
                  null
                </span>
                ;{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .tail ={" "}
                <span style={{ color: "rgb(86, 182, 194)", fontWeight: 400 }}>
                  null
                </span>
                ;{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .length ={" "}
                <span style={{ color: "rgb(209, 154, 102)", fontWeight: 400 }}>
                  0
                </span>
                ;{"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}insertAtBeginning(value) {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (isNaN(value)){" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  return
                </span>
                ;{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  const
                </span>{" "}
                newNode = new Node(value);{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (!
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head) {"{"}
                {"\n"}
                {"      "}console.log(
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head);{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head = newNode;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .tail = newNode;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .length++;{"\n"}
                {"    "}
                {"}"}{" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  else
                </span>{" "}
                {"{"}
                {"\n"}
                {"      "}newNode.next ={" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head = newNode;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .length++;{"\n"}
                {"    "}
                {"}"}
                {"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}insertAfter(value, after) {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (isNaN(value)){" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  return
                </span>{" "}
                console.log(
                <span style={{ color: "rgb(152, 195, 121)", fontWeight: 400 }}>
                  "Please enter a valid number"
                </span>
                );{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  const
                </span>{" "}
                newNode = new Node(value);{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (!
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head) {"{"}
                {"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head = newNode;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .tail = newNode;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .length++;{"\n"}
                {"    "}
                {"}"}{" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  else
                </span>{" "}
                {"{"}
                {"\n"}
                {"      "}let currentNode ={" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  while
                </span>{" "}
                (currentNode?.value !== after &amp;&amp; currentNode?.next){" "}
                {"{"}
                {"\n"}
                {"        "}currentNode = currentNode?.next;{"\n"}
                {"      "}
                {"}"}
                {"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (!currentNode?.next) {"{"}
                {"\n"}
                {"        "}console.log(
                <span style={{ color: "rgb(152, 195, 121)", fontWeight: 400 }}>
                  "Value not found"
                </span>
                );{"\n"}
                {"      "}
                {"}"}{" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  else
                </span>{" "}
                {"{"}
                {"\n"}
                {"        "}newNode.next = currentNode?.next;{"\n"}
                {"        "}currentNode!.next = newNode;{"\n"}
                {"        "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .length++;{"\n"}
                {"      "}
                {"}"}
                {"\n"}
                {"    "}
                {"}"}
                {"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}insertAtEnd(value) {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (isNaN(value)){" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  return
                </span>{" "}
                console.log(
                <span style={{ color: "rgb(152, 195, 121)", fontWeight: 400 }}>
                  "Please enter a valid number"
                </span>
                );{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  const
                </span>{" "}
                newNode = new Node(value);{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (!
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head) {"{"}
                {"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head = newNode;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .tail = newNode;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .length++;{"\n"}
                {"    "}
                {"}"}{" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  else
                </span>{" "}
                {"{"}
                {"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .tail!.next = newNode;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .tail = newNode;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .length++;{"\n"}
                {"    "}
                {"}"}
                {"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}deleteAtBeginning() {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (!
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head) {"{"}
                {"\n"}
                {"      "}console.log(
                <span style={{ color: "rgb(152, 195, 121)", fontWeight: 400 }}>
                  "List is empty"
                </span>
                );{"\n"}
                {"    "}
                {"}"}{" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  else
                </span>{" "}
                {"{"}
                {"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head ={" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head?.next;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .length--;{"\n"}
                {"    "}
                {"}"}
                {"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}deleteNode(value) {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (!
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head) {"{"}
                {"\n"}
                {"      "}console.log(
                <span style={{ color: "rgb(152, 195, 121)", fontWeight: 400 }}>
                  "List is empty"
                </span>
                );{"\n"}
                {"    "}
                {"}"}{" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  else
                </span>{" "}
                {"{"}
                {"\n"}
                {"      "}let currentNode ={" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  while
                </span>{" "}
                (currentNode?.next?.value !== value &amp;&amp;
                currentNode?.next) {"{"}
                {"\n"}
                {"        "}currentNode = currentNode?.next;{"\n"}
                {"      "}
                {"}"}
                {"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (!currentNode?.next) {"{"}
                {"\n"}
                {"        "}console.log(
                <span style={{ color: "rgb(152, 195, 121)", fontWeight: 400 }}>
                  "Value not found"
                </span>
                );{"\n"}
                {"      "}
                {"}"}{" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  else
                </span>{" "}
                {"{"}
                {"\n"}
                {"        "}currentNode!.next = currentNode?.next?.next;{"\n"}
                {"        "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .length--;{"\n"}
                {"      "}
                {"}"}
                {"\n"}
                {"    "}
                {"}"}
                {"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}deleteAtEnd() {"{"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  if
                </span>{" "}
                (!
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head) {"{"}
                {"\n"}
                {"      "}console.log(
                <span style={{ color: "rgb(152, 195, 121)", fontWeight: 400 }}>
                  "List is empty"
                </span>
                );{"\n"}
                {"    "}
                {"}"}{" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  else
                </span>{" "}
                {"{"}
                {"\n"}
                {"      "}let currentNode ={" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head;{"\n"}
                {"      "}let nextNode ={" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head?.next;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  while
                </span>{" "}
                (nextNode?.next) {"{"}
                {"\n"}
                {"        "}currentNode = nextNode;{"\n"}
                {"        "}nextNode = nextNode.next;{"\n"}
                {"      "}
                {"}"}
                {"\n"}
                {"      "}console.log(currentNode);{"\n"}
                {"      "}console.log(nextNode);{"\n"}
                {"      "}currentNode!.next ={" "}
                <span style={{ color: "rgb(86, 182, 194)", fontWeight: 400 }}>
                  null
                </span>
                ;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .tail = currentNode;{"\n"}
                {"      "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .length--;{"\n"}
                {"    "}
                {"}"}
                {"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}getAt(index) {"{"}
                {"\n"}
                {"    "}let counter ={" "}
                <span style={{ color: "rgb(209, 154, 102)", fontWeight: 400 }}>
                  0
                </span>
                ;{"\n"}
                {"    "}let currentNode ={" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head;{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  while
                </span>{" "}
                (counter &lt; index) {"{"}
                {"\n"}
                {"      "}currentNode = currentNode?.next;{"\n"}
                {"      "}counter++;{"\n"}
                {"    "}
                {"}"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  return
                </span>{" "}
                currentNode;{"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"\n"}
                {"  "}map() {"{"}
                {"\n"}
                {"    "}let currentNode ={" "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  this
                </span>
                .head;{"\n"}
                {"    "}let list = [];{"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  while
                </span>{" "}
                (currentNode) {"{"}
                {"\n"}
                {"      "}list.push(currentNode.value);{"\n"}
                {"      "}currentNode = currentNode.next;{"\n"}
                {"    "}
                {"}"}
                {"\n"}
                {"    "}
                <span style={{ color: "rgb(198, 120, 221)", fontWeight: 400 }}>
                  return
                </span>{" "}
                list;{"\n"}
                {"  "}
                {"}"}
                {"\n"}
                {"}"}
                {"\n"}
              </code>
            </pre>
          </div>
        </div>
        <div className=" w-[40%] h-full mb-5">
          <Card>
            <CardHeader>
              <CardTitle>Linked Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Linked List is a linear data structure, in which elements are
                not stored at a contiguous location, rather they are linked
                using pointers. Linked List forms a series of connected nodes,
                where each node stores the data and the address of the next
                node.
                <br />
                <br />
                <b>Node Structure:</b> A node in a linked list typically
                consists of two components:
                <br />
                <b>Data: </b>It holds the actual value or data associated with
                the node.
                <br />
                <b>Next Pointer:</b> It stores the memory address (reference) of
                the next node in the sequence.
                <br />
                <b>Head and Tail:</b> The linked list is accessed through the
                head node, which points to the first node in the list. The last
                node in the list points to NULL or nullptr, indicating the end
                of the list. This node is known as the tail node.
              </p>
            </CardContent>
          </Card>

          <div className="my-5">
            <h1 className="text-lg">Read More: </h1>
            <a
              href="https://www.geeksforgeeks.org/what-is-linked-list/"
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

export default LinkedLists;
