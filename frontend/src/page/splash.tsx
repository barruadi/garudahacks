import { useNavigate } from "react-router-dom"
import { MapPin } from "lucide-react"

const splashPage = () => {

    const navigate = useNavigate()

    const handleClick = (nav: string) => {
        navigate(nav) // Navigate to /signin
    }

    return (
        <div className="flex flex-col justify-between items-center h-screen bg-[#FFFCEE] px-6 pb-8">
      {/* Top content */}
      <div className="flex flex-col items-center mt-24">
        <MapPin className="w-40 h-40 text-[#B48B57] mb-6" strokeWidth={1.75} />
        <h1 className="text-4xl font-semibold text-black">Budaya</h1>
      </div>

      {/* Buttons */}
      <div className="w-full absolute bottom-16 max-w-sm space-y-4">
        <button
          onClick={() => handleClick("/signin")}
          className="w-full border !border-[#B48B57] text-[#B48B57] !bg-[#FFFCEE] py-3 rounded-md shadow-md"
        >
          Sign In
        </button>

        <button
          onClick={() => handleClick("/signup")}
          className="w-full !bg-[#B48B57] text-white py-3 rounded-md shadow-md"
        >
          Sign Up
        </button>
      </div>

      {/* Bottom map illustration */}
      <div
        className="w-full h-32 bg-no-repeat bg-contain bg-bottom"
        style={{ backgroundImage: "url('/images/indonesia-map.png')" }}
      />
    </div>
    )
}

export default splashPage;