import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LocalProductCardProps } from "@/types/pins.types";
import { useNavigate } from "react-router-dom";

export const LocalProductCard = ( {
    id,
    userName,
    title,
    description,
    photoUrl,
    created,
    userPhoto,
}: LocalProductCardProps) => {

    const navigate = useNavigate();

    return (
        <Card onClick={() => {navigate(`/product/${id}`)}}>
            {/* Header: User Info */}
            <CardHeader className="mb-0">
                <div className="flex items-center gap-3">
                    <img src={userPhoto} alt={userName} className="w-10 h-10 rounded-full object-cover bg-gray-200"/>
                    <div className="flex flex-col items-start">
                        <span className="font-medium text-sm"> {userName} </span>
                        <span className="text-xs text-muted-foreground"> Local Artisan • {created} </span>
                    </div>
                </div>
            </CardHeader>

            {/* Card Content */}
            <CardContent className="mt-0">
                {/* Product Image */}
                <div className="w-full h-40 bg-gray-200 rounded-md overflow-hidden">
                    <img src={photoUrl} alt={title} className="w-full h-full object-cover"/>
                </div>
                {/* Title & Description */}
                <div className="text-left mt-3">
                    <CardTitle> {title} </CardTitle>
                    <CardDescription className="mt-2"> {description} </CardDescription>
                </div>
            </CardContent>  
        </Card>
    );
};