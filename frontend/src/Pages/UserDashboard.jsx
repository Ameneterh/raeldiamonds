import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import MainLayout from "../layout/MainLayout";
import { Link, useLocation } from "react-router-dom";
import DashSidebar from "../Components/DashSidebar";
import DashboardComponent from "../Components/DashboardComponent";
import DashUsers from "../Components/DashUsers";
import DashProfile from "../Components/DashProfile";
import { MdLogout } from "react-icons/md";
import AddProduct from "../Components/AddProduct";

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

export default function UserDashboard() {
  const { user, logout, isLoading } = useAuthStore();

  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  console.log(user);

  return (
    // <MainLayout>
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full min-h-screen flex flex-col"
    >
      <div className="flex flex-col items-end w-full px-2 md:px-10 py-3 border-b-2 border-b-yellow-950 bg-yellow-500">
        {user ? (
          <div className="px-2 py-1 rounded flex items-center gap-2">
            {user?.role === "owner" ||
            user?.role === "architect" ||
            user?.role === "staff" ? (
              <>
                <Link
                  to={"/user-dashboard?tab=messages"}
                  className="flex items-center relative"
                >
                  <img src={user?.image} className="rounded-full h-8 w-8" />
                  <div className="p-2 rounded-full bg-red-600 absolute top-1 left-5 flex items-center justify-center text-white text-xs w-4 h-4 border border-white">
                    {/* {notifications?.unreadCount || 0} */}3
                  </div>
                </Link>
                <p className="font-bold text-md text-blue-800">
                  <Link
                    to={"/user-dashboard?tab=dash"}
                    className=" uppercase cursor-pointer underline underline-offset-2 hover:scale-110 transition-all duration-500"
                  >
                    {user?.fullname?.split(" ")[0]}
                  </Link>
                </p>
              </>
            ) : (
              <></>
            )}

            <div className="flex items-center ml-4 bg-red-100 px-2 py-1 rounded">
              <MdLogout
                className="text-lg text-red-600 cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={() => logout()}
              />
            </div>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="px-4 py-1 cursor-pointer bg-blue-700 text-white hover:bg-white hover:text-blue-900 rounded hover:scale-110 transition-all duration-500 mt-1"
          >
            Login
          </Link>
        )}
      </div>
      {/* <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          Dashboard
        </h2> */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-screen flex flex-col md:flex-row"
      >
        {/* Sidebar */}
        <div className="">
          <DashSidebar />
        </div>

        {/* for dashboard */}
        {tab === "dash" && <DashboardComponent />}

        {/* profile ... */}
        {tab === "profile" && <DashProfile />}

        {/* for users */}
        {tab === "users" && <DashUsers />}

        {/* for users */}
        {tab === "add-category" && <DashUsers />}

        {/* for users */}
        {tab === "add-product" && <AddProduct />}

        {/* <div className="space-y-6">
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Profile Information
            </h3>
            <p className="text-gray-300">Name: {user.fullname}</p>
            <p className="text-gray-300">Email: {user.user_email}</p>
          </motion.div>
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Account Activity
            </h3>
            <p className="text-gray-300">
              <span className="font-bold">Joined: </span>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Last Login: </span>

              {formatDate(user.lastLogin)}
            </p>
          </motion.div>
        </div> */}
      </motion.div>
    </motion.div>
    // </MainLayout>
  );
}
