import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCube,
  faHome,
  faListCheck,
  faGamepad,
  faUsers,
  faGift,
  faGear,
  faPowerOff,
  faHouse,
  faUser,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "../Styles/Style.css";
import { SET_TOKEN, setUserEmail } from "../../../../../store";

const Sidebar = () => {
  const { t } = useTranslation('dashboard');
  const userData = useSelector((state) => state.user_email);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const path = window.location.pathname; 

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [subscribe, setSubscribe] = useState(false);
  const dispatch = useDispatch();
  const { sub_status, platform } = useSelector((state) => state.user_email);
const handleLogout = () => {
     // Clear Redux state
    dispatch(SET_TOKEN(null));
    dispatch(setUserEmail(null));
  navigate("/UserLogin");
};

  const handleSubscribe = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setSubscribe(!subscribe);
  };
  const location = useLocation();

  const isCurrentPathMatch = (path) =>
    ["/Farming/Play", "/Aispace", "/Aivault", "/Learning", "/Aiblog"].includes(
      path
    );

  return (
    <div className=" z-30 ">
       {showLogoutModal && (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-[#191919] rounded-xl p-6 w-[90%] max-w-md text-white shadow-lg border border-white/20">
        <h2 className="text-lg font-semibold mb-4">{t('logout.confirmTitle')}</h2>
        <p className="text-sm mb-6">{t('logout.confirmMessage')}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
          >
            {t('logout.cancel')}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            {t('logout.confirm')}
          </button>
        </div>
      </div>
    </div>
  )}
   <button
        className={`lg:hidden   ${
          isOpen ? 'hidden' : 'block'
        } fixed left-5 top-6 z-50 text-white transition-opacity duration-300 `}
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>
    <div className={` lg:block  ${
          isOpen ? 'block' : 'hidden'
        } fixed left-0 md:left-5 top-8 sm:top-28 h-full z-30  flex flex-col justify-start  items-center  `}>
      
    <div className={` w-16 sm:w-20 bg-black border rounded-xl flex flex-col justify-center  items-center py-6  text-white   ${
          isOpen ? 'translate-x-3 ' : '-translate-x-full md:translate-x-0'
        }`}>
     <button
          className="lg:hidden mb-4"
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faBars} className="text-xl text-white" />
        </button>     
        
      <div className=" flex flex-col md:space-y-0 space-y-4  w-full items-center ">
        <div className=" lg:hidden block w-full h-[1px] bg-gradient-to-r from-white/0 via-white to-white/0 " />
        <div className="md:pb-4 pb-0">
        <img
          title="title"
          loading="lazy"
          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif"
          className="w-12 h-12 "
        />
        </div>

        <div className="  w-full h-[1px] bg-gradient-to-r from-white/0 via-white to-white/0 " />
      </div>
   <div className="flex flex-col space-y-7 mt-7">
      <span className="text-sm uppercase tracking-wide">{t('sidebar.menu')}</span>

      {/* Home */}
      <a
        href={userData.current_program ==="genesis" ?"ChallengeMap_30Days" : "/ChallengeMap_7Days" }
        className="text-lg cursor-pointer flex flex-col justify-center items-center hover:text-[#15DCFF]"
        onClick={() => {
          if (navigator.vibrate) navigator.vibrate(100);
        }}
      >
        <i
  className={`fa-solid fa-house menu-icon ${
    path === "/ChallengeMap_7Days" || path === "/" ? "active" : ""
  }`}
/>
      </a>

      {/* Daily Bonus */}
      <a
        href="/DailyBonusWeb"
        className="text-lg flex justify-center items-center hover:text-[#15DCFF]"
        onClick={(e) => {
          if (sub_status !== "active") {
            e.preventDefault();
            handleSubscribe();
          } else {
            if (navigator.vibrate) navigator.vibrate(100);
          }
        }}
      >
        <i
  className={`fa-solid fa-clipboard-list menu-icon ${
    path === "/DailyBonusWeb" ? "active" : ""
  }`}
/>
      </a>

      {/* AI Game */}
      {/* <a
        href="/AIGameWeb"
        className="text-lg cursor-pointer flex flex-col justify-center items-center hover:text-[#15DCFF]"
        onClick={() => {
          if (navigator.vibrate) navigator.vibrate(100);
        }}
      >
       <i
  className={`fa-solid fa-gamepad menu-icon ${
    path === "/AIGameWeb" ? "active" : ""
  }`}
/>
      </a> */}

      {/* Invite */}
      <a
        href={
          sub_status !== "active" && platform === "MBC"
            ? "#"
            : "/InvitescreenWeb"
        }
        className="text-lg cursor-pointer flex flex-col justify-center items-center hover:text-[#15DCFF]"
        onClick={(e) => {
          if (sub_status !== "active" && platform === "MBC") {
            e.preventDefault();
            handleSubscribe();
          } else {
            if (navigator.vibrate) navigator.vibrate(100);
          }
        }}
      >
        <i
  className={`fa-solid fa-users menu-icon ${
    path === "/InvitescreenWeb" ? "active" : ""
  }`}
/>
      </a>

      {/* Rewards */}
      <a
        href="/MyRewardsWeb"
        className="text-lg cursor-pointer flex flex-col justify-center items-center hover:text-[#15DCFF]"
        onClick={() => {
          if (navigator.vibrate) navigator.vibrate(100);
        }}
      >
        <i
  className={`fa-solid fa-gift menu-icon ${
    path === "/MyRewardsWeb" ? "active" : ""
  }`}
/>
      </a>
    </div>

      <div className="flex-grow  " />
      <div className="w-full flex flex-col space-y-5 mt-7">
  <div className="w-full h-[1px] bg-gradient-to-r from-white/0 via-white to-white/0" />

 <a
  href="/UserProfile"
  className="text-lg hover:text-[#15DCFF] cursor-pointer flex flex-col justify-center items-center"
  onClick={() => {
    if (navigator.vibrate) navigator.vibrate(100);
  }}
>
  <i
    className={`fa-solid fa-gear menu-icon ${
      window.location.pathname === "/UserProfile" ? "active" : ""
    }`}
  />
</a>


  {/* Logout Icon */}
  <FontAwesomeIcon
    icon={faPowerOff}
    className="text-lg text-red-500 hover:text-red-600 cursor-pointer"
    onClick={() => setShowLogoutModal(true)}
  />

  {/* Logout Confirmation Modal */}
 
</div>

    </div>
    </div>
    </div>
  );
};

export default Sidebar;



// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faHouse,
//   faListCheck,
//   faGamepad,
//   faUsers,
//   faGift,
//   faGear,
//   faPowerOff,
// } from "@fortawesome/free-solid-svg-icons";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "../Styles/Style.css";

// const Sidebar = () => {
//   const userData = useSelector((state) => state.user_email);
//   const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
//   const navigate = useNavigate();
//   const { sub_status } = useSelector((state) => state.user_email);

//   const handleSubscribe = () => {
//     if (navigator.vibrate) {
//       navigator.vibrate(100);
//     }
//     // Assuming subscribe state is handled elsewhere
//   };

//   const navItems = [
//     { to: "/ChallengeMap_7Days", icon: faHouse, label: "Home" },
//     { to: "/DailyBonusWeb", icon: faListCheck, label: "Daily Bonus", isSvg: true },
//     { to: "/AIGameWeb", icon: faGamepad, label: "AI Game" },
//     { to: "/InvitescreenWeb", icon: faUsers, label: "Invite" },
//     { to: "/MyRewardsWeb", icon: faGift, label: "Rewards" },
//     { to: "/UserProfile", icon: faGear, label: "Profile" },
//   ];

//   return (
//     <div className="fixed left-0 top-0 h-full z-50">
//       {/* Toggle button outside sidebar container, visible when sidebar is closed */}
//       <button
//         className={`md:hidden fixed left-4 top-4 z-50 text-white bg-gray-800 p-2 rounded-full transition-opacity duration-300 ${
//           isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
//         }`}
//         onClick={() => setIsOpen(true)}
//       >
//         <FontAwesomeIcon icon={faBars} className="text-xl" />
//       </button>

//       <div
//         className={`bg-gray-800 w-20 md:w-64 h-full border-r border-gray-700 flex flex-col items-center py-6 transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
//         }`}
//       >
//         {/* Close button inside sidebar, visible only when sidebar is open on mobile */}
//         <button
//           className="md:hidden mb-4"
//           onClick={() => setIsOpen(false)}
//         >
//           <FontAwesomeIcon icon={faBars} className="text-xl text-white" />
//         </button>

//         <div className="flex flex-col items-center w-full space-y-4">
//           <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
//           <img
//             title="Logo"
//             loading="lazy"
//             src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif"
//             className="w-12 h-12"
//             alt="Logo"
//           />
//           <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
//         </div>

//         <div className="flex flex-col space-y-7 mt-7 w-full items-center">
//           <span className="text-sm uppercase tracking-wide text-gray-300">MENU</span>

//           {navItems.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               className="flex flex-col justify-center items-center text-lg hover:text-[#15DCFF] cursor-pointer"
//             >
//               {({ isActive }) => (
//                 <div
//                   onClick={() => {
//                     if (item.isSvg && sub_status !== "active") {
//                       handleSubscribe();
//                     }
//                     if (navigator.vibrate) {
//                       navigator.vibrate(100);
//                     }
//                   }}
//                   className="flex flex-col justify-center items-center relative"
//                 >
//                   {item.isSvg ? (
//                     <img
//                       src={`https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/list${isActive && sub_status === "active" ? "active" : ""}.svg`}
//                       alt={item.label}
//                       className="w-6 h-6"
//                     />
//                   ) : (
//                     <FontAwesomeIcon
//                       icon={item.icon}
//                       className={`text-white ${isActive ? "text-[#15DCFF]" : ""}`}
//                     />
//                   )}
//                   {isOpen && (
//                     <span className="text-sm mt-2 hidden md:block">{item.label}</span>
//                   )}
//                   {isActive && (
//                     <div className="w-5 h-0.5 bg-[#15CE70] rounded-full mt-2" />
//                   )}
//                 </div>
//               )}
//             </NavLink>
//           ))}
//         </div>

//         <div className="flex-grow" />

//         <div className="w-full flex flex-col space-y-5">
//           <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
//           <FontAwesomeIcon
//             icon={faPowerOff}
//             className="text-lg text-red-500 hover:text-red-600 cursor-pointer mx-auto"
//             onClick={() => navigate('/logout')}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
