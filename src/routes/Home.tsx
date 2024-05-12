import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-10 text-center flex items-center flex-col gap-4 font-geist">
        <h1 className="text-7xl font-poly drop-shadow-glow">AlgoVis<span className="text-red-500">.</span></h1>
        <p className="text-gray-500">Please Choose a Algorithm Type to Visualize</p>
        <div className="flex gap-5 mt-5">
          <Button onClick={() => navigate("/data-structures")}>
            Data Structures
          </Button>
          <Button onClick={() => navigate("/searching")}>
            Searching Algorithms
          </Button>
          <Button onClick={() => navigate("/sorting")}>
            Sorting Algorithms
          </Button>
          <Button onClick={() => navigate("/pathfinding")}>
            Pathfinding Algorithms
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
