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
    province: string;
    latitude: string;
    longitude: string;
    tags: string;

  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
        name: string;
        description: string;
        province: string;
        latitude: string;
        longitude: string;
        tags: string;
    }>
  >;
  capturedPhoto: File | null;
  handleSubmit: () => void;

  
}

const SitesForm: React.FC<LocationFormProps> = ({
  onCameraOpen,
  formData,
  setFormData,
  capturedPhoto,
  handleSubmit,
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
              Sites Name
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
              Province
            </Label>
            <select
              id="shopLink"
              value={formData.province}
              onChange={(e) => handleInputChange("province", e.target.value)}
              required
              className="bg-white border rounded px-3 py-2 w-full"
            >
              <option value="">Select Province</option>
              <option value="1">Aceh</option>
              <option value="2">North Sumatra</option>
              <option value="3">West Sumatra</option>
              <option value="4">Riau</option>
              <option value="5">Jambi</option>
              <option value="6">South Sumatra</option>
              <option value="7">Bengkulu</option>
              <option value="8">Lampung</option>
              <option value="9">Bangka Belitung Islands</option>
              <option value="10">Riau Islands</option>
              <option value="11">Jakarta</option>
              <option value="12">West Java</option>
              <option value="13">Central Java</option>
              <option value="14">Yogyakarta</option>
              <option value="15">East Java</option>
              <option value="16">Banten</option>
              <option value="17">Bali</option>
              <option value="18">West Nusa Tenggara</option>
              <option value="19">East Nusa Tenggara</option>
              <option value="20">West Kalimantan</option>
              <option value="21">Central Kalimantan</option>
              <option value="22">South Kalimantan</option>
              <option value="23">East Kalimantan</option>
              <option value="24">North Kalimantan</option>
              <option value="25">North Sulawesi</option>
              <option value="26">Central Sulawesi</option>
              <option value="27">South Sulawesi</option>
              <option value="28">Southeast Sulawesi</option>
              <option value="29">Gorontalo</option>
              <option value="30">West Sulawesi</option>
              <option value="31">Maluku</option>
              <option value="32">North Maluku</option>
              <option value="33">West Papua</option>
              <option value="34">Papua</option>
            </select>
            </div>



          <div className="space-y-2">
            <Label htmlFor="tags">
              <Hash className="inline h-4 w-4 mr-2" />
              Tags
            </Label>
            <Input
              id="tags"
              type="text"
              placeholder="Enter Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
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
            // disabled={
            //   !formData.name ||
            //   !formData.description ||
            //   !formData.shopLink ||
            //   !formData.gmapsLink ||
            //   !capturedPhoto
            // }
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SitesForm;
