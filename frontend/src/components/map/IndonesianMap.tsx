import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import MapMarker from './MapMarker';
import type { MarkerData } from '@/types/map';
import { indonesianMarkers } from '../../data/markers';
import { indonesiaGeoJSON } from '../../data/indonesia-geojson';
import 'leaflet/dist/leaflet.css';

interface IndonesiaMapProps {
  onMarkerClick: (marker: MarkerData) => void;
}

const IndonesiaMap: React.FC<IndonesiaMapProps> = ({ onMarkerClick }) => {
  const center: LatLngExpression = [-2.5, 118.0]; // Center of Indonesia
  const [map, setMap] = useState<L.Map | null>(null);

  const geoJSONStyle = {
    color: '#3388ff',
    weight: 2,
    opacity: 0.6,
    fillOpacity: 0.1
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={5}
        className="h-full w-full"
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <GeoJSON 
          data={indonesiaGeoJSON as any} 
          style={geoJSONStyle}
        />
        
        {indonesianMarkers.map((marker) => (
          <MapMarker
            key={marker.id}
            marker={marker}
            onMarkerClick={onMarkerClick}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default IndonesiaMap;