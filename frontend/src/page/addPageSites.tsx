import SitesForm from "@/components/addSites";
import CameraPage from "@/components/cameraPage";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function addSitesPage() {
  const [currentPage, setCurrentPage] = useState("form");
  const [capturedPhoto, setCapturedPhoto] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hashtag: "",
    latitude: "",
    longitude: "",
    province: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  isLoading;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const handleCameraOpen = () => {
    setCurrentPage("camera");
  };

  const handleBackToForm = () => {
    setCurrentPage("form");
  };

   const handlePhotoCaptured = async (imageFile: File) => {
    setCapturedPhoto(imageFile);
    console.log("Photo File:", imageFile);
    setIsLoading(true);
    try {
      console.log("Uploading photo...");
      const res = await fetch('http://localhost:8001/api/upload', {
      method: 'POST',
      body: JSON.stringify({ file: imageFile }),
      headers: {
        'Content-Type': 'application/json',
      },
      });
      console.log("Upload response status:", res);
      if (!res.ok) {
      throw new Error('Failed to upload photo');
      }
      const data = await res.json();
      console.log("Upload response:", data);
    }
    catch (error) {
      console.error("Error handling photo capture:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#FFFBEA] shadow-lg">
      <div className="sticky top-0 z-50 pt-12 px-4 flex flex-col">
          <div className="flex text-xl items-center gap-3">
          <button onClick={() => navigate("/map")}>
              <ChevronLeft className="w-6 h-6" />
          </button>
          Add Cultural Sites
          </div>
      </div>
      {currentPage === "form" && (
        <SitesForm
          onCameraOpen={handleCameraOpen}
          formData={formData}
          setFormData={setFormData}
          capturedPhoto={capturedPhoto} 
        />
      )}
      {currentPage === "camera" && (
        <CameraPage
          onBack={handleBackToForm}
          onPhotoCaptured={handlePhotoCaptured}
        />
      )}
    </div>
  );
}
