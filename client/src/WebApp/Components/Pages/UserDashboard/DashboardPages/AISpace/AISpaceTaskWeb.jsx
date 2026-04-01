import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { playEveryTap } from "../../../../../../utils/audioUtils";

const AISpaceTaskWeb = ({
  mission,
  canClaim,
  setOpenTask,
  handletask2,
  onNext,
}) => {
  const { t } = useTranslation("ai_space");
  const navigate = useNavigate();
  //  const { playSound } = useSettings();
  const playSound = () => {
    playEveryTap();
  };

  return (
    <div className="w-full bg-[#01000A] relative text-white font-poppins" >
    
       
              <div className="z-50 pt-5 ">
                <button
                  className=" text-white z-50 text-xl absolute top-5 left-5"
                  onClick={() => {
                    playSound();
                    setOpenTask(false);
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </button>         
           
            </div>

            <div style={{ backgroundImage: "url(/assets/WebApp/stars.svg)" }}  className=" relative bg-cover bg-center w-full z-10 h-screen overflow-hidden overflow-y-auto  flex flex-col justify-start pt-10 ">
         
              
                  <div className=" flex justify-between overflow-hidden ">
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/p1.svg"
                      className="w-72 scale-x-[-1] absolute -top-24 -left-10 "
                    />
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/p1.svg"
                      className="w-72 absolute -top-24 -right-10 "
                    />
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                      className="w-36 mx-auto  "
                    />
                  </div>
                  <div>
                    <p className=" uppercase mt-2 font-medium font-zendots text-center ">
                      {t("ui.welcome_to")}
                    </p>
                    <div
                      className={` w-44 mt-2 mx-auto bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full py-2 uppercase z-10`}
                    >
                      <p
                        className="w-full text-center z-10 uppercase font-zendots"
                        style={{ textShadow: "2px 2px 2px #00000065" }}
                      >
                        {t("ui.ai_space_title")}
                      </p>
                    </div>
                  </div>
               
            

              <div className="mt-5">
                <div className=" flex justify-center items-center gap-2 ">
                  <div className=" w-2 h-2 rounded-full bg-[#1EEF32]  "></div>
                  <p className=" text-sm font-medium ">{t("ui.todays_mission")}</p>
                  <div className=" w-2 h-2 rounded-full bg-[#1EEF32]  "></div>
                </div>
                <div className="w-[70%] mx-auto flex justify-center ">
                  <p className=" mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#0285FF] to-[#1EEF32] font-semibold text-center ">
                    {mission?.mission_name}
                  </p>
                </div>
                <div className=" bg-gradient-to-r from-[#FFFFFF33] via-[#1EEF32A6] to-[#FFFFFF33] w-full h-0.5 my-2 "></div>
              </div>

              <div className="flex items-start justify-around">
                <div className="w-1/2 mt-2 ">
                  <div className=" flex justify-center items-center gap-2 ">
                    <div className=" w-2 h-2 rounded-full bg-[#1EEF32]  "></div>
                    <p className=" text-sm font-medium ">{t("ui.tool_label")}</p>
                    <div className=" w-2 h-2 rounded-full bg-[#1EEF32]  "></div>
                  </div>
                  <div className="w-[100%] mx-auto flex justify-center ">
                    <p className=" mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-sm font-semibold text-center ">
                      {mission?.tool_to_use}
                    </p>
                  </div>
                </div>
                <div className="w-1/2 mt-2 ">
                  <div className=" flex justify-center items-center gap-2 ">
                    <div className=" w-2 h-2 rounded-full bg-[#1EEF32]  "></div>
                    <p className=" text-sm font-medium ">{t("ui.category_label")}</p>
                    <div className=" w-2 h-2 rounded-full bg-[#1EEF32]  "></div>
                  </div>
                  <div className="w-[100%] mx-auto flex justify-center ">
                    <p className=" mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-sm font-semibold text-center ">
                      {mission?.tool_category}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" mt-2 relative z-50 ">
                <div className=" bg-gradient-to-r from-[#FFFFFF33] via-[#1EEF32A6] to-[#FFFFFF33] w-full h-0.5 "></div>
                <div className="  bg-[#1EEF3273] w-full rounded-full h-12 blur-xl absolute top-3 -z-10 "></div>
                <div
                  onClick={() => {
                    playSound();
                    onNext();
                  }}
                  className={`w-[65%] cursor-pointer z-50 mx-auto bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg py-2.5 uppercase my-3`}
                >
                  <p
                    className="w-full text-center z-50 uppercase font-zendots"
                    style={{ textShadow: "2px 2px 2px #00000065" }}
                  >
                    {t("ui.lets_begin")}
                  </p>
                </div>
              </div>
            </div>
          </div>
      
  );
};

export default AISpaceTaskWeb;
