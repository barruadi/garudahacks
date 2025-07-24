import { MenuBar } from "@/components/menuBar"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { LocalProductCard } from "@/components/lists/localProductCard"
import { SitesCard } from "@/components/lists/sitesCard"
import { useMenuBarOption } from "@/store/menuStore"
import { useEffect } from "react"

const LocalProductDummy = {
    id: 1,
    userName: "Barru Adi",
    title: "Tas Rajutan Tangan",
    description: "Ini adalah tas rajutan tangan yang terbuat dari rotan dan dikemas dengan sepenuh hati.",
    photoUrl: "/tasrajut.jpg",
    shopLink: "https://www.lazada.co.id/products/tas-rajut-kambing-i7624314802.html",
    gmapsLink: "https://maps.app.goo.gl/RCkjZLp3VR1ubd5R9", 
    created: "2 hari yang lalu",
    userPhoto: "/user.png",
}

const SitesDummy = {
    id: 1,
    userName: "Adi Barru",
    created: "2 hari yang lalu",
    message: "Ini adalah tas rajutan tangan yang terbuat dari rotan dan dikemas dengan sepenuh hati.",
    likesCount: 134,
    userPhoto: "/user.png",
    isInitiallyLiked: true,
}

export default function ListsPage() {
    const navigate = useNavigate();
    const menuOption = useMenuBarOption((state) => state.selected);

    useEffect(() => {
        if (menuOption === "Local Products") {
            // fetch all local-products

        }
        if (menuOption === "Cultural Sites") {
            // fetch all cultural-sites

        }

    }, [menuOption])
    

  return (
    <div className="min-h-screen bg-[#FFFCEE] text-black">
        {/* Header */}
        <div className="bg-white pt-4 px-4 flex flex-col">
            <div className="flex text-xl items-center gap-3 mb-6">
                <button onClick={() => navigate(-1)}>
                    <ChevronLeft className="w-6 h-6" />
                </button>
                Indonesia
            </div>
            <MenuBar/>
        </div>
        <div className="p-4 space-y-2">
        <LocalProductCard {...LocalProductDummy} />
        <SitesCard {...SitesDummy} />
        </div>
        
    </div>
  )
}
