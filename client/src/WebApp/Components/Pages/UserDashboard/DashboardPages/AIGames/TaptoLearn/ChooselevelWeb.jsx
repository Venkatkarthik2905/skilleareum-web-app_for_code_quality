import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../../../../../config";
import { useTranslation } from "react-i18next";

const ChooselevelWeb = ({
  onNext,
  setisWon,
  onPrev,
  selectedGame,
  setSelectedLevel,
  toast,
  setGameData,
  day,
}) => {
  const { t ,i18n } = useTranslation("dashboard");
  const [fadeOut, setFadeOut] = useState(false);
  const userId = useSelector((state) => state.user_email.id);
  const authToken = useSelector((state) => state.token);

  // const [Choose, setChoose] = useState("easy");
  const [Choose, setChoose] = useState("6");
  const [activeButton, setActiveButton] = useState("easy");
  // const { playSound } = useSettings();

  useEffect(() => {
    onLetterSelect(activeButton);

    setSelectedLevel(activeButton);
  }, []);

  const handleLevelSelect = (level) => {
    // playSound();
    //console.log("selected level", level);
    setActiveButton(level);
    onLetterSelect(level);
    setSelectedLevel(level);
  };

  const onLetterSelect = (level) => {
    // playSound();
    //console.log("selected level", level);
    setActiveButton(level);
    setSelectedLevel(level);
  };

  const getGameDetails = async (level, language = "english") => {
    setGameData("");
    setisWon(false);

    try {
      let response;
      if (selectedGame === "JumbledLetters") {
        response = await axios.get(
          `${SERVER_URL}/api/jumbleWord?userId=${userId}&level=${level}&language=${language}&day=${day}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      } else if (selectedGame === "Missingletters") {
        response = await axios.get(
          `${SERVER_URL}/api/missingLetter?userId=${userId}&level=${level}&language=${language}&day=${day}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      } else {
        response = await axios.get(
          `${SERVER_URL}/api/perfectMatch?userId=${userId}&level=${level}&language=${language}&day=${day}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      }

      const data = response.data;
      setGameData(data.data);

      if (!data.success) {
        toast.error(data.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
    }
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

const handleNext = async () => {
  const selectedLanguageCode = i18n.language || "en";

  const language = languageMap[selectedLanguageCode] || "English";


  const res = await getGameDetails(activeButton, language);

  // 🚨 API failure handling — SINGLE SOURCE
  if (!res || res.success === false) {
    const message =
      res?.message && res.message !== "No unplayed questions found for today"
        ? res.message
        : t("aiGames.tap2Learn.levels.noQuestions");

    toast.dismiss(); // ✅ prevent stacking
    toast.error(message);
    return;
  }

  if (!activeButton) {
    toast.dismiss();
    toast.error(t("aiGames.tap2Learn.levels.errorSelect"));
    return;
  }

  setFadeOut(true);

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
            <div className="relative w-full max-w-lg">
              <div
                className={`w-[85%] mx-auto border border-[#1AE348]/70 rounded-2xl p-0.5 animate__animated ${
                  fadeOut ? "animate__backOutLeft" : "animate__zoomIn"
                }`}
              >
                <div className="w-full bg-[#080a47]  rounded-2xl">
                  <div
                    className="px-3 pt-5 pb-10 rounded-xl  "
                    style={{
                      background:
                        "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)",
                    }}
                  >
                    <div className="w-full bg-[#000A14]  rounded-2xl px-3 py-2 ">
                      <div className="w-full flex justify-end px-2">
                        <button
                          onClick={() => {
                            if (navigator.vibrate) {
                              navigator.vibrate(100);
                            }
                            onPrev();
                          }}
                          className="text-2xl text-[#1EEF32] font-semibold rotate-45"
                        >
                          +
                        </button>
                      </div>

                      <div className="w-full">
                        <div className="bg-[#001528] w-[90%] mx-auto rounded-md py-1">
                          <p className="w-full text-[#1EEF32] text-center text-xl font-zendots uppercase ">
                            {t('aiGames.tap2Learn.levels.title')}
                          </p>
                        </div>
                        <div className="uppercase mt-5 flex flex-col text-lg gap-3 mb-5">
                           {["easy", "medium", "hard"].map((level) => (
                            <button
                              key={level}
                              className={`w-[80%] mx-auto  rounded-lg py-2   ${
                                activeButton === level
                                  ? "border-[#1EEF32]/70 border text-white  "
                                  : " text-white/50 opacity-50 "
                              }`}
                              style={{
                                background:
                                  "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
                              }}
                              onClick={() => handleLevelSelect(level)}
                            >
                              {t(`aiGames.tap2Learn.levels.${level}`)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="absolute -bottom-5 left-0 right-0 flex justify-center items-center">
                        {/* <div className="absolute -bottom-10 left-[25%] w-24 h-24 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0"></div>
                <div className="absolute -bottom-10 right-[25%] w-24 h-24 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0"></div> */}

                        <div
                          onClick={handleNext}
                          className=" cursor-pointer rounded-2xl w-[70%] h-10 relative"
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
                              {t('aiGames.tap2Learn.levels.next')}
                            </p>
                          </div>
                        </div>
                        {/* <div
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
        </div>
      </div>
    </div>
  );
};

export default ChooselevelWeb;
