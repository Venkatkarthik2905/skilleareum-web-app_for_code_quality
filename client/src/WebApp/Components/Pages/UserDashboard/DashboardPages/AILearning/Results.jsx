import React from 'react';
import { useTranslation } from "react-i18next";

const ResultsWeb = ({ completeQuestAPI, day, isWon, navigate ,handleHomeScreen}) => {
  const { t } = useTranslation("games");
  return (
    <div>
      <div className="relative w-full max-w-md mx-auto">
        <div className='font-poppins'>  
          <div
            className={`w-[90%] mx-auto border rounded-2xl ${isWon ? 'bg-black/50 border-[#1AE348]/70' : 'bg-black/50 border-[#E31A1A]/70 border-2'}`}
          >
            <div className={`w-full rounded-2xl relative bg-[#080a47] `}>
              <div className="px-3 pt-5 pb-10 rounded-xl"
                style={{ background:"radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)"}}>
                <div className={`w-full rounded-2xl px-3 py-5 bg-[#000A14] `}>
                  <div className='mb-7'>
                    <p className={`font-zendots uppercase text-center text-lg opacity-50 text-[#1EEF32] `}>
                      {t("ai_learning.day", { day })}
                    </p>
                  </div>
                  <div className='w-full'>
                    <div className='z-10'>
                      <div className={`flex justify-center w-[90%] mx-auto py-2 rounded-lg items-center gap-1  bg-[#001528] `} translate='no'>
                        <img
                          src={isWon ? "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif" : "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"}
                          className="w-10 rounded-full shadow-black"
                          alt="result-icon"
                        />
                        <p className='text-center text-2xl font-zendots text-white my-auto'>{isWon ? '250' : '0'}</p>
                      </div>
                      <div className='uppercase mt-5 tracking-wide'>
                        <p className={`text-center text-lg font-zendots my-auto text-[#1EEF32]`}>
                          {t("ai_learning.skill_points")}
                        </p>
                        <p className='text-center text-lg font-zendots text-white my-auto'>
                          {t("ai_learning.earned")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className='w-[75%] mx-auto border border-white opacity-40 mb-3 mt-7' />
                  <div>
                    <p className='uppercase text-center tracking-widest opacity-40'
                      style={{ color: isWon ? '#1EEF32' : '#E31A1A' }}>
                      {isWon ? t("ai_learning.come_back_tomorrow") : t("ai_learning.try_again")}
                    </p>
                  </div>
                  <div className='absolute -bottom-5 left-[50%] -translate-x-[50%] flex justify-center items-center text-center gap-3 w-[85%] mx-auto'>
                    {isWon ? (
                      <div onClick={completeQuestAPI} className="rounded-2xl w-[80%] h-10 relative cursor-pointer"
                        style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
                        <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
                        <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
                        <div className="bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348]/60"></div>
                        <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                          <p className="uppercase font-medium text-center font-zendots z-50"
                            style={{ color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)" }}>
                            {t("ai_learning.collect")}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button onClick={ ()=>window.location.reload()} className="rounded-2xl w-[70%] h-10 relative"
                  style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
                  
                  <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
                  <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
                  <div className="bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348]"></div>
                  <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                    <p className="uppercase font-medium text-center font-zendots" 
                      style={{
                        color: "transparent",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"
                      }}>
                     {t("ai_learning.exit")}
                    </p>
                  </div>
                </button>
                    )}
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

export default ResultsWeb;
