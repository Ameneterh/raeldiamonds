import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import TitleText from "./TitleText";
import ProductItem from "./ProductItem";
import { GetProducts } from "../apiCalls/products";
import { message } from "antd";

export default function LatestCollection() {
  // const { products } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  const getData = async () => {
    try {
      const response = await GetProducts(null);

      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
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
            image={product.images[0]}
            name={product.product_name}
            category={product.category.split("_").join(" & ")}
            asking_price={product.asking_price}
          />
        ))}
      </div>
    </div>
  );
}
