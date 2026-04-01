import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../../../../../../config";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const AnswerpopupWeb = ({
  onNext,
  source,
  authToken,
  gameData,
  selectedGame,
  gameAnswer,
  setisWon,
  navigate,
}) => {
  const { t } = useTranslation("dashboard");
  const userId = useSelector((state) => state.user_email.id);

  const [fadeOut, setFadeOut] = useState(false);
  // const { playSound } = useSettings();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(false);
    }, 9000);
  }, []);

  const CollectReward = async () => {
    try {
     // console.log("game answer", gameAnswer);
      let response;

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const languageMap = {
        en: "english",
        es: "spanish",
        fr: "french",
        de: "german",
        it: "italian",
        zh: "chinese",
        ja: "japanese",
        hi: "hindi",
        ar: "arabic",
      };
      const selectedLanguageCode = localStorage.getItem("selectedLanguage") || "en";
      const language = languageMap[selectedLanguageCode] || "english";

      if (selectedGame === "JumbledLetters") {
        response = await axios.post(
          `${SERVER_URL}/api/jumbleWord?userId=${userId}&answer=${gameAnswer}&questionId=${gameData?.id}&language=${language}`,
          {}, // POST body (empty)
          config
        );
      } else if (selectedGame === "Missingletters") {
        response = await axios.post(
          `${SERVER_URL}/api/missingLetter?userId=${userId}&answer=${gameAnswer}&questionId=${gameData?.id}&language=${language}`,
          {},
          config
        );
      } else {
        response = await axios.post(
          `${SERVER_URL}/api/perfectMatch?userId=${userId}&answer=${gameAnswer}&questionId=${gameData?.id}&language=${language}`,
          {},
          config
        );
      }

      const data = response.data;
      if (data.message === "Question marked as played") {
        setisWon(true);
      }
     // console.log(data);
    } catch (error) {
     // console.log(error);
    }
  };
  const handleNext = () => {
    // playSound();
    setFadeOut(true);
    CollectReward();
   // console.log("started");
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setTimeout(() => {
      onNext();
      if (source === "TaskListWeb") {
        navigate("/TaskListWeb");
      } else {
        navigate("/ChallengeMapWeb");
      }
    }, 500);
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
            className=" h-screen w-full overflow-hidden overflow-y-auto flex justify-center items-center "
            style={{
              background:
                "radial-gradient(378.88% 129.46% at 50% -1.69%, rgba(19, 36, 128, 0) 5.86%, rgba(10, 18, 64, 0.626421) 11.28%, #04071A 24.38%, rgba(4, 8, 29, 0.974934) 60.44%, rgba(4, 7, 26, 0.85) 68.06%, rgba(10, 18, 64, 0.626421) 80.94%, rgba(19, 36, 128, 0) 89.04%)",
            }}
          >
            {showConfetti && (
              <div>
                <div className="fixed inset-0 z-50 w-full">
                  <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/Confeti.gif"
                    alt="coin shower"
                    className="h-screen w-full max-w-4xl mx-auto object-cover  "
                  />
                </div>
              </div>
            )}
            <div className="relative w-full max-w-lg">
              <div
                className={`w-[85%] mx-auto  border border-[#1AE348]/70 rounded-2xl p-0.5 animate__animated ${
                  fadeOut ? "animate__backOutLeft" : "animate__zoomIn"
                }`}
              >
                <div className="w-full bg-[#080a47] rounded-2xl  ">
                  <div
                    className="px-3 py-5  rounded-xl  "
                    style={{
                      background:
                        "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)",
                    }}
                  >
                    <div className="w-full bg-[#000A14]  rounded-2xl px-3 pt-2 ">
                      <div className="w-full py-5">
                        <div className="bg-[#001528] w-[90%] mx-auto rounded-md py-1">
                          <p className="text-center font-zendots text-[#1CE740] uppercase">
                            {t('aiGames.tap2Learn.common.learnAndEarn')}
                          </p>
                        </div>
                        <hr className=" w-[40%] mx-auto border border-[#1EEF32] my-5 opacity-40 " />
                        <p className="w-full font-zendots text-[#1EEF32] text-center text-2xl uppercase ">
                          {gameData?.answer}
                        </p>
                        <p className="w-[95%] mx-auto text-center text-xs font-medium mt-3 leading-5 ">
                          {gameData?.answer_explanation}
                        </p>
                      </div>
                      <div className="absolute -bottom-10 left-10 w-16 h-16 opacity-50 mx-auto bg-[#1EEF32]/35 blur-xl rounded-full z-0"></div>
                      <div className="absolute -bottom-5 left-0 right-0 flex justify-center items-center">
                        {/* <div className='absolute -bottom-5 left-[25%] w-24 h-24 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0'></div>
        <div className='absolute -bottom-5 right-[25%] w-24 h-24 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0'></div> */}

                        <div
                          onClick={handleNext}
                          className="cursor-pointer rounded-2xl w-[65%] mx-auto h-10 relative"
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
                              {t('aiGames.tap2Learn.common.collect')}
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
  );
};

export default AnswerpopupWeb;
