import { UserCircle } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-start gap-3 relative bg-[#FFFCEE] min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-50 pt-12 px-4 flex flex-col pb-12">
            <div className="flex text-xl items-center gap-3">
            <button onClick={() => navigate("/map")}>
                <ChevronLeft className="w-6 h-6" />
            </button>
            Profile
            </div>
        </div>
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-2 pt-6">
        <div className="bg-[#CBD5E1] rounded-full p-3">
          <UserCircle size={64} strokeWidth={1.5} />
        </div>
        <div className="text-lg font-semibold">John Doe</div>
        <div className="text-sm text-gray-500">johndoe@example.com</div>
      </div>
        <Button
            type="submit"
            className="m-4 mt-88 !bg-[#F51B19] !text-white"
          >
            Logout
          </Button>

    </div>
  );
}
