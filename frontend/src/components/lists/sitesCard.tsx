import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useState } from 'react';
import type { SitesCardProps } from "@/types/pins.types";
import { useNavigate } from "react-router-dom";

export const SitesCard = ( {
    id,
    photo,
    latitude,
    longitude,
    title,
    description,
    createdBy,
    provinceId
}: SitesCardProps) => {

    const navigate = useNavigate();

    return (
        <Card onClick={() => {navigate(`/product/${id}`)}}>
            {/* Content */}
            <CardContent className="mt-0">
                {/* Header: User Info */}
                <div className="w-full h-40 bg-gray-200 rounded-md overflow-hidden">
                    <img src={photo} alt={photo} className="w-full h-full object-cover"/>
                </div>

                {/* Message */}
                <div className="text-left mt-3">
                    <CardTitle> {title} </CardTitle>
                    <CardDescription className="text-left mt-3"> 
                        {description.split(' ').slice(0, 20).join(' ')}{description.split(' ').length > 10 ? '...' : ''}
                    </CardDescription>
                </div>

            </CardContent>
        </Card>
    )
}