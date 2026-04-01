import {
  faArrowRight,
  faBars,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LanguageSwitcher from "../../Common/LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobiledropdown, setMobiledropdown] = useState(false);

  // Auth state from Redux
  const userData = useSelector((state) => state.user_email);
  const authToken = useSelector((state) => state.token);
  const isLoggedIn = !!(authToken && userData && userData.id);
  const userName = userData?.name || userData?.username || userData?.email || '';

  const handleMobileDropdown = () => {
    setMobiledropdown(!mobiledropdown);
  };

  return (
    <div className=" sticky top-0 z-50 font-gilroy border-b border-white/50 ">
      <div className=" mx-auto relative  bg-black text-white py-3 px-10 text-sm ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 flex-shrink-0 ">
            <img
              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif"
              className="w-10 h-10"
              alt="logo"
            />

            <p
              style={{
                color: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundImage:
                  "linear-gradient( to right, #00E0FF, #061FA1 ) ",
              }}
              className="  uppercase font-medium text-xs font-zendots "
            >
              Skilleareum
            </p>
          </div>

          <nav className=" hidden lg:flex uppercase gap-10 ">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "transparent" : "white",
                fontWeight: isActive ? "bold" : "500",
                backgroundClip: isActive ? "text" : "none",
                WebkitBackgroundClip: isActive ? "text" : "none",
                backgroundImage: isActive
                  ? "linear-gradient( to right, #0285FF, #1EEF32 )"
                  : "none",
                fontSize: "13px",
              })}
            >
              {t('home')}
            </NavLink>
            <NavLink
              to="/Aboutus"
              style={({ isActive }) => ({
                color: isActive ? "transparent" : "white",
                fontWeight: isActive ? "bold" : "500",
                backgroundClip: isActive ? "text" : "none",
                WebkitBackgroundClip: isActive ? "text" : "none",
                backgroundImage: isActive
                  ? "linear-gradient( to right, #0285FF, #1EEF32 )"
                  : "none",
                fontSize: "13px",
              })}
            >
              {t('aboutUs')}
            </NavLink>
            <NavLink
              to="/Community"
              style={({ isActive }) => ({
                color: isActive ? "transparent" : "white",
                fontWeight: isActive ? "bold" : "500",
                backgroundClip: isActive ? "text" : "none",
                WebkitBackgroundClip: isActive ? "text" : "none",
                backgroundImage: isActive
                  ? "linear-gradient( to right, #0285FF, #1EEF32 )"
                  : "none",
                fontSize: "13px",
              })}
            >
              {t('community')}
            </NavLink>
            <NavLink
              to="/Whitepaper"
              style={({ isActive }) => ({
                color: isActive ? "transparent" : "white",
                fontWeight: isActive ? "bold" : "500",
                backgroundClip: isActive ? "text" : "none",
                WebkitBackgroundClip: isActive ? "text" : "none",
                backgroundImage: isActive
                  ? "linear-gradient( to right, #0285FF, #1EEF32 )"
                  : "none",
                fontSize: "13px",
              })}
            >
              {t('whitepaper')}
            </NavLink>
            <NavLink
              to="/Contactus"
              style={({ isActive }) => ({
                color: isActive ? "transparent" : "white",
                fontWeight: isActive ? "bold" : "500",
                backgroundClip: isActive ? "text" : "none",
                WebkitBackgroundClip: isActive ? "text" : "none",
                backgroundImage: isActive
                  ? "linear-gradient( to right, #0285FF, #1EEF32 )"
                  : "none",
                fontSize: "13px",
              })}
            >
              {t('contactUs')}
            </NavLink>
          </nav>

          <div className=" hidden lg:flex items-center gap-5 ">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <NavLink to="/ChallengeMap_7Days" className="flex items-center gap-2 cursor-pointer">
                <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1.5px] rounded-full">
                  <div className="bg-black px-5 py-1.5 font-semibold rounded-full flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="text-xs" />
                    <span style={{
                      color: "transparent",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )",
                    }}>{userName}</span>
                  </div>
                </div>
              </NavLink>
            ) : (
              <div
                onClick={() => navigate("/UserLogin")}
                className=" cursor-pointer bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1.5px] text-white rounded-full"
              >
                <div className=" bg-black px-5 py-1.5 font-semibold rounded-full flex gap-3">
                  <p className=" text-sm  ">{t('signIn')}</p>
                  <div className=" w-5 h-5 flex justify-center items-center rounded-full border border-white ">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className=" text-xs -rotate-45 "
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:hidden md:flex flex-col justify-end ">
            <button onClick={handleMobileDropdown} className="text-white ">
              {mobiledropdown ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
        </div>
        {mobiledropdown && (
          <div className="bg-black border border-white/50 rounded-xl fixed right-5 z-20 text-white p-7 uppercase lg:hidden">
            <nav className="flex flex-col justify-center items-center gap-5 text-sm ">
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "transparent" : "white",
                  fontWeight: isActive ? "bold" : "500",
                  backgroundClip: isActive ? "text" : "none",
                  WebkitBackgroundClip: isActive ? "text" : "none",
                  backgroundImage: isActive
                    ? "linear-gradient( to right, #0285FF, #1EEF32 )"
                    : "none",
                })}
              >
                {" "}
                {t('home')}
              </NavLink>
              <NavLink
                to="/Aboutus"
                style={({ isActive }) => ({
                  color: isActive ? "transparent" : "white",
                  fontWeight: isActive ? "bold" : "500",
                  backgroundClip: isActive ? "text" : "none",
                  WebkitBackgroundClip: isActive ? "text" : "none",
                  backgroundImage: isActive
                    ? "linear-gradient( to right, #0285FF, #1EEF32 )"
                    : "none",
                })}
              >
                {" "}
                {t('aboutUs')}
              </NavLink>
              <NavLink
                to="/Community"
                style={({ isActive }) => ({
                  color: isActive ? "transparent" : "white",
                  fontWeight: isActive ? "bold" : "500",
                  backgroundClip: isActive ? "text" : "none",
                  WebkitBackgroundClip: isActive ? "text" : "none",
                  backgroundImage: isActive
                    ? "linear-gradient( to right, #0285FF, #1EEF32 )"
                    : "none",
                })}
              >
                {" "}
                {t('community')}
              </NavLink>
              <NavLink
                to="/Whitepaper"
                style={({ isActive }) => ({
                  color: isActive ? "transparent" : "white",
                  fontWeight: isActive ? "bold" : "500",
                  backgroundClip: isActive ? "text" : "none",
                  WebkitBackgroundClip: isActive ? "text" : "none",
                  backgroundImage: isActive
                    ? "linear-gradient( to right, #0285FF, #1EEF32 )"
                    : "none",
                })}
              >
                {t('whitepaper')}
              </NavLink>
              <NavLink
                to="/Contactus"
                style={({ isActive }) => ({
                  color: isActive ? "transparent" : "white",
                  fontWeight: isActive ? "bold" : "500",
                  backgroundClip: isActive ? "text" : "none",
                  WebkitBackgroundClip: isActive ? "text" : "none",
                  backgroundImage: isActive
                    ? "linear-gradient( to right, #0285FF, #1EEF32 )"
                    : "none",
                })}
              >
                {t('contactUs')}
              </NavLink>
            </nav>
            <div className="mt-5 flex flex-col items-center gap-4">
              <LanguageSwitcher />
              {isLoggedIn ? (
                <NavLink to="/ChallengeMap_7Days">
                  <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1px] text-white rounded-full">
                    <div className="bg-black px-5 py-2 font-semibold rounded-full cursor-pointer flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faUser} className="text-xs" />
                      <span style={{
                        color: "transparent",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )",
                      }}>{userName}</span>
                    </div>
                  </div>
                </NavLink>
              ) : (
                <NavLink to="/UserLogin">
                  <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1px] text-white rounded-full">
                    <div className="bg-black px-5 py-2 font-semibold rounded-full cursor-pointer">
                      {t('signIn')}
                    </div>
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
