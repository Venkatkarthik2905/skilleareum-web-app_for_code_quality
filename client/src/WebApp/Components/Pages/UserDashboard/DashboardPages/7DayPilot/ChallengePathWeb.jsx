import { faCheck, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Subpack from "../Subscription/Subpack";
import { useSelector } from "react-redux";
import AIMasterPopupWeb from "./AIMasterPopupWeb";
import DashboardLayout from "../../Layout/DashboardLayout";
import { useTranslation } from "react-i18next";

const levels = [
  {
    id: "apprentice",
    title: "AI APPRENTICE",
    bg: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/shield3.svg",
    icon: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif",
    status: "completed",
    badge: "✔",
    currentlevel: false,
  },
  {
    id: "genesis",
    title: "AI GENESIS",
    bg: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/shield6.svg",
    icon: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif",
    status: "active",
    badge:
      "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/brain.svg",
    currentlevel: true,
  },
  {
    id: "lite",
    title: "AI LITE",
    bg: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/shield7.svg",
    badge:
      "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/torch.svg",
    status: "locked",
    currentlevel: false,
  },
  {
    id: "pro",
    title: "AI PRO",
    bg: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/shield1.svg",
    badge:
      "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/crystal.svg",
    status: "locked",
    currentlevel: false,
  },
  {
    id: "master",
    title: "AI MASTER",
    bg: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/shield4.svg",
    badge:
      "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/graduation-hat+1.svg",
    status: "locked",
    currentlevel: false,
  },
  {
    id: "elite",
    title: "AI ELITE",
    bg: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/shield7.svg",
    badge:
      "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/elite.svg",
    status: "locked",
    currentlevel: false,
  },
];

const ChallengePathWeb = () => {
  const { t } = useTranslation('dashboard');
  // const { playSound } = useSettings();
  const [showpopup, setShowPopup] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const sub_status = useSelector((state) => state.user_email.sub_status);

  const handleSubscribe = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
      // setSubscribe(!subscribe);
    navigate("/SubPackWeb");
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="relative text-white font-poppins mt-28 ">
        {/* {subscribe && (
          <div className="fixed inset-0 model-overlay backdrop-blur-sm flex items-end z-50">
            <div className="relative w-full">
              <div className=" absolute top-3 bg-[#1EEF3273] blur-xl w-full h-10 z-0 "></div>
              <Subpack onClose={handleSubscribe} />
            </div>
          </div>
        )} */}
        <div className="w-full z-10  relative max-w-lg mx-auto">         
          <div className="mt-10 flex flex-col items-center gap-9 pb-10">
            {levels.map((level, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (level.status == "active") {
                    if (sub_status == "active") {
                      // console.log("Navigating to ChallengeDays");
                      navigate("/ChallengeMap_30Days");
                    } else {
                      handleSubscribe();
                    }
                  } else {
                    // console.log("Status not active:", level.status);
                  }
                }}
                className={` cursor-pointer w-full max-w-[22rem] h-36 flex justify-between items-center gap-5 relative ${
                  idx % 2 === 1 ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {idx !== levels.length - 1 && (
                  <div
                    className={` absolute  h-0.5 w-48 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] ${
                      idx % 2 === 1
                        ? "-rotate-[47deg]  -bottom-5 right-20 "
                        : "rotate-[47deg]  -bottom-4 right-20 "
                    } `}
                  />
                )}
               
                <div
                  className={` relative flex ${
                    idx % 2 === 1 ? "flex-row-reverse" : "flex-row"
                  } items-center justify-center `}
                >
                  <img src={level.bg} className=" w-[135px] h-[135px] " />
                  {level.status === "locked" ? (
                    <div className="absolute top-[52px] left-0 right-0 bottom-0 bg-gradient-to-b from-[#0985F1] to-[#00FF9F] border-2 border-white w-8 h-8 mx-auto flex justify-center items-center rounded-full">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={level.icon}
                        alt={level.title}
                        className="w-12 h-12 absolute top-9 left-0 right-0 bottom-0 mx-auto"
                      />
                    </div>
                  )}
                </div>
               
                <div
                  className={`z-20 cursor-pointer w-[65%] mt-2 text-[#1EEF32] font-medium font-zendots flex ${
                    idx % 2 === 1 ? "flex-row-reverse" : "flex-row"
                  } gap-2 items-center justify-center  `}
                >
                  <div className="flex flex-col items-center gap-1">
                    <p className=" cursor-pointer ">{t(`pilot.levels.${level.id}`, level.title)}</p>
                    {level.currentlevel === true && (
                      <hr className=" w-[80%] bg-[#1EEF32] rounded-full h-[3px] blur-[3px] " />
                    )}
                  </div>
                  {level.status === "completed" ? (
                    <span className="text-[#1EEF32] pl-2 ">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  ) : (
                    <img src={level.badge} className=" w-20 h-20 " />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {showpopup && (
          <div className=" z-50 transition-all ease-in-out duration-300">
            <AIMasterPopupWeb onClose={() => setShowPopup(false)} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ChallengePathWeb;
