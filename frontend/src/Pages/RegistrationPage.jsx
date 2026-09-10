import React, { useEffect, useState } from "react";
import {
  Headset,
  MapPinHouse,
  FilePenLine,
  PhoneCall,
  CircleUserRound,
  Mail,
  KeySquare,
  Building2,
  Loader,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input, PasswordInput } from "../components/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import TitleText from "../Components/TitleText";
import Divider from "../Components/Divider";
import { RegisterUser } from "../apiCalls/users";
import MainLayout from "../layout/MainLayout";
import bg_image from "../assets/bg_image.jpg";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

export default function RegistrationPage() {
  const { addUser, isLoading, login, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const [image, setImage] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const [avatar, setAvatar] = useState(false);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      // if (!file) {
      //   setImageUploadError("Please, select an image");
      //   return;
      // }
      // setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = name + "-" + new Date().getTime();
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed!");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        },
      );
    } catch (error) {
      setImageUploadError("Image upload failed!!");
      setImageUploadProgress(null);
    }
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    try {
      await addUser({
        fullname,
        email,
        phone,
        password,
        role,
        address,
      });
      navigate("/user-dashboard?tab=dash");
    } catch (error) {
      console.log("ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
    }
  };

  return (
    <MainLayout>
      <div
        className={`min-h-screen flex items-center justify-center w-full bg-[image:var(--bg-image)] bg-cover bg-fixed p-2`}
        style={{ "--bg-image": `url('${bg_image}')` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto w-full bg-white/25 border-t border-t-white/35 border-l border-l-white/35 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden my-20"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-800 uppercase">
              Create <span className="text-gray-500">Account</span>
            </h2>

            <Divider />

            <form
              onSubmit={handleRegisterUser}
              className="flex flex-col gap-4 mt-6"
            >
              <div className="flex flex-col md:flex-row items-center gap-5">
                <Input
                  icon={CircleUserRound}
                  type="text"
                  placeholder="Full Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />

                <select
                  onChange={(e) => setRole(e.target.value)}
                  className="py-[6px] bg-white rounded-lg border border-gray-700 focus:border-yellow-800 focus:ring-2 focus:ring-gray-500 text-yellow-950 placeholder-yellow-900 transition duration-200"
                >
                  <option value="">Select User Role</option>
                  <option value="client">Client</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-5">
                <Input
                  icon={Mail}
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  icon={PhoneCall}
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-5">
                <Input
                  icon={Building2}
                  type="text"
                  placeholder="Delivery Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                      <EyeOff className="size-5 text-yellow-800" />
                    ) : (
                      <Eye className="size-5 text-yellow-800" />
                    )}
                  </div>
                </div>
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
                  "Register Account"
                )}
              </motion.button>
            </form>
          </div>

          <div className="px-8 py-4 bg-black/80 flex justify-center">
            <p className="text-sm text-gray-400">
              Already registered?{" "}
              <Link to="/login" className="text-green-400 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
