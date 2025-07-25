import SitesForm from "@/components/addSites";
import CameraPage from "@/components/cameraPage";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-md mx-auto bg-white shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 text-amber-800 hover:text-amber-600 bg-transparent p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        style={{ background: "none" }} // Added style to remove background
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      {currentPage === "form" && (
        <SitesForm
          onCameraOpen={handleCameraOpen}
          formData={formData}
          setFormData={setFormData}
          capturedPhoto={capturedPhoto} // tambahkan ini
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
