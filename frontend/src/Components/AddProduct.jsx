import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore.js";
import { Loader } from "lucide-react";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import { AiOutlineProduct } from "react-icons/ai";
import { useCategoryStore } from "../store/categoryStore.js";
import { useProductStore } from "../store/productStore.js";

export default function AddProduct() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const { user, isLoading } = useAuthStore();
  const { getCategories, error } = useCategoryStore();
  const { addProduct } = useProductStore();

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

  // save post
  const saveNewProduct = async (e) => {
    e.preventDefault();

    try {
      await addProduct({
        product_name: formData.product_name,
        category_name: formData.category_name,
        sub_category: formData.sub_category,
        description: formData.description,
        addedBy: user._id,
      });

      toast.success("New product added successfully!");
      navigate("/user-dashboard?tab=products");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  console.log(formData);

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
          Add Product
        </p>

        <form onSubmit={saveNewProduct}>
          <div className="flex flex-col justify-center gap-y-5">
            <article className="flex flex-col gap-5 mb-4">
              {/* post title */}
              <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                  Product Name
                  <span className="text-red-600 font-bold ml-1">*</span>
                </p>
                <input
                  id="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  placeholder="Enter product name as it should appear when published"
                  className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    Product Price
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>
                  <input
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter product price"
                    className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                  />
                </div>

                {/* <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    Product Price
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>
                  <input
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter product price"
                    className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                  />
                </div> */}
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
                    id="category_name"
                    value={formData.category_name}
                    onChange={handleChange}
                    className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent capitalize"
                  >
                    <option>Select category</option>
                    {categories?.map((category) => (
                      <option
                        key={category._id}
                        value={category._id}
                        className="capitalize"
                      >
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* select post subcategory */}
                {formData.category_name === "watches" ? (
                  <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                    <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                      Product Sub Category
                      <span className="text-red-600 font-bold ml-1">*</span>
                    </p>
                    <select
                      id="subCategory"
                      onChange={handleChange}
                      className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                    >
                      <option>Select sub-category</option>
                      <option value="economy">Economy</option>
                      <option value="health">Health</option>
                      <option value="politics">Politics</option>
                      <option value="security">Security</option>
                    </select>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                {/* product description */}
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 left-2 px-1 flex items-center gap-[2px]">
                    Product Description
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>

                  <textarea
                    id="description"
                    className="w-full h-40 rounded-md p-2"
                    placeholder="Enter product description here ..."
                    onChange={handleChange}
                  />
                </div>

                {/* freebies */}
                <div className="flex flex-col gap-3 relative w-full border-none items-start">
                  {/* free delivery */}
                  <div className="flex items-center gap-2">
                    <label className="text-nowrap text-sm flex items-center gap-1">
                      <input
                        type="checkbox"
                        id="deliveryIncluded"
                        checked={formData.deliveryIncluded}
                        onChange={handleChange}
                      />
                      Free Delivery
                    </label>
                  </div>

                  {/* free gift */}
                  <div className="flex items-center">
                    <label className="text-nowrap text-sm flex items-center gap-1">
                      <input
                        type="checkbox"
                        id="freeGift"
                        checked={formData.freeGift}
                        onChange={handleChange}
                      />
                      Free Gift(s)
                    </label>
                  </div>
                </div>
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
