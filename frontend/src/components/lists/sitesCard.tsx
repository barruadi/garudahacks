import { Card, CardContent, CardDescription} from "@/components/ui/card";
import { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import type { SitesCardProps } from "@/types/pins.types";
import { useNavigate } from "react-router-dom";

export const SitesCard = ( {
    id,
    userName,
    userPhoto,
    message,
    created,
    likesCount: initialLikesCount,
    isInitiallyLiked = false,
}: SitesCardProps) => {
    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [liked, setLiked] = useState(isInitiallyLiked);
    
    const navigate = useNavigate();

    const handleLike = () => {
        const newLikedState = !liked;
        const newLikesCount = newLikedState ? likesCount +  1 : likesCount - 1;
        setLiked(newLikedState);
        setLikesCount(newLikesCount);

        // updatelike api here
    };

    return (
        <Card onClick={() => {navigate(`/product/${id}`)}}>
            {/* Content */}
            <CardContent className="mt-0">
                {/* Header: User Info */}
                <div className="flex items-center gap-3">
                    <img src={userPhoto} alt={userName} className="w-10 h-10 rounded-full object-cover bg-gray-200"/>
                    <div className="flex flex-col items-start">
                        <span className="font-medium text-sm"> {userName} </span>
                        <span className="text-xs text-muted-foreground"> {created} </span>
                    </div>
                </div>
                {/* Message */}
                <CardDescription className="text-left mt-3">
                    {message}
                </CardDescription>

                {/* Likes */}
                <div className="justify-end flex items-center gap-2">
                    <button onClick={handleLike}
                        className={`w-6 h-6 rounded-full flex items-center justify-center hover:cursor-pointer hover:opacity-75
                        ${liked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"} 
                        transition-colors`}
                    >
                            <ThumbsUp className="w-3.5 h-4" />
                    </button>
                    <span className="text-muted-foreground text-xs"> {likesCount} </span>
                </div>
            </CardContent>
        </Card>
    )
}