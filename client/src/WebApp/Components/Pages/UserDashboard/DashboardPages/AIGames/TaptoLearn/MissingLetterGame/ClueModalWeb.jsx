import React, { useState, useEffect } from "react";
import "../Taptoearn.css";
import "animate.css";
import { useTranslation } from "react-i18next";

const ClueModalWeb = ({ onNext, gameData, onPrev }) => {
  const { t } = useTranslation("dashboard");
  const [fadeOut, setFadeOut] = useState(false);
  // const { playSound } = useSettings();

  const handlePlayClick = () => {
    // playSound();
    setFadeOut(true);
   // console.log("started");
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  return (
    <div className="w-full fixed inset-0 z-50 font-zendots ">
      <div className="bg-[#080B1C]  relative bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins">
        <div
          className=" bg-cover bg-center h-screen overflow-hidden overflow-y-auto  "
          style={{
            backgroundImage:
              "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/subscribebg.png)",
          }}
        >
          <div
            className="relative h-screen w-full  overflow-hidden overflow-y-auto flex justify-center items-center "
            style={{
              background:
                "radial-gradient(378.88% 129.46% at 50% -1.69%, rgba(19, 36, 128, 0) 5.86%, rgba(10, 18, 64, 0.626421) 11.28%, #04071A 24.38%, rgba(4, 8, 29, 0.974934) 60.44%, rgba(4, 7, 26, 0.85) 68.06%, rgba(10, 18, 64, 0.626421) 80.94%, rgba(19, 36, 128, 0) 89.04%)",
            }}
          >
            <div
              className="max-w-lg absolute bottom-0 left-0 right-0 h-[55%] rounded-t-3xl  w-[100%] mx-auto  border-x-2 border-t-2 border-[#1AE348]/60 "
              style={{
                background:
                  "radial-gradient(76.25% 347.22% at 51.11% 59.77%, #070E3A 0%, rgba(19, 40, 160, 0) 94.66%)",
              }}
            >
              <div className="relative w-full  h-full">
                <div
                  className="w-full h-full opacity-40 pb-14  pt-3 px-3 rounded-t-3xl"
                  style={{
                    background:
                      "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                  }}
                ></div>
                <div className=" absolute -top-24 w-full flex flex-col justify-center items-center">
                  <div className="relative w-full max-w-lg">
                    <div className="relative w-[80%] mx-auto">
                      <div
                        className={` border border-[#1AE348]/70 rounded-2xl p-0.5 animate__animated ${
                          fadeOut ? "animate__backOutLeft" : "animate__zoomIn"
                        }`}
                      >
                        <div className="w-full bg-[#080a47]  rounded-xl ">
                          <div
                            className="px-3 pt-5 pb-10 rounded-xl  "
                            style={{
                              background:
                                "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)",
                            }}
                          >
                            <div className="w-full bg-[#000A14]  rounded-2xl px-3 pt-2 ">
                              <div className="w-full flex justify-end pt-2">
                                <button
                                  onClick={() => {
                                    if (navigator.vibrate) {
                                      navigator.vibrate(100);
                                    }
                                    onPrev();
                                    // playSound();
                                  }}
                                  className="text-3xl text-[#1EEF32] font-semibold rotate-45"
                                >
                                  +
                                </button>
                              </div>
                              <div className="bg-[#001528] w-[85%] mx-auto rounded-md py-1">
                                <p className="text-center text-lg font-zendots text-white uppercase">
                                  {t('aiGames.tap2Learn.common.wordHint')}
                                </p>
                              </div>
                              <div className="py-7">
                                {/* <div className='w-[60%] border border-[#1EEF32] rounded-lg'>
              <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/pythoncodeclue.jpeg' className='' />
            </div> */}
                                <div className="w-8/12 mx-auto flex justify-center items-center">
                                  <div className=" border border-[#1EEF32] rounded-lg ">
                                    <img
                                      src={gameData?.hint_img}
                                      className=" rounded-lg"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* <div className='absolute bottom-10 left-[25%] w-24 h-24 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0'></div> */}
                              <div className="absolute -bottom-5 left-0 right-0 flex justify-center items-center">
                                {/* <div className='absolute bottom-0 left-[15%] w-24 h-14 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0'></div>
            <div className='absolute bottom-0 right-[15%] w-24 h-14 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0'></div> */}

                                <div
                                  onClick={handlePlayClick}
                                  className=" cursor-pointer rounded-2xl w-[80%] h-10 relative"
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
                                      {t('aiGames.tap2Learn.games.play')}
                                    </p>
                                  </div>
                                </div>
                                {/* <div onClick={handlePlayClick} className='bg-gradient-to-r from-[#0388F8] to-[#1DEC38] rounded-full px-20 py-2 relative cursor-pointer'>
              <p style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)"}} className='text-xl font-semibold font-zendots z-20'>PLAY</p>
            </div> */}
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

export default ClueModalWeb;
