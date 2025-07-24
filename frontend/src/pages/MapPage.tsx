import React from 'react';
import Header from '../components/header';
import IndonesiaMap from '../components/map/IndonesianMap';
import MarkerModal from '../components/map/MarkerModal';
import { useMapModal } from '../components/map/useMapModal';

const MapPage: React.FC = () => {
  const { selectedMarker, isModalOpen, openModal, closeModal } = useMapModal();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 relative">
        <IndonesiaMap onMarkerClick={openModal} />
      </div>
      
      <MarkerModal
        marker={selectedMarker}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default MapPage;