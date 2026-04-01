import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../SettingsContext";
import axiosInstance from "../../../../../../config/axiosInstance.js";

const ClaimpointsWeb = ({ setcanClaim, toast }) => {
  const { t } = useTranslation("ai_vault");
  const userData = useSelector((state) => state.user_email);
  const navigate = useNavigate();
  const { playSound } = useSettings();

  const goToPageOne = () => {
    playSound();
    navigate("/Aispace");
  };
  const claimReward = async () => {
    playSound();
    try {
      const { data } = await axiosInstance.post(
        `${SERVER_URL}/api/aivault/claimReward?userId=${userData.id}`
      );
      // console.log(data);
      if (data.message === "Reward claimed successfully.") {
        setcanClaim(false);
        toast.success(t("ui.task_completed"));
        setTimeout(() => {
          navigate("/ChallengeMapweb");
        }, 2000);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div className="bg-[#080B1C] relative bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins">
      <div
        className=" bg-cover bg-center h-screen overflow-hidden overflow-y-auto  "
        style={{
          backgroundImage:
            "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/subscribebg.png)",
        }}
      >
        <div
          className=" h-screen w-full overflow-hidden overflow-y-auto "
          style={{
            background:
              "radial-gradient(378.88% 129.46% at 50% -1.69%, rgba(19, 36, 128, 0) 5.86%, rgba(10, 18, 64, 0.626421) 11.28%, #04071A 24.38%, rgba(4, 8, 29, 0.974934) 60.44%, rgba(4, 7, 26, 0.85) 68.06%, rgba(10, 18, 64, 0.626421) 80.94%, rgba(19, 36, 128, 0) 89.04%)",
          }}
        >
          <div className="relative">
            <div className="w-full z-10 absolute top-0 py-3 min-h-screen overflow-hidden">
              <div className=" relative  min-h-screen overflow-hidden overflow-y-auto">
                <div
                  onClick={() => navigate("/ChallengeMap")}
                  className=" absolute top-7 left-5 "
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className=" flex justify-center items-center gap-2 ">
                  <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif"
                    className="w-12 h-12"
                  />

                  <p
                    style={{
                      color: "transparent",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      backgroundImage:
                        "linear-gradient( to right, #00E0FF, #061FA1 ) ",
                    }}
                    className="  uppercase font-medium text-sm font-zendots "
                  >
                    Skilleareum.Ai
                  </p>
                </div>

                <div className="mt-10">
                  <p className="font-medium text-xl w-full text-white text-center ">
                    {t("ui.explore_facts")} <span className="font-bold">AI</span>
                  </p>
                  <p className="text-xs w-full text-center">
                    {t("ui.learn_earn")}
                  </p>
                </div>
                <div
                  className="absolute bottom-10 left-0 right-0 h-[50%] rounded-t-2xl  w-[100%] mx-auto  border-2 border-[#1AE348]/60 "
                  style={{
                    background:
                      "radial-gradient(76.25% 347.22% at 51.11% 59.77%, #070E3A 0%, rgba(19, 40, 160, 0) 94.66%)",
                  }}
                >
                  <div className="relative w-full h-full">
                    <div
                      className="w-full h-full opacity-40 pb-16  pt-3 px-3 rounded-t-2xl"
                      style={{
                        background:
                          "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                      }}
                    ></div>

                    <div className=" absolute top-0 w-full flex flex-col justify-center items-center">
                      <div className="w-[50%] -translate-y-20 p-[0.9px] shadow-lg shadow-black/25 bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-xl">
                        <div className="w-full bg-[#0a0342] h-full rounded-xl ">
                          <div
                            className="w-full h-full rounded-xl p-1.5 "
                            style={{
                              background:
                                "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                            }}
                          >
                            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/aivault.svg" />
                            <div className="-translate-y-5">
                              <p
                                style={{ textShadow: "2px 2px 2px #00000080" }}
                                className="mt-3 uppercase text-xl font-semibold text-center text-[#FCE932]"
                              >
                                {t("ui.summary")}
                              </p>
                              <p className=" text-xs text-center font-semibold ">
                                {t("ui.keep_learning")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* claim reward button */}
                      <div
                        onClick={claimReward}
                        className="w-56 rounded-2xl h-10 relative -translate-y-10"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                        }}
                      >
                        <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40 "></div>
                        <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                        <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                        <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                          <p
                            className="uppercase font-medium text-center font-zendots text-sm"
                            style={{
                              color: "transparent",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              backgroundImage:
                                "linear-gradient(to right, #0285FF, #1EEF32)",
                            }}
                          >
                            {t("ui.claim_reward")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimpointsWeb;
