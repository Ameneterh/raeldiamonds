import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { MdMarkEmailUnread, MdPhoneInTalk, MdWhatsapp } from "react-icons/md";
import { company_info } from "../assets/company_info.js";

export default function FooterComponent() {
  const date = new Date();

  return (
    <div className="border-t-2 border-solid border-l-transparent border-r-transparent border-b-transparent border-gray-300">
      <div className="px-4 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        <div>
          <Link to="/" className="flex items-center gap-1">
            <img src={assets.logo} className="w-8 sm:w-16 rounded-full" />
            <div className="hidden md:flex flex-col md:text-5xl font-extrabold text-black leading-3">
              <span>Rael</span>
              <span className="-mt-2 hidden md:block text-gray-700 text-xl">
                Diamonds
              </span>
            </div>
          </Link>

          <p className="w-full md:w-2/3 text-gray-600 text-sm">
            <b>A world of convenience and quality at your fingertips. </b>
            Whether you're looking for the latest fashion & fashion accessories,
            jewelery or unique gifts, our e-shop has it all. Enjoy hassle-free
            shopping, secure payment options, and fast delivery, all from the
            comfort of your home.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-2">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/" className="hover:underline underline-offset-2">
              Home
            </Link>
            <Link to="/about" className="hover:underline underline-offset-2">
              About Us
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-use"
              className="hover:underline underline-offset-2"
            >
              Terms of Use
            </Link>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-2">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link
              to={`mailto:${company_info.email}`}
              className="flex items-center gap-1 hover:underline underline-offset-2"
            >
              <MdMarkEmailUnread />
              {company_info.email}
            </Link>
            <Link
              to={`https://wa.me/${company_info.whatsapp_number}`}
              target="_blank"
              className="flex items-center gap-1 hover:underline underline-offset-2"
            >
              <MdWhatsapp />
              {company_info.whatsapp_number}
            </Link>
            <Link
              to={`tel:${company_info.call_number}`}
              className="flex items-center gap-1 hover:underline underline-offset-2"
            >
              <MdPhoneInTalk />
              {company_info.call_number}
            </Link>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Designed & Maintained by
          <Link
            to="https://ameneterh-portfolio.onrender.com"
            target="_blank"
            className="text-blue-600 underline underline-offset-2 font-semibold mx-1"
          >
            @Amene Ter'Hemen
          </Link>
        </p>
      </div>
    </div>
  );
}
