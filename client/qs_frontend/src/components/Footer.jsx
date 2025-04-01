import React from "react";
import {FaFacebook, FaGithub, FaInstagram, FaTwitter, FaTwitch} from 'react-icons/fa';
import logomark from "../assets/logomark.svg"

const Footer = () => {
    return (
        <div className="w-full py-8 md:px-2 px-10 text-white border-t-[12px] border-t-blue-500 rounded-t-3xl">
           <div className="border-b-2 border-gray-600 pb-8">
                <div className="flex justify-center items-center gap-3">
                    <img src={logomark} alt="logomark" width={40} />
                    <span className="text-3xl">QuesGen</span>
                </div>
                <p className="text-center text-gray-500 mt-2">QuesGen is an open-source project that allows you to generate question papers for TCET exams.</p>
           </div>

           {/* Made with Love by */}
              <div className="flex sm:flex-row flex-col gap-2 justify-center items-center mt-8">
                <p className="text-xl text-blue-500">Made with <span className="text-red-500">❤</span> by</p>
                <a className="text-xl" href="https://github.com/vedu111/qs_generator" target="_blank">Team QuesGen</a>
                </div>

            <div className="flex flex-col max-w-[1280px] px-2 pt-4 m-auto justify-between sm:flex-row text-center text-gray-500 items-center">
                <p>2025 <span className="text-blue-500">QuesGen</span>, All rights reserved.</p>
                <div className="flex justify-between sm:w-[300px] py-4 text-2xl gap-4 sm:gap-2">
                    <FaFacebook />
                    <a href="https://github.com/vedu111/qs_generator" target="_blank"><FaGithub /></a>
                    <FaInstagram />
                    <FaTwitch />
                    <FaTwitter />
                </div>
            </div>
        </div>
    );
}

export default Footer;