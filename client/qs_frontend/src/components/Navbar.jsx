import React, { useEffect, useState } from "react";
import { menu, close } from "../assets";
import logomark from "../assets/logomark.svg";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { auth } from "../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserIsSignedIn(true);
      } else {
        setUserIsSignedIn(false);
      }
    });
  }, []);

  const userLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const handleClick = () => setToggle(!toggle);
  return (
    <div className="relative flex justify-between items-center w-full mt-6 text-white">
      <a
        className="z-40 flex items-center gap-3 pl-8"
        href="/"
        aria-label="home"
      >
        <img src={logomark} alt="logomark" width={40} />
        <span className="text-3xl">QuesGen</span>
      </a>
      <div className="hidden lg:flex mr-16 gap-[3rem] text-base font-normal items-center">
        <a href="/">Home</a>
        <a href="/subjectInfo">SubInfo</a>
        <a href="/uploadSheet">Upload</a>
        <a href="/questionGenerator">Generate</a>
      </div>
      <div className="pr-5 hidden lg:flex gap-5 items-center">
        {!userIsSignedIn ? (
          <a href="/login">
            <button className="flex gap-2 items-center w-full px-[21px] py-[14px] rounded-2xl bg-blue-600 text-white hover:bg-white hover:text-black">
              <span>Log In</span>
              <AiOutlineLogin width={20} height={20} />
            </button>
          </a>
        ) : (
          <button
            onClick={userLogout}
            className="flex gap-2 items-center px-[21px] py-[14px] rounded-2xl bg-[#f14f3a] text-white hover:bg-white hover:text-black"
          >
            <span>Log Out</span>
            <AiOutlineLogout width={20} height={20} />
          </button>
        )}
      </div>
      <div className="lg:hidden z-40" onClick={handleClick}>
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain mr-5 cursor-pointer"
        />
      </div>
      <ul
        className={
          toggle
            ? "pt-24 pb-8 absolute top-0  shadow-sm z-20 w-full px-8 lg:hidden flex flex-col items-center gap-5 bg-gray-900"
            : "hidden"
        }
      >
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <div className="flex flex-col gap-5 my-2">
          {!userIsSignedIn ? (
            <a href="/login">
              <button className="flex gap-2 items-center w-full px-[21px] py-[14px] rounded-2xl bg-blue-600 text-white hover:bg-white hover:text-black">
                <span>Log In</span>
                <AiOutlineLogin width={20} height={20} />
              </button>
            </a>
          ) : (
            <button className="flex gap-2 items-center px-[21px] py-[14px] rounded-2xl bg-[#f14f3a] text-white hover:bg-white hover:text-black">
              <span>Log Out</span>
              <AiOutlineLogout width={20} height={20} />
            </button>
          )}
        </div>
      </ul>
    </div>
  );
}
