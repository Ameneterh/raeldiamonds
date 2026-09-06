import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import TitleText from "./TitleText";
import ProductItem from "./ProductItem";

export default function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller);
    setBestseller(bestProduct.slice(0, 5));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <TitleText text1={"best"} text2={"sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
          voluptate, laborum eveniet corrupti sunt nam voluptatum est
          perspiciatis nemo vero incidunt provident temporibus et vitae impedit
          minus quas labore dolor.
        </p>
      </div>

      {/* display bestsellers list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestseller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.nam}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
