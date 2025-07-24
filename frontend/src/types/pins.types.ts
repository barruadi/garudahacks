export interface LocalProductCardProps {
    id: number,
    userName: string;
    title: string;
    description: string;
    photoUrl: string;
    created: string;
    userPhoto: string;
}

export interface SitesCardProps {
    id: number,
    userName: string;
    userPhoto: string;
    message: string;
    created: string;
    likesCount: number;
    isInitiallyLiked?: boolean;
}