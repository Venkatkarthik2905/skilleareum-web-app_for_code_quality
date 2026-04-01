import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useWindowSize from "react-use/lib/useWindowSize";
import { useSelector } from "react-redux";
import {
  faArrowLeft,
  faArrowLeftLong,
  faVolumeHigh,
  faVolumeMute,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, Toaster } from "react-hot-toast";
import AOS from "aos";
import { SERVER_URL } from "../../../../../../../config";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { useTranslation } from "react-i18next";
// import SpinSkeleton from "../NewVersion/Loaders/SpinSkeleton";
AOS.init();

const SpinWheelWeb = ({ onClose }) => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  // const { playSound } = useSettings();
  const [currentAngle, setCurrentAngle] = useState(0);
  const [subscribepopup, setSubscribePopup] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinResult, setSpinResult] = useState("");
  const [spinsRemaining, setSpinsRemaining] = useState(0);
  const [expirationDate, setExpirationDate] = useState("");
  const [showCoins, setShowCoins] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shownogift, setShowNoGift] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [isShare, setShare] = useState(false);
  const { width, height } = useWindowSize();
  const [soundStatus, setSoundStatus] = useState(false);
  const [SpinLoading, setSpinLoading] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [isspinresult, setIsSpinResult] = useState(false);
  const [ismusicon, setIsMusicOn] = useState(true);
  const userId = useSelector((state) => state.user_email.id);
  const audioRef = useRef(null);
  const [subscribe, setSubscribe] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const sub_status = useSelector((state) => state.user_email.sub_status);
  const { created_at, discount_percentage } = useSelector(
    (state) => state.user_email
  );
  const createdAtDate = new Date(created_at);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  // Image loading states
  const [wheelImagesLoaded, setWheelImagesLoaded] = useState({
    spinwheel: false,
    spinwheel2: false,
    spinpointer: false,
  });
  const [segmentImagesLoaded, setSegmentImagesLoaded] = useState({});

  // Get the date 7 days ago
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Check if all wheel images are loaded
  const allWheelImagesLoaded = Object.values(wheelImagesLoaded).every(
    (loaded) => loaded
  );

  // Handle image load for wheel images
  const handleWheelImageLoad = (key) => {
    setWheelImagesLoaded((prev) => ({ ...prev, [key]: true }));
  };

  // Handle image load for segment images
  const handleSegmentImageLoad = (url) => {
    setSegmentImagesLoaded((prev) => ({ ...prev, [url]: true }));
  };

  // Check if discount applies
  // const isNewuser = createdAtDate <= oneWeekAgo;
  const isNewuser = createdAtDate >= oneWeekAgo;

  const handlesubscribepopup = () => {
    // playSound();
    setSubscribePopup(!subscribepopup);
  };

  const handleSubscribe = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
      // setSubscribe(!subscribe);
    navigate("/SubPackWeb");
  };

  const handleClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    // playSound();
    if (source === "joiningbonus") {
      navigate("/ChallengeMap_7Days");
      return;
    } else if (source === "ChallengeMapWeb") {
      navigate("/ChallengeMapWeb");
      return;
    } else if (source === "TaskListWeb") {
      navigate("/TaskListWeb");
    } else {
      // onClose();
    }
  };
  const text = `🎉 I just won ${spinResult} on the Skilleareum Spin Wheel! 🚀\n\nSkilleareum: Learn AI, earn rewards, and grow! 🌟\n\n🎁 Join now and get 1000 SkillPoints.\n🤝 Invite friends for bonuses.\n📲 Complete quests for daily rewards.\n🎮 Level up and become a Knowledge Champion!\n\nStart your journey today and spin to win!`;

  const shareViaTelegram = async () => {
    // playSound();
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
    // console.log("HIII");
    setTimeout(() => {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
        text
      )}&text=Skilleareum`;
      window.open(telegramUrl, "_blank");
    }, 200);
  };

  const shareViaWhatsApp = async () => {
    // playSound();
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
    setTimeout(() => {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        text
      )}`;
      window.open(whatsappUrl, "_blank");
    }, 200);
  };
  const shareViaTwitter = async () => {
    // playSound();
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
    setTimeout(() => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}`;
      window.open(twitterUrl, "_blank");
    }, 200);
  };

  useEffect(() => {
    const fetchUserSpins = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${SERVER_URL}/api/user-spins`, {
          params: { userId: userId },
        });
        if (response.status === 200) {
          setSpinsRemaining(response.data.current_spins);
          // console.log("spins", spinsRemaining);
          if (response.data.current_spins === 0 && sub_status === "inactive") {
            setSubscribePopup(true);
          }
          setExpirationDate(response.data.expiration_date);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user spins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSpins();
  }, [userId, sub_status]);

  const calculateRotationAngle = (prizeIndex) => {
    const numberOfSegments = 9;
    const degreesPerSegment = 360 / numberOfSegments;
    const extraSpin = 360 * 3; // Extra spins for realism
    const finalRotation = degreesPerSegment * prizeIndex + extraSpin;
    return finalRotation;
  };

  // console.log("current angle", currentAngle);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  const handleShare = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setShare(!isShare);
    setIsSpinResult(!isspinresult);
  };

  const handlemusic = () => {
    // playSound();
    if (audioRef.current) {
      setIsMusicOn((prev) => {
        const newState = !prev;
        // console.log("Toggling music state:", newState);

        if (newState) {
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        } else {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        return newState;
      });
    } else {
      console.error("audioRef is not initialized.");
    }
  };

  const [highlightSegment, setHighlightSegment] = useState(null);

  const [isSpinning, setIsSpinning] = useState(false);

  let data;
  let totalSegments;

  if (isNewuser) {
    data = [
      { type: "50% off- AI Genesis program", weight: 30, emoji: "🎯" },
      {
        type: "500 Skill Points",
        weight: 20,
        img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif",
        size: "w-8",
      },

      // {
      //   type: "10 TON",
      //   weight: 0.01,
      //   img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/TonCoin1.png",
      //   size: "w-8",
      // },
      { type: "Extra Spin", weight: 15, emoji: "🔄" },
      { type: "Better luck next time", weight: 9, emoji: "😣" },
      { type: "Lucky draw entry", weight: 0, emoji: "🍀" },
      {
        type: "1000 Skill Points",
        weight: 20,
        img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif",
        size: "w-8",
      },
      { type: "AI Fact bonus", weight: 0, emoji: "🤖" },
      // {
      //   type: "0.01 TON",
      //   weight: 5.99,
      //   img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/TonCoin1.png",
      //   size: "w-8",
      // },
    ];
    document.documentElement.style.setProperty("--segments", 9);
    totalSegments = data.length;
  } else {
    data = [
      // {
      //   type: "0.01 TON",
      //   weight: 13,
      //   img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/TonCoin1.png",
      //   size: "w-8",
      // },
      {
        type: "500 Skill Points",
        weight: 20,
        img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif",
        size: "w-8",
      },

      // {
      //   type: "10 TON",
      //   weight: 0.01,
      //   img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/TonCoin1.png",
      //   size: "w-8",
      // },
      { type: "Extra Spin", weight: 15, emoji: "🔄" },
      { type: "Better luck next time", weight: 9.5, emoji: "😣" },
      { type: "Lucky draw entry", weight: 10.5, emoji: "🍀" },
      {
        type: "1000 Skill Points",
        weight: 20,
        img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif",
        size: "w-8",
      },
      { type: "AI Fact bonus", weight: 11.99, emoji: "🤖" },
    ];
    document.documentElement.style.setProperty("--segments", 8);
    totalSegments = data.length;
  }

  const prizeMap = {
    "AI Fact bonus": "aiFact",
    "Lucky draw entry": "luckyDraw",
    "50% off- AI Genesis program": "genesisDiscount",
    "500 Skill Points": "points500",
    "1000 Skill Points": "points1000",
    "Extra Spin": "extraSpin",
    "Better luck next time": "betterLuck"
  };

  const descriptions = {
    "AI Fact bonus": t('aiGames.spinWheel.descriptions.aiFact'),
    "Lucky draw entry": t('aiGames.spinWheel.descriptions.luckyDraw'),
    "50% off- AI Genesis program": t('aiGames.spinWheel.descriptions.genesisDiscount'),
  };

  const handleSpinClick = async () => {
    if (isSpinning) return;

    // playSound();
    setSpinLoading(true);
    setRotate(true);
    setIsSpinning(true);

    setCurrentAngle(0);
    document.documentElement.style.setProperty("--rotation-angle", `0deg`);

    if (spinsRemaining === 0) return;

    setTimeout(async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/wheel-spin/${userId}`
        );
        if (response.status === 200) {
          const spinResult = response.data.result.type;
          setSpinResult({
            type: spinResult,
            desc: descriptions[spinResult] || "",
          });
          const newPrizeNumber = data.findIndex(
            (item) => item.type === spinResult
          );
          // console.log("newPrizeNumber", newPrizeNumber);
          if (newPrizeNumber === -1) {
            console.error("Spin result not found in options:", spinResult);
            return;
          }

          const anglePerSegment = 360 / totalSegments;
          // console.log("anglePerSegment", anglePerSegment);

          const spinAngle =
            3960 + (360 - (newPrizeNumber - 1) * anglePerSegment);

          setCurrentAngle(spinAngle);
          // console.log("angle", spinAngle);
          document.documentElement.style.setProperty(
            "--rotation-angle",
            `${spinAngle}deg`
          );
          setHighlightSegment(newPrizeNumber);

          let lastSegment = -1;
          const checkInterval = setInterval(() => {
            const wheel = document.querySelector(".rotate-wheel");
            if (!wheel) return;

            const computedStyle = window.getComputedStyle(wheel);
            const matrix = computedStyle.transform;
            if (!matrix || matrix === "none") return;

            const values = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
            const a = values[0];
            const b = values[1];
            const currentAngle =
              Math.round(Math.atan2(b, a) * (180 / Math.PI) + 360) % 360;

            const currentSegment = Math.floor(currentAngle / anglePerSegment);

            if (
              currentSegment !== lastSegment &&
              audioRef.current &&
              ismusicon
            ) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch((error) => {
                console.error("Error playing sound:", error);
              });
              lastSegment = currentSegment;
            }
          }, 100);

          setTimeout(() => {
            handleSpinEnd(spinResult);
            setHighlightSegment(null);
            setIsSpinning(false);
            clearInterval(checkInterval);
          }, 2000);

          const updatedResponse = await axios.get(
            `${SERVER_URL}/api/user-spins`,
            {
              params: { userId: userId },
            }
          );

          if (updatedResponse.status === 200) {
            setSpinsRemaining(updatedResponse.data.current_spins);
            // console.log("spins", spinsRemaining);
          }
        } else if (response.status === 400) {
          toast.error(t('aiGames.spinWheel.toasters.limitExceeded'));
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error during spin:", error);
        if (error.response?.status === 400) {
          toast.error(t('aiGames.spinWheel.toasters.outOfSpins'));
        } else if (error.response) {
          toast.error("Server error: " + error.response.data.error);
        } else {
          toast.error("Network error, no response received.");
        }
        setSpinLoading(false);
        setIsSpinning(false);
      }
    }, 200);
  };

  useEffect(() => {
    if (spinResult?.desc) {
      setShowPopup(true);
    }
  }, [spinResult]);

  // console.log("result", spinResult);

  const handleSpinEnd = (spinResult) => {
    setRotate(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (spinResult !== "Extra Spin" && spinResult !== "Better luck next time") {
      if (
        spinResult === "500 Skill Points" ||
        spinResult === "1000 Skill Points"
      ) {
        setShowCoins(true);
        setShowConfetti(true);
        setTimeout(() => {
          setIsSpinResult(true);
          setSpinLoading(false);
        }, 1000);

        setTimeout(() => {
          setShowCoins(false);
          setShowConfetti(false);
        }, 5000);
      } else {
        setShowConfetti(true);

        setTimeout(() => {
          setIsSpinResult(true);
          setSpinLoading(false);
        }, 1000);

        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
    } else {
      setTimeout(() => {
        setIsSpinResult(true);
        setSpinLoading(false);
      }, 500);
    }
  };

  const handleSpinResult = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setIsSpinResult(!isspinresult);
  };

  // if (loading) {
  //   return <SpinSkeleton />;
  // }

  return (
    <DashboardLayout>
    <div
      translate="no"
      className=" flex flex-col justify-center items-center h-full text-white font-poppins mt-20 z-20 scale-90 relative "
    >
     {/* {subscribe && (
            <div className="fixed inset-0 model-overlay backdrop-blur-sm flex items-end z-50">
              <div className="relative w-full">
                <div className=" absolute top-3 bg-[#1EEF3273] blur-xl w-full h-10 z-0 "></div>
                <Subscribe onClose={handleSubscribe} />
              </div>
            </div>
          )} */}
        
            <div className="w-full h-full max-w-lg mx-auto z-10 relative ">
              {isShare && (
                <div
                  className="fixed model-overlay inset-0 backdrop-blur-sm bg-black/50 flex items-end z-50"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <div className="bg-black rounded-t-xl w-full p-5 z-overlay">
                    <div className="flex justify-end">
                      <FontAwesomeIcon
                        icon={faXmarkCircle}
                        onClick={handleShare}
                      />
                    </div>
                    <div className="flex justify-center gap-2">
                      <div
                        className="px-1.5 py-0.5 rounded cursor-pointer z-overlay"
                        onClick={shareViaWhatsApp}
                      >
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/whatsapp_neon.png"
                          className="w-10 h-10"
                        />
                      </div>
                      <div
                        className="px-1.5 py-0.5 rounded cursor-pointer z-overlay"
                        onClick={shareViaTwitter}
                      >
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/X1.png"
                          className="w-10 h-10"
                        />
                      </div>
                      <div
                        onClick={shareViaTelegram}
                        className="px-1.5 py-0.5 rounded cursor-pointer z-overlay"
                      >
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/telegram_neon.png"
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="w-[100%] mx-auto flex justify-center items-center">
                <div
                  onClick={handleClick}
                  className="absolute top-5 left-5 cursor-pointer z-10"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeftLong}
                    className="font-bold text-lg "
                  />
                </div>
                {/* <p className=" font-medium uppercase font-zendots  ">
                  Spin To <span className=" text-[#AAFFB2] ">Win</span>
                </p> */}
              </div>
              {/* <div className=" w-[95%] mx-auto flex justify-between items-center "> */}
                {/* <div className="flex items-center mt-4 gap-2 p-2 rounded-full shadow-lg max-w-max bg-gray-700 bg-opacity-50 border-2 border-transparent bg-clip-padding border-gradient-to-r from-[#0285FF] to-[#1EEF32]">
              <p className="font-bold text-white text-lg">{spinsRemaining}</p>
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Spin_Wheel_2.gif"
                className="h-10 w-10"
                alt="spin logo"
              />
            </div> */}
               
                {/* <div>
                  <div className="mr-3 bg-gray-700 bg-opacity-40 rounded-full w-12 h-12 flex justify-center items-center">
                    <button onClick={handlemusic} disabled={SpinLoading}>
                      <FontAwesomeIcon
                        icon={ismusicon ? faVolumeHigh : faVolumeMute}
                        size="xl"
                        className={`text-blue-600 ${
                          SpinLoading ? "opacity-50" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <audio
                    ref={audioRef}
                    src="../assets/public_sound_start-13691.mp3"
                  />
                </div> */}
              {/* </div> */}

              <div className="relative w-full mt-7 ">
                <div
                  translate="no"
                  className="flex justify-center items-center relative md:w-[80%] md:h-[80%] w-[100%] h-[100%] mx-auto rounded-full "
                >
                  <div className="relative rounded-full overflow-hidden flex justify-center items-center">
                    {/* <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/spinwheel.png" className="" />
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/spinwheel2.png"
                      className={` absolute w-9/12  ${rotate ? "rotate-wheel" : ""
                        } `}
                    /> */}
                    {/* Skeleton loader for spinwheel.png */}
                    {!wheelImagesLoaded.spinwheel && (
                      <div className="w-80 h-80 bg-gray-700 rounded-full animate-pulse absolute"></div>
                    )}
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/spinwheel.png"
                      className={`${
                        !wheelImagesLoaded.spinwheel ? "hidden" : ""
                      }`}
                      onLoad={() => handleWheelImageLoad("spinwheel")}
                      onError={() => handleWheelImageLoad("spinwheel")} // Treat error as loaded to avoid infinite loading
                      alt="Spin wheel background"
                    />

                    {/* Skeleton loader for spinwheel2.png */}
                    {!wheelImagesLoaded.spinwheel2 && (
                      <div className="absolute w-9/12 h-64 bg-gray-700 rounded-full animate-pulse"></div>
                    )}
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/spinwheel2.png"
                      className={`absolute w-9/12 ${
                        rotate ? "rotate-wheel" : ""
                      } ${!wheelImagesLoaded.spinwheel2 ? "hidden" : ""}`}
                      onLoad={() => handleWheelImageLoad("spinwheel2")}
                      onError={() => handleWheelImageLoad("spinwheel2")}
                      alt="Spin wheel overlay"
                    />

                    <div className="absolute top-4 z-30">
                      {!wheelImagesLoaded.spinpointer && (
                        <div className="w-16 h-16 bg-gray-700 rounded-full animate-pulse mx-auto"></div>
                      )}
                      <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/spinpointer.svg"
                        className={`scale-110 mx-auto ${
                          !wheelImagesLoaded.spinpointer ? "hidden" : ""
                        }`}
                        onLoad={() => handleWheelImageLoad("spinpointer")}
                        onError={() => handleWheelImageLoad("spinpointer")}
                        alt="Spin wheel pointer"
                      />
                    </div>
                    <div className="w-[75%] h-[75%]  rounded-full z-20 absolute top-11 overflow-hidden flex justify-center items-center">
                      <div className="container relative flex justify-center items-center overflow-hidden rounded-full w-full h-full">
                        <div
                          className={`wheel rotate-12 w-[98%] h-[98%] overflow-hidden rounded-full ${
                            rotate ? "rotate-wheel" : ""
                          }`}
                          style={{
                            transform: `rotate(${currentAngle}deg)`,
                            transition: "transform 3s ease-out",
                          }}
                        >
                          {data.map((option, index) => (
                            <div
                              key={index}
                              className="number flex justify-center items-center font-bold"
                              style={{
                                "--i": index + 1,
                                transform: `rotate(${
                                  (360 / totalSegments) * index
                                }deg)`,
                              }}
                            >
                              {option.img ? (
                                <div className="flex justify-center items-center ">
                                  <img
                                    src={option.img}
                                    className={option.size}
                                  />
                                </div>
                              ) : (
                                <div className="flex justify-center items-center ">
                                  <p className="text-xl">{option.emoji}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {spinResult && SpinLoading === false ? (
                    <div className=" absolute top-10 z-0 ">
                      <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/highlight.svg"
                        className="z-0 opacity-40 scale-y-125 translate-y-3 "
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div className="absolute z-50 ">
                    <div className=" relative z-50 ">
                      <div className=" w-[8.6rem] h-[8.6rem] bg-[#1EEF32]/80 blur-sm  z-50  rounded-full flex justify-center items-center"></div>

                      <div
                        translate="no"
                        className=" w-[8.5rem] h-[8.5rem] absolute top-0 left-0 right-0 bg-[#001007] border-2 border-[#1EEF32]/70 rounded-full p-1  flex justify-center items-center"
                      >
                        {spinResult && SpinLoading === false ? (
                          <div
                            translate="no"
                            className="w-[82%]  flex flex-col justify-center items-center h-[6.5rem] overflow-hidden overflow-x-auto overflow-y-auto rounded-full break-words uppercase font-zendots text-[10px] text-center font-medium "
                          >
                            <p key={spinResult.type}>
                              {prizeMap[spinResult.type] ? t(`aiGames.spinWheel.prizes.${prizeMap[spinResult.type]}`) : spinResult.type}
                            </p>
                            {showPopup && (
                              <div className=" fixed inset-0 h-full flex justify-center items-center bg-black bg-opacity-50 ">
                                <div className="bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-0.5 rounded-xl relative w-[90%] mx-auto max-w-md">
                                  <div className="bg-[#080B1C] p-5 rounded-xl">
                                    <div className=" flex justify-end pb-2 ">
                                      <button
                                        onClick={() => setShowPopup(false)}
                                      >
                                        <FontAwesomeIcon
                                          icon={faXmarkCircle}
                                          className=" text-lg "
                                        />
                                      </button>
                                    </div>
                                    {spinResult.desc}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div
                            key={new Date()}
                            className=" uppercase font-zendots text-sm text-center font-medium "
                          >
                            <p className="text-[#1EEF32] ">
                              {t('aiGames.spinWheel.title').split(' ')[0]}
                            </p>
                            <p>{t('aiGames.spinWheel.title').split(' ').slice(1).join(' ')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mt-3 relative flex justify-center ">
                  <div className="w-52 h-10 bg-[#2E41B1] opacity-35 blur-sm rounded-full p-1"></div>
                  <div className=" bg-black absolute top-1 rounded-full py-1 px-5">
                    <p className=" uppercase font-zendots ">
                      <span> {t('aiGames.spinWheel.spinsLeft')} </span>
                      <span className=" text-[#1EEF32] ">{spinsRemaining}</span>
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center z-50">
                  <div translate="no" className="w-full z-50">
                    {spinsRemaining > 0 && (
                      <div
                        translate="no"
                        onClick={() => {
                          if (navigator.vibrate) {
                            navigator.vibrate(100);
                          }
                          if (
                            spinsRemaining === 0 &&
                            sub_status === "inactive"
                          ) {
                            handleSubscribe();
                            return;
                          } else {
                            handleSpinClick();
                          }
                        }}
                        className=" cursor-pointer rounded-2xl mt-5 w-[80%] mx-auto h-10 relative z-50"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                        }}
                      >
                        <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  z-50"></div>
                        <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  z-50"></div>
                        <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] z-50 "></div>
                        <div className="w-full h-full z-50 absolute top-0 bottom-0 flex items-center justify-center">
                          <p
                            translate="no"
                            className="uppercase font-medium text-center font-zendots"
                            style={{
                              color: "transparent",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              backgroundImage:
                                "linear-gradient(to right, #0285FF, #1EEF32)",
                            }}
                          >
                            {spinsRemaining === 0 &&
                            sub_status === "inactive" ? (
                              <span> {t('aiGames.spinWheel.buttonSubscribe')}</span>
                            ) : (
                              <span>{t('aiGames.spinWheel.buttonSpin')}</span>
                            )}{" "}
                          </p>
                        </div>
                      </div>
                     )} 
                  </div>
                  {/* )} */}
                </div>
              </div>
            </div>

            {subscribepopup && (
              <div>
                <div className="w-full fixed inset-0 z-40 font-zendots flex justify-center items-center bg-[#080B1C]/60 ">
                  <div className="relative flex justify-center items-center bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins">
                    <div className="relative w-full max-w-lg flex justify-center items-center">
                      <div
                        className={`w-[85%] mx-auto  border border-[#1AE348]/70 rounded-2xl p-0.5 animate__animated`}
                      >
                        <div className="w-full bg-[#080a47] rounded-2xl  ">
                          <div
                            className="px-3 py-5 rounded-xl  "
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
                                    setSubscribePopup(false);
                                    // playSound();
                                  }}
                                  className="text-3xl text-[#1EEF32] font-semibold rotate-45"
                                >
                                  +
                                </button>
                              </div>

                              <div className=" flex flex-col justify-center  items-center gap-5 ">
                                <div>
                                  <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/subs.svg" />
                                </div>

                                 <div className="pb-7">
                                  <p className=" text-base uppercase font-zendots font-medium text-center leading-8 ">
                                    <span className="text-[#1CE740]">
                                      {t('aiGames.spinWheel.buttonSubscribe')}
                                    </span>{" "}
                                    {t('aiGames.spinWheel.descriptionSubscribe').replace(/subscribe /i, '')}
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
            )}

            {showConfetti && (
              <div>
                <div className="fixed inset-0 z-50 w-full">
                  <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/Confeti.gif"
                    alt="coin shower"
                    className="h-screen w-full max-w-4xl mx-auto object-cover "
                  />
                </div>
              </div>
            )}
            {showCoins && (
              <div>
                <div className="absolute bottom-0 left-0 right-0  z-50 ">
                  <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/coinshower.gif"
                    alt="coin shower"
                    className=" w-[50%] mx-auto object-contain "
                  />
                </div>
              </div>
            )}
          </div>

          <Toaster reverseOrder={false} />
      
      
    </DashboardLayout>
  );
};

export default SpinWheelWeb;
