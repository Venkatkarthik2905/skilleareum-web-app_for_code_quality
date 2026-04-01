import React, { useState } from "react";
import AIFailureFiles from "./AIFailureFiles";
import DashboardLayout from "../../Layout/DashboardLayout";
import { useTranslation } from "react-i18next";

export default function AIFailureFilesRules() {
  const { t } = useTranslation("ai_failure");
  const [openQuiz, setOpenQuiz] = useState(false);

  const rules = [
    {
      number: 1,
      title: t("rules.rule1.title"),
      points: t("rules.rule1.points", { returnObjects: true }),
    },
    {
      number: 2,
      title: t("rules.rule2.title"),
      points: t("rules.rule2.points", { returnObjects: true }),
    },
  ];

  return (
    <DashboardLayout>
      <div>
        {openQuiz ? (
          <AIFailureFiles />
        ) : (
          <div className="mt-24 flex items-center justify-center p-4 relative overflow-hidden font-poppins">
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#0285FF] to-[#1EEF32] rounded-xl p-[1px] ">
              <div className=" bg-[#080B1C] rounded-xl p-4 lg:p-6 ">
                <button className="absolute top-6 left-4 w-10 h-10 flex items-center justify-center text-white hover:text-cyan-400 transition-colors">
                  <i className="fas fa-arrow-left text-xl"></i>
                </button>
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                      <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif" />
                    </div>
                  </div>
                </div>

                <p className="text-xl lg:text-2xl font-inter tracking-wider font-semibold text-white mb-3 md:mb-4">
                  {t("rules.title")}
                </p>

                <div className="space-y-2 md:space-y-4 mb-4 md:mb-5">
                  {rules.map((rule) => (
                    <div
                      key={rule.number}
                      className="flex items-start gap-4 md:gap-5"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#0285FF]">
                        <span className="text-white font-bold text-sm">
                          {rule.number}
                        </span>
                      </div>

                      <div className="flex-1">
                        <p className="text-base font-inter md:text-lg font-medium text-white mb-1">
                          {rule.title}
                        </p>
                        <ul className="space-y-1">
                          {rule.points.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 bg-gradient-to-b from-[#0285FF] to-[#1EEF32] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-xs text-white leading-relaxed">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <div
                    onClick={() => setOpenQuiz(true)}
                    className=" cursor-pointer rounded-xl w-[60%] mx-auto h-9 relative"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                    }}
                  >
                    <div className="h-9 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                    <div className="h-9 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                    <div className=" bg-[#070e3a4b] backdrop-blur-sm h-9 rounded-xl w-full border-[0.5px] border-[#1AE348] "></div>
                    <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                      <p
                        className="uppercase font-medium text-center text-sm font-zendots"
                        style={{
                          color: "transparent",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          backgroundImage:
                            "linear-gradient(to right, #0285FF, #1EEF32)",
                        }}
                      >
                        {t("rules.lets_begin")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
