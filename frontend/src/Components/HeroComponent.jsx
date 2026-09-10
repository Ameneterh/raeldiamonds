import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { categories } from "../assets/assets";

export default function HeroComponent() {
  const date = new Date();
  const navigate = useNavigate();

  console.log(categories);

  return (
    <div className="w-full min-h-[80svh] flex items-center justify-between flex-col pt-10 sm:pt-0 sm:flex-row relative">
      {/* hero left side */}
      <div className="w-full flex items-center justify-center absolute inset-0 z-10 bg-black bg-opacity-70">
        <div className="text-white w-full flex flex-col justify-center">
          <div className="flex items-center gap-2 w-full">
            {/* <p className="w-8 md:w-full h-[2px] bg-[#414141] flex-1"></p> */}
            <p className="text-sm md:text-base uppercase font-semibold w-full text-center">
              {date.toLocaleString("default", { month: "long" })} deals{" "}
              <span className="text-xl">&#128293;</span>
            </p>
            {/* <p className="w-8 md:w-full h-[2px] bg-[#414141] flex-1"></p> */}
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-center">
            Latest Arrivals
          </h1>

          <p className="my-2 text-xl text-center capitalize max-w-xl mx-auto">
            We picked every item with care just for you,{" "}
            <span className="sm:block">
              Discover exquisite pieces designed to elevate your style,
              celebrate your moments, and leave an impression
            </span>
          </p>
          <div className="flex items-center gap-2 mt-5 mx-4 justify-center">
            <Button
              onClick={() => navigate("/collections")}
              type="primary"
              htmlType="submit"
              block
              className="max-w-fit mx-4"
            >
              SHOP NOW
            </Button>
          </div>
        </div>
      </div>

      {/* hero right side */}
      {/* <img src={assets.hero_img} className="" alt="" /> */}
      <div className="flex mx-auto justify-center items-center mb-8 w-full max-w-7xl">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 4,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
          }}
          className="h-80 w-56 md:w-full rounded-lg"
        >
          {categories?.map((category) => (
            <SwiperSlide
              key={category.id}
              className="flex items-center justify-center overflow-hidden rounded-lg"
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* <div className="text-lg font-extrabold w-full h-80 text-white bg-red-600 rounded-lg flex items-center justify-center">
              {image.id}
            </div> */}
              <img
                src={category.image}
                alt={category.name}
                className="h-80 object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
