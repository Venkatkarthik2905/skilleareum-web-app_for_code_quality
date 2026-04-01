import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  faArrowLeft,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AssessmentWeb from "./AssessmentWeb";
import DashboardLayout from "../../Layout/DashboardLayout";

const AISkillQuestWeb = () => {
  const { t } = useTranslation("assessments");
  const [hasStarted, setHasStarted] = useState(false);
  const navigate = useNavigate();
  // const { playSound } = useSettings();

  const startAssessment = () => {
    // playSound();
    setHasStarted(true);
  };

  const location = useLocation();
  const day = new URLSearchParams(location.search).get("day") || localStorage.getItem("day");
  const source = new URLSearchParams(location.search).get("source");
  //console.log("day", day);
  const handleClose = () => {
    // playSound();
   // console.log("handleClose : ", source);
    if (source === "TaskListWeb") {
      navigate("/TaskListWeb");
    } else if (source === "ChallengeMapWeb") {
      navigate("/ChallengeMapWeb");
    } else {
      navigate("/DailybonusWeb");
    }
  };
  return (
    <DashboardLayout>
    <div className="relative text-white  font-poppins mt-28 ">      
        
            <div className="w-full  max-w-xl mx-auto relative z-10 ">
              {!hasStarted ? (
                <div>
                  <div className="w-[95%] mx-auto flex items-center">
                    <button
                      className=" absolute top-6 left-10 font-poppins "
                      onClick={handleClose}
                    >
                      <FontAwesomeIcon icon={faArrowLeftLong} />
                    </button>
                   
                  </div>

                  <div className="pt-7">
                    <div>
                      <p className="text-xl font-medium text-center font-zendots ">
                        {t("ui.title")}
                      </p>
                    </div>

                    <div className="mt-12 w-[90%] md:w-[65%] mx-auto">
                      <div className="mt-10">
                        <div className="w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3">
                          <div className="rounded-xl  bg-[#070E3A] w-full h-full">
                            <div
                              className="py-5 px-3 rounded-xl flex justify-between items-center"
                              style={{
                                background:
                                  "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                              }}
                            >
                              <p className="w-full text-sm text-center">
                                {t("ui.gain_points")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center items-center mt-12">
                        <div
                          onClick={startAssessment}
                          className=" cursor-pointer rounded-2xl w-full h-10 relative"
                          style={{
                            backgroundImage:
                              "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                          }}
                        >
                          <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                          <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                            <p
                              className="uppercase font-medium text-center font-zendots"
                              style={{
                                color: "transparent",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                backgroundImage:
                                  "linear-gradient(to right, #0285FF, #1EEF32)",
                              }}
                            >
                              {t("ui.start_assessment")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <AssessmentWeb day={day} source={source} />
              )}
            </div>
          </div>
        
    </DashboardLayout>
  );
};

export default AISkillQuestWeb;
