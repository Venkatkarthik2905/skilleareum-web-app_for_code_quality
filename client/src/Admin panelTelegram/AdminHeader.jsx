import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector, useDispatch } from "react-redux";
import { setAdminDetails } from "../store";
import toast, { Toaster } from "react-hot-toast";

AOS.init();

export default function AdminHeader({ activeTab }) {
  const dropdownRef = useRef(null);
  const [isDropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!isDropdown);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(setAdminDetails(""));
    toast.success("Logged Successfully...Redirecting to Login Page", {
      style: {
        borderRadius: "3px",
        fontSize: "14px",
        fontWeight: "700",
        backgroundColor: "#16a34a",
        border: "1px solid #0abf3095",
        color: "#fff",
      },
    });
    setTimeout(() => {
      window.location.href = "/adminlogin";
    }, 500);
  };

  return (
    <div className="font-san text-white">
      <div className="flex justify-between  w-[95%] mx-auto">
        <div className="flex justify-center items-center gap-2">
          <img
            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif"
            className="w-12 h-12"
          />
          <div className="">
            <p className="font-semibold text-center mt-1">Skilleareum AI</p>
          </div>
        </div>
        <div className="hidden lg:block ">
          <div className="flex items-center h-full">
            {activeTab === "file" && (
              <div>
                <p className=" font-bold flex">
                  Hello Admin
                  <span>
                    <img
                      className="pl-1"
                      src="/assets/🦆 emoji _waving hand sign_.png"
                    ></img>
                  </span>
                </p>
                <p className="text-sm">Welcome Back</p>
              </div>
            )}
            {activeTab === "hash" && (
              <div>
                <p className="flex text-sm">
                  <p className="text-white/50 ">AdminDashboard</p>{" "}
                  <span className="px-2">/</span>
                  <p className="font-bold">Passbook</p>
                </p>
              </div>
            )}

            {activeTab === "clock" && (
              <div>
                <p className="flex text-sm">
                  <p className="text-white/50 ">AdminDashboard</p>{" "}
                  <span className="px-2">/</span>
                  <p className="font-bold">Users</p>
                </p>
              </div>
            )}
            {activeTab === "fact" && (
              <div>
                <p className="flex text-sm">
                  <p className="text-white/50 ">AdminDashboard</p>{" "}
                  <span className="px-2">/</span>
                  <p className="font-bold">AI Fact Vault</p>
                </p>
              </div>
            )}
            {activeTab === "bell" && (
              <div>
                <p className="flex text-sm">
                  <p className="text-white/50 ">AdminDashboard</p>{" "}
                  <span className="px-2">/</span>
                  <p className="font-bold">Transactions</p>
                </p>
              </div>
            )}
            {activeTab === "ref" && (
              <div>
                <p className="flex text-sm">
                  <p className="text-white/50 ">AdminDashboard</p>{" "}
                  <span className="px-2">/</span>
                  <p className="font-bold">Referrals</p>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center gap-3 lg:gap-0 lg:w-[45%]">
          <div className="hidden lg:block">
            <div className="flex justify-end items-center gap-2 text-white">
              <button className=" font-bold" onClick={handleLogout}>
                Logout
              </button>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-white"
              />
            </div>
          </div>
          {/* <div className='hidden lg:block'>
                        <div className='flex bg-white rounded-md'>
                            <FontAwesomeIcon className='text-[#3AB6FF] text-lg w-[10%] text-center mt-2' icon={faMagnifyingGlass} style={{ transform: 'scaleX(-1)' }} />
                            <input className='w-[90%] outline-none bg-transparent rounded-md py-2 px-3' placeholder='Search Dashboard'></input>
                        </div>
                    </div> */}

          {/* <div>
                        <button className='text-[#0194FE] py-1 md:py-2 px-2 md:px-3 rounded-full bg-white'><FontAwesomeIcon icon={faMessage}></FontAwesomeIcon></button>
                    </div> */}
          {/* <div className='relative'>
                        <div>
                            <button className='text-[#0194FE] py-1 md:py-2 px-2 md:px-3 rounded-full bg-white'><FontAwesomeIcon icon={faBell}></FontAwesomeIcon></button>
                        </div>
                        <div className='w-4 h-4 flex justify-center items-center rounded-full text-[10px] border absolute translate-x-6 -translate-y-10 bg-[#0194FE]'>1</div>
                    </div> */}
          <div className="block lg:hidden ">
            <button className="text-xl " onClick={handleDropdown}>
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
          </div>
          {isDropdown && (
            <div
              ref={dropdownRef}
              className="dropdown-content text-black z-10 w-[15rem] absolute right-5 top-[5rem] sm:top-[6rem]"
              data-aos="fade-up"
            >
              <div className="flex flex-col items-center gap-3 border-2 text-center bg-black/50 backdrop-blur rounded-lg p-3">
                {/* <div className="flex bg-white rounded-md border">
                  <FontAwesomeIcon
                    className="text-[#3AB6FF] text-lg w-[10%] text-center mt-2"
                    icon={faMagnifyingGlass}
                    style={{ transform: "scaleX(-1)" }}
                  />
                  <input
                    className="w-[90%] outline-none bg-transparent rounded-md py-2 px-3"
                    placeholder="Search Dashboard"
                  ></input>
                </div> */}
                <div className="relative text-white">
                  <img src="assets/Rectangle 363.png" />
                  <div className="absolute top-3 left-7 flex flex-col gap-3 items-center ">
                    <div>
                      <p className="font-bold">SKLRM TOKENS </p>
                      <p className="text-[10px] text-center font-medium">
                        Distributed
                      </p>
                    </div>
                    <p className="font-semibold">2,000,000</p>
                    <div className="border rounded-full py-1 px-3 bg-black">
                      <p className="text-[10px] underline ">Get Reports</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-3 my-5 text-white">
                  <button className=" font-bold" onClick={handleLogout}>
                    Logout
                  </button>
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
