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
import type { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import type { GeoJsonObject, Feature } from "geojson";

const pins: { id: number; name: string; position: LatLngTuple }[] = [
  { id: 1, name: "Jakarta", position: [-6.2088, 106.8456] },
  { id: 2, name: "Surabaya", position: [-7.2575, 112.7521] },
  { id: 3, name: "Medan", position: [3.5952, 98.6722] },
];

interface ProvinceFeature extends Feature {
  properties: {
    state: string;
    [key: string]: any;
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
    const layer = L.geoJSON(data);
    const bounds = layer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        maxZoom: 6,
        padding: [20, 20],
      });
    }
  }, [data, map]);

  return (
    <GeoJSON
      data={data}
      onEachFeature={onEachFeature}
      ref={geoJsonRef as any}
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
    (layer as L.Path).setStyle({
      color: "#444",
      fillColor: "#B78748",
      fillOpacity: 0.7,
      weight: 1,
    });
  };

  useEffect(() => {
    fetchGeoData();
  }, []);


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
              <Marker key={pin.id} position={pin.position}>
                <Popup>{pin.name}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}
