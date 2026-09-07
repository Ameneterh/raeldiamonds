import React from "react";
import MainLayout from "../layout/MainLayout";
import HeroComponent from "../Components/HeroComponent";
import LatestCollection from "../Components/LatestCollection";
import BestSeller from "../Components/BestSeller";
import OurPolicy from "../Components/OurPolicy";
// import NewsletterBox from "../Components/NewsLetterBox";

export default function HomePage() {
  return (
    <MainLayout>
      {/* <div className=""> */}
      <HeroComponent />
      <LatestCollection />
      {/* <BestSeller /> */}
      {/* <OurPolicy /> */}
      {/* <NewsletterBox /> */}
      {/* </div> */}
    </MainLayout>
  );
}
