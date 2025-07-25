import { MenuBar } from "@/components/menuBar"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { LocalProductCard } from "@/components/lists/localProductCard"
import { SitesCard } from "@/components/lists/sitesCard"
import { useMenuBarOption } from "@/store/menuStore"
import { useEffect, useState } from "react"
import type { LocalProductCardProps, SitesCardProps } from "@/types/pins.types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function ListsPage() {
    const navigate = useNavigate();
    const menuOption = useMenuBarOption((state) => state.selected);

    const [localProductList, setLocalProductList] = useState<LocalProductCardProps[]>([]);
    const [sitesList, setSitesList] = useState<SitesCardProps[]>([]);

    const fetchData = async () => {
        // Fetch Sites
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
    }

    useEffect(() => {
        fetchData();
        if (menuOption === "Local Products") {
            // fetch all local-products
            

            setSitesList([]);
        }
        if (menuOption === "Cultural Sites") {
            // fetch all cultural-sites
            setLocalProductList([]);
        }

    }, [menuOption])
    

  return (
    <div className="min-h-screen bg-[#FFFCEE] text-black">
        {/* Header */}
        <div className="bg-white pt-4 px-4 flex flex-col">
            <div className="flex text-xl items-center gap-3 mb-6">
                <button onClick={() => navigate("/map")}>
                    <ChevronLeft className="w-6 h-6" />
                </button>
                Indonesia
            </div>
            <MenuBar/>
        </div>
        <div className="p-4 space-y-2">
        {menuOption === "Local Products" &&
            localProductList.map((product) => (
                <LocalProductCard key={product.id} {...product} />
        ))}
        {menuOption === "Cultural Sites" &&
            sitesList.map((site) => (
            <SitesCard key={site.id} {...site} />
        ))}
        </div>
        
    </div>
  )
}
