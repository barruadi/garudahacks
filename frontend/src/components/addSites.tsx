import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Camera,
  FileText,
  Hash,
  MapPin,
  User,
  CheckCircle,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const provinces = [
  "Aceh",
  "North Sumatra",
  "West Sumatra",
  "Riau",
  "Jambi",
  "South Sumatra",
  "Bengkulu",
  "Lampung",
  "Bangka Belitung Islands",
  "Riau Islands",
  "Jakarta",
  "West Java",
  "Central Java",
  "Yogyakarta",
  "East Java",
  "Banten",
  "Bali",
  "West Nusa Tenggara",
  "East Nusa Tenggara",
  "West Kalimantan",
  "Central Kalimantan",
  "South Kalimantan",
  "East Kalimantan",
  "North Kalimantan",
  "North Sulawesi",
  "Central Sulawesi",
  "South Sulawesi",
  "Southeast Sulawesi",
  "Gorontalo",
  "West Sulawesi",
  "Maluku",
  "North Maluku",
  "West Papua",
  "Papua",
  "Central Papua",
  "Mountain Papua",
  "South Papua",
  "Southwest Papua",
];

interface LocationFormProps {
  onCameraOpen: () => void;
  formData: {
    name: string;
    description: string;
    hashtag: string;
    latitude: string;
    longitude: string;
    province: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      hashtag: string;
      latitude: string;
      longitude: string;
      province: string;
    }>
  >;
  capturedPhoto: File | null;
}

const SitesForm: React.FC<LocationFormProps> = ({
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
      toast.warning("Please capture a photo before submitting");
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
              Site Name
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
            <Label htmlFor="hashtag">
              Hashtag
            </Label>
            <Input
              id="hashtag"
              type="text"
              placeholder="Enter hashtag (e.g., #travel)"
              value={formData.hashtag}
              onChange={(e) => handleInputChange("hashtag", e.target.value)}
              required
              className="bg-white"
            />
          </div>

            <Label className="flex items-center mb-3">
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
                  className="text-amber-800"
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
                  className="text-amber-800"
                />
              </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Select
              value={formData.province}
              onValueChange={(value) => handleInputChange("province", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            className="w-full py-3 font-medium !bg-[#B48B57] hover:!bg-[#a37949] !text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SitesForm;
