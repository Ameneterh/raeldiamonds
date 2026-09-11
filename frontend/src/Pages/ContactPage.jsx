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
import { company_info } from "../assets/company_info.js";

export default function ContactPage() {
  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto min-h-[60svh] mt-8">
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
                  to={`mailto:${company_info.email}`}
                  className="hover:underline underline-offset-2"
                >
                  {company_info.email}
                </Link>
              </span>
              <span className="flex items-center gap-1">
                <MdPhoneInTalk className="text-blue-600" size={20} />
                <Link
                  to={`tel:${company_info.call_number}`}
                  className="hover:underline underline-offset-2"
                >
                  {company_info.call_number}
                </Link>
              </span>
              <span className="flex items-center gap-1">
                <FaWhatsappSquare className="text-green-600" size={20} />
                <Link
                  to={`https://wa.me/${company_info.whatsapp_number}`}
                  className="hover:underline underline-offset-2"
                >
                  {company_info.whatsapp_number}
                </Link>
              </span>
              {/* <span className="flex items-center gap-1">
                <FaTelegram className="text-blue-600" size={20} />
                <Link
                  to={`https://t.me/${company_info.socials[5].name}`}
                  className="hover:underline underline-offset-2"
                >
                  {company_info.socials[5].name}
                </Link>
              </span> */}
            </p>

            {/* follow buttons */}
            <p className="font-bold text-xl text-gray-700">
              Follow Rael Diamonds:
            </p>
            <p className="flex items-center gap-2">
              {company_info.socials.map((social, index) => (
                <Link
                  to={`${social.url}${social.name}`}
                  target="_blank"
                  key={index}
                >
                  <social.icon
                    className={`text-xl hover:scale-125 transition-all duration-300 text-${social.color}`}
                  />
                </Link>
              ))}
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
