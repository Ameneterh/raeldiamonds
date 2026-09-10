import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function NormalButtons({ text }) {
  const { isLoading } = useAuthStore();

  return (
    <motion.button
      className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-950 to-green-800 rounded-lg hover:from-green-600 hover:to-emerald-700 border border-green-700 hover:border-white hover:text-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 focus:ring-offset-gray-900 transition duration-200 cursor-pointer flex items-center justify-center"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <Loader className="animate-spin mx-auto" /> : text}
    </motion.button>
  );
}
