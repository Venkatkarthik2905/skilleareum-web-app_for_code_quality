import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { persistor } from "../../store";
import { clearMerchant } from "../../store";


const Header = () => {
  const navigate = useNavigate();
  const [mobiledropdown, setMobiledropdown] = useState(false);
  const currentPath = window.location.pathname;

  const handleMobileDropdown = () => {
    setMobiledropdown(!mobiledropdown);
  };

  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Clear merchant redux state
    dispatch(clearMerchant());

    // Clear persisted redux storage
    await persistor.purge();

    // Redirect to merchant login
    navigate("/merchant-login");
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
                to="/merchant-dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive
                    ? "text-white underline underline-offset-8"
                    : "text-white/60 hover:text-white"
                  }`
                }
              >
                <img src="../assets/merchant/dashboard.svg" className="w-3" />
                Dashboard
              </NavLink>

              <NavLink
                to="/user-performance"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive
                    ? "text-white underline underline-offset-8"
                    : "text-white/60 hover:text-white"
                  }`
                }
              >
                <img src="../assets/merchant/user.svg" className="w-3" />
                User Performance
              </NavLink>

              <NavLink
                to="/financial-report"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive
                    ? "text-white underline underline-offset-8"
                    : "text-white/60 hover:text-white"
                  }`
                }
              >
                <i className="fa-solid fa-dollar-sign"></i>
                Financial Reports
              </NavLink>

              <NavLink
                to="/report-analytics"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive
                    ? "text-white underline underline-offset-8"
                    : "text-white/60 hover:text-white"
                  }`
                }
              >
                <img src="../assets/merchant/analytics.svg" className="w-3" />
                Analytics
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-white/60 hover:text-white"
              >
                <span className="mr-2">
                  <i className="fa-solid fa-arrow-right-from-bracket fa-sm"></i>
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
                    href="/merchant-dashboard"
                    className={`flex items-center gap-2 ${currentPath === "/merchant-dashboard"
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
                    href="/user-performance"
                    className={`flex items-center gap-2 ${currentPath === "/user-performance"
                      ? "text-white underline underline-offset-8"
                      : "text-white/60 hover:text-white"
                      }`}
                  >
                    <img src="../assets/merchant/user.svg" className="w-3" />
                    User Performance
                  </a>

                  <a
                    href="/financial-report"
                    className={`flex items-center gap-2 ${currentPath === "/financial-report"
                      ? "text-white underline underline-offset-8"
                      : "text-white/60 hover:text-white"
                      }`}
                  >
                    <i className="fa-solid fa-dollar-sign"></i>
                    Financial Reports
                  </a>

                  <a
                    href="/report-analytics"
                    className={`flex items-center gap-2 ${currentPath === "/report-analytics"
                      ? "text-white underline underline-offset-8"
                      : "text-white/60 hover:text-white"
                      }`}
                  >
                    <img
                      src="../assets/merchant/analytics.svg"
                      className="w-3"
                    />
                    Analytics
                  </a>
                  <button
                    onClick={handleLogout}
                    className="text-white/60 hover:text-white"
                  >
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
