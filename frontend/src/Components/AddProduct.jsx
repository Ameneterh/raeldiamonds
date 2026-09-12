import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout.jsx";
import { useAuthStore } from "../store/authStore.js";

import { RiArrowGoBackLine } from "react-icons/ri";
import { FaCloudDownloadAlt } from "react-icons/fa";
import {
  CalendarDays,
  FileDigit,
  FolderPen,
  Loader,
  Mail,
  MapPinCheck,
  PhoneCall,
} from "lucide-react";
import {
  MdAddBusiness,
  MdCloudUpload,
  MdLockReset,
  MdOutlineCreateNewFolder,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { TbReport } from "react-icons/tb";
import { FaSave } from "react-icons/fa";
// import { usePostStore } from "../store/postStore.js";
import ReactQuill from "react-quill";
import { modules } from "../modules.js";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import { AiOutlineProduct } from "react-icons/ai";
// import { useCategoryStore } from "../store/categoryStore.js";

export default function AddProduct() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const { user, isLoading } = useAuthStore();
  // const { savePost, isLoading } = usePostStore();
  // const { getAllCategories } = useCategoryStore();

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});

  // upload image
  const handleUploadImage = () => {
    try {
      if (!file) {
        toast.error("Please, select an image");
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

  // get categories
  const getCategories = async () => {
    // try {
    //   const { categories } = await getAllCategories();
    //   setCategories(categories);
    //   return categories;
    // } catch (error) {
    //   console.log(error);
    //   return [];
    // }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // save post
  const saveNewPost = async (e) => {
    e.preventDefault();

    // try {
    //   await savePost({
    //     postTitle: formData.postTitle,
    //     image: formData.image,
    //     category: formData.category,
    //     content: formData.content,
    //     writer: user._id,
    //   });

    //   toast.success("Post saved successfully!");
    //   navigate("/user-dashboard?tab=posts");
    // } catch (error) {
    //   toast.error(error.response.data.message);
    //   console.log(error);
    // }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="md:px-10 mt-6 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen max-w-7xl w-full mx-auto mt-2 mb-10 p-4 bg-white"
      >
        <p className="flex items-center gap-1 text-xl font-extrabold mb-6 text-blue-950 text-center border-b-2 border-b-red-900 pb-2">
          <AiOutlineProduct size={20} />
          Add Content
        </p>

        <form onSubmit={saveNewPost}>
          <div className="flex flex-col justify-center gap-y-5">
            <article className="flex flex-col gap-5 mb-4">
              {/* post title */}
              <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                  Product Name
                  <span className="text-red-600 font-bold ml-1">*</span>
                </p>
                <input
                  value={formData.product_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      product_name: e.target.value,
                    })
                  }
                  placeholder="Enter product name as it should appear when published"
                  className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex flex-row relative w-full border-none">
                  <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                    <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                      Product Image
                      <span className="text-red-600 font-bold ml-1">*</span>
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleUploadImage}
                    className="border rounded bg-blue-600 px-2 text-white hover:text-gray-300"
                  >
                    <MdCloudUpload size={24} />
                  </motion.button>
                </div>

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="upload"
                    className="bg-red-200 w-56 h-32 object-cover"
                  />
                )}

                {/* select post category */}
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    Product Category
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>
                  <select
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                    className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent capitalize"
                  >
                    <option>Select category</option>
                    {categories?.map((category) => (
                      <option
                        key={category._id}
                        value={category.name}
                        className="capitalize"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* select post subcategory */}
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    Product Sub Category
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>
                  <select
                    // value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subCategory: e.target.value,
                      })
                    }
                    className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                  >
                    <option>Select sub-category</option>
                    <option value="economy">Economy</option>
                    <option value="health">Health</option>
                    <option value="politics">Politics</option>
                    <option value="security">Security</option>
                  </select>
                </div>
              </div>

              {/* post content */}
              <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                  Product Description
                  <span className="text-red-600 font-bold ml-1">*</span>
                </p>

                <textarea className="w-full h-40" />

                {/* <ReactQuill
                  theme="snow"
                  modules={modules}
                  placeholder="Enter post content here ..."
                  className="h-96 mb-12 w-full"
                  required
                  onChange={(value) => {
                    setFormData({ ...formData, content: value });
                  }}
                /> */}
              </div>
            </article>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-x-4 gap-y-3">
              <motion.button
                className="py-2 px-6 bg-gradient-to-r from-red-600 to-red-800 rounded-lg hover:border-white hover:from-red-800 hover:to-red-600 border focus:outline-none transition duration-200 cursor-pointer flex items-center justify-center text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mx-auto" />
                    <span className="pl-3">Publishing ...</span>
                  </>
                ) : (
                  <>
                    <MdOutlinePublishedWithChanges size={20} className="mr-1" />{" "}
                    Publish
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
