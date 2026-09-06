import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function HeroComponent() {
  const date = new Date();
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between flex-col pt-10 sm:pt-0 sm:flex-row">
      {/* hero left side */}
      <div className="w-full md:w-1/2 flex items-center justify-center pb-10 sm:py-0 ">
        <div className="text-[#414141] w-full">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-full h-[2px] bg-[#414141] flex-1"></p>
            <p className="text-sm md:text-base uppercase font-semibold">
              {date.toLocaleString("default", { month: "long" })} deals
            </p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-center">
            Latest Arrivals
          </h1>

          <p className="my-2 text-xl text-center capitalize">
            We picked every item with care just for you,{" "}
            <span className="sm:block">
              <b>you must try</b> at least once
            </span>
          </p>
          {/* <p className="w-8 md:w-full h-[2px] bg-[#414141] flex-1"></p> */}
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
      <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />
    </div>
  );
}
