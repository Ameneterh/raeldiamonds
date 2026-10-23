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
import DashProducts from "../Components/DashProducts";
import DashCategories from "../Components/DashCategories";

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

  return (
    <MainLayout>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full min-h-screen flex flex-col"
      >
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
          {tab === "category-list" && <DashCategories />}

          {/* for users */}
          {tab === "products" && <DashProducts />}

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
    </MainLayout>
  );
}
