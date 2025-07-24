import LocalProductForm from "@/components/addLocalProducts";
import CameraPage from "@/components/cameraPage";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddLocalProductPage() {
  const [currentPage, setCurrentPage] = useState("form");
  const [capturedPhoto, setCapturedPhoto] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shopLink: "",
    gmapsLink: "",  
    latitude: "",
    longitude: "",
  });

  const navigate = useNavigate();

  const handleCameraOpen = () => {
    setCurrentPage("camera");
  };

  const handleBackToForm = () => {
    setCurrentPage("form");
  };

  const handlePhotoCaptured = (imageFile: File) => {
    setCapturedPhoto(imageFile);
    console.log("Photo File:", imageFile);
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
        <LocalProductForm
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
