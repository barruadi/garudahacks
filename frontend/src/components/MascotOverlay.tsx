import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TutorialStep {
  id: number;
  mascotImage: string;
  message: string;
  title?: string;
}

interface TutorialOverlayProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    mascotImage: "/assets/img/Maskot.png",
    title: "Welcome!",
    message:
      "Hello! I'm Modo and I will guide you through using Nama Aplikasi. Let's start this short tour!",
  },
  {
    id: 2,
    mascotImage: "/assets/img/Maskot2.png",
    title: "Explore the Map",
    message:
      "This is an interactive map of Indonesia. You can zoom in or zoom out on various regions to see the cultural sites and local products in those areas.",
  },
  {
    id: 3,
    mascotImage: "/assets/img/Maskot3.png",
    title: "View All Lists",
    message:
      "Click the 'Lists' button in the bottom left corner to see all available cultural sites and local products.",
  },
  {
    id: 4,
    mascotImage: "/assets/img/Maskot4.png",
    title: "Add Content",
    message:
      "Use the '+' button in the bottom middle to add new cultural sites or local products to the application.",
  },
  {
    id: 5,
    mascotImage: "/assets/img/Maskot5.png",
    title: "Ready to Start!",
    message: "Enjoy exploring the cultural richness of Indonesia!",
  },
];

export default function TutorialOverlay({
  isVisible,
  onComplete,
  onSkip,
}: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  onSkip;

  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 200);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 z-[2000] bg-transparent bg-opacity-10 flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full">
        <div
          className={`relative bg-gradient-to-t from-brown-400 to-brown-500 rounded-3xl p-6 mb-4 shadow-2xl transform transition-all duration-300 ${
            isAnimating ? "scale-95 opacity-70" : "scale-100 opacity-100"
          }`}
        >
          <div className="absolute bottom-0 left-8 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-brown-500 transform translate-y-full"></div>

          <div className="text-black z-[1000]">
            {currentTutorial.title && (
              <h3 className="text-xl font-bold mb-3">
                {currentTutorial.title}
              </h3>
            )}
            <p className="text-base leading-relaxed">
              {currentTutorial.message}
            </p>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentStep
                    ? "bg-amber-800"
                    : "bg-amber-500 bg-opacity-40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div
            className={`relative transform transition-all duration-300 ${
              isAnimating ? "scale-95" : "scale-100"
            }`}
          >
            <img
              src={currentTutorial.mascotImage}
              alt="Mascot Tutorial"
              className="w-48 h-48 object-contain drop-shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all shadow-lg
      ${
        currentStep === 0
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-brown-600 to-brown-700 text-black hover:from-brown-700 hover:to-brown-800"
      }`}
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-black text-sm">
            {currentStep + 1} from {tutorialSteps.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-brown-600 to-brown-700 text-black rounded-xl hover:from-brown-700 hover:to-brown-800 transition-all shadow-lg"
          >
            {currentStep === tutorialSteps.length - 1 ? (
              "Finish"
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
