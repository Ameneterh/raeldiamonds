import React from "react";
import HeaderComponent from "../Components/HeaderComponent";
import FooterComponent from "../Components/FooterComponent";
// import SearchBar from "../components/SearchBar";

export default function MainLayout({ children }) {
  return (
    <div className="w-full md:max-w-7xl px-2 md:px-0 min-h-[80svh] sm:mx-auto">
      <HeaderComponent />
      {/* <SearchBar /> */}
      <main className="px-4 md:px-0 sm:py-14">{children}</main>
      {window.location.pathname === "/authentication" ? (
        <></>
      ) : (
        <FooterComponent />
      )}
    </div>
  );
}
