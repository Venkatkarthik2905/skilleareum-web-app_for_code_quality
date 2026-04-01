import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const SkillpointsEarned = ({ setSkillPoints, day = 1, points = 250 }) => {
  const { t } = useTranslation("common");

  const handleExit = () => {
    setSkillPoints();
  };

  return (
    <div translate="no" className="w-full fixed inset-0 z-50 font-zendots ">
      <div className="bg-black/80 relative bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins">
        <div className="">
          <div className=" h-screen w-full overflow-hidden overflow-y-auto flex justify-center items-center ">
            <div className="relative w-full max-w-md">
              <div className=" font-poppins ">
                <div
                  className={`w-[95%] md:w-[80%] mx-auto animate__animated bg-black/50 rounded-2xl p-0.5`}
                >
                  <div className="w-full rounded-2xl relative">
                    <div className=" border-2 border-[#0BA9A9] bg-gradient-to-b from-[#147E3C] via-[#113B49] to-[#0D234C] px-5 pt-5 pb-10 rounded-xl shadow-md shadow-[#21FFBC] ">
                      <div className="w-full bg-[#000A14]  rounded-2xl p-3  ">
                        <div className="relative flex justify-center items-center">
                          <div className="z-10">
                            <div>
                              <p className="text-center text-xl text-[#1EEF32] mb-2 font-zendots uppercase ">
                                {t("reward.day_label", { day })}
                              </p>
                            </div>
                            <div
                              className="flex justify-center items-center gap-2 bg-[#001528] px-5 py-2.5 rounded-lg"
                              translate="no"
                            >
                              <img
                                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                className="w-10  "
                              />
                              <p className="mt-1 text-center text-2xl font-zendots text-white ">
                                {points}
                              </p>
                            </div>
                            <div className="uppercase mt-5">
                              <p className="text-center text-lg font-zendots text-[#1EEF32] my-auto">
                                {t("reward.skill_points")}
                              </p>
                              <p className="text-center text-lg font-zendots text-white my-auto">
                                {t("reward.earned")}
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr className=" w-[65%] mx-auto border border-white opacity-90 my-5" />
                        <div>
                          <p className="text-center text-sm font-zendots my-auto text-[#1EEF3280] tracking-wide ">
                            {t("reward.come_back")}
                          </p>
                        </div>

                        <div className="absolute -bottom-5 left-[50%] -translate-x-[50%] flex justify-center items-center text-center gap-3 w-[85%] mx-auto">
                          <div className="w-[50%]">
                            <div className="flex justify-center">
                              <div
                                onClick={handleExit}
                                className=" mt-3 cursor-pointer rounded-xl w-80 h-10 relative"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                                }}
                              >
                                <div className="h-10 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                                <div className="h-10 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                                <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-xl w-full border-[0.5px] border-[#1AE348] "></div>
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
                                    {t("reward.collect")}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillpointsEarned;
