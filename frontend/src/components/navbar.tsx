import { 
    List, 
    User, 
    Plus 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();
    
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0px_-4px_8px_0px_rgba(0,0,0,0.05)] flex justify-around items-center h-24">
            <div className="flex flex-col items-center gap-2" onClick={() => navigate("/")} >
                <List size={24} strokeWidth={1} />
                <span className="text-xs font-normal leading-snug">Map</span>
            </div>
            <div className="relative flex flex-col items-center" onClick={() => navigate("/add-item")} >
                <div className="absolute -top-16 w-16 h-16 bg-white rounded-full shadow-[0px_0px_8px_0px_rgba(0,0,0,0.10)] flex items-center justify-center">
                    <Plus className="w-12 h-12" size={50} strokeWidth={1.25} color="#5DB1FF"/>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2" onClick={() => navigate("/profile")} >
                <User size={24} strokeWidth={1} />
                <span className="text-xs font-normal leading-snug">Profile</span>
            </div>
        </div>
    );
}
