import IndonesiaMap from "@/components/indonesiaMap";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";
import { Plus } from "lucide-react";
import Popup from "@/components/popup";
import TutorialOverlay from "@/components/MascotOverlay";
import { useTutorial } from "@/hook/useToturial";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
    List, 
    User, 
} from "lucide-react";

export default function MapPage() {
  const [showPopup, setShowPopup] = useState(false);
  const { showTutorial, completeTutorial, skipTutorial, restartTutorial } = useTutorial();

  const navigate = useNavigate();

  const handleClick = (nav: string) => {
    navigate(nav);
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      
      <IndonesiaMap />

      <div className="absolute top-4 left-0 right-0 z-[1000] flex justify-between px-6">
        <Header/>
        {/* Optional: Add tutorial restart button */}
        <button
          onClick={restartTutorial}
          className="px-3 py-1 text-xs bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
        >
          Tutorial
        </button>
      </div>

      <div className="border fixed bottom-0 left-0 w-full shadow-[0px_-4px_8px_0px_rgba(0,0,0,0.03)] bg-white flex justify-around items-center h-24">
            <div className="flex flex-col items-center gap-2" onClick={() => navigate("/lists")} >
                <List size={36} strokeWidth={2} color="black"/>
                <span className="text-xs text-black font-normal leading-snug">All List</span>
            </div>
            <div className="relative flex flex-col items-center" onClick={() => setShowPopup(true)} >
                <div className="absolute -top-17 w-18 h-18 bg-white rounded-full shadow-[0px_0px_8px_0px_rgba(0,0,0,0.10)] flex items-center justify-center">
                    <Plus className="w-14 h-14" size={60} strokeWidth={1.25} color="black"/>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2" onClick={() => navigate("/profile")} >
                <User size={36} strokeWidth={2} color="black"/>
                <span className="text-xs text-black font-normal leading-snug">Profile</span>
            </div>
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

      {/* Tutorial Overlay */}
      <TutorialOverlay
        isVisible={showTutorial}
        onComplete={completeTutorial}
        onSkip={skipTutorial}
      />
    </div>
  );
}