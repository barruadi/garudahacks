export interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  city: string;
  province: string;
}

export interface PopupData {
  marker: MarkerData;
  isOpen: boolean;
}
