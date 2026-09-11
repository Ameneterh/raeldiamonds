import { motion } from "framer-motion";
import { Input, PasswordInput } from "../Components/Input";
import { Mail, KeySquare, Loader, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import MainLayout from "../layout/MainLayout";
import bg_image from "../assets/bg_image.jpg";
import Divider from "../Components/Divider";
import { toast } from "react-hot-toast";

const rules = [{ required: true, message: "Field Value Required" }];

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, login, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/user-dashboard?tab=dash");
      toast.success("Login successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div
        className={`min-h-screen flex items-center justify-center w-full bg-[image:var(--bg-image)] bg-cover bg-fixed`}
        style={{ "--bg-image": `url('${bg_image}')` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto w-full bg-white bg-opacity-25 border-t border-t-white/35 border-l border-l-white/35 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden my-10"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-900 uppercase">
              Welcome <span className="text-gray-600">back!</span>
            </h2>

            <Divider />

            <form onSubmit={handleLogin} className="flex flex-col gap-2 mt-6">
              <Input
                icon={Mail}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative flex items-center w-full">
                <PasswordInput
                  icon={KeySquare}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Strong Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-2 inset-y-0 cursor-pointer flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-yellow-950" />
                  ) : (
                    <Eye className="size-5 text-yellow-950" />
                  )}
                </div>
              </div>

              <div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-950 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {error && (
                <p className="text-red-800 font-semibold mt-2 p-2 text-center bg-red-100 rounded">
                  {error}
                </p>
              )}

              <motion.button
                className="normal_button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="w-6 h-6 animate-spin mx-auto text-white font-bold" />
                ) : (
                  "Login"
                )}
              </motion.button>

              {/* <NormalButtons text="Login" /> */}
            </form>
          </div>

          <div className="px-8 py-4 bg-black/80 flex justify-center">
            <p className="text-sm text-gray-400">
              Don't have an account yet?{" "}
              <Link to="/register" className="text-green-400 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}

// import React, { useEffect, useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import TitleText from "../Components/TitleText";
// import { Link, useNavigate } from "react-router-dom";
// import { Input, PasswordInput } from "../Components/Input";
// import { Eye, EyeOff, KeySquare, Mail } from "lucide-react";
// import { motion } from "framer-motion";
// // import { Button, Form, Input, message } from "antd";
// import Divider from "../Components/Divider";
// import { LoginUser } from "../apiCalls/users";
// import MainLayout from "../layout/MainLayout";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState("");

//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const rules = [
//     {
//       required: true,
//       message: "All fields required!",
//     },
//   ];

//   const handleFormSubmit = async (values) => {
//     // try {
//     //   const response = await LoginUser(values);
//     //   if (response.success) {
//     //     message.success(response.message);
//     //     localStorage.setItem("token", response.data);
//     //     window.location.href = "/";
//     //   } else {
//     //     throw new Error(response.message);
//     //   }
//     // } catch (error) {
//     //   message.error(error.message);
//     // }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       navigate("/");
//     }
//   }, []);

//   return (
//     <MainLayout>
//       <div className="min-h-screen bg-gray-300 flex flex-col justify-center px-2">
//         <div className="w-full max-w-xl mx-auto bg-white p-4 sm:p-10 shadow rounded sm:rounded-lg">
//           <div className="text-xl sm:text-2xl font-bold flex items-center gap-2">
//             <TitleText text1={"login"} />
//           </div>
//           <Divider />
//           <form
//             onSubmit={handleFormSubmit}
//             className="flex flex-col gap-2 mt-6"
//           >
//             <Input
//               icon={Mail}
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <div className="relative flex items-center w-full">
//               <PasswordInput
//                 icon={KeySquare}
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter Strong Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div
//                 className="absolute right-2 inset-y-0 cursor-pointer flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="size-5 text-green-500" />
//                 ) : (
//                   <Eye className="size-5 text-green-500" />
//                 )}
//               </div>
//             </div>

//             <div>
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-green-950 hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             {error && (
//               <p className="text-red-800 font-semibold mt-2 p-2 text-center bg-red-100 rounded">
//                 {error}
//               </p>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-green-950 text-white font-semibold py-2 px-4 rounded hover:bg-green-800 transition duration-300 ease-in-out"
//             >
//               {isLoading ? (
//                 <Loader className="w-6 h-6 animate-spin mx-auto text-white font-bold" />
//               ) : (
//                 "Login"
//               )}
//             </button>

//             {/* <NormalButtons text="Login" /> */}
//           </form>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
