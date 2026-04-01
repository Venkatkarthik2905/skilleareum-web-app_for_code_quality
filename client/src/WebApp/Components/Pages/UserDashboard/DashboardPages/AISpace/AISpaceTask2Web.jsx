import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import { playEveryTap } from "../../../../../../utils/audioUtils";

const AISpaceTask2Web = ({
  handleStart,
  claimReward,
  isClaimed,
  CloseTask2,
  canClaim,
  mission,
}) => {
  const { t } = useTranslation("ai_space");
  //console.log("mission  ", mission);
  const playSound = () => {
    playEveryTap();
  };
  return (
    <div>
      <div className=" bg-[#01000A] h-screen relative text-white font-poppins z-50">
       
            <div style={{ backgroundImage: "url(/assets/WebApp/stars.svg)" }} className="relative bg-cover bg-center h-screen overflow-hidden overflow-y-auto ">
              <div className="absolute top-4 right-4 z-50">
                <FaTimes
                  className="text-white text-2xl cursor-pointer hover:text-red-500 transition"
                  onClick={() => {
                    playSound();
                    CloseTask2(false);
                  }}
                />
              </div>
           

              <div className="w-full z-10  flex flex-col justify-center pt-3">
                <div className="mt-10">
                  <p className=" text-center text-sm px-2 leading-6">
                    {mission?.mission_task}
                  </p>

                  <div className=" flex flex-col justify-center items-center ">
                    <div className=" relative  ">
                      <div className=" flex justify-center items-center ">
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                          alt="robot"
                          className="w-32 my-4"
                        />
                      </div>
                      <div className="flex flex-col items-center ">
                        <div
                          className={` translate-y-1 rotate-90 h-0.5 w-14 mx-auto  bg-gradient-to-r from-[#0285FF] to-[#1EEF32] `}
                        />
                        <div className="translate-y-8 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rotate-45 w-2.5 h-2.5" />
                      </div>
                    </div>
                    <div className="mt-10 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1px] rounded-2xl ">
                      <div className=" bg-[#03071f] rounded-2xl py-5 px-2 flex flex-col items-center gap-2">
                        <img
                          src={
                            mission?.img_link ||
                            "https://skilleareumimages.s3.ap-south-1.amazonaws.com/paraphraser.png"
                          }
                          className=" w-16 "
                        />
                        <p className=" text-[#1EEF32] text-center text-sm font-semibold ">
                          {mission?.tool_to_use}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className=" text-sm text-center mt-3 ">
                    <p className="">
                      {t("ui.earn_points_msg")}
                    </p>
                    <p className="mt-2">
                      {t("ui.compare_text_msg")}
                    </p>
                  </div>

                  <div className="mt-2 relative z-50">
                    <div className="bg-gradient-to-r from-[#FFFFFF33] via-[#1EEF32A6] to-[#FFFFFF33] w-full h-0.5"></div>
                    <div className="bg-[#1EEF3273] w-full rounded-full h-12 blur-xl absolute top-3 -z-10"></div>
                    <div
                      onClick={() => {
                        // console.log("AI SPACE === ", canClaim, isClaimed);
                        playSound();
                        if (!canClaim) {
                          return handleStart();
                        } else if (canClaim && !isClaimed) {
                          return claimReward();
                        }
                        return;
                      }}
                      className={`w-[85%] cursor-pointer z-50 mx-auto bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg py-3 uppercase my-3`}
                    >
                      <p
                        className="w-full text-center z-50 uppercase font-zendots"
                        style={{ textShadow: "2px 2px 2px #00000065" }}
                      >
                        {canClaim
                          ? isClaimed
                            ? t("ui.claimed")
                            : t("ui.claim")
                          : t("ui.get_started")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
  );
};

export default AISpaceTask2Web;
