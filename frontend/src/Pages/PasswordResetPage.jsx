import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/Input";
import { Lock } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import MainLayout from "../layout/MainLayout";
import bg_image from "../assets/bg_image.jpg";
import NormalButtons from "../Components/NormalButtons";
import Divider from "../Components/Divider";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function PasswordResetPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [user_password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user_password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, user_password);

      toast.success(
        "Password reset successfully, redirecting to login page...",
      );
      setTimeout(() => {
        navigate("/user-login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <MainLayout>
      <div
        className={`min-h-screen flex items-center justify-center w-full md:mt-10 bg-[image:var(--bg-image)] bg-cover bg-fixed`}
        style={{ "--bg-image": `url('${bg_image}')` }}
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-md mx-auto w-full bg-white/25 border-t border-t-white/35 border-l border-l-white/35 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden my-20"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-800 uppercase">
              reset <span className="text-gray-500">password</span>
            </h2>

            <Divider />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {message && (
              <p className="text-green-500 text-sm mb-4">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
              <div className="relative flex items-center w-full">
                <Input
                  icon={Lock}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New Strong Password"
                  value={user_password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-2 inset-y-0 cursor-pointer flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="size-5 text-green-500" />
                  ) : (
                    <FaEye className="size-5 text-green-500" />
                  )}
                </div>
              </div>

              <div className="relative flex items-center w-full">
                <Input
                  icon={Lock}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-2 inset-y-0 cursor-pointer flex items-center"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-green-500" />
                  ) : (
                    <FaEye className="size-5 text-green-500" />
                  )}
                </div>
              </div>

              <NormalButtons
                text={isLoading ? "Resetting..." : "Set New Password"}
              />
            </form>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
