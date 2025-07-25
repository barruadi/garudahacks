import IndonesiaMap from "@/components/indonesiaMap";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";
import { Plus } from "lucide-react";
import Popup from "@/components/popup";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MapPage() {
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleClick = (nav: string) => {
    navigate(nav);
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      
      <IndonesiaMap />

      <div className="absolute top-4 left-0 right-0 z-[1000] flex justify-between px-6">
        <Header/>
      </div>

      <div className="absolute bottom-6 left-6 z-[1000] flex justify-center">
        <button
          className="!bg-[#B78748] text-white font-semibold px-12 py-2 rounded-xl shadow-lg hover:bg-yellow-400 transition"
          onClick={() => handleClick("/lists")}
        >
          All Lists
        </button>
      </div>
      
      <div className="absolute bottom-6 right-6 flex justify-center z-[1000]">
        <button
          className="w-14 h-14 !bg-[#B78748] text-white font-semibold rounded-xl shadow-lg hover:bg-yellow-400 transition flex items-center justify-center"
          onClick={() => setShowPopup(true)}
        >
          <Plus size={32} />
        </button>
      </div>
      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <div className="space-y-4">
          <Button
            type="button"
            className="w-full !bg-[#B48B57] hover:!bg-[#a37949] !text-white"
            onClick={() => handleClick("/add-sites")}
          >
            Add Cultural Sites
          </Button>
          <Button
            type="button"
            className="w-full !bg-[#B48B57] hover:!bg-[#a37949] !text-white"
            onClick={() => handleClick("/add-local-products")}
          >
            Add Local Product
          </Button>
        </div>
      </Popup>
    </div>
  );
}
