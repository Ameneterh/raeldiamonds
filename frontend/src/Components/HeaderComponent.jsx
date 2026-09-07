import React, { useContext, useEffect, useState } from "react";
import { MdArrowForwardIos, MdNotificationsActive } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { assets } from "../assets/assets.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/shopContext.jsx";
import { GetCurrentUser } from "../apiCalls/users.js";
import { Avatar, Badge, Button, message } from "antd";
import NotificationsComponent from "./NotificationsComponent.jsx";
import {
  GetAllNotifications,
  ReadAllNotifications,
} from "../apiCalls/notifications.js";

export default function HeaderComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNofications, setShowNotifications] = useState(false);

  const validateToken = async () => {
    // try {
    //   const response = await GetCurrentUser();
    //   if (response.success) {
    //   } else {
    //     message.error(response.message);
    //   }
    // } catch (error) {
    //   message.error(error.message);
    // }
  };

  const getNotifications = async () => {
    // try {
    //   const response = await GetAllNotifications();
    //   if (response.success) {
    //     setNotifications(response.data);
    //   } else {
    //     throw new Error(response.message);
    //   }
    // } catch (error) {
    //   message.error(error.message);
    // }
  };

  const readNotifications = async () => {
    // try {
    //   const response = await ReadAllNotifications();
    //   if (response.success) {
    //     getNotifications();
    //   } else {
    //     throw new Error(response.message);
    //   }
    // } catch (error) {
    //   message.error(error.message);
    // }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getNotifications();
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-between py-5 px-2 font-medium sticky top-0 z-40 text-[12px] bg-white border-t-0 border-l-0 border-r-0 border-b-[1.5px] border-solid border-b-gray-300">
      <Link to="/" className="flex items-center gap-1">
        <img src={assets.logo} className="w-8 sm:w-16 rounded-full" />
        <div className="hidden md:flex flex-col md:text-5xl font-extrabold text-black leading-3">
          <span>Rael</span>
          <span className="-mt-2 hidden md:block text-gray-700 text-xl">
            Diamonds
          </span>
        </div>
      </Link>

      {/* links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-800">
        <NavLink to="/" className={`flex flex-col items-center`}>
          <p>Home</p>
          <hr className="w-full border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
        <NavLink to="/collections" className={`flex flex-col items-center`}>
          <p>Collection</p>
          <hr className="w-full border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
        <NavLink to="/about" className={`flex flex-col items-center`}>
          <p>About</p>
          <hr className="w-full border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
        <NavLink to="/contact" className={`flex flex-col items-center`}>
          <p>Contact</p>
          <hr className="w-full border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
      </ul>

      {/* user login, search, and cart */}
      <div className="flex items-center gap-3 sm:gap-6">
        {user ? (
          <div className="flex items-center gap-1">
            <div className="group relative">
              <div className="">
                <img
                  src={user.avatar}
                  className="w-10 cursor-pointer rounded-full"
                />
              </div>
              <div className="group-hover:block hidden absolute dropdown-menu right-0 bg-gray-50 overflow-hidden">
                <div className="p-2 font-normal">
                  <p>{user?.fullname}</p>
                  <p className="text-blue-600">@{user?.email}</p>
                </div>
                <div className="flex flex-col gap-2 w-full p-1 bg-gray-700 text-white rounded">
                  <p
                    onClick={() => {
                      if (user?.role === "user") {
                        navigate("/seller-profile");
                      } else {
                        navigate("/admin-dashboard");
                      }
                    }}
                    className="cursor-pointer hover:text-black p-1 hover:bg-slate-200"
                  >
                    Profile
                  </p>
                  <p
                    onClick={() => handleLogout()}
                    className="cursor-pointer hover:text-black p-1 hover:bg-slate-200"
                  >
                    Logout
                  </p>
                </div>
              </div>

              {/* display notifications modal */}
              <NotificationsComponent
                notifications={notifications}
                reloadNotifications={getNotifications}
                showNofications={showNofications}
                setShowNotifications={setShowNotifications}
              />
            </div>

            {/* notifications icon */}
            <Badge
              count={
                notifications.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}
              className="cursor-pointer"
            >
              <Avatar icon={<MdNotificationsActive />} />
            </Badge>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 rounded px-4 py-1 text-lg text-white cursor-pointer"
          >
            Login
          </Link>
        )}

        {/* <Link to={"/cart"} className="relative">
          <FaShoppingCart className="text-xl text-black" />
          <p className="absolute -right-2 -top-2 w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link> */}

        <FiMenu
          className="text-xl cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer bg-gray-200"
          >
            <MdArrowForwardIos className="rotate-180" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collections"
          >
            Collections
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
}
