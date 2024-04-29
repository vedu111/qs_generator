import React from "react";
import Footer from "../components/Footer";
import { FaAddressBook } from "react-icons/fa";
import { motion } from "framer-motion";
import logomark from "../assets/logomark.svg";
import Navbar from "../components/Navbar";

const home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center gap-10 py-5 px-18 lg:flex-row lg:gap-14 lg:text-left xl:gap-40 lg:pt-28 lg:pb-28">
        <div className="py-4 pl-4 self-stretch flex flex-col items-start flex-[1_0_0] lg:pl-32">
          <div className="py-4 flex flex-col items-start gap-4 lg:py-0 pl-4">
            <div>
              <a href="/uploadSheet">
                <div className="flex py-1 px-2 items-start gap-2.5 rounded-[2.3125rem] border-2 border-blue-500 bg-white">
                  <p className="font-normal pl-2">Upload Sheet</p>
                  <div className="zoom-in">
                    <figure>
                      <img src="/Arrow.svg" />
                    </figure>
                  </div>
                </div>
              </a>
            </div>
            <h1
              className="font-bold text-4xl leading-[3rem] tracking-[-0.06rem] md:leading-[3.75rem] 2xl:leading-[4.5rem] 2xl:text-6xl md:text-5xl text-white"
            >
              <span className="text-blue-500">Quesgen -</span> NextGen Question Generator
            </h1>
            <p
              className="font-normal text-white"
            >
              <i>
                <span className="text-blue-500">QuesGen</span>
              </i>{" "}
              is an open-source project that allows you to generate question papers for TCET exams.
            </p>
          </div>
          <div
            className="flex flex-row gap-4 py-1 pl-4 md:py-4"
          >
            <button className="py-2.5 px-5 rounded-lg bg-white border border-[#D0D5DD]">
              <a href="/signup">
                <div className="flex gap-3">
                  <div className="zoom-in">
                    <figure className="pt-1">
                      <FaAddressBook />
                    </figure>
                  </div>
                  <div>Get Started</div>
                </div>
              </a>
            </button>
            <button className="py-2.5 px-5 rounded-lg bg-blue-600 text-white">
              <a href="/questionGenerator">Generate</a>
            </button>
          </div>
        </div>
        <div
          className="w-[20rem] h-[20rem] m-auto md:ml-0 md:mb-0 md:mt-0 md:mr-40 sm:w-[25rem] sm:h-[25rem] lg:w-[20rem] lg:h-[20rem] xl:w-[25rem] xl:h-[25rem] overflow-hidden rounded-[5rem]"
        >
          <img className="w-full h-full" src={logomark} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default home;
