import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Camera,
  FileText,
  Hash,
  MapPin,
  User,
  CheckCircle,
} from "lucide-react";
import { useEffect } from "react";

interface LocationFormProps {
  onCameraOpen: () => void;
  formData: {
    name: string;
    description: string;
    shopLink: string;
    gmapsLink: string;
    latitude: string;
    longitude: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
        name: string;
        description: string;
        shopLink: string;
        gmapsLink: string;
        latitude: string;
        longitude: string;
    }>
  >;
  capturedPhoto: File | null;
}

const LocalProductForm: React.FC<LocationFormProps> = ({
  onCameraOpen,
  formData,
  setFormData,
  capturedPhoto,
}) => {
  useEffect(() => {
    if (navigator.geolocation && !formData.latitude && !formData.longitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [formData.latitude, formData.longitude, setFormData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (capturedPhoto) {
      // TODO
      console.log("Form submitted:", formData);
      console.log("Photo file:", capturedPhoto);
    } else {
      alert("Please capture a photo before submitting");
    }
  };

  const handleCamera = () => {
    onCameraOpen();
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="p-6">
        <div className="space-y-6">
          <div className="space-y-2 pt-14">
            <Label htmlFor="name">
              <User className="inline h-4 w-4 mr-2" />
              Local Products Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter the site name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              <FileText className="inline h-4 w-4 mr-2" />
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shopLink">
              <Hash className="inline h-4 w-4 mr-2" />
              Shop Link
            </Label>
            <Input
              id="shopLink"
              type="text"
              placeholder="Enter Shop Link"
              value={formData.shopLink}
              onChange={(e) => handleInputChange("shopLink", e.target.value)}
              required
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gmapsLink">
              <Hash className="inline h-4 w-4 mr-2" />
              GMaps Link
            </Label>
            <Input
              id="gmapsLink"
              type="text"
              placeholder="Enter GMaps Link"
              value={formData.gmapsLink}
              onChange={(e) => handleInputChange("gmapsLink", e.target.value)}
              required
              className="bg-white"
            />
          </div>

          <div className="bg-white p-4 rounded-lg border border-b-gray-400">
            <Label className="flex items-center mb-3">
              <MapPin className="h-4 w-4 mr-2" />
              Current Location
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="latitude" className="text-xs">
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  type="text"
                  value={formData.latitude}
                  readOnly
                  className="bg-amber-50 text-amber-800"
                />
              </div>
              <div>
                <Label htmlFor="longitude" className="text-xs">
                  Longitude
                </Label>
                <Input
                  id="longitude"
                  type="text"
                  value={formData.longitude}
                  readOnly
                  className="bg-amber-50 text-amber-800"
                />
              </div>
            </div>
          </div>

          {capturedPhoto && (
            <div className="border-green-200 rounded-lg p-3 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-[#b78748] text-sm font-medium">
                ({capturedPhoto.name || "photo.jpg"})
              </span>
            </div>
          )}

          <Button
            onClick={handleCamera}
            className={`w-full py-3 text-base font-medium text-black ${
              capturedPhoto ? "bg-green-100 border-green-300" : ""
            }`}
          >
            <Camera className="h-5 w-5 mr-2 text-black" />
            {capturedPhoto ? "Retake Photo" : "Upload Site Photos"}
          </Button>

          <Button
            onClick={handleSubmit}
            className="w-full py-3 font-medium text-black"
            disabled={
              !formData.name ||
              !formData.description ||
              !formData.shopLink ||
              !formData.gmapsLink ||
              !capturedPhoto
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocalProductForm;
