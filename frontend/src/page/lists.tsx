import { MenuBar } from "@/components/menuBar"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { LocalProductCard } from "@/components/lists/localProductCard"
import { SitesCard } from "@/components/lists/sitesCard"
import { useMenuBarOption } from "@/store/menuStore"
import { useEffect, useState } from "react"
import type { LocalProductCardProps, SitesCardProps } from "@/types/pins.types"

import { API_BASE_URL } from "@/config/api"

export default function ListsPage() {
    const navigate = useNavigate();
    const menuOption = useMenuBarOption((state) => state.selected);
    const [loading, setLoading] = useState(false);

    const [localProductList, setLocalProductList] = useState<LocalProductCardProps[]>([]);
    const [sitesList, setSitesList] = useState<SitesCardProps[]>([]);

    const fetchData = async () => {
        // Fetch Sites
        setLoading(true);
        try {

            const sitesRes = await fetch(`${API_BASE_URL}/api/sites`);
            if (!sitesRes.ok) {
                const errorData = await sitesRes.json();
                throw new Error(errorData.error || "Error Fetch Sites Data");
            }
            const sitesData = await sitesRes.json();
            setSitesList(sitesData.data);
            
            // Fetch Sites
            const localProductRes = await fetch(`${API_BASE_URL}/api/local-products`);
            if (!localProductRes.ok) {
                const errorData = await localProductRes.json();
                throw new Error(errorData.error || "Error Fetch Sites Data");
            }
            const localProductData = await localProductRes.json();
            setLocalProductList(localProductData.data);
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [menuOption])
    

  return (
    <div className="min-h-screen bg-[#FFFCEE] text-black">

        {/* Header */}
        <div className="sticky top-0 z-50 bg-white pt-12 px-4 flex flex-col shadow-md">
            <div className="flex text-xl items-center gap-3">
            <button onClick={() => navigate("/map")}>
                <ChevronLeft className="w-6 h-6" />
            </button>
            Indonesia
            </div>
            <MenuBar />
        </div>
        <div className="p-4 space-y-2">
            <div className="space-y-4 min-h-[300px]">
            {loading ? (
                <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-black" />
                </div>
            ) : (
                <>
                {menuOption === "Local Products" &&
                    localProductList.map((product) => (
                    <LocalProductCard key={product.id} {...product} />
                    ))}
                {menuOption === "Cultural Sites" &&
                    sitesList.map((site) => (
                    <SitesCard key={site.id} {...site} />
                    ))}
                </>
            )}
            </div>
        </div>
        
    </div>
  )
}
