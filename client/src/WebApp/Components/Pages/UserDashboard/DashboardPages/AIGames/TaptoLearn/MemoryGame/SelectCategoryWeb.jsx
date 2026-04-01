import React, { useState, useEffect } from "react";
import { useSettings } from "../../SettingsContext";
import { useTranslation } from "react-i18next";

const SelectCategoryWeb = ({ onClose, onNext }) => {
  const { t } = useTranslation("dashboard");
  const [fadeOut, setFadeOut] = useState(false);
  const [Choose, setChoose] = useState("AI mascot");
  const { playSound } = useSettings();
 
  const handlecategory = (tab) => {
    playSound();
    setChoose(tab);
  };

  const handleNext = () => {
    playSound();
    setFadeOut(true);
    //console.log("started");
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setTimeout(() => {
      onNext();
    }, 500);
  };

  return (
    <div className="relative font-zendots">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-lg">
          <div
            className={`w-[85%] mx-auto bg-black/50 bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-2xl p-0.5 animate__animated ${
              fadeOut ? "animate__backOutLeft" : "animate__zoomIn"
            }`}
          >
            <div className="absolute top-0 right-5 w-20 h-20 mx-auto bg-[#1EEF3259] blur-2xl rounded-full z-0"></div>

            <div className="w-full bg-black rounded-2xl pb-7 pt-5 ">
              {/* <div className='w-full flex justify-end pt-3 px-5'>
        <button onClick={() => {
             if (navigator.vibrate) {
                navigator.vibrate(100);
              }
           onClose();
            }} className='text-2xl text-[#1EEF32] font-semibold rotate-45' >
            +
        </button>
    </div> */}
              <div className="w-full relative">
                <p className="w-full text-[#1EEF32] text-center text-2xl uppercase ">
                  {t('aiGames.tap2Learn.memoryGame.categories.title')}
                </p>
                <div className="uppercase mt-5 flex flex-col text-lg font-zendots gap-3 mb-5">
                  <button
                    className={`w-[75%] mx-auto uppercase bg-[#1EEF32]/20 rounded-lg py-1 border z-10 ${
                      Choose === "AI mascot"
                        ? "border-[#1EEF32] text-[#1EEF32]"
                        : "border-white/0 text-white/50"
                    }`}
                    onClick={() => handlecategory("AI mascot")}
                  >
                    {t('aiGames.tap2Learn.memoryGame.categories.mascot')}
                  </button>
                  <button
                    className={`w-[75%] mx-auto uppercase bg-[#1EEF32]/20 rounded-lg py-1 border z-10 ${
                      Choose === "AI logos"
                        ? "border-[#1EEF32] text-[#1EEF32]"
                        : "border-white/0 text-white/50"
                    }`}
                    onClick={() => handlecategory("AI logos")}
                  >
                    {t('aiGames.tap2Learn.memoryGame.categories.logos')}
                  </button>
                  <button
                    className={`w-[75%] mx-auto uppercase bg-[#1EEF32]/20 rounded-lg py-1 border z-10 ${
                      Choose === "AI letter"
                        ? "border-[#1EEF32] text-[#1EEF32]"
                        : "border-white/0 text-white/50"
                    }`}
                    onClick={() => handlecategory("AI letter")}
                  >
                    {t('aiGames.tap2Learn.memoryGame.categories.letter')}
                  </button>
                  <button
                    className={`w-[75%] mx-auto uppercase bg-[#1EEF32]/20 rounded-lg py-1 border z-10 ${
                      Choose === "AI learning"
                        ? "border-[#1EEF32] text-[#1EEF32]"
                        : "border-white/0 text-white/50"
                    }`}
                    onClick={() => handlecategory("AI learning")}
                  >
                    {t('aiGames.tap2Learn.memoryGame.categories.learning')}
                  </button>
                  <button
                    className={`w-[75%] mx-auto uppercase bg-[#1EEF32]/20 rounded-lg py-1 border z-10 ${
                      Choose === "AI FUN MACTH"
                        ? "border-[#1EEF32] text-[#1EEF32]"
                        : "border-white/0 text-white/50"
                    }`}
                    onClick={() => handlecategory("AI FUN MATCH")}
                  >
                    {t('aiGames.tap2Learn.memoryGame.categories.funMatch')}
                  </button>
                </div>
                <div className="absolute bottom-0 left-5 w-20 h-20 mx-auto bg-[#1EEF3259] blur-2xl rounded-full z-0"></div>
              </div>
              <div className="absolute -bottom-5 left-0 right-0 flex justify-center items-center">
                <div className="absolute -bottom-10 left-[20%] w-24 h-24 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0"></div>
                <div className="absolute -bottom-10 right-[20%] w-24 h-24 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0"></div>
                <div
                  onClick={handleNext}
                  className="cursor-pointer bg-gradient-to-r from-[#0388F8] to-[#1DEC38] rounded-full px-20 py-2 relative z-20"
                >
                  <p
                    style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" }}
                    className="text-xl font-semibold font-zendots "
                  >
                    {t('aiGames.tap2Learn.levels.next')}
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

export default SelectCategoryWeb;
