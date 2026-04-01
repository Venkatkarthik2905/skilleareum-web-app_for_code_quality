import React, { useState } from "react";
import SkillpointsEarned from "../AIMythBreaker/SkillPointsEarned";
import { useTranslation } from "react-i18next";

const ResultPage = ({ score, totalCases, handleRestart }) => {
  const { t } = useTranslation("ai_failure");
  const [skillPoints, setSkillPoints] = useState(false);

  return (
    <div>
      {skillPoints && (
        <SkillpointsEarned setSkillPoints={() => setSkillPoints(false)} />
      )}
      <div className="mt-28 flex items-center justify-center p-4 font-sans relative overflow-hidden font-poppins">
        <div className="relative w-full max-w-2xl">
          <p className="text-xl md:text-2xl font-inter font-light text-white text-center mb-4">
            {t("results.title")}
          </p>

          <div className="bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-[2px] rounded-xl mb-8">
            <div className="bg-[#080B1C] rounded-xl p-7 flex flex-col items-center">
              <div className="mb-4">
                {score > 0 ? (
                  <i className="fa-regular fa-circle-check text-[#1EEF32] text-[90px]"></i>
                ) : (
                  <i className="fa-regular fa-circle-xmark text-[#F22B2B] text-[90px]"></i>
                )}
              </div>
              <p className="text-xl md:text-2xl text-white mb-3">
                {t("results.cases_count", { score, total: totalCases })}
              </p>

              <p className="text-white text-center text-lg max-w-2xl">
                {score === totalCases && t("results.all_analyzed")}
                {score > 2 && score < totalCases && t("results.strong_effort")}
                {score === 1 && t("results.good_start")}
                {score === 0 && t("results.get_started")}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              onClick={() => handleRestart()}
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
                  {t("results.continue")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
