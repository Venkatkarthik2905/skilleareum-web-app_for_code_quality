import React, { useState, useEffect, useRef } from "react";
import "./Taptoearn.css";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../../../../../config";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SkillpointsWeb = ({
  onExit,
  isWon,
  questionId,
  memoryId,
  selectedGame,
  onRetry,
}) => {
  const { t } = useTranslation("dashboard");
  const userId = useSelector((state) => state.user_email.id);
  const isFetched = useRef(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [life, setlife] = useState();
  const [audio] = useState(new Audio("../assets/EveryTap.mp3"));
  const navigate = useNavigate();
  // const {playSound} = useSettings();

  useEffect(() => {
    audio.load();
    //console.log("isWon = ",isWon)

    if (!isFetched.current) {
      getUserLife();
      isFetched.current = true;
    }
  }, [audio]);

  const handleRetry = () => {
    // playSound();
    //console.log("Retry");
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setFadeOut(true);
    setTimeout(() => {
      onRetry();
    }, 500);
  };

  const handleNext = () => {
    // playSound();
    //console.log("Exit");
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setFadeOut(true);
    setTimeout(() => {
      // onExit();
      navigate("/ChallengeMapWeb");
    }, 500);
  };

  const getUserLife = async () => {
    try {
      let response;
      if (selectedGame === "JumbledLetters") {
        response = await axios.get(
          `${SERVER_URL}/api/jumbleWord/userlife?userId=${userId}&questionId=${questionId}`
        );
      } else if (selectedGame === "Missingletters") {
        response = await axios.get(
          `${SERVER_URL}/api/missingLetter/userlife?userId=${userId}&questionId=${questionId}`
        );
      } else if (selectedGame === "MemoryGame") {
        response = await axios.get(
          `${SERVER_URL}/api/memorygame/userlife?userId=${userId}&questionId=${memoryId}`
        );
      } else {
        response = await axios.get(
          `${SERVER_URL}/api/perfectMatch/userlife?userId=${userId}&questionId=${questionId}`
        );
      }
      const data = response.data;
      //console.log(data.data)
      setlife(data.data);
    } catch (error) {}
  };

  return (
    // <div translate="no" className="w-full fixed inset-0 z-50 font-zendots ">
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
            className=" h-screen w-full overflow-hidden overflow-y-auto flex justify-center items-center "
            style={{
              background:
                "radial-gradient(378.88% 129.46% at 50% -1.69%, rgba(19, 36, 128, 0) 5.86%, rgba(10, 18, 64, 0.626421) 11.28%, #04071A 24.38%, rgba(4, 8, 29, 0.974934) 60.44%, rgba(4, 7, 26, 0.85) 68.06%, rgba(10, 18, 64, 0.626421) 80.94%, rgba(19, 36, 128, 0) 89.04%)",
            }}
          >
            <div className="relative w-full max-w-md">
              <div className=" font-poppins ">
                <div
                  className={` ${
                    fadeOut ? "animate__backOutLeft" : "animate__zoomIn"
                  } w-[80%] mx-auto animate__animated bg-black/50 ${
                    isWon
                      ? " border border-[#1AE348]/70"
                      : "bg-gradient-to-b from-[#F81D1DBF] to-[#F84303BF]"
                  } rounded-2xl p-0.5`}
                >
                  <div className="w-full bg-[#080a47] rounded-2xl relative">
                    <div
                      className="px-3 pt-5 pb-10 rounded-xl  "
                      style={{
                        background:
                          "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)",
                      }}
                    >
                      <div className="w-full bg-[#000A14]  rounded-2xl px-3 py-2 ">
                        <div className="relative flex justify-center items-center">
                          <div className="z-10">
                            <div
                              className="flex justify-center items-center gap-1"
                              translate="no"
                            >
                              <img
                                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                className="w-10  rounded-full shadow-black"
                              />
                              <p className="text-center text-2xl font-zendots text-white my-auto">
                                {isWon ? "250" : "000"}
                              </p>
                            </div>
                            <div className="uppercase mt-5">
                              <p className="text-center text-lg font-zendots text-[#1EEF32] my-auto">
                                {t('aiGames.tap2Learn.common.skillPoints')}
                              </p>
                              <p className="text-center text-lg font-zendots text-white my-auto">
                                {t('aiGames.tap2Learn.common.earned')}
                              </p>
                            </div>
                          </div>
                          {/* <div className='absolute z-0 bg-[#1EEF3259] w-full h-full blur-2xl rounded-full'>
            </div> */}
                        </div>
                        <div className="mx-auto w-[35%] mt-7 px-1 rounded-md bg-[#1EEF32]/15 flex justify-center items-center gap-1">
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="text-[#1EEF32]"
                          />
                          <p
                            className="text-center text-lg font-zendots text-white my-auto"
                            style={{
                              textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            {life?.life}
                          </p>
                        </div>

                        <hr className=" w-[65%] mx-auto border border-[#1EEF32] opacity-40 my-5" />

                        <div className="absolute -bottom-5 left-[50%] -translate-x-[50%] flex justify-center items-center text-center gap-3 w-[85%] mx-auto">
                          <div
                            onClick={handleRetry}
                            className="cursor-pointer rounded-2xl w-[50%] h-10 relative"
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
                                {t('aiGames.tap2Learn.common.retry')}
                              </p>
                            </div>
                          </div>

                          <div className="w-[50%]">
                            <div
                              onClick={handleNext}
                              className="z-20 cursor-pointer w-full bg-gradient-to-t from-[#0388F8]/40 to-[#1DEC38]/40 h-full font-semibold font-zendots text-lg text-white  rounded-2xl"
                            >
                              <div className="bg-gradient-to-t from-[#0388F8]/40 to-[#1DEC38]/40 rounded-2xl w-full flex justify-center items-center relative">
                                <div className="w-full h-full bg-[#070E3A]/40 border border-[#1AE348]/40 rounded-2xl py-1">
                                  <div className="z-20 text-[#91AF94]">
                                    {t('aiGames.tap2Learn.common.next')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                          {/* <div className='w-[50%] flex justify-center items-center relative'>
          <div onClick={handleRetry} className='z-20 cursor-pointer w-full bg-gradient-to-r from-[#0388F8] to-[#1DEC38] font-semibold font-zendots text-lg text-white py-1  rounded-full' style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" }}>
                RETRY
              </div>
              <div className='absolute w-full h-full  mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0'></div>
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
  );
};

export default SkillpointsWeb;
