import IndonesiaMap from "@/components/indonesiaMap";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";
import { Plus } from "lucide-react";

export default function MapPage() {
  const navigate = useNavigate(); // optional

  const handleClick = (nav: string) => {
    navigate(nav);
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      
      <IndonesiaMap />

      <div className="absolute top-4 left-0 right-0 z-20 flex justify-between px-6">
        <Header/>
      </div>

      <div className="absolute bottom-6 left-6 z-10 flex justify-center">
        <button
          className="!bg-[#B78748] text-white font-semibold px-12 py-3 rounded-xl shadow-lg hover:bg-yellow-400 transition"
          onClick={() => handleClick("/lists")}
        >
          All Lists
        </button>
      </div>
      
      <div className="absolute bottom-6 right-6 z-10 flex justify-center">
        <button
          className="w-14 h-14 !bg-[#B78748] text-white font-semibold rounded-xl shadow-lg hover:bg-yellow-400 transition flex items-center justify-center"
          onClick={() => handleClick("/add-item")}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}
