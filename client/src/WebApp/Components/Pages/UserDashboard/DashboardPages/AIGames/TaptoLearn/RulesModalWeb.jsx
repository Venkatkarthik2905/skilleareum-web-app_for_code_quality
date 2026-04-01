import { useScroll } from "framer-motion";
import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { useTranslation } from "react-i18next";

export default function RulesModalWeb({ onNext, onExit, selectedGame }) {
  const { t } = useTranslation("dashboard");
  const getRulesContent = () => {
    switch (selectedGame) {
      case "Missingletters":
        return {
          title: t('aiGames.tap2Learn.rules.missingLetters.title'),
          rules: [
            {
              number: 1,
              title: t('aiGames.tap2Learn.rules.missingLetters.rule1Title'),
              points: [
                t('aiGames.tap2Learn.rules.missingLetters.rule1Point1'),
              ],
            },
            {
              number: 2,
              title: t('aiGames.tap2Learn.rules.missingLetters.rule3Title'),
              points: [
                t('aiGames.tap2Learn.rules.missingLetters.rule3Point1'),
                t('aiGames.tap2Learn.rules.missingLetters.rule3Point2'),
                t('aiGames.tap2Learn.rules.missingLetters.rule3Point3'),
              ],
            },
            {
              number: 3,
              title: t('aiGames.tap2Learn.rules.missingLetters.rule4Title'),
              points: [
                t('aiGames.tap2Learn.rules.missingLetters.rule4Point1'),
              ],
            },
          ],
        };
      case "JumbledLetters":
        return {
          title: t('aiGames.tap2Learn.rules.jumbledLetters.title'),
          rules: [
            {
              number: 1,
              title: t('aiGames.tap2Learn.rules.jumbledLetters.rule1Title'),
              points: [
                t('aiGames.tap2Learn.rules.jumbledLetters.rule1Point1'),
              ],
            },
            {
              number: 2,
              title: t('aiGames.tap2Learn.rules.jumbledLetters.rule2Title'),
              points: [
                t('aiGames.tap2Learn.rules.jumbledLetters.rule2Point1'),
              ],
            },
            {
              number: 3,
              title: t('aiGames.tap2Learn.rules.jumbledLetters.rule3Title'),
              points: [
                t('aiGames.tap2Learn.rules.jumbledLetters.rule3Point1'),
                t('aiGames.tap2Learn.rules.jumbledLetters.rule3Point2'),
                t('aiGames.tap2Learn.rules.jumbledLetters.rule3Point3'),
              ],
            },
            {
              number: 4,
              title: t('aiGames.tap2Learn.rules.jumbledLetters.rule4Title'),
              points: [
                t('aiGames.tap2Learn.rules.jumbledLetters.rule4Point1'),
              ],
            },
          ],
        };
      case "PerfectMatch":
        return {
          title: t('aiGames.tap2Learn.rules.perfectMatch.title'),
          rules: [
            {
              number: 1,
              title: t('aiGames.tap2Learn.rules.perfectMatch.rule1Title'),
              points: [
                t('aiGames.tap2Learn.rules.perfectMatch.rule1Point1'),
              ],
            },
            {
              number: 2,
              title: t('aiGames.tap2Learn.rules.perfectMatch.rule2Title'),
              points: [
                t('aiGames.tap2Learn.rules.perfectMatch.rule2Point1'),
              ],
            },
            {
              number: 3,
              title: t('aiGames.tap2Learn.rules.perfectMatch.rule3Title'),
              points: [
                t('aiGames.tap2Learn.rules.perfectMatch.rule3Point1'),
                t('aiGames.tap2Learn.rules.perfectMatch.rule3Point2'),
                t('aiGames.tap2Learn.rules.perfectMatch.rule3Point3'),
              ],
            },
            {
              number: 4,
              title: t('aiGames.tap2Learn.rules.perfectMatch.rule4Title'),
              points: [
                t('aiGames.tap2Learn.rules.perfectMatch.rule4Point1'),
              ],
            },
          ],
        };
      case "MemoryGame":
        return {
          title: t('aiGames.tap2Learn.rules.memoryGame.title'),
          rules: [
            {
              number: 1,
              title: t('aiGames.tap2Learn.rules.memoryGame.rule1Title'),
              points: [t('aiGames.tap2Learn.rules.memoryGame.rule1Point1')],
            },
            {
              number: 2,
              title: t('aiGames.tap2Learn.rules.memoryGame.rule2Title'),
              points: [t('aiGames.tap2Learn.rules.memoryGame.rule2Point1')],
            },
            {
              number: 3,
              title: t('aiGames.tap2Learn.rules.memoryGame.rule3Title'),
              points: [t('aiGames.tap2Learn.rules.memoryGame.rule3Point1')],
            },
          ],
        };
      default:
        return {
          title: t('aiGames.tap2Learn.rules.default.title'),
          rules: [],
        };
    }
  };

  const rulesContent = getRulesContent();

  return (
    <DashboardLayout>
      <div>
        <div className="mt-24 flex items-center justify-center p-4 relative overflow-hidden font-poppins">
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#0285FF] to-[#1EEF32] rounded-xl p-[1px]">
            <div className="bg-[#080B1C] rounded-xl p-4 lg:p-6">
              <button
                onClick={onExit}
                className="absolute top-6 left-4 w-10 h-10 flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
              >
                <i className="fas fa-arrow-left text-xl"></i>
              </button>

              <div className="flex justify-center mb-3 md:mb-4">
                <div className="relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                      alt="Mascot"
                    />
                  </div>
                </div>
              </div>

              <p className="text-xl lg:text-2xl font-inter tracking-wider font-semibold text-white mb-3 md:mb-4">
                {t('aiGames.tap2Learn.rules.howItWorks')}
              </p>

              <div className="space-y-2 md:space-y-4 mb-4 md:mb-5">
                {rulesContent.rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-4 md:gap-5">
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
                        {rule.points.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex items-start gap-3"
                          >
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
                  onClick={onNext}
                  className="cursor-pointer rounded-xl w-[60%] mx-auto h-9 relative"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                  }}
                >
                  <div className="h-9 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
                  <div className="h-9 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
                  <div className="bg-[#070e3a4b] backdrop-blur-sm h-9 rounded-xl w-full border-[0.5px] border-[#1AE348]"></div>
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
                      {t('aiGames.tap2Learn.rules.letsBegin')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
