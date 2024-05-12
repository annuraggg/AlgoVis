const Node = ({ color }: { color: string }) => {
  return (
    <div className={`border min-h-10 min-w-10 bg-${color}-500 flex items-center justify-center`}></div>
  );
};

export default Node;
