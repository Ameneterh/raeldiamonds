import React from "react";
import MainLayout from "../layout/MainLayout";
import TitleText from "../Components/TitleText";
import { Link } from "react-router-dom";
import { MdMarkEmailUnread, MdPhoneInTalk, MdWhatsapp } from "react-icons/md";

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen text-xs max-w-2xl mx-auto gap-5 mb-20 mt-8">
        <div className="text-2xl text-center">
          <TitleText text1={"privacy"} text2={"policy"} />
        </div>
        <div className="flex items-center flex-col sm:flex-row justify-between">
          <h1 className="text-[14px]">
            Privacy Policy for <b>myeSHOP</b>
          </h1>
          <span>Effective Date: January 5, 2025</span>
        </div>
        <hr className="h-[1.5px] bg-gray-400 my-2" />
        {/* privacy policy content */}
        <p>
          At myeShop, we are committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, disclose, and protect your
          personal information when you visit and make purchases from vendors
          through our online store. By using our website and services, you agree
          to the practices described in this policy.
        </p>
        <h1 className="text-[14px]">1. Information We Collect</h1>
        <p>
          While using our site sorely for shopping do not require registration,
          if you do wish to become a vendor through myeSHOP platform, you will
          be required to register. We collect various types of personal and
          non-personal information from registrants and site users to provide a
          seamless experience:
        </p>
        <p>
          <b>- Personal Identification Information:</b> This includes your name,
          email address, phone number; Vendors may require your payment details
          including shipping address.
        </p>
        <p>
          <b>- Non-Personal Identification Information:</b> This includes data
          such as your IP address, browser type, device information, and
          browsing activity on our website.
        </p>
        <p>
          <b>- Cookies and Tracking Technologies:</b> We use cookies, web
          beacons, and similar technologies to track your preferences and
          improve your experience.
        </p>
        <h1 className="text-[14px]">2. How We Use Your Information</h1>
        <p>We use the information we collect for the following purposes:</p>
        <p>
          <b>- To Process Transactions:</b> To fulfill your orders, process
          payments, and ship products.
        </p>
        <p>
          <b>- To Improve Our Website and Services:</b> To analyze trends,
          enhance website functionality, and provide personalized experiences
          based on your preferences.
        </p>
        <p>
          <b>- Customer Support:</b> To respond to inquiries, resolve issues,
          and provide customer service.
        </p>
        <p>
          <b>- Marketing and Promotions:</b> We may send promotional emails or
          newsletters with updates, discounts, or offers. You can opt out at any
          time by unsubscribing.
        </p>
        <p>
          <b>- Legal Compliance:</b> To comply with applicable laws and
          regulations, or respond to lawful requests.
        </p>
        <h1 className="text-[14px]">3. How We Protect Your Information</h1>
        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information. These include encryption, firewalls, etc.
          However, no method of transmission over the internet is 100% secure,
          and we cannot guarantee absolute security.
        </p>
        <h1 className="text-[14px]">4. Sharing Your Information</h1>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. We may share your information in the following circumstances:
        </p>
        <p>
          <b>- Service Providers:</b> We may share data with trusted third-party
          vendors who assist with our services, including marketing, and
          customer service. These service providers are obligated to keep your
          information secure and use it only for the services they perform for
          us.
        </p>
        <p>
          <b>- Legal Requirements:</b> We may disclose your information if
          required by law, such as to comply with a subpoena or other legal
          process.
        </p>
        <p>
          <b>- Business Transfers:</b> In the event of a merger, acquisition, or
          sale of assets, your personal information may be transferred as part
          of that transaction.
        </p>
        <h1 className="text-[14px]">5. Your Rights and Choices</h1>
        <p>You have the right to:</p>
        <p>
          <b>- Access and Update Your Information:</b> You can access, modify,
          or delete your personal information by logging into your account or
          contacting us.
        </p>
        <p>
          <b>- Opt-Out of Marketing Communications:</b> You can unsubscribe from
          our promotional emails at any time using the unsubscribe link in the
          emails or by contacting us.
        </p>
        <p>
          <b>- Cookies Settings:</b> You can adjust your browser settings to
          block or delete cookies. However, this may affect your ability to use
          some features of our website.
        </p>
        <h1 className="text-[14px]">6. Children’s Privacy</h1>
        <p>
          Our website is not intended for children under the age of 16, and we
          do not knowingly collect personal information from children. If you
          are a parent or guardian and believe we have inadvertently collected
          information from a child, please contact us to have the data removed.
        </p>
        <h1 className="text-[14px]">7. Third-Party Links</h1>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices of these external sites. We
          encourage you to review their privacy policies before providing any
          personal information.
        </p>
        <h1 className="text-[14px]">8. International Data Transfers</h1>
        <p>
          If you are accessing our website from outside Nigeria, please note
          that your information may be transferred to, stored, and processed in
          a country that may have different data protection laws than your own.
        </p>
        <h1 className="text-[14px]">9. Changes to This Privacy Policy</h1>
        <p>
          We reserve the right to update this Privacy Policy at any time. Any
          changes will be posted on this page with an updated "Effective Date."
          We encourage you to review this policy periodically to stay informed
          about how we are protecting your information.
        </p>
        <h1 className="text-[14px]">10. Contact Us</h1>
        <p>
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us:
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
      </div>
    </MainLayout>
  );
}
