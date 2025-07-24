import React from 'react';
import type { MarkerData } from '@/types/map';

interface MarkerModalProps {
  marker: MarkerData | null;
  isOpen: boolean;
  onClose: () => void;
}

const MarkerModal: React.FC<MarkerModalProps> = ({ marker, isOpen, onClose }) => {
  if (!isOpen || !marker) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{marker.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Lokasi</h3>
            <p className="text-gray-600">{marker.city}, {marker.province}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700">Koordinat</h3>
            <p className="text-gray-600">
              Lat: {marker.lat.toFixed(4)}, Lng: {marker.lng.toFixed(4)}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700">Deskripsi</h3>
            <p className="text-gray-600">{marker.description}</p>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-gray-700 mb-2">Informasi Tambahan</h3>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">
                Klik pada peta untuk menjelajahi lokasi lainnya di Indonesia. 
                Setiap marker memiliki informasi unik tentang kota dan daerah tersebut.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkerModal;