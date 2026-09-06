import React from "react";
import MainLayout from "../layout/MainLayout";
import TitleText from "../Components/TitleText";
import { Link } from "react-router-dom";
import { MdMarkEmailUnread, MdPhoneInTalk, MdWhatsapp } from "react-icons/md";

export default function TermsOfUse() {
  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen text-xs max-w-2xl mx-auto gap-5 mb-20 mt-8">
        <div className="text-2xl text-center">
          <TitleText text1={"terms"} text2={"of use"} />
        </div>
        <div className="flex items-center flex-col sm:flex-row justify-between">
          <h1 className="text-[14px]">
            Terms of Use for <b>myeSHOP</b>
          </h1>
          <span>Effective Date: January 5, 2025</span>
        </div>
        <hr className="h-[1.5px] bg-gray-400 my-2" />
        {/* privacy policy content */}
        <p>
          By accessing or using myeShop (hereinafter referred to as the "Site"),
          you agree to comply with and be bound by the following Terms of Use.
          If you do not agree to these terms, please do not use the Site.
        </p>
        <h1 className="text-[14px]">1. Acceptance of Terms</h1>
        <p>
          By using our Site, you agree to these Terms of Use and any updates or
          modifications to them. We reserve the right to change these Terms at
          any time without prior notification, and the updated version will be
          posted on the Site. Please review these Terms regularly.
        </p>
        <h1 className="text-[14px]">2. Account Registration</h1>
        <p>
          We do not require you to create an account to make a purchase,
          however, access to certain features are restricted to only registered
          users. To be a vendor (seller) however, you may need to create an
          account. You agree to provide accurate, up-to-date information, and
          you are responsible for maintaining the confidentiality of your login
          credentials. Notify us immediately of any unauthorized use of your
          account.
        </p>
        <h1 className="text-[14px]">3. Product Information and Availability</h1>
        <p>
          On our part, the Site, we strive to ensure all product descriptions,
          prices, and images are accurate. However, we cannot guarantee that all
          information is error-free. Availability of products is at the behest
          of the Vendor posting the product, and is not subject to our control.
        </p>
        <p>
          The Vendor must strive to ensure all product descriptions, prices, and
          images are accurate; the Vendor reserve's the right to correct errors,
          update product details including prices, categories, images, etc at
          any time without prior notice.
        </p>
        <h1 className="text-[14px]">4. Ordering and Payment</h1>
        <p>
          By contacting a Vendor responsible for an item, you are making an
          offer to purchase the item(s) of interest to you. It is the Vendor's
          responsibility to confirm your order. All payments must be made
          through authorized payment methods agreed to between the Vendor and
          the Client; the Site does not involve itself with order and payment
          confirmations. You agree to provide accurate billing information and
          authorize the Vendor to process the payment for your order.
        </p>
        <h1 className="text-[14px]">5. Shipping and Delivery</h1>
        <p>
          Responsibility for last mile delivery of product to the Client lies
          with the Vendor. Shipping times may vary. Delivery times are estimates
          and depend on the shipping method and destination. The Site is not
          responsible for last mile delivery delays arising from methods and
          timelines agreed to between Vendors and Clients.
        </p>
        <h1 className="text-[14px]">6. Returns and Refunds</h1>
        <p>
          Vendors are required to agree to a 7-day return policy. Clients who
          are not satisfied with products purchased can return them within a
          7-day window.
        </p>
        <p>
          Clients may return products in accordance with our return policy.
          Returns must be made within seven (7) days of receiving the order, and
          products must be in their original condition. Refunds will be issued
          to the original payment method. The refund covers only the cost of the
          product ordered.
        </p>
        <h1 className="text-[14px]">7. Use of the Site</h1>
        <p>
          You agree to use the Site for lawful purposes only. You may not use
          the Site to engage in any activity that could harm, disrupt, or impair
          the Site’s functionality or other users’ experience and wellbeing.
        </p>
        <h1 className="text-[14px]">8. Intellectual Property</h1>
        <p>
          Product images, and descriptions are property of the Vendors and
          protected by intellectual property laws. You may not copy, modify, or
          distribute any content without prior written consent or agreement with
          the Vendor.
        </p>
        <h1 className="text-[14px]">9. Limitation of Liability</h1>
        <p>
          To the maximum extent permitted by law, myeSHOP is not liable for any
          indirect, incidental, or consequential damages arising from your use
          of the Site or any products purchased.
        </p>
        <h1 className="text-[14px]">10. Privacy and Data Protection</h1>
        <p>
          Your use of the Site is governed by our{" "}
          <Link to={"/privacy-policy"}>Privacy Policy</Link>, which outlines how
          we collect, use, and protect your personal data. By using the Site,
          you consent to our data practices as described in the Privacy Policy.
        </p>
        <h1 className="text-[14px]">11. Prohibited Activities</h1>
        <p>
          You agree not to:
          <ul className="ml-5">
            <li>Use the Site for fraudulent or unlawful purposes.</li>
            <li>
              Use the Site for sales of medicines or other medicinal products,
              whether registerd by regulatory agencies or not.
            </li>
            <li>
              Interfere with the proper functioning of the Site or attempt to
              gain unauthorized access to it.
            </li>
            <li>
              Use the Site for the promotion of nudity, pornography, or other
              sexually explicit material.
            </li>
            <li>
              Transmit harmful or malicious content, including viruses or
              malware.
            </li>
          </ul>
        </p>
        <h1 className="text-[14px]">12. Termination</h1>
        <p>
          We may suspend or terminate your access to the Site without notice if
          we believe you have violated these Terms of Use. Upon termination,
          your right to access and use the Site will cease immediately.
        </p>
        <h1 className="text-[14px]">
          13. Governing Law and Dispute Resolution
        </h1>
        <p>
          These Terms of Use are governed by the laws of the Federal Republic of
          Nigeria. Any disputes will be resolved through mediation in Nigeria.
        </p>
        {/* contact */}
        <h1 className="text-[14px]">14. Contact Information</h1>
        <p>
          If you have any questions about these Terms of Use, please contact us
          at:
          <br />
          <Link
            to="mailto:ameneterh@gmail.com"
            className="flex items-center gap-1"
          >
            <MdMarkEmailUnread />
            ameneterh@gmail.com
          </Link>
          <Link
            to="https://wa.me/2348154230654"
            target="_blank"
            className="flex items-center gap-1"
          >
            <MdWhatsapp />
            08154230654
          </Link>
          <Link to="tel:+2348154230654" className="flex items-center gap-1">
            <MdPhoneInTalk />
            08154230654
          </Link>
        </p>
        <p>
          By using our Site, you acknowledge that you have read, understood, and
          agreed to these Terms of Use.
        </p>
      </div>
    </MainLayout>
  );
}
