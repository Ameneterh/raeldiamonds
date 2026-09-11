import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Input } from "../Components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import bg_image from "../assets/bg_image.jpg";
import Divider from "../Components/Divider";
import NormalButtons from "../Components/NormalButtons";

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

export default function ForgotPasswordPage() {
  const [user_email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(user_email);
    setIsSubmitted(true);
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
              forgot <span className="text-gray-500">password</span>
            </h2>

            <Divider />

            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-6"
              >
                <p className="text-black mb-6 text-center">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <Input
                  icon={Mail}
                  type="email"
                  placeholder="Email Address"
                  value={user_email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <NormalButtons text="Send Reset Link" />
              </form>
            ) : (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Mail className="h-8 w-8 text-white" />
                </motion.div>
                <p className="text-gray-300 mb-6">
                  If an account exists for {user_email}, you will receive a
                  password reset link shortly.
                </p>
              </div>
            )}
          </div>

          <div className="px-8 py-4 bg-black/80 flex justify-center">
            <Link
              to={"/user-login"}
              className="text-sm text-green-400 hover:underline flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
