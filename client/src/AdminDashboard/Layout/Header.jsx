import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [mobiledropdown, setMobiledropdown] = useState(false);
  const currentPath = window.location.pathname;

  const handleMobileDropdown = () => {
    setMobiledropdown(!mobiledropdown);
  };

  return (
    <div>
      <header className="border-b-[0.5px] border-white/40 bg-black px-6 py-4 font-inter relative">
        <div className="flex items-center justify-between">
          <div className="w-full flex justify-between items-center gap-8">
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
            <nav className="hidden lg:flex items-center gap-6 text-sm">
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive
                      ? "text-white underline underline-offset-8"
                      : "text-white/60 hover:text-white"
                  }`
                }
              >
                <img src="../assets/merchant/dashboard.svg" className="w-3" />
                Dashboard
              </NavLink>

              <NavLink
                to="/user-management"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive
                      ? "text-white underline underline-offset-8"
                      : "text-white/60 hover:text-white"
                  }`
                }
              >
                <img src="../assets/merchant/user.svg" className="w-3" />
                User Management
              </NavLink>

              <NavLink
                to="/subscription-tracking"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive
                      ? "text-white underline underline-offset-8"
                      : "text-white/60 hover:text-white"
                  }`
                }
              >
                <img
                  src="../assets/merchant/subscription.svg"
                  className="w-4"
                />
                Subscription & Payments
              </NavLink>

              <NavLink
                to="/sponsor"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive
                      ? "text-white underline underline-offset-8"
                      : "text-white/60 hover:text-white"
                  }`
                }
              >
                <img src="../assets/merchant/referral.svg" className="w-3" />
                Sponsor’s Tracking
              </NavLink>
              <NavLink
                to="/activity"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive
                      ? "text-white underline underline-offset-8"
                      : "text-white/60 hover:text-white"
                  }`
                }
              >
                <img src="../assets/merchant/activity.svg" className="w-4" />
                Activity
              </NavLink>
              <button className="text-white/60 hover:text-white">
                <span className="mr-2">
                  <i class="fa-solid fa-arrow-right-from-bracket fa-sm"></i>
                </span>
                Logout
              </button>
            </nav>

            <div className="lg:hidden md:flex flex-col justify-end ">
              <button onClick={handleMobileDropdown} className="text-white ">
                {mobiledropdown ? (
                  <FontAwesomeIcon icon={faXmark} />
                ) : (
                  <FontAwesomeIcon icon={faBars} />
                )}
              </button>
            </div>

            {mobiledropdown && (
              <div className="bg-black border border-white/50 rounded-xl absolute top-16 right-5 z-50 text-white p-7 uppercase lg:hidden">
                <nav className="flex flex-col items-start gap-6 text-sm">
                  <a
                    href="/ProfileInfo"
                    className={`flex items-center gap-2 ${
                      currentPath === "/ProfileInfo"
                        ? "text-white underline underline-offset-8"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <img
                      src="../assets/merchant/dashboard.svg"
                      className="w-3"
                    />
                    Dashboard
                  </a>

                  <a
                    href="/CurrentProgram"
                    className={`flex items-center gap-2 ${
                      currentPath === "/CurrentProgram"
                        ? "text-white underline underline-offset-8"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <img src="../assets/merchant/user.svg" className="w-3" />
                    User Management
                  </a>

                  <a
                    href="/ReferralInformation"
                    className={`flex items-center gap-2 ${
                      currentPath === "/ReferralInformation"
                        ? "text-white underline underline-offset-8"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <i className="fa-solid fa-dollar-sign"></i>
                    Subscription & Payments
                  </a>

                  <a
                    href="/ReferralSubcription"
                    className={`flex items-center gap-2 ${
                      currentPath === "/ReferralSubcription"
                        ? "text-white underline underline-offset-8"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <img
                      src="../assets/merchant/analytics.svg"
                      className="w-3"
                    />
                    Sponsor’s Tracking
                  </a>

                  <a
                    href="/SupportTicket"
                    className={`flex items-center gap-2 ${
                      currentPath === "/SupportTicket"
                        ? "text-white underline underline-offset-8"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <img
                      src="../assets/merchant/analytics.svg"
                      className="w-3"
                    />
                    Activity
                  </a>

                  <button className="text-white/60 hover:text-white">
                    <span className="mr-2">
                      <i className="fa-solid fa-arrow-right-from-bracket fa-sm"></i>
                    </span>
                    Logout
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
