import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Welcome from "../Onboarding/Welcome";
// import AIGamewelcome from "../Onboarding/AIGamewelcome";
// import Joyride from "react-joyride";
// import "../../App.css";
// import AIEmoji from "./AIEmoji/AIEmoji";
import toast, { Toaster } from "react-hot-toast";
import debounce from "lodash.debounce";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { SERVER_URL, handleSpeak } from "../../../../../../config";
import SpinWheelWeb from "./SpinWheel/SpinWheelWeb";
import DashboardLayout from "../../Layout/DashboardLayout";
import AIEmojiWeb from "./AIEmoji/AIEmojiWeb";
import { useTranslation } from "react-i18next";

const AIGameWeb = () => {
  const { t,i18n } = useTranslation('dashboard');
  const [spinWheel, setSpinWheel] = useState(false);
  const [farming, setFarming] = useState(false);
  const [isNewUser, setisNewUser] = useState(false);
  const [taptoset, setTapToSet] = useState(false);
  const authToken = useSelector((state) => state.token);
  const userData = useSelector((state) => state.user_email);
  // const { playSound } = useSettings();
  const [AIgameData, setGameData] = useState(null);

  const [subscribe, setSubscribe] = useState(false);
  const [isEmojiAllow, setisEmojiAllow] = useState(true);
  const location = useLocation();
  const { NewUser } = location.state || { NewUser: false };
  // const NewUser  = true;
  const [showWelcome, setShowWelcome] = useState(NewUser);
  const [startJoyride, setStartJoyride] = useState(false);
  const [run, setRun] = useState(false);
  const [openaiemoji, setOpenAIEmoji] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const queryDay = queryParams.get("day");
  const querySource = queryParams.get("source");
  const [day, setDay] = useState(() => queryDay || localStorage.getItem("day"));

  const handleAiemoji = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    // playSound();
    // console.log(isEmojiAllow);
    // if (isEmojiAllow) {
      setOpenAIEmoji(!openaiemoji);
    // } else {
    //   toast.error("Comeback Tomorrow..");
    // }
  };

  const [steps] = useState([
    {
      target: ".aigames",
      content: (
        <span>
          Play daily and earn Skill Points while having fun! AI Games are
          classified into three levels – Easy, Medium, Hard for tour Gamified
          Learning experience
        </span>
      ),
    },
  ]);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setStartJoyride(true);
  };

  const settings = {
    infinite: true,
    speed: 500,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  const sub_status = useSelector((state) => state.user_email.sub_status);

  const handleSubscribe = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
      // setSubscribe(!subscribe);
    navigate("/SubPackWeb");
  };

  const handleSpinwheel = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setSpinWheel(!spinWheel);
  };
  const navigate = useNavigate();
  const handleFarming = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    // setFarming(!farming);
    navigate("/FarmingWeb");
  };

  const handleTaptoset = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setTapToSet(!taptoset);
  };
  const fetchGameData = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/emoji?userId=${userData?.id}&language=${i18n.language}&day=${day}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const game = response.data.games[0];
      if (response.status === 201) {
        setOpenAIEmoji(false);
        setisEmojiAllow(false);
      }
      setGameData(game);
    } catch (error) {
      console.error("Error fetching emoji game data:", error);
    }
  };
  useEffect(() => {
    debouncedFetchGameData();

    // Optional: cancel debounce on unmount to avoid memory leaks
    return () => debouncedFetchGameData.cancel();
  }, []);
  const debouncedFetchGameData = debounce(fetchGameData, 300); // 300ms delay
  useEffect(() => {
    const getFarmingStatus = async () => {
      try {
        const { data } = await axios.get(
          `${SERVER_URL}/api/farming/getFarmingStatus?userId=${userData.id}&flag=1&language=${i18n.language}&day=${day}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        // console.log(data);
        setisNewUser(data.isNewUser);
      } catch (error) {}
    };
    getFarmingStatus();
  }, []);

  const goToPageOne = () => {
    // playSound();
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    navigate("/Aispace");
    handleSpeak("Engage with these tools to rack up skill points");
  };

  const goToPageTwo = () => {
    // playSound();
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    navigate("/Farming/Play");
    handleSpeak("Play more, learn more, earn more. Go for it");
  };

  const goToPageThree = () => {
    // playSound();
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    navigate("/Aivault");
    handleSpeak("Unlock cool AI facts—past, present, and future");
  };

  const goToPageFour = () => {
    // playSound();
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    navigate("/Learning");
    handleSpeak("Unlock cool AI facts—past, present, and future");
  };

  const goToPageFive = () => {
    // playSound();
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    navigate("/Aiblog");
    handleSpeak("Unlock cool AI facts—past, present, and future");
  };

  const handleJoyrideCallback = (data) => {
    const { action, index, type } = data;
    if (type === "tour:end") {
      setRun(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="relative text-white font-poppins mt-24 ">
        {/* {startJoyride && (
            <Joyride
              steps={steps}
              run={true}
              continuous={true}
              scrollToFirstStep={true}
              showProgress={true}
              showSkipButton={true}
              hideBackButton={false}
              callback={handleJoyrideCallback}
              styles={{
                options: {
                  zIndex: 1000,
                  arrowColor: "#0c1f4b",
                  background: "linear-gradient(135deg, #0285FF, #1AE348)",
                  overlayColor: "rgba(12, 31, 75, 0.6)",
                  primaryColor: "#00fff7",
                  textColor: "#ffffff",
                  width: 350,
                  borderRadius: "10px",
                  fontSize: "14px",
                },
                tooltip: {
                  background: "linear-gradient(135deg, #0285FF, #1AE348)",
                  boxShadow: "0 0 15px rgba(0, 255, 247, 0.7)",
                },
                buttonNext: {
                  backgroundColor: "#FFFFFF",
                  color: "#000",
                  borderRadius: "5px",
                  border: "0px",
                  fontWeight: "bold",
                },
                buttonBack: {
                  color: "#fff",
                },
                buttonSkip: {
                  color: "#ff007f",
                  fontWeight: "bold",
                },
                spotlight: {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "15px",
                },
              }}
            />
          )} */}

        {spinWheel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full">
              <SpinWheelWeb onClose={handleSpinwheel} />
            </div>
          </div>
        )}

        {/* {subscribe && (
            <div className="fixed inset-0 model-overlay backdrop-blur-sm flex items-end z-50">
              <div className="relative w-full">
                <div className=" absolute top-3 bg-[#1EEF3273] blur-xl w-full h-10 z-0 "></div>
                <Subpack onClose={handleSubscribe} />
              </div>
            </div>
          )} */}



        {/* {showWelcome && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-full">
                <AIGamewelcome onComplete={handleWelcomeComplete} />
              </div>
            </div>
          )} */}

        {openaiemoji ? (
            <div className="">
              <div className="relative w-full">
                <AIEmojiWeb
                  toast={toast}
                  debouncedFetchGameData={debouncedFetchGameData}
                  AIgameData={AIgameData}
                  onClose={handleAiemoji}
                />
              </div>
            </div>
          ) : (

        <div className=" w-full z-10 relative max-w-lg mx-auto pt-10 ">
          <div className="w-full flex justify-between px-3 items-center gap-2 relative">
            <div
              onClick={() => {
                if (navigator.vibrate) {
                  navigator.vibrate(100);
                }
                // playSound();
                navigate("/ChallengeMapWeb");
              }}
              className="cursor-pointer absolute top-0 left-5 text white "
            >
              <FontAwesomeIcon icon={faArrowLeftLong} className="font-bold" />
            </div>
          </div>

         
      
          <div>
            <p className="text-xl font-medium text-center font-zendots ">
              {t('aiGames.title')}
            </p>
          </div>
          <div className="flex justify-center items-center relative mt-5">
            <img src="../assets/gamecontroller.png" className=" w-56 " />
          </div>
          <div className="w-full max-w-md mx-auto mt-5 px-2 md:px-0 pb-5  ">
            <div className="mt-5">
              {/* <div
                onClick={handleSpinwheel}
                className="cursor-pointer bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-0.5 rounded-lg"
              >
                <div className="bg-[#080B1C] p-3 rounded-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-[20%]">
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Spin_Wheel_2.gif"
                          className="w-10 h-10"
                        />
                      </div>
                      <div className="w-[80%]">
                        <p className="font-bold">Skill Genie Spin</p>
                        <p className="font-medium text-xs">
                          Try your luck & earn more
                        </p>
                      </div>
                    </div>
                    <div className=" bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full p-0.5 ">
                      <div className="bg-[#080B1C] rounded-full flex justify-center items-center py-1 px-2 cursor-pointer">
                        <p className="text-xs font-medium text-center">
                          Let’s play
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {isNewUser && (
                <div
                  onClick={
                     handleFarming
                  }
                  className="cursor-pointer w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mt-3"
                >
                  <div className="bg-[#070E3A] w-full h-full rounded-xl">
                    <div
                      className="py-2 px-3 rounded-xl flex justify-between items-center"
                      style={{
                        background:
                          "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                      }}
                    >
                      <div className="w-full flex items-center justify-between gap-3">
                        <div className=" flex items-center gap-3">
                          <div className="w-[20%]">
                            <img
                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/AI_Skill_New.gif"
                              className="w-12"
                            />
                          </div>
                          <div className="w-[80%]">
                            <p className="font-bold">{t('aiGames.farming.title')}</p>
                            <p className="font-medium text-xs">
                              {t('aiGames.farming.subtitle')}
                            </p>
                          </div>
                        </div>

                        <div className=" bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full p-0.5 ">
                          <div className="bg-[#080B1C] rounded-full flex justify-center items-center py-1 px-2 cursor-pointer">
                            <p className="text-xs font-medium text-center">
                              {t('aiGames.farming.button')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* tap to learn */}
              <div
                onClick={() => {
                  if (navigator.vibrate) {
                    navigator.vibrate(100);
                  }
                 
                    localStorage.setItem("previousRoute", "/AIGameWeb");
                    localStorage.setItem("gameTriggered", "true");
                    navigate("/TaptoLearnWeb");
                  
                }}
                className="cursor-pointer aigames w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mt-3"
              >
                <div className="bg-[#070E3A] w-full h-full rounded-xl">
                  <div
                    className="py-2 px-1 rounded-xl flex justify-between items-center"
                    style={{
                      background:
                        "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                    }}
                  >
                    <div className="w-full flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-[20%]">
                          <img
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Tap_Earn.gif"
                            className="w-10"
                          />
                        </div>
                         <div className=" w-[80%] ">
                          <p className="font-bold">{t('aiGames.tap2Learn.title')}</p>
                          <p className="font-medium text-xs">
                            {t('aiGames.tap2Learn.subtitle')}
                          </p>
                        </div>
                      </div>
                      <div
                        className=" rounded-2xl w-32 h-8 relative"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                        }}
                      >
                        <div className="h-full w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                        <div className="h-full w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF] "></div>
                        <div className=" bg-[#070e3a4b] backdrop-blur-sm h-full rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                        <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                          <p
                            className="uppercase font-medium text-center text-[11px] font-zendots"
                            style={{
                              color: "transparent",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              backgroundImage:
                                "linear-gradient(to right, #0285FF, #1EEF32)",
                            }}
                          >
                            {t('aiGames.tap2Learn.button')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI emoji */}
              <div
                onClick={() => {
                  if (navigator.vibrate) {
                    navigator.vibrate(100);
                  }
                  
                    handleAiemoji();
                 
                  // setOpenAIEmoji(!openaiemoji);    
                  navigate("/AIEmojiWeb")          
                }}
                className="cursor-pointer aigames w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mt-3"
              >
                <div className="bg-[#070E3A] w-full h-full rounded-xl">
                  <div
                    className="py-2 px-1 rounded-xl flex justify-between items-center"
                    style={{
                      background:
                        "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                    }}
                  >
                    <div className="w-full flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-[20%]">
                          <img
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Tap_Earn.gif"
                            className="w-10"
                          />
                        </div>
                         <div className=" w-[80%] ">
                          <p className="font-bold">{t('aiGames.emoji.title')}</p>
                          <p className="font-medium text-xs">
                            {t('aiGames.emoji.subtitle')}
                          </p>
                        </div>
                      </div>
                      <div
                        className=" rounded-2xl w-32 h-8 relative"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                        }}
                      >
                        <div className="h-full w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                        <div className="h-full w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF] "></div>
                        <div className=" bg-[#070e3a4b] backdrop-blur-sm h-full rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                        <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                          <p
                            className="uppercase font-medium text-center text-[11px] font-zendots"
                            style={{
                              color: "transparent",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              backgroundImage:
                                "linear-gradient(to right, #0285FF, #1EEF32)",
                            }}
                          >
                            {t('aiGames.emoji.button')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                onClick={() => {
                  if (navigator.vibrate) {
                    navigator.vibrate(100);
                  }
                  // playSound();
                  navigate("/Farming/Taptoset");
                  // handleTaptoset();
                }}
                className="cursor-pointer w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mt-3"
              >
                <div className="bg-[#070E3A] w-full h-full rounded-xl">
                  <div
                    className="py-2 px-1 rounded-xl flex justify-between items-center"
                    style={{
                      background:
                        "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                    }}
                  >
                    <div className="w-full flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-[20%]">
                          <img
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Tap_Earn.gif"
                            className="w-10"
                          />
                        </div>
                         <div className=" w-[80%] ">
                          <p className="font-bold">{t('aiGames.tapToSet.title')}</p>
                          <p className="font-medium text-xs">
                            {t('aiGames.tapToSet.subtitle')}
                          </p>
                        </div>
                      </div>
                      <div
                        className=" rounded-2xl w-36 h-8 relative"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                        }}
                      >
                        <div className="h-full w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                        <div className="h-full w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF] "></div>
                        <div className=" bg-[#070e3a4b] backdrop-blur-sm h-full rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                        <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                          <p
                            className="uppercase font-medium text-center text-[10px] font-zendots"
                            style={{
                              color: "transparent",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              backgroundImage:
                                "linear-gradient(to right, #0285FF, #1EEF32)",
                            }}
                          >
                            {t('aiGames.tapToSet.button')}
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
          )}


      </div>
    </DashboardLayout>
  );
};

export default AIGameWeb;
