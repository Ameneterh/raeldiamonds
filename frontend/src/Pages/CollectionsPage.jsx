import React, { useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdFilterList } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import MainLayout from "../layout/MainLayout";
import { ShopContext } from "../context/shopContext";
import TitleText from "../Components/TitleText";
import ProductItem from "../Components/ProductItem";
import { Input } from "antd";
import { GetProducts } from "../apiCalls/products";
import ProductFiltersComponent from "../Components/ProductFiltersComponent";
import { products } from "../assets/assets.js";

export default function CollectionsPage() {
  // const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    sub_category: [],
    searchTerm: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [filterProducts, setFlterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const getData = async () => {
    try {
      const response = await GetProducts(filters);

      if (response.success) {
        let productsCopy = response.data.slice();
        if (searchTerm) {
          productsCopy = productsCopy.filter((item) =>
            item.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
        }
        setProducts(productsCopy);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters, searchTerm]);

  return (
    <MainLayout>
      <div className="text-2xl text-center my-8">
        <TitleText text1={"our"} text2={"collections"} />
        <p className="max-w-xl text-center mx-auto text-xs">
          Brief word about collections. Omnis quisquam unde voluptatibus
          quibusdam et expedita. Rerum officiis quae dicta, fugit, facere
          dolores voluptate, rem ad minima ratione explicabo. Quaerat, quod?
        </p>
      </div>

      <div className="flex gap-5 min-h-svh max-w-7xl mx-auto p-2 mb-8">
        {showFilters && (
          <ProductFiltersComponent
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex gap-5 items-center">
            {!showFilters && (
              <div
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <p className="text-primary">Filters</p>
                <MdFilterList className="w-5 h-5" />
              </div>
            )}

            {/* search bar */}
            <div className="w-full flex items-center relative">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search products here ..."
                className="border border-gray-300 input-rounded-full border-solid pl-8 p-2 h-14 flex-1"
              />
              <IoSearchOutline className="absolute left-2 w-5 h-5" />
            </div>
          </div>

          {/* product grid  */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ${
              showFilters
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {products?.map((product, index) => (
              <ProductItem
                key={index}
                id={product?._id}
                slug={product.slug}
                name={product?.name}
                category={product?.category.split("_").join(" & ")}
                description={product?.description}
                delivery={product?.logistics_included}
                asking_price={product?.price}
                image={product?.image[0]}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
