import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AiOutlineProduct } from "react-icons/ai";
import { BellPlus, Loader } from "lucide-react";
import {
  MdCloudUpload,
  MdOutlineContentPasteGo,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import { TbCategoryPlus } from "react-icons/tb";
import { useAuthStore } from "../store/authStore.js";
import { useCategoryStore } from "../store/categoryStore.js";

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

export default function DashCategories() {
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const { addCategory, getCategories, isLoading, error } = useCategoryStore();

  const [userPosts, setUserPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const MAX_FILE_SIZE = 300 * 1024; // 300 KB

  //   upload image to firebase
  const handleUploadImage = () => {
    try {
      if (!file) {
        toast.error("Please, select an image");
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `Image size must not exceed 300 KB. Your file is ${(file.size / 1024).toFixed(0)} KB.`,
        );
        return;
      }

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
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
          toast.error("Image upload failed!");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prev) => ({
              ...prev,
              image: downloadURL,
            }));
          });
        },
      );
    } catch (error) {
      console.error("OUTER UPLOAD ERROR:", error);

      toast.error(error?.message || "Image upload failed!!");

      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      // const res = await fetch(
      //   `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,
      // );
      // const data = await res.json();
      // if (res.ok) {
      //   setUserPosts((prev) => [...prev, ...data.posts]);
      //   if (data.posts.length < 9) {
      //     setShowMore(false);
      //   }
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      // const res = await fetch(
      //   `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
      //   { method: "DELETE" },
      // );
      // const data = await res.json();
      // if (!res.ok) {
      //   console.log(data.message);
      // } else {
      //   setUserPosts((prev) =>
      //     prev.filter((post) => post._id !== postIdToDelete),
      //   );
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  //   data submission function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCategory({
        category_name: formData.category_name,
        image: formData.image,
        category_description: formData.category_description,
        addedBy: user._id,
      });
      getAllCategories();
      toast.success("New Category Added Successfully!");
      setFormData({ category_name: "", category_description: "", file: "" });
      //   navigate("/user-dashboard?tab=category-list");
    } catch (error) {
      console.log("ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
    }
  };

  //   getting categories
  const getAllCategories = async () => {
    try {
      const { categories } = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [user]);

  console.log(categories);

  return (
    <div className="md:px-10 mt-6 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen max-w-7xl w-full mx-auto mt-2 mb-10 p-4"
      >
        <p className="flex items-center gap-1 text-xl font-extrabold mb-6 text-blue-950 text-center border-b-2 border-b-red-900 pb-2">
          <MdOutlineContentPasteGo size={20} />
          Categories Listing
        </p>
        {/* <div className="flex items-center justify-end">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-x-4 gap-y-3">
            <Link
              to="/user-dashboard?tab=add-product"
              className="py-2 px-4 bg-gradient-to-r from-red-600 to-red-800 rounded-lg hover:border-white hover:from-red-800 hover:to-red-600 border focus:outline-none transition duration-200 cursor-pointer flex items-center justify-center text-white"
            >
              <>
                <MdOutlinePublishedWithChanges size={20} className="mr-1" /> Add
                Product
              </>
            </Link>
          </div>
        </div> */}

        <div className="flex flex-col sm:flex-row gap-10">
          {/* add new category */}

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col w-full max-w-72 bg-opacity-40 max-h-fit border-2 border-gray-700 shadow-md shadow-gray-500 rounded-md p-3"
          >
            <p className="text-lg font-bold text-red-900">
              <TbCategoryPlus size={20} />
              Add New Category
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-5">
              <div className="flex flex-col sm:flex-row gap-3 relative w-full">
                <p className="text-xs bg-white absolute -top-2 px-1 flex items-center gap-[2px] text-gray-400">
                  Category Name
                  <span className="text-red-600 font-bold ml-1">*</span>
                </p>
                <input
                  id="category_name"
                  value={formData.category_name}
                  onChange={handleChange}
                  className="bg-white bg-opacity-5 w-full sm:w-1/4 pl-3 pr-3 py-2 border border-t-transparent border-l-transparent border-r-transparent placeholder-gray-400 transition duration-200 flex-1 text-xs focus:border-transparent focus:ring-0 focus:outline-none focus:border-b-red-600 border-b-gray-800"
                />
              </div>
              <div className="flex flex-row relative w-full">
                <div className="flex flex-row gap-3 relative w-full border-2 border-red-600">
                  <div className="flex flex-col sm:flex-row gap-3 relative w-full">
                    <p className="text-xs bg-white absolute -top-2 px-1 flex items-center gap-[2px] text-gray-400">
                      Category Image
                      <span className="text-red-600 font-bold ml-1">*</span>
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full sm:w-1/4 pl-2 pr-3 py-2 mt-1 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleUploadImage}
                    className="px-2 text-blue-700 hover:text-blue-500 bg-transparent border-none"
                  >
                    <MdCloudUpload
                      size={30}
                      className="hover:scale-105 transition-all duration-300"
                    />
                  </motion.button>
                </div>
              </div>

              {formData.image && (
                <img
                  src={formData.image}
                  alt="upload"
                  className="bg-red-200 w-56 h-32 object-cover"
                />
              )}
              <div className="flex flex-col sm:flex-row gap-3 relative w-full">
                <p className="text-xs bg-white absolute -top-2 px-1 flex items-center gap-[2px] text-gray-400">
                  Category Description
                  <span className="text-red-600 font-bold ml-1">*</span>
                </p>
                <textarea
                  id="category_description"
                  value={formData.category_description}
                  onChange={handleChange}
                  rows={4}
                  //   placeholder="Category description ..."
                  className="bg-white bg-opacity-5 w-full sm:w-1/4 pl-3 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-200 flex-1 text-xs focus:border-transparent focus:ring-0 focus:outline-none focus:border-b-red-600"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 text-xs bg-blue-700 hover:bg-opacity-90 rounded px-3 py-2 text-white max-w-fit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-1">
                    <Loader
                      size={18}
                      className="animate-spin mx-auto text-white font-bold"
                    />
                    <p>Adding ...</p>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-white">
                    <BellPlus size={18} className="text-white font-bold" />
                    <p>Add Category</p>
                  </span>
                )}
              </button>
            </form>
          </motion.div>

          {/* display categories list */}
          {categories ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-6 p-2 md:p-0 w-full">
              {categories?.map((category) => (
                <div
                  className="w-full max-w-96 flex items-start gap-3"
                  //   style={{
                  //     backgroundImage: `url(${category.image})`,
                  //     backgroundPosition: "center",
                  //     backgroundRepeat: "no-repeat",
                  //     backgroundSize: "cover",
                  //   }}
                >
                  <img src={category.image} className="h-20 w-20 rounded-lg" />
                  <table className="w-full text-xs border-collapse border-0">
                    <tbody>
                      <tr>
                        <td className="font-bold align-top py-1 pr-2 whitespace-nowrap">
                          Category:
                        </td>
                        <td className="py-1">{category.category_name}</td>
                      </tr>

                      <tr>
                        <td className="font-bold align-top py-1 pr-2 whitespace-nowrap">
                          Description:
                        </td>
                        <td className="py-1">
                          {category.category_description}
                        </td>
                      </tr>

                      <tr>
                        <td className="font-bold align-top py-1 pr-2 whitespace-nowrap">
                          View Items:
                        </td>
                        <td className="py-1">
                          <Link
                            to={`/${category.slug}`}
                            className="hover:underline underline-offset-2"
                          >
                            {category.slug}
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <>No Categories Found!</>
          )}
        </div>
      </motion.div>
    </div>
  );
}
