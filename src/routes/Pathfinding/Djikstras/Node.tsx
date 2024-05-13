const Node = ({ color }: { color: string }) => {
  return (
    <div
      className={`border min-h-7 min-w-7 transition-all duration-30 0 bg-${color}-500 flex items-center justify-center`}
    ></div>
  );
};

export default Node;
