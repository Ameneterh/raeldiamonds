import React from "react";
import MainLayout from "../layout/MainLayout";
import TitleText from "../Components/TitleText";
import Divider from "../Components/Divider";
import { assets } from "../assets/assets";

export default function AboutPage() {
  return (
    <MainLayout>
      <section className="flex flex-col max-w-7xl mx-auto min-h-[60svh] mt-8 sm:mt-10 p-2">
        <div className="text-2xl text-center">
          <TitleText text1={"about"} text2={"us"} />
        </div>

        <div className="my-10 flex flex-col md:flex-row gap-5 sm:gap-16">
          <img
            src={assets.about_img}
            alt=""
            className="md:max-w-[480px] sm:h-[300px] rounded-lg"
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-800 text-sm">
            <p>
              Welcome to <b>Rael Diamonds,</b> your one-stop online destination
              for all your shopping needs! We offer a wide range of high-quality
              products, from trendy fashion, accessories and varieties of
              consumer products. With a user-friendly shopping experience,
              secure payment options, and fast delivery, we make shopping easier
              and more enjoyable. Explore our collection today and find exactly
              what you're looking for – all at great prices!
            </p>
            <p>
              Discover a world of convenience and quality at your fingertips.
              Whether you're looking for the latest fashion accessories, diamond
              rings, necklaces, bracelets, watches, or unique gifts, our e-shop
              has it all. Enjoy hassle-free shopping, secure payment options,
              and fast delivery, all from the comfort of your home.
            </p>

            <Divider />
            <div className="flex flex-col gap-4">
              <b className="">Our Mission</b>
              <p>
                To provide a seamless and enjoyable online shopping experience,
                by providing an easy to use platform for both vendors and
                shoppers, committed to delivering exceptional customer service,
                ensuring fast and reliable delivery, and fostering a secure,
                convenient shopping environment for all our clients.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <b className="">Our Vision</b>
              <p>
                To become the leading online shopping destination, known for
                exceptional customer experiences, diverse product offerings, and
                innovative solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="text-2xl py-4">
          <TitleText text1={"why"} text2={"choose us"} />
        </div>

        <div className="flex flex-col items-center justify-center md:grid grid-cols-5 text-sm mb-20">
          <div className="p-8 flex flex-col items-center gap-3 text-center">
            <img
              src={assets.convenience}
              alt=""
              className="w-20 rounded-full"
            />
            <b>Convenience</b>
          </div>
          <div className="p-8 flex flex-col items-center gap-3 text-center">
            <img
              src={assets.support_247}
              alt=""
              className="w-20 rounded-full"
            />
            <b>With you 24/7</b>
          </div>
          <div className="p-8 flex flex-col items-center gap-3 text-center">
            <img
              src={assets.exceptional_logo}
              alt=""
              className="w-20 rounded-full"
            />
            <b>Exceptional Satisfaction</b>
          </div>
          <div className="p-8 flex flex-col items-center gap-3 text-center">
            <img
              src={assets.wide_products}
              alt=""
              className="w-20 rounded-full"
            />
            <b>Wide Product Selection</b>
          </div>
          <div className="p-8 flex flex-col items-center gap-3 text-center">
            <img
              src={assets.exclucive_offer}
              alt=""
              className="w-20 rounded-full"
            />
            <b>Exclusive Deals & Discounts</b>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
