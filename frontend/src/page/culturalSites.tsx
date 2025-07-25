import { useEffect, useState } from "react";
import type { Community } from '../../../backend/src/types/db.types';
import { useParams, useNavigate } from "react-router-dom";
import { motion, useMotionValue } from "framer-motion";
import ThreeDBox from "@/components/ThreeDBox";
import { ChevronLeft } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

import SpeechButton from "@/components/SpeechButton";

type CulturalSiteResponse = {
  success: boolean;
  data: Community;
};

const CulturalSitesPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Community | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<"2D" | "3D">("3D");
  const y = useMotionValue(400);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/sites/${numericId}`);
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);
        const json: CulturalSiteResponse = await res.json();
        setData(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white text-black">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
          <p className="text-red-500">Error: {error}</p>
        </div>
      )}

      {/* Back Button + Title */}
      <div className="absolute top-8 left-4 z-20 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
        <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-black">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-medium text-sm text-gray-800 truncate max-w-[200px]">
          {data?.title ?? "Cultural Site"}
        </span>
      </div>

      {/* View Toggle */}
      <div className="absolute top-6 right-4 z-20 bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2 text-sm">
        <label htmlFor="viewToggle" className="text-gray-700 font-medium">View:</label>
        <select
          id="viewToggle"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as "2D" | "3D")}
          className="bg-white border border-gray-300 rounded-md px-2 py-1 text-gray-700"
        >
          <option value="3D">3D</option>
          <option value="2D">2D</option>
        </select>
      </div>

      {/* 3D or 2D Viewer */}
      <div className="absolute inset-0 z-0">
        {viewMode === "3D" && data?.["3DUrl"] && (
          <ThreeDBox modelPath={`${data["3DUrl"]}`} />
        )}
        {viewMode === "2D" && data?.photo && (
          <img
            src={`${data.photo}`}
            alt="Cultural Site Preview"
            className="w-full h-full object-contain bg-white"
          />
        )}
      </div>

      {/* Pull-up Panel */}
      {data && (
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 400 }}
          style={{ y }}
          className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-2xl shadow-xl p-4 drop-shadow-2xl pb-16 min-h-[600px]"
        >
          <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/assets/dummy-user.png"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover bg-gray-200"
            />
            <div className="flex flex-col text-left">
              <p className="font-medium text-sm">{data.createdBy ?? "Unknown"}</p>
              <p className="text-xs text-muted-foreground">Cultural Contributor</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-justify leading-relaxed text-gray-800 mb-6">
            {data.description ??
              `No description available for this cultural site.`}
          </p>
        </motion.div>
      )}
      <SpeechButton text={data?.description ?? ""} />
    </div>
    
  );
};

export default CulturalSitesPage;
