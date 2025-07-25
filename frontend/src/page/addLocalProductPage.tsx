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
  const [urltwodimensions, setUrlTwoDimensions] = useState<string | null>(null);
  const [urlthreeDimensions, setUrlThreeDimensions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      // PERBAIKAN: Pakai FormData, bukan JSON
      const formData = new FormData();
      formData.append('file', imageFile);

      const res = await fetch('http://localhost:8001/api/upload', {
        method: 'POST',
        body: formData, // Pakai formData, bukan JSON.stringify
        // HAPUS headers Content-Type, biar browser set otomatis untuk FormData
      });

      console.log("Upload response status:", res.status);
      if (!res.ok) {
        throw new Error('Failed to upload photo');
      }
      const data = await res.json();
      console.log("Link:", data.file.url);
      setUrlTwoDimensions(data.file.url);
      try {
        console.log("Converting image to 3D...");
        console.log("Filename for conversion:", data.file.url); // langsung dari response
        const res2 = await fetch('http://localhost:8001/api/upload/convert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ filename: data.file.url }) // pakai langsung
        });
        const data2 = await res2.json();
        if (!res2.ok) throw new Error(data2.error || 'Something went wrong');

        console.log('Conversion success:', data2);
        setUrlThreeDimensions(data2.file.url);
        console.log("3D Model URL:", data2.file.url);
      } catch (err) {
        console.error('Error during fetch:', err);
      }
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
