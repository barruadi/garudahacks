import IndonesiaMap from "@/components/indonesiaMap";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";

export default function MapPage() {
  const navigate = useNavigate(); // optional

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      
      <IndonesiaMap />

      <div className="absolute top-4 left-0 right-0 z-20 flex justify-between px-6">
        <Header/>
      </div>

      {/* 🔘 Bottom Overlay Button */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center">
        <button
          className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-400 transition"
          onClick={() => alert("Clicked bottom button")}
        >
          Action Button
        </button>
      </div>
    </div>
  );
}
