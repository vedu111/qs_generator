import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <img className="" src="/wave.svg" alt="wave" />
    </div>
  );
};

export default Layout;
