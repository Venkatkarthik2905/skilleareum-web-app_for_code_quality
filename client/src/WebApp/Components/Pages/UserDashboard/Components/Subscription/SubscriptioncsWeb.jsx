import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import { useTranslation } from "react-i18next";

const SubsciptioncsWeb = ({ onClose }) => {
  const { t } = useTranslation('dashboard');
  // const { playSound } = useSettings();

  return (
    <DashboardLayout>
    <div className=" relative text-white font-poppins">
      
        <div className="w-full z-10 ">
          <div className="w-full flex items-center ">
            <div
              onClick={() => {
                if (navigator.vibrate) {
                  navigator.vibrate(100);
                }
                // playSound();
                onClose();
              }}
              className="cursor-pointer flex justify-start items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="font-bold" />
            
            </div>
           
          </div>
          <div className="flex flex-col justify-center items-center mt-10">
            <div className=" flex justify-center items-center ">
              <div className="flex justify-center items-center">
                <img
                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                  className="w-7/12"
                />
              </div>
            </div>
            <div className="w-[95%] mx-auto mt-10 flex flex-col justify-center items-center gap-5 ">
              <div>
                <p className="uppercase text-lg w-[80%]  font-zendots">
                  {t('subscription.title')}{" "}
                </p>
                <hr className="w-24 border-0 h-1 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] " />
              </div>
              <div className="">
                <p className="font-semibold">
                  {t('subscription.madeEasy')}
                </p>
              </div>
              {/* <div className="w-[40%] flex justify-center items-center relative ">
                <div className="flex justify-center items-center ">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] flex justify-center items-center ">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>

                <div className="  description absolute top-7 font-bold text-xs">
                  <span style={{ "--i": 1 }}> </span>
                  <span style={{ "--i": 2 }}> </span>
                  <span style={{ "--i": 3 }}>C</span>
                  <span style={{ "--i": 4 }}>o</span>
                  <span style={{ "--i": 5 }}>m</span>
                  <span style={{ "--i": 6 }}>i</span>
                  <span style={{ "--i": 7 }}>n</span>
                  <span style={{ "--i": 8 }}>g</span>
                  <span style={{ "--i": 9 }}> </span>
                  <span style={{ "--i": 10 }}> </span>
                  <span style={{ "--i": 11 }}>S</span>
                  <span style={{ "--i": 12 }}>o</span>
                  <span style={{ "--i": 13 }}>o</span>
                  <span style={{ "--i": 14 }}>n</span>
                  <span style={{ "--i": 15 }}> </span>
                  <span style={{ "--i": 16 }}> </span>
                </div>
              </div> */}
            </div>
            <div className="mt-10  relative  py-3 flex justify-center items-center ">
              <div className="absolute w-full h-20  mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0"></div>
              <div
                role="button"
                className=" mx-auto flex justify-between items-center bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg py-3 px-10 uppercase z-10"
              >
                {" "}
                <p
                  className="font-zendots text-center z-10"
                  style={{ textShadow: "2px 2px 2px #00000065" }}
                >
                  {t('common.comingSoon')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </DashboardLayout>
  );
};

export default SubsciptioncsWeb;
