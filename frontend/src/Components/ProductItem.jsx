import React, { useContext } from "react";
// import { ShopContext } from "../context/shopContext";
import { Link } from "react-router-dom";
import Divider from "./Divider";

export default function ProductItem({
  id,
  slug,
  image,
  name,
  category,
  sub_category,
  description,
  delivery,
  asking_price,
}) {
  // const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${slug}`}
      className="text-gray-700 cursor-pointer rounded-md overflow-hidden bg-red-300 w-full min-h-72 flex flex-col justify-end hover:scale-110 transition-all duration-300 hover:shadow-lg"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* <div className="overflow-hidden h-36 sm:h-52"> */}
      {/* <img
        src={image}
        alt={name}
        className="hover:scale-110 transition ease-in-out"
      /> */}
      {/* </div> */}

      <div className="flex flex-col gap-1 bg-gray-950 bg-opacity-55 backdrop-blur-lg shadow-lg p-2 text-white">
        <p className="text-sm font-bold line-clamp-1">{name}</p>
        <div className="flex items-center justify-between text-xs">
          <p className="px-2 capitalize bg-gray-800 rounded-full text-yellow-500">
            {category}
          </p>
        </div>
        <p className="text-xs line-clamp-2 mb-1">{description}</p>
        <hr className="h-[1.5px] bg-gray-400" />
        <p className="flex items-center justify-between">
          <span className="text-sm font-medium flex items-center  text-white">
            {/* {currency} */}N {asking_price?.toLocaleString()}
          </span>
          <span
            className={`text-xs ${
              delivery ? "py-1 px-2" : "p-0"
            } rounded bg-green-500 text-white`}
          >
            {delivery ? "Plus Shipping" : null}
          </span>
        </p>
      </div>
    </Link>
  );
}
