import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import TitleText from "./TitleText";
import ProductItem from "./ProductItem";
import { GetProducts } from "../apiCalls/products";
import { message } from "antd";
import { products } from "../assets/assets.js";
import { Link } from "react-router-dom";

export default function LatestCollection() {
  // const { products } = useContext(ShopContext);
  // const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  const getData = async () => {
    // try {
    //   const response = await GetProducts(null);
    //   if (response.success) {
    //     setProducts(response.data);
    //   }
    // } catch (error) {
    //   message.error(error.message);
    // }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <TitleText text1={"latest"} text2={"collection"} />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our latest collection, where cutting-edge design meets
          timeless elegance. From bold statement pieces to subtle essentials,
          each item is crafted with quality and style in mind.
        </p>
      </div>

      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products.slice(0, 5).map((product, index) => (
          <ProductItem
            key={index}
            id={product._id}
            slug={product.slug}
            image={product.image[0]}
            name={product.name}
            category={product.category.split("_").join(" & ")}
            asking_price={product.price}
          />
        ))}
      </div>

      <div className="flex justify-center w-full">
        <Link
          to="/collections"
          className="block text-center bg-blue-600 hover:bg-blue-800 text-white px-3 py-2 rounded mt-6 hover:scale-x-110 transition-all duration-300 w-fit"
        >
          View All Collections
        </Link>
      </div>
    </div>
  );
}
