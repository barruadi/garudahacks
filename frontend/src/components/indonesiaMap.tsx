import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from "react-leaflet";
import type { GeoJSON as LeafletGeoJSONType } from "leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import type { GeoJsonObject, Feature } from "geojson";
import { PopUpCard } from "./card-popup";
import { API_BASE_URL } from "@/config/api"
import { useSearchStore } from "@/store/searchStore";


interface ProvinceFeature extends Feature {
  properties: {
    state: string;
    [key: string]: unknown;
  };
}

function ZoomableGeoJSON({
  data,
  onEachFeature,
  geoJsonRef,
}: {
  data: GeoJsonObject;
  onEachFeature: (feature: ProvinceFeature, layer: L.Layer) => void;
  geoJsonRef: React.RefObject<LeafletGeoJSONType | null>;
}) {
  const map = useMap();

  useEffect(() => {
    // const layer = L.geoJSON(data);
    // const bounds = layer.getBounds();
    // if (bounds.isValid()) {
    //   map.fitBounds(bounds, {
    //     maxZoom: 6,
    //     padding: [20, 20],
    //   });
    // }
  }, [data, map]);

  return (
    <GeoJSON
      data={data}
      onEachFeature={onEachFeature}
      ref={geoJsonRef as unknown as React.Ref<LeafletGeoJSONType>}
    />
  );
}

function ZoomWatcher({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  useMapEvents({
    zoomend: (e) => onZoomChange(e.target.getZoom()),
  });

  return null;
}

export default function IndonesiaMap() {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const geoJsonRef = useRef<LeafletGeoJSONType | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(5); // initial zoom
  const { searchValue } = useSearchStore();
  const [pins, setPins] = useState<{
    id: number;
    title: string;
    latitude: number;
    longitude: number;
    photo?: string;
    description?: string;
    createdBy?: number;
    provinceId?: number;
    threeDUrl?: string;
  }[]>([]);

  const [localPins, setLocalPins] = useState<{
    id: number;
    userId: number;
    title: string;
    description: string;
    photoUrl: string;
    shopLink?: string | null;
    gmapsLink?: string | null;
    createdAt: string;
    latitude: number;
    longitude: number;
    likeCount: number;
    "3DUrl"?: string | null;
  }[]>([]);

  const fetchSearchResults = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/search?q=${searchValue}`);
      const result = await res.json();

      if (result.success) {
        setPins(result.data.communities);
        setLocalPins(result.data.products);
      } else {
        console.error("Search failed:", result.error);
        setPins([]);
        setLocalPins([]);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const fetchPinData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/sites`)
      if (!res.ok) {
        throw new Error("Failed to fetch pin data");
      }
      const data = await res.json();
      setPins(data.data);
    }
    catch (err) {
      console.error("Error loading GeoJSON:", err);
    }
  }

  const fecthLocalPinData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/local-products`)
      if (!res.ok) {
        throw new Error("Failed to fetch pin data");
      }
      const data = await res.json();
      setLocalPins(data.data);
    }
    catch (err) {
      console.error("Error loading GeoJSON:", err);
    }
  }

  const fetchGeoData = async () => {
    try {
      const response = await fetch("/assets/indonesia.geojson");
      if (!response.ok) throw new Error("Failed to fetch GeoJSON");
      const data: GeoJsonObject = await response.json();
      setGeoData(data);
    } catch (err) {
      console.error("Error loading GeoJSON:", err);
    }
  };

  const onEachProvince = (feature: ProvinceFeature, layer: L.Layer) => {
    feature;
    (layer as L.Path).setStyle({
      color: "#444",
      fillColor: "#B78748",
      fillOpacity: 0.7,
      weight: 1,
    });
  };

  useEffect(() => {
    fetchGeoData();

    if (searchValue) {
      fetchSearchResults();
    } else {
      fetchPinData();
      fecthLocalPinData();
    }
  }, []);

  const customIcon = L.icon({
    iconUrl: "/map-marker.png", 
    iconSize: [48, 48],         
    iconAnchor: [24, 48],       
    popupAnchor: [0, -32],      
  });


  return (
    <div className="flex h-screen bg-black text-white">

      <div className="w-full h-full relative">
        <MapContainer
          center={[-2, 118]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          scrollWheelZoom={true}
          attributionControl={true}
        >

          <ZoomWatcher onZoomChange={(z) => setZoomLevel(z)} />

          {geoData && (
            <ZoomableGeoJSON
              data={geoData}
              onEachFeature={onEachProvince}
              geoJsonRef={geoJsonRef}
            />
          )}
          {zoomLevel >= 6 &&
            pins.map((pin) => (
              <Marker key={pin.id} position={[pin.latitude, pin.longitude]} icon={customIcon}>
                <Popup>
                  <PopUpCard
                    id={pin.id}
                    userPhoto={pin.photo ?? ""}
                    title={pin.title}
                    desc={
                      pin.description
                        ? pin.description.slice(0, 50) + (pin.description.length > 50 ? "..." : "")
                        : ""
                    }
                  />
                </Popup>
              </Marker>
            ))}

          {zoomLevel >= 6 &&
            localPins.map((pin) => (
              <Marker key={pin.id} position={[pin.latitude, pin.longitude]} icon={customIcon}>
                <Popup>
                  <PopUpCard
                    id={pin.id}
                    userPhoto={pin.photoUrl ?? ""}
                    title={pin.title}
                    desc={
                      pin.description
                        ? pin.description.slice(0, 50) + (pin.description.length > 50 ? "..." : "")
                        : ""
                    }
                  />
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}
