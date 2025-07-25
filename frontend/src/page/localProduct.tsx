'use client'

import { useEffect, useState } from "react";
import type { LocalProduct } from '../../../backend/src/types/db.types';
import { useParams } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ThreeDBox from "@/components/ThreeDBox"

type LocalProductResponse = {
  success: boolean;
  data: LocalProduct;
};

const LocalProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<LocalProduct | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`http://localhost:8001/api/local-products/${numericId}`);
                if (!res.ok) throw new Error(`Error: ${res.statusText}`);
                const json: LocalProductResponse = await res.json();
                setData(json.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // console.log("data kita: ", data);
    // console.log(`/assets/${data?.photoUrl}`);
    // console.log(data?.description)
    // console.log(`/apa/${data?.["3DUrl"]}`)

    return (
        <div className="min-h-screen bg-[#FFFEF8] p-4 text-black">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {data && (
                <>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src="/assets/dummy-user.png"
                            alt="Foto Profil"
                            className="w-10 h-10 rounded-full object-cover bg-gray-200"
                        />
                        <div className="flex flex-col text-left">
                            <p className="font-medium text-sm">{data.userId ?? "Adi Barru"}</p>
                            <p className="text-xs text-muted-foreground">Local Artisan • 2 hari lalu</p>
                        </div>
                    </div>

                    {/* Product Image Placeholder */}
                    <Carousel>
                        <CarouselContent>
                            <CarouselItem>
                                <ThreeDBox modelPath={`/assets/${data?.["3DUrl"]}`} />
                            </CarouselItem>
                            <CarouselItem>
                                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                    {data.photoUrl ? (
                                        <img
                                            src={`/assets/${data.photoUrl}`}
                                            alt={data.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        /> ) : (
                                        <div className="text-gray-400 text-sm">No Image</div>
                                    )}
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                    

                    {/* Description */}
                    <p className="text-sm text-justify  leading-relaxed text-gray-800 mb-6">
                        {data.description ?? `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.`}
                    </p>

                    {/* Shop and Maps Link */}
                    <div>
                        <p className="font-semibold text-sm mb-2">Shop Link</p>
                        <input
                            type="text"
                            value={data.shopLink ?? "Link tidak tersedia"}
                            disabled
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-500"
                        />
                        <p className="font-semibold text-sm mb-2 mt-2">GMaps Link</p>
                        <input
                            type="text"
                            value={data.gmapsLink ?? "Link tidak tersedia"}
                            disabled
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-500"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default LocalProductPage;
