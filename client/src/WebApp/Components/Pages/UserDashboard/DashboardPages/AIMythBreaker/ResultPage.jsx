import React, { useState } from "react";
import SkillpointsEarned from "./SkillPointsEarned";
import { useTranslation } from "react-i18next";

const ResultPage = ({ hasPassed, score, totalQuestions, handleRestart }) => {
  const { t } = useTranslation("ai_myth");
  const [skillPoints, setSkillPoints] = useState(false);

  return (
    <div>
      { skillPoints &&
      <SkillpointsEarned setSkillPoints={() => setSkillPoints(false)}/>
      }
      <div className="mt-28 flex items-center justify-center p-4 font-sans relative overflow-hidden font-poppins">
        <div className="relative w-full max-w-2xl">
          <p className="text-2xl md:text-3xl font-light text-white text-center mb-4">
            {t("results.title")}
          </p>

          <div className="bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-[2px] rounded-xl mb-8">
            <div className="bg-[#080B1C] rounded-xl p-7 flex flex-col items-center">
              <div
                className={`flex items-center gap-2 px-3 py-0.5 rounded-full border mb-4 ${
                  hasPassed
                    ? "border-[#1EEF32] text-[#1EEF32]"
                    : "border-[#F22B2B] text-[#F22B2B]"
                }`}
              >
                {hasPassed ? (
                  <i class="fa-solid fa-trophy text-[#1EEF32] fa-sm "></i>
                ) : (
                  <i class="fa-solid fa-trophy text-[#F22B2B] fa-sm "></i>
                )}

                <span className=" font-medium tracking-wide">
                  {hasPassed ? t("results.pass") : t("results.fail")}
                </span>
              </div>

              <div className="relative w-28 h-28 mb-3">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48"
                    stroke="#1a1f3a"
                    strokeWidth="5"
                    fill="none"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48"
                    stroke={hasPassed ? "#1EEF32" : "#F22B2B"}
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 48}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 48 * (1 - score / totalQuestions)
                    }`}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">
                    {score}/{totalQuestions}
                  </span>
                </div>
              </div>

              <p className="text-2xl md:text-3xl font-semibold text-white mb-3">
                {score === totalQuestions && t("results.perfect")}
                {score >= 4 && score < totalQuestions && t("results.myths_correct")}
                {score === 3 && t("results.myths_correct")}
                {score < 3 && t("results.myths_correct")}
              </p>

              <p className="text-white text-center text-lg max-w-2xl">
                {score === totalQuestions && t("results.outstanding")}
                {score >= 4 && score < totalQuestions && t("results.great_job")}
                {score === 3 && t("results.reinforcement")}
                {score < 3 && t("results.reinforcement")}
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
