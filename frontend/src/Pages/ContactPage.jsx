import TitleText from "../Components/TitleText";
import React from "react";
import MainLayout from "../layout/MainLayout";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";
import {
  FaTwitterSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaWhatsappSquare,
  FaTelegram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

export default function ContactPage() {
  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto min-h-[60svh] mt-8 sm:mt-0">
        <div className="text-center text-2xl">
          <TitleText text1={"contact"} text2={"us"} />
        </div>

        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20">
          <img
            src={assets.contact_img}
            alt=""
            className="w-full md:max-w-[480px] rounded-md"
          />
          <div className="flex flex-col justify-center items-start gap-6">
            {/* <p className="font-bold text-xl text-gray-700">
              Our Corporate Office:
            </p>
            <p className="text-gray-500">
              No 80, A.A. Tor Street, Adekaa, <br />
              Gboko-East, Gboko, Benue State.
            </p> */}
            <p className="text-gray-500 flex flex-col gap-1">
              <span className="flex items-center gap-1">
                <MdEmail className="text-red-600" size={20} />
                <Link
                  to="mailto:contact@pharmazone.com.ng"
                  className="hover:underline underline-offset-2"
                >
                  ameneterh@gmail.com
                </Link>
              </span>
              <span className="flex items-center gap-1">
                <MdPhoneInTalk className="text-blue-600" size={20} />
                <Link
                  to="tel:2349044868438"
                  className="hover:underline underline-offset-2"
                >
                  +234 904 486 8438
                </Link>
              </span>
              <span className="flex items-center gap-1">
                <FaWhatsappSquare className="text-green-600" size={20} />
                <Link
                  to="https://wa.me/2349044868438"
                  className="hover:underline underline-offset-2"
                >
                  +234 904 486 8438
                </Link>
              </span>
              <span className="flex items-center gap-1">
                <FaTelegram className="text-blue-600" size={20} />
                <Link
                  to="https://t.me/RaelDiamonds"
                  className="hover:underline underline-offset-2"
                >
                  RaelDiamonds
                </Link>
              </span>
            </p>

            {/* follow buttons */}
            <p className="font-bold text-xl text-gray-700">
              Follow Rael Diamonds:
            </p>
            <p className="flex items-center gap-2">
              <Link to="https://www.facebook.com/" target="_blank">
                <FaFacebookSquare className="text-2xl text-blue-700 hover:scale-125 transition-all duration-300" />
              </Link>
              <Link to="https://instagram.com/" target="_blank">
                <FaInstagramSquare className="text-2xl text-red-800 hover:scale-125 transition-all duration-300" />
              </Link>
              {/* <Link
                to="https://www.linkedin.com/in/terhemen-amene-53b77293/"
                target="_blank"
              >
                <FaLinkedin className="text-2xl text-blue-800 hover:scale-125 transition-all duration-300" />
              </Link> */}
              <Link to="https://twitter.com/" target="_blank">
                <FaTwitterSquare className="text-2xl text-blue-950 hover:scale-125 transition-all duration-300" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
