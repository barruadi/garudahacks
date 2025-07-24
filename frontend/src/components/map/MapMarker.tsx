import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { MarkerData } from '@/types/map';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapMarkerProps {
  marker: MarkerData;
  onMarkerClick: (marker: MarkerData) => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ marker, onMarkerClick }) => {
  return (
    <Marker
      position={[marker.lat, marker.lng]}
      eventHandlers={{
        click: () => onMarkerClick(marker)
      }}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-bold text-lg">{marker.title}</h3>
          <p className="text-sm text-gray-600">{marker.province}</p>
          <p className="text-sm mt-1">{marker.description}</p>
          <button 
            onClick={() => onMarkerClick(marker)}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Lihat Detail
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;