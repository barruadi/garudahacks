export interface LocalProductCardProps {
    id: number,
    userId: number,
    title: string,
    description: string,
    photoUrl: string,
    shopLink: string,
    gmapsLink: string,
    createdAt: Date,
    latitude: number,
    longitude: number,
}

export interface SitesCardProps {
    id: number;
    photo: string;
    latitude: number;
    longitude: number;
    title: string;
    description: string;
    createdBy: number;
    provinceId: number;
}

export interface UserProfile {
    id: number;
    username: string;
    photoUrl?: string;
    createdAt: Date;
}