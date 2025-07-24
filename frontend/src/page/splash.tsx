import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const splashPage = () => {
  const navigate = useNavigate();

  const handleClick = (nav: string) => {
    navigate(nav); // Navigate to /signin
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-[#FFFCEE] px-6 pb-8">
      {/* Top content */}
      <motion.div
        className="flex flex-col items-center mt-24"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <MapPin
            className="w-40 h-40 text-[#B48B57] mb-6"
            strokeWidth={1.75}
          />
        </motion.div>

        <motion.h1
          className="text-4xl font-semibold text-black font-rye"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.4, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Culture
        </motion.h1>
      </motion.div>

      {/* Buttons */}
      <div className="w-full absolute bottom-16 max-w-sm space-y-4">
        <motion.div
          className="w-full absolute bottom-16 max-w-sm space-y-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick("/signin")}
            className="w-full border !border-[#B48B57] text-[#B48B57] !bg-[#FFFCEE] py-3 rounded-md shadow-md"
          >
            Sign In
          </motion.button>
          <motion.button
            onClick={() => handleClick("/signup")}
            className="w-full !bg-[#B48B57] text-white py-3 rounded-md shadow-md"
          >
            Sign Up
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom map illustration */}
      <div
        className="w-full h-32 bg-no-repeat bg-contain bg-bottom"
        style={{ backgroundImage: "url('/images/indonesia-map.png')" }}
      />
    </div>
  );
};

export default splashPage;
