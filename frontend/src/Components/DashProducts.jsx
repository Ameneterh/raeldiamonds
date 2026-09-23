import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AiOutlineProduct } from "react-icons/ai";
import { Loader } from "lucide-react";
import {
  MdEditNote,
  MdOutlineDeleteSweep,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import { useAuthStore } from "../store/authStore";
import { useProductStore } from "../store/productStore";

export default function DashProducts() {
  const { user } = useAuthStore();
  const { getProducts } = useProductStore();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const getAllProducts = async () => {
    try {
      const { products } = await getProducts();
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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

  console.log(products);

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
          Products Listing
        </p>
        <div className="flex items-center justify-end">
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
        </div>
        <div className="w-full min-h-svh table-auto overflow-x-scroll md:mx-auto p-3 md:p-0 mt-4 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          {products.length > 0 ? (
            <>
              <table className="w-full text-left text-sm">
                <thead>
                  <th>Product Details</th>
                  <th>Product Description</th>
                  <th>Actions</th>
                </thead>
                {products?.map((product) => (
                  <tbody className="">
                    <td className="flex flex-col">
                      <img src="" alt="" />
                      <div className="flex flex-col">
                        <Link
                          to={`/product/${product.slug}`}
                          className="hover:underline underline-offset-2"
                        >
                          {product.product_name}
                        </Link>
                        <p className="text-xs">
                          Category:{" "}
                          <span className="capitalize">
                            {product.category_name.category_name}
                          </span>
                        </p>
                      </div>
                    </td>
                    <td className="md:w-2/3">{product.description}</td>
                    <td className="flex items-center gap-2">
                      <MdEditNote
                        size={20}
                        className="text-green-700 cursor-pointer hover:scale-125 transition-all duration-500"
                      />
                      <MdOutlineDeleteSweep
                        size={20}
                        className="text-red-700 cursor-pointer hover:scale-125 transition-all duration-500"
                      />
                    </td>
                  </tbody>
                ))}
              </table>
            </>
          ) : (
            <p>No products found!</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
