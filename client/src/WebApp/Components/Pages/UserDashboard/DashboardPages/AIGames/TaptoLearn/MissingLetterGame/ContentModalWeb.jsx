import React, { useState, useEffect } from "react";
import "../Taptoearn.css";
import "animate.css";
import { useTranslation } from "react-i18next";

const ContentModalWeb = ({ onNext,gameData, selectedGame, onPrev }) => {
  const { t } = useTranslation("dashboard");
  const gameDetails = {
    Missingletters: { key: "missingLetters" },
    MemoryGame: { key: "memoryGame" },
    PerfectMatch: { key: "perfectMatch" },
    JumbledLetters: { key: "jumbleLetters" },
  };
  const { key } = gameDetails[selectedGame] || { key: "unknown" };
  const title = key !== "unknown" ? t(`aiGames.tap2Learn.games.${key}`) : "Game Not Found";
  const [fadeOut, setFadeOut] = useState(false);
  // const { playSound } = useSettings();


  const handleNext = () => {
    // playSound();
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
    <div className="w-full fixed inset-0 z-50 font-zendots ">
    <div className="bg-[#080B1C]  relative bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins">
    <div className=" bg-cover bg-center h-screen overflow-hidden overflow-y-auto  " style={{ backgroundImage: "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/subscribebg.png)"}} >
    <div className=" h-screen w-full overflow-hidden overflow-y-auto flex justify-center items-center " style={{background: "radial-gradient(378.88% 129.46% at 50% -1.69%, rgba(19, 36, 128, 0) 5.86%, rgba(10, 18, 64, 0.626421) 11.28%, #04071A 24.38%, rgba(4, 8, 29, 0.974934) 60.44%, rgba(4, 7, 26, 0.85) 68.06%, rgba(10, 18, 64, 0.626421) 80.94%, rgba(19, 36, 128, 0) 89.04%)"
}}>
     
      <div className="relative w-full max-w-lg">
          <div
            className={`w-[85%] mx-auto  border border-[#1AE348]/70 rounded-2xl p-0.5 animate__animated ${
              fadeOut ? "animate__backOutLeft" : "animate__zoomIn"
            }`}
          >
            <div className="w-full bg-[#080a47] rounded-2xl  ">
            <div className="px-3 pt-5 pb-10 rounded-xl  " style={{ background: "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)" }}>
            <div className="w-full bg-[#000A14]  rounded-2xl px-3 pt-2 ">
              {/* <div className="absolute -top-14 left-0 ">
               <div className="relative flex justify-center items-center ">
                  <div className="absolute top-0 w-32 h-32 bg-[#1EEF3259] blur-xl rounded-full ">
                    {" "}
                  </div>
                  <div className="absolute top-16 z-0 -right-5 w-24 h-24 bg-[#1EEF3259] blur-2xl rounded-full ">
                    {" "}
                  </div>
                  <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/AIbox.png"
                    className="w-3/12"
                  />
                </div>
              </div> */}
              <div className='w-full flex justify-end pt-2'>
            <button onClick={() => {
                 if (navigator.vibrate) {
                    navigator.vibrate(100);
                  }
                   onPrev();
                  //  playSound();
                }} className='text-3xl text-[#1EEF32] font-semibold rotate-45' >
                +
            </button>
        </div>
              <div className="py-3">
                <div className="bg-[#001528] w-[85%] mx-auto rounded-md">
                  <p className="text-center py-1 font-zendots text-[#1CE740] uppercase">
                    {title}
                  </p>
                </div>
                <div className="w-full pb-3 mt-5">
                  <p className="w-full font-zendots text-[#1EEF32] text-center text-lg uppercase ">
                    {gameData?.question}
                  </p>
                  <p className="w-[90%] mx-auto text-center text-sm font-medium mt-3">
                    {gameData?.explanation}
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-5 left-0 right-0 flex justify-center items-center">
                <div className="absolute -bottom-5 left-[25%] w-24 h-24 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0"></div>
                <div className="absolute -bottom-5 right-[25%] w-24 h-24 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0"></div>

               <div  onClick={handleNext} className=" cursor-pointer rounded-2xl w-[80%] mx-auto h-10 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              
                  <p className="uppercase font-medium text-center font-zendots" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t('aiGames.tap2Learn.levels.next')} </p>
              </div>
              </div>
                {/* <div
                  // onClick={handlechooselevel}
                  onClick={handleNext}
                  className="cursor-pointer bg-gradient-to-r from-[#0388F8] to-[#1DEC38] rounded-full px-20 py-2 relative z-20"
                >
                  <p
                    style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" }}
                    className="text-xl font-semibold font-zendots "
                  >
                    NEXT
                  </p>
                </div> */}
              </div>
            </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
    </div>
    </div>
  );
};

export default ContentModalWeb;
