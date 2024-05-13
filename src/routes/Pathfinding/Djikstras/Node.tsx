const Node = ({ color }: { color: string }) => {
  return (
    <div
      className={`border min-h-7 min-w-7 transition-all duration-30 0 flex items-center justify-center
      ${color === "red" && "bg-red-500"}
      ${color === "green" && "bg-green-500"}
      ${color === "blue" && "bg-blue-500"}
      ${color === "gray" && "bg-gray-500"}
      ${color === "yellow" && "bg-yellow-500"}
      `}
    ></div>
  );
};

export default Node;
