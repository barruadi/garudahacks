import { useState } from 'react';
import type { MarkerData } from '@/types/map';

export const useMapModal = () => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (marker: MarkerData) => {
    setSelectedMarker(marker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMarker(null);
  };

  return {
    selectedMarker,
    isModalOpen,
    openModal,
    closeModal
  };
};