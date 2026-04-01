import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUp,
  faArrowUpLong,
  faCopy,
  faMicrophone,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "animate.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import annyang from "annyang";
// import Subscribe from "./Subscription/Subscribe";
// import SubButton from "./Subscription/Subbutton";
// import Subpack from "./Subscription/Subpack";
// import Welcome from "./Onboarding/Welcome";
import { SERVER_URL, speak } from "../../../../../config";
import DoYouKnowWeb from "./Farming/DoYouKnowWeb";
import DailyRewardWeb from "./CommonPages/DailyBonus/DailyRewardWeb";
import BoostFinalWeb from "./Farming/Boost/BoostFinalWeb";
import UpgradeWeb from "./Farming/UpgradeWeb";
import AiFarmingWeb from "./Farming/AIFarmingWeb";
import SkinChangeWeb from "./Profile/SkinChangeWeb";
import DashboardLayout from "../Layout/DashboardLayout";

const UserDashboardWeb = () => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  // const { isMuted,
  //   toggleSound,
  //   playSound,
  //   toggleBGM,
  //   playBgmSound,
  //   isBgm,
  //   pauseAudio
  // } = useSettings();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryDay = queryParams.get("day");
  const Initalsource = queryParams.get("source");
  const authToken = useSelector((state) => state.token);
  const [day, setDay] = useState(() => queryDay || localStorage.getItem("day"));
  const [source, setsource] = useState(
    () => queryDay || localStorage.getItem("day")
  );
  const [isNewUser, setIsNewUser] = useState(false);
  const [payments, setPayments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rewardspopup, setRewardsPopup] = useState(false);
  const [Verified, setVerified] = useState(false);
  const [gameAnswer, setGameAnswer] = useState();
  const [isUpgraded, setisUpgraded] = useState(false);
  const [isWon, setisWon] = useState(false);
  const [streakDay, setStreakDay] = useState(0);
  const [endTime, setendTime] = useState();
  const [showConfetti, setShowConfetti] = useState(false);
  const [rewardPoint, setRewardPoint] = useState(0);
  const [notificationCount, setnotificationCount] = useState(0);
  const userData = useSelector((state) => state.user_email);
  const displayedPayments = showMore ? payments : payments.slice(0, 5);
  const [FarmingStatus, setFarmingStatus] = useState();
  const [MissionStatus, setMissionStatus] = useState();
  const [spinWheel, setSpinWheel] = useState(false);
  const [assessmentDays, setAssessmentDays] = useState([]);
  const [taptoset, setTapToSet] = useState(false);
  const [boostpopup, setBoostPopup] = useState(false);
  const [upgradepopup, setUpgradePopup] = useState(false);
  const [AiFarmingpopup, setAiFarmingpopup] = useState(false);
  const [Farmingpopup, setFarmingpopup] = useState(false);
  // const [leaderboard, setLeaderBoard] = useState(false);
  const [dailymission, setDailyMission] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);

  const { NewUser } = location.state || { NewUser: false };
  // const NewUser  = true;

  const [run, setRun] = useState(false);
  const [randomQuestion, setrandomQuestion] = useState(null);
  const [showpopup, setShowPopup] = useState(false);
  const [isClaimed, setisClaimed] = useState(false);

  const { created_at, discount_percentage } = useSelector(
    (state) => state.user_email
  );
  const createdAtDate = new Date(created_at);

  // Get the date 7 days ago
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Check if discount applies
  const isDiscountValid =
    discount_percentage === 50.0 && createdAtDate >= oneWeekAgo;

  // const [language, setLanguage] = useState({
  //   code: 'en', /
  //   flag: 'https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Flag-United-Kingdom.webp', // Default flag image
  // });

  const [gameData, setGameData] = useState(null);
  const [gridData, setGridData] = useState(null);
  const firstVideoRef = useRef(null);

  // const { playBgm, stopBgm } = AudioManager();
  const audioRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(
    localStorage.getItem("selectedVideo") ||
      "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMEDefaultnew.mp4"
  );

  const [isListening, setIsListening] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  const sub_status = useSelector((state) => state.user_email.sub_status);

  const handleSubscribe = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    // setSubscribe(!subscribe);
    navigate("/SubPackWeb");
  };

  useEffect(() => {
    const userStatus = localStorage.getItem("isNewUser");
    if (!userStatus) {
      setIsNewUser(true);
    }

    const handleStorageChange = () => {
      const video = localStorage.getItem("selectedVideo");

      if (video?.includes("../assets") || !video) {
        localStorage.setItem(
          "selectedVideo",
          "https://skilleareumimages.s3.ap-south-1.amazonaws.com/HOMEDefaultnew.mp4"
        );
      }

      setSelectedVideo(localStorage.getItem("selectedVideo"));
      // console.log("video", localStorage.getItem("selectedVideo"));
    };

    handleStorageChange(); // Call once on mount to check the condition

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // useEffect(() => {
  //   audioRef.current = new Audio("/assets/EveryTap.mp3");
  // }, []);

  useEffect(() => {
    if (queryDay) {
      setDay(queryDay);
      localStorage.setItem("day", queryDay);
    }
    if (Initalsource) {
      setsource(Initalsource);
      localStorage.setItem("source", Initalsource);
    }
  }, [queryDay]);
  const [timeRemaining, setTimeRemaining] = useState("");

  // const [currentPopupIndex, setCurrentPopupIndex] = useState(-1);
  // const [selectedGame, setSelectedGame] = useState(null);
  // // const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  // const [selectedGridType, setSelectedGridType] = useState(null);
  // const [selectLetterCount, setSelectLetterCount] = useState(null);
  // const [selectedLevel, setSelectedLevel] = useState("");

  // const handleGridSelection = (gridType) => {
  //   // console.log('Selected grid:', gridType);
  //   setSelectedGridType(gridType);
  // };

  // const getPopupSequence = () => {
  //   switch (selectedGame) {
  //     case "Missingletters":
  //       return [
  //         Selectgame,
  //         ChooseLevel,
  //         ContentModal,
  //         ClueModal,
  //         // Countdown,
  //         Lettersgame,
  //         Answerpopup,
  //         SkillPoints,
  //       ];
  //     case "JumbledLetters":
  //       return [
  //         Selectgame,
  //         ChooseLevel,
  //         ContentModal,
  //         ClueModal,
  //         // Countdown,
  //         Lettersgame,
  //         Answerpopup,
  //         SkillPoints,
  //       ];
  //     case "PerfectMatch":
  //       return [
  //         Selectgame,
  //         ChooseLevel,
  //         ContentModal,
  //         ClueModal,
  //         //  Countdown,
  //         Lettersgame,
  //         Answerpopup,
  //         SkillPoints,
  //       ];
  //     case "MemoryGame":
  //       return [
  //         Selectgame,
  //         ChooseGrid,
  //         Gameinfo,
  //         Flipgame,
  //         GameSummary,
  //         SkillPoints,
  //       ];
  //     default:
  //       return [Selectgame];
  //   }
  // };

  // const handleskip = () => {
  //   if (selectedGame === "MemoryGame") {
  //     setCurrentPopupIndex(5);
  //   } else setCurrentPopupIndex(6);
  // };

  // const popups = getPopupSequence();

  // const nextPopup = () => {
  //   setCurrentPopupIndex((prevIndex) =>
  //     Math.min(prevIndex + 1, popups.length - 1)
  //   );
  // };

  // const prevPopup = () => {
  //   setCurrentPopupIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  // };

  // const Retry = () => {
  //   setCurrentPopupIndex(1);
  // };

  // const previousRoute = localStorage.getItem("previousRoute");

  // const handleExit = () => {
  //   if (currentPopupIndex === 0) {
  //     if (previousRoute) {
  //       navigate(previousRoute || "/Dashboard");
  //     }
  //     setSelectedGame(null);
  //     setCurrentPopupIndex(-1);
  //     setSelectedGridType(null);
  //     setSelectLetterCount(null);
  //     setSelectedLevel("");
  //     setGameData(null);
  //     setGameAnswer(null);

  //     pauseAudio();
  //   } else {
  //     setCurrentPopupIndex(0);
  //   }
  // };

  // const handleGameModal = () => {
  //   // playSound();
  //   if (isBgm) {
  //     playBgmSound();
  //   }
  //   if (firstVideoRef.current) {
  //     firstVideoRef?.current?.pause();

  //     // setTimeout(() => {
  //     //   console.log("Game modal opened");
  //     //   setCurrentPopupIndex(0);
  //     // }, 7000);
  //   }
  // };

  // useEffect(() => {
  //   const gameTriggered = localStorage.getItem("gameTriggered");
  //   if (gameTriggered === "true") {
  //     playSound();
  //     if (isBgm) {
  //       playBgmSound();
  //     }
  //     setCurrentPopupIndex(0);
  //     localStorage.removeItem("gameTriggered");
  //   }
  // }, [handleGameModal]);

  const commands = {
    "go to dashboard": () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.dashboard') }));
      navigate(userData ? "/ChallengeMap_7Days" : "/");
    },
    dashboard: () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.dashboard') }));
      navigate(userData ? "/ChallengeMap_7Days" : "/");
    },
    Home: () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.dashboard') }));
      navigate(userData ? "/ChallengeMap_7Days" : "/");
    },
    "go to daily bonus": () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.dailyBonus') }));
      navigate("/DailyBonus");
    },
    "daily bonus": () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.dailyBonus') }));
      navigate("/DailyBonus");
    },
    Earning: () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.dailyBonus') }));
      navigate("/DailyBonus");
    },
    "go to fun and learn": () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.funAndLearn') }));
      navigate("/Aispace");
    },
    Game: () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.funAndLearn') }));
      navigate("/Aispace");
    },
    "go to invite section": () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.inviteSection') }));
      navigate("/Invitescreen");
    },
    invite: () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.inviteSection') }));
      navigate("/Invitescreen");
    },
    "go to wallet": () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.wallet') }));
      navigate("/MyRewards");
    },
    wallet: () => {
      speak(t('voiceCommands.navigatingTo', { page: t('voiceCommands.wallet') }));
      navigate("/MyRewards");
    },
  };

  useEffect(() => {
    // Set up the voice commands when component mounts
    if (annyang) {
      annyang.addCommands(commands);
    }

    // Clean up the voice recognition commands when component unmounts
    return () => {
      if (annyang) {
        annyang.removeCommands();
      }
    };
  }, [commands]);

  const startListening = () => {
    // playSound();
    if (annyang) {
      setIsListening(true);
      annyang.start({ autoRestart: false, continuous: false });
      annyang.addCallback("end", () => {
        setIsListening(false); // Stop listening once command is processed
      });
    }
  };

  const handleSkinChange = () => {
    localStorage.setItem("isNewUser", "false");
    window.location.reload();
    setIsNewUser(false);
  };

  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  let sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 10000,
    // centerMode: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    // centerPadding: "15%",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: () => setUpdateCount(updateCount + 1),
    beforeChange: (current, next) => setSlideIndex(next),
  };

  const dotPositions = [
    { bottom: "-8px", left: "-25px" },
    { bottom: "-10px", left: "28%" },
    { bottom: "-8px", left: "37px" },
    { bottom: "-4px", left: "65px" },
  ];

  const settings1 = {
    infinite: false,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    adaptiveHeight: true,

    appendDots: (dots) => (
      <div style={{ position: "relative", width: "100%" }} className="z-30">
        <ul style={{ listStyle: "none", margin: 0, padding: 0, width: "100%" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => {
      const position = dotPositions[i % dotPositions.length];
      return (
        <div
          className="custom-dot"
          style={{
            position: "absolute",
            bottom: position.bottom,
            left: position.left,
            transform: "translateX(-50%) translateY(-140%)",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "999",
          }}
        >
          <div className="dot-inner" />
        </div>
      );
    },
  };

  // const handleLanguageSelect = (selectedLanguage) => {
  //   setLanguage(selectedLanguage);
  // };

  // useEffect(() => {
  //   const handleUserInteraction = () => {
  //     const hasPlayed = sessionStorage.getItem("audioPlayed");

  //     // Only play the speech if it hasn't been played yet in this session
  //     if (!hasPlayed) {
  //       const welcomeAudio = new Audio("/assets/Welcome.mp3");
  //       welcomeAudio.play();
  //       sessionStorage.setItem("audioPlayed", "true");
  //     }

  //     // Remove event listeners after interaction
  //     document.removeEventListener("click", handleUserInteraction);
  //     document.removeEventListener("keydown", handleUserInteraction);
  //   };

  //   document.addEventListener("click", handleUserInteraction);
  //   document.addEventListener("keydown", handleUserInteraction);

  //   return () => {
  //     document.removeEventListener("click", handleUserInteraction);
  //     document.removeEventListener("keydown", handleUserInteraction);
  //   };
  // }, []);

  function getLevel(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInHours = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours

    if (diffInHours >= 8) return 4;
    if (diffInHours >= 6) return 3;
    if (diffInHours >= 4) return 2;
    if (diffInHours >= 2) return 1;
    return 0;
  }
  useEffect(() => {
    if (NewUser) {
      setTimeout(() => {
        setRun(true); // Start Joyride after a short delay
      }, 100);
    }
  }, [NewUser]);
  const handleClaim = async (ans) => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    if (ans != randomQuestion?.answer) {
      toast.error(t('farming.status.wrongAnswer'));
      handleQuestionClose();
      return;
    }

    // setIsLoading(true); // Start loading
    if (new Date(FarmingStatus.endTime) > new Date()) return;
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/farming/claim?userId=${userData.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (data.message == "Skill points claimed") {
        startFarming();
        toast.success(t('farming.status.claimed'));
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
        setShowPopup(false);
        setTimeout(() => {
          setisUpgraded(!isUpgraded);

          toast.dismiss();
        }, 1000);
      }
    } catch (error) {
      // console.log(error);
      handleRefresh();
    } finally {
      // setIsLoading(false); // End loading
    }
  };

  const handleShow = async () => {
    try {
      setisClaimed(true);
      const { data } = await axios.get(
        `${SERVER_URL}/api/farming/getRandomQuestion?userId`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setrandomQuestion(data);
      setShowPopup(true);
    } catch (error) {}
  };
  const handleQuestionClose = () => {
    setShowPopup(!showpopup);
  };
  const startFarming = async () => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/farming/start?userId=${userData.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
  };
  const getBoostExpiration = async () => {
    try {
      if (FarmingStatus.boost === "") return;
      const { data } = await axios.get(
        `${SERVER_URL}/api/farming/getBoostExpiration?userId=${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const startTime = data.boostExpiration.boostStartTime;
      const endTime = data.boostExpiration.boostEndTime;

      if (startTime && endTime) {
        // Calculate the total duration of the boost
        const totalDuration = new Date(endTime) - new Date(startTime);

        // Function to update time left and progress
        const updateCountdown = () => {
          const now = new Date();
          const timeLeft = new Date(endTime) - now;

          // Calculate the progress as a percentage
          const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

          // Calculate the time remaining in HH:MM:SS format
          const hours = String(
            Math.floor(timeLeft / (1000 * 60 * 60))
          ).padStart(2, "0");
          const minutes = String(
            Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
          ).padStart(2, "0");
          const seconds = String(
            Math.floor((timeLeft % (1000 * 60)) / 1000)
          ).padStart(2, "0");
          if (hours <= 0) {
            return;
          }
          setTimeRemaining(`${hours}:${minutes}:${seconds}`);
        };

        // Initial call to set the timer
        updateCountdown();

        // Update the countdown every second
        const intervalId = setInterval(updateCountdown, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
      }
    } catch (error) {
      console.error("Error fetching boost expiration", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/getAllData`, {
          params: { userId: userData.id, email: userData.id },
        });
        const data = response.data;
        // console.log(data);

        setendTime(data.farming.endTime);
        setRewardPoint(data.user?.token_balance);
        setAvatar(data.user?.avatar);
        setVerified(data.user?.email && data.user.x_userName);
        setFarmingStatus(data.farming);
        setnotificationCount(data.notifications.total);
        setAssessmentDays(data.assessmentDays);
        setMissionStatus(data.missions);
      } catch (error) {
        // console.error("Error fetching data", error);
      }
    };

    const debounceFetchData = debounce(fetchData, 300);
    getBoostExpiration();
    debounceFetchData();
    return () => debounceFetchData.cancel();
  }, [isUpgraded]);

  const handleModalSubmit = async (data) => {
    const addUserName = await axios.post(
      `${SERVER_URL}/api/addUserName?name=${data.username}&userId=${userData.id}`
    );

    setShowModal(false);
    if (addUserName.data.success === true) {
      window.open("https://x.com/Skilleareum", "_blank");
    }

    // Redirect logic if needed
    // window.location.href = `https://x.com/Skilleareum`;
  };

  const handleSpinwheel = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    // setSpinWheel(!spinWheel);
    navigate("/SpinWheelWeb")
  };

  const handleTaptoset = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setTapToSet(!taptoset);
  };

  const handleboostpopup = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    setBoostPopup(!boostpopup);
  };

  const handleupgrade = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    setUpgradePopup(!upgradepopup);
  };

  const handleAiFarming = () => {
    setAiFarmingpopup(!AiFarmingpopup);
  };

  const handleFarming = () => {
    navigate("/FarmingWeb");
  };

  // const handleleaderboard = () => {
  //   setLeaderBoard(!leaderboard);
  // };

  const handledaiylmission = () => {
    setDailyMission(!dailymission);
  };

  // const handleSelectGame = (game) => {
  //   setSelectedGame(game);
  // };

  const handleRefresh = () => {
    setisUpgraded(!isUpgraded);
  };

  const [copied, setCopied] = useState(false);

  const referralMessage = `https://t.me/SKLRM_bot?start=${userData.referral_code}

${t('referral.message')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralMessage).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  const [steps] = useState([
    {
      target: ".skillpoints",
      content: <span>{t('joyride.skillpoints')}</span>,
      disableBeacon: true,
    },
    {
      target: ".farming",
      content: <span>{t('joyride.farming')}</span>,
    },
    {
      target: ".topfeatures",
      content: (
        <span>
          {t('joyride.topfeatures')}
        </span>
      ),
    },
    {
      target: ".spin",
      content: (
        <span>
          {t('joyride.spin')}
        </span>
      ),
    },
    {
      target: ".skillquest",
      content: (
        <span>
          {t('joyride.skillquest')}
        </span>
      ),
    },
    {
      target: ".refbonus",
      content: (
        <span>
          {t('joyride.refbonus')}
        </span>
      ),
    },
  ]);

  const [showWelcome, setShowWelcome] = useState(NewUser);
  const [startJoyride, setStartJoyride] = useState(false);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setStartJoyride(true);
  };

  const handleJoyrideCallback = (data) => {
    // console.log(data);
    const { action, index, type } = data;

    if (type === "tour:end") {
      setRun(false);
    }

    // console.log(`Action: ${action}, Step Index: ${index}, Type: ${type}`);
  };
  const button = document.querySelector("appkit-button");

  const handleSliderChange = (e) => {
    const progress = (e.target.value / e.target.max) * 100 + "%";
    e.target.style.background = `transparent`;
    sliderRef.slickGoTo(e.target.value);
  };

  if (button) {
    button.style.setProperty("--wui-color-accent-100", "#070E3A");
    button.style.setProperty("--wui-spacing-l", "20px");
    button.style.setProperty("--wui-border-radius-m", "10px");
  }

  return (
    <DashboardLayout>
    <div
      className=" relative text-white font-poppins mt-28 "      
    >
      {isNewUser && run === false && (
        <SkinChangeWeb onClose={handleSkinChange} />
      )}

     
        {showConfetti && (
          <div>
            <div className="fixed inset-0 z-50 w-full">
              <img
                loading="lazy"
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/Confeti.gif"
                alt="coin shower"
                className="h-screen w-full max-w-4xl mx-auto object-cover  "
              />
            </div>
          </div>
        )}

        <Toaster />
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

        {/* {showWelcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full">
              <Welcome onComplete={handleWelcomeComplete} />
            </div>
          </div>
        )} */}

        {/* <XUser
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        /> */}

        {showpopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full">
              <DoYouKnowWeb
                handleClaim={handleClaim}
                randomQuestion={randomQuestion}
              />
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

        {boostpopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg">
              <BoostFinalWeb
                setisUpgraded={handleRefresh}
                onClose={handleboostpopup}
              />
            </div>
          </div>
        )}

        {/* {currentPopupIndex >= 0 && popups[currentPopupIndex] && (
          React.createElement(popups[currentPopupIndex], {
            onNext: nextPopup,
            onPrev: prevPopup,
            onExit: handleExit,
            onRetry: Retry,
            onSkip: handleskip,
            selectedGame: selectedGame,
            ...(popups[currentPopupIndex] === Selectgame && { onSelectGame: handleSelectGame }),
            toast,
            ...(popups[currentPopupIndex] === ChooseGrid && {authToken ,day, onGridSelect: handleGridSelection, setGridData, toast, setisWon }),
            ...(popups[currentPopupIndex] === GameSummary && { gridData: gridData, setisWon,authToken }),
            ...(popups[currentPopupIndex] === Flipgame && { gridType: selectedGridType, gridData: gridData?.initialImages, setisWon }),
            ...(popups[currentPopupIndex] === ChooseLevel && {
              setisWon,
              day,
              selectedGame,
              setSelectedLevel,
              setGameData: setGameData,
              toast,
            }),
            ...(popups[currentPopupIndex] === Lettersgame && {
              selectedLevel,
              gameData: gameData,
              setGameAnswer,
              toast
            }),
            ...(popups[currentPopupIndex] === ContentModal && { gameData: gameData }),
            ...(popups[currentPopupIndex] === ClueModal && { gameData: gameData }),
            ...(popups[currentPopupIndex] === Answerpopup && {
              selectedLevel,
              selectedGame,
              authToken,
              navigate,
              gameData: gameData,
              gameAnswer,
              setisWon,
              source
            }),
            ...(popups[currentPopupIndex] === SkillPoints && { isWon, questionId: gameData?.id, memoryId: gridData?.id, selectedGame }),
          })
        )} */}

        {upgradepopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg">
              <UpgradeWeb
                setisUpgraded={handleRefresh}
                onClose={handleupgrade}
              />
            </div>
          </div>
        )}

        {AiFarmingpopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg">
              <AiFarmingWeb
                setisUpgraded={handleRefresh}
                Dashboard={true}
                onClose={handleAiFarming}
              />
            </div>
          </div>
        )}

        {/* {Farmingpopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg">
              <Farming onBack={handleFarming} />
            </div>
          </div>
        )} */}

        {/* {leaderboard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg">
              <Leaderboard onClose={handleleaderboard} />
            </div>
          </div>
        )} */}

        {/* {dailymission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg">
              <Missions onClose={handledaiylmission} />
            </div>
          </div>
        )} */}

        {!showModal && (
          <div className="flex flex-col   ">
            {rewardspopup && (
              <DailyRewardWeb
                onClose={() => setRewardsPopup(!rewardspopup)}
                streakDay={streakDay}
                userId={userData.id}
              />
            )}

            {!rewardspopup && (
              <div className="w-full max-w-md pb-10 mx-auto z-10">
                <div>
                  <div className="w-[100%] mx-auto flex justify-between items-start gap-5">
                  
                    <div className="">
                      {/* <div className="flex justify-end items-end pl-16">
                        <GoogleTranslate />
                      </div> */}

                      <div className="flex justify-end items-center gap-1">
                        {/* {!isListening ? (
                          <span
                            onClick={startListening}
                            className="pt-1"
                            style={{
                              background:
                                "linear-gradient(to left, #1EEF32, #0285FF)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              display: "inline-block",
                            }}
                          >
                            <i className="fa-solid fa-microphone fa-xl"></i>
                          </span>
                        ) : (
                          <i
                            onClick={startListening}
                            className="fa-solid fa-microphone fa-xl"
                            style={{ color: "#fa0000" }}
                          ></i>
                        )} */}

                       {/* NOTIFICATION BELL ICON */}
                        {/* <div
                          onClick={() => {
                            if (sub_status !== "active") {
                              // playSound();
                              handleSubscribe();
                            } else {
                              // playSound();
                              navigate("/DailyBonusWeb");
                            }
                          }}
                          className="relative bell-icon"
                        >
                          <img
                            loading="lazy"
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Notification_icon.gif"
                            className="w-8"
                          />
                          <div className="absolute top-0 right-0 w-4 h-4 bg-[#FF0202] rounded-full flex justify-center items-center ">
                            <p className="text-[11px] font-bold">
                              {notificationCount}
                            </p>
                          </div>
                        </div> */}                       
                      </div>
                    </div>
                  </div>

                  <div className="w-[100%] mx-auto mt-2 z-30 ">
                    <div className="  relative z-30 ">
                      <div className=" w-full flex justify-center ">
                        <img
                          loading="lazy"
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/bg1.png"
                          className=" scale-95 -translate-y-2 "
                        />
                      </div>

                      <div
                        className="w-full skillpoints flex justify-center items-center gap-2 absolute top-1"
                        translate="no"
                      >
                        <img
                          loading="lazy"
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                          className="w-16"
                        />
                        <p
                          translate="no"
                          className={`font-bold mt-1 text-white font-zendots ${
                            rewardPoint.toString().length <= 6
                              ? "text-4xl"
                              : rewardPoint.toString().length <= 10
                              ? "text-3xl"
                              : rewardPoint.toString().length <= 15
                              ? "text-xl"
                              : "text-lg"
                          }`}
                        >
                          {rewardPoint.toLocaleString()}
                        </p>
                      </div>

                      {/* connect button */}
                      <div className="w-full absolute bottom-6 left-0 right-0 flex justify-center items-center ">
                        {sub_status === "active" ? (
                          <div
                            className=" rounded-2xl w-32 h-7 relative"
                            style={{
                              backgroundImage:
                                "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                            }}
                          >
                            <div className="h-7 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                            <div className="h-7 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                            <div className=" bg-[#070e3a4b] backdrop-blur-sm h-7 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                            <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                              <p
                                className="uppercase font-medium text-center text-xs font-zendots"
                                style={{
                                  color: "transparent",
                                  backgroundClip: "text",
                                  WebkitBackgroundClip: "text",
                                  backgroundImage:
                                    "linear-gradient(to right, #0285FF, #1EEF32)",
                                }}
                              >
                                {t('buttons.connected')}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {" "}
                            <appkit-button />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" w-full mx-auto relative   ">
                  <Slider className="w-[100%] bg-transparent " {...settings1}>
                    {/* Daily Mission */}
                    {/* <div className="w-full md:h-[19.5rem] h-[17.5rem]  flex flex-col  justify-center px-3  ">
                      <div className="md:w-[100%] mx-auto h-full flex flex-col justify-center items-center ">
                        <p className="w-full font-zendots text-[12px] uppercase text-center ">
                        {t('promos.welcome')}
                        </p>
                        <div>
                          <div className="relative mt-5 h-full flex justify-center items-center">
                            <div
                              className="w-[100%] mx-auto relative flex justify-between gap-10"
                              style={{ zIndex: 1 }}
                            >
                              <div className="w-[75%] place-content-center grid content-center gap-1">
                                <div className="flex items-center">
                                  <div>
                                    <p className="font-zendots uppercase leading-4">
                                      {MissionStatus?.total || 14} tasks
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 mt-1">
                                  <div className=" flex items-center gap-1 px-2">
                                    {Array.from({
                                      length: MissionStatus?.total || 0,
                                    }).map((_, i) => (
                                      <div
                                        key={i}
                                        className={`w-1 h-3 rounded-full ${
                                          i < MissionStatus?.completed
                                            ? "bg-gradient-to-b from-[#0285FF] to-[#1EEF32]"
                                            : "bg-white/50"
                                        }`}
                                      ></div>
                                    ))} */}

                                    {/* <div className=" w-1 h-3 rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] "></div>
                                   <div className=" w-1 h-3 rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] "></div>
                                   <div className=" w-1 h-3 rounded-full bg-gradient-to-b from-[#0285FF] to-[#1EEF32] "></div>
                                   <div className=" w-1 h-3 rounded-full bg-white/50 "></div>
                                   <div className=" w-1 h-3 rounded-full bg-white/50 "></div>
                                   <div className=" w-1 h-3 rounded-full bg-white/50 "></div>
                                   <div className=" w-1 h-3 rounded-full bg-white/50 "></div>
                                   <div className=" w-1 h-3 rounded-full bg-white/50 "></div>
                                   <div className=" w-1 h-3 rounded-full bg-white/50 "></div>
                                   <div className=" w-1 h-3 rounded-full bg-white/50 "></div>
                                   <div className=" w-1 h-3 rounded-full bg-white/50 "></div> */}
                                  {/* </div>
                                  <p className=" text-[#1EEF32] text-sm font-semibold ">
                                    {MissionStatus?.completed || 0} Completed
                                  </p>
                                </div>
                                <div>
                                  <div
                                    onClick={handledaiylmission}
                                    className=" cursor-pointer rounded-2xl w-32 h-7 relative mt-2 mr-2"
                                    style={{
                                      backgroundImage:
                                        "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                                    }}
                                  >
                                    <div className="h-7 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                                    <div className="h-7 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                                    <div className=" bg-[#070e3a4b] backdrop-blur-sm h-7 rounded-xl w-full border-[0.5px] border-[#1AE348] "></div>
                                    <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                                      <p
                                        className="uppercase font-medium text-center font-zendots text-xs "
                                        style={{
                                          color: "transparent",
                                          backgroundClip: "text",
                                          WebkitBackgroundClip: "text",
                                          backgroundImage:
                                            "linear-gradient(to right, #0285FF, #1EEF32)",
                                        }}
                                      >
                                        Track
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="w-[120px]">
                                <div className="w-full  py-2 bg-[#0258F8]/20 rounded-2xl shadow-lg shadow-black/40  ">
                                  <img
                                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/pad.png"
                                    className="mx-auto"
                                  />
                                  <p className="text-xs  mt-1 text-center font-semibold text-[#1EEF32] ">
                                    Missions{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <img
                              loading="lazy"
                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub.svg"
                              className="w-full absolute scale-110 top-0 h-full"
                            ></img>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* Subscription */}
                    {sub_status !== "active" && (
                      <div className="w-full px-3 h-[17.5rem] ">
                        <div className="h-full flex flex-col justify-center items-center ">
                          <div className=" px-3">
                            <p className=" font-zendots uppercase text-left ">
                              {t('promos.subPackages')}
                            </p>
                          </div>
                          <div>
                            <div className="overflow-hidden translate-y-1">
                              <p
                                className="text-left px-7 text-2xl font-bold font-zendots uppercase text-transparent translate-y-3"
                                style={{
                                  WebkitTextStrokeColor: "white",
                                  WebkitTextStrokeWidth: "0.5px",
                                }}
                              >
                                {t('promos.aiGenesis')}
                              </p>
                            </div>
                            <div className="relative h-full flex justify-center items-center">
                              <div
                                className="w-[100%] mx-auto relative flex gap-3"
                                style={{ zIndex: 1 }}
                              >
                                <div className="w-[70%] mx-auto place-content-center grid content-center gap-2">
                                  <div className="flex items-center">
                                    <div className="flex items-center flex-col space-x-2">
                                      <p
                                        style={{
                                          color: "transparent",
                                          backgroundClip: "text",
                                          WebkitBackgroundClip: "text",
                                          backgroundImage:
                                            "linear-gradient(to right, #0285FF, #1EEF32)",
                                        }}
                                        className="font-zendots text-2xl font-bold "
                                      >
                                        {isDiscountValid ? "$7.50" : "$15"}
                                      </p>
                                      {isDiscountValid && (
                                        <p className="text-red-500 font-bold text-sm">
                                          {t('promos.off')}
                                        </p>
                                      )}
                                    </div>
                                    <div className="mx-2 h-7 w-[1px] bg-white"></div>
                                    <div>
                                      <p className="font-zendots uppercase leading-4">
                                        {t('promos.aiGenesis')}
                                      </p>
                                    </div>
                                  </div>
                                  {/* <div>
                                    <SubButton onClick={handleSubscribe} />
                                  </div> */}
                                  <div onClick={handleSubscribe}  className="rounded-2xl w-[90%] mx-auto -translate-x-7 h-7 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-7 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-7 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-7 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                                    <p className="uppercase text-xs font-medium text-center font-zendots" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t('buttons.subscribe')}</p>
              </div>
              </div>
                                </div>
                                <div className="w-[30%]">
                                  <img
                                    loading="lazy"
                                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub1.svg"
                                  ></img>
                                </div>
                              </div>
                              <img
                                loading="lazy"
                                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub.svg"
                                className="w-full scale-110 absolute top-0 h-full"
                              ></img>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Farming */}
                    {/* <div className="w-full flex items-center relative overflow-hidden h-[17.5rem] ">
                      <div className="h-full flex flex-col justify-center ">
                        <div className=" px-3 ">
                          <div className="">
                            <p className=" font-zendots font-medium uppercase ">
                              {t('farming.title')}
                            </p>
                          </div>

                          <div className="w-[70%] mt-5 border border-[#1AE348]/70 rounded-xl ">
                            <div className=" rounded-xl bg-[#080a47] ">
                              <div
                                className="p-2 rounded-xl  "
                                style={{
                                  background:
                                    "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)",
                                }}
                              >
                                <div
                                  onClick={() => handleboostpopup()}
                                  className="text-sm uppercase font-medium flex justify-between items-center bg-[#04132F] rounded-xl w-full py-3 px-3 gap-10 "
                                >
                                  <div className="flex items-center gap-3">
                                    <p
                                      className=" text-white/50"
                                      translate="no"
                                    >
                                      {t('farming.lv', { level: FarmingStatus?.boost || 1 })}
                                    </p>
                                    <p className="  ">{t('farming.boost')}</p>
                                  </div>

                                 
                                  {timeRemaining && (
                                    <div className=" bg-gradient-to-b from-[#1AE348] to-[#0368C0]  rounded-full p-[0.9px]">
                                      <div className=" bg-[#020d29] rounded-full py-1 px-2 ">
                                        <p
                                          className="text-[#1EEF32] text-xs text-center"
                                          translate="no"
                                        >
                                          {timeRemaining}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div
                                  onClick={() => handleupgrade()}
                                  className="text-sm uppercase font-medium mt-2 flex justify-between items-center bg-[#04132F] rounded-xl w-full py-3 px-3 "
                                >
                                  <div className="flex items-center gap-3">
                                    <p
                                      className=" text-white/50"
                                      translate="no"
                                    >
                                      {t('farming.lv', { level: getLevel(
                                        FarmingStatus?.startTime,
                                        FarmingStatus?.endTime
                                      ) || 0 })}
                                    </p>
                                    <p className="  ">{t('farming.upgrade')}</p>
                                  </div>
                                  
                                  <div className=" bg-gradient-to-b from-[#1AE348] to-[#0368C0]  rounded-full p-[0.5px]">
                                    <div className=" bg-[#005c32] rounded-full py-1 px-2 ">
                                      <p className="text-[#1EEF32] text-xs text-center">
                                        {t('buttons.upgrade')}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  onClick={() => {
                                    if (sub_status !== "active") {
                                      handleSubscribe();
                                      return;
                                    }
                                    navigate(
                                      "/FarmingWeb?source=dashboard"
                                    );
                                  }}
                                  className=" rounded-2xl w-full h-8 relative mt-3"
                                  style={{
                                    backgroundImage:
                                      "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                                  }}
                                >
                                  <div className="h-8 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                                  <div className="h-8 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                                  <div className=" bg-[#070e3a4b] backdrop-blur-sm h-8 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                                  <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                                    <p
                                      className="uppercase font-medium text-center font-zendots text-xs"
                                      style={{
                                        color: "transparent",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        backgroundImage:
                                          "linear-gradient(to right, #0285FF, #1EEF32)",
                                      }}
                                    >
                                      {t('farming.start')}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <img
                            loading="lazy"
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                            className="w-[300px] h-[300px] absolute top-2 -right-24 "
                          />
                          <div className=" z-30 absolute -right-5 -bottom-12 bg-[#06122F] w-44 h-28 rounded-full blur-md "></div>
                        </div>
                      </div>
                    </div> */}
                    {/* TAP TO LEARN */}
                    <div
                      onClick={() => {
                        if (sub_status !== "active") {
                          handleSubscribe();
                          return;
                        }
                        // playSound();
                        // if (isBgm) {
                        //   playBgmSound();
                        // }
                        localStorage.setItem(
                          "previousRoute",
                          "/UserDashboardWeb"
                        );
                        localStorage.setItem("gameTriggered", "true");
                        navigate("/TaptoLearnWeb");
                      }}
                      className="w-full cursor-pointer overflow-hidden "
                    >
                      <div className="relative w-screen md:w-full mx-auto h-[17.5rem] flex justify-center items-center">
                        {/* Loader */}
                        {loading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
                            <FontAwesomeIcon
                              icon={faSpinner}
                              className="animate-spin text-white text-3xl"
                            />
                          </div>
                        )}
                        {/* Video */}
                        <video
                          key={selectedVideo} // Force re-render on video change
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-screen md:w-full mx-auto object-contain object-center z-40"
                          onCanPlayThrough={() => setLoading(false)}
                        >
                          <source src={selectedVideo} type="video/mp4" />
                        </video>
                      </div>
                      {/* <video                        
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-screen object-contain object-center z-40 h-[18.5rem]"
                        onCanPlayThrough={() => setLoading(false)}
                      >
                        <source src={selectedVideo} type="video/mp4" />
                      </video> */}
                    </div>
                  </Slider>
                  <div className=" z-0 -translate-y-10 ">
                    <img
                      loading="lazy"
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/dashboard.png"
                      className="w-screen h-full"
                    />
                  </div>
                </div>

              
                    <div className="relative mt-3">
                      <div className="z-30">
                        <p className=" font-zendots topfeatures font-medium uppercase ">
                          {t('features.title')}
                        </p>
                        <Slider
                          className="w-full h-32 mt-2 z-50 spin refbonus skillquest "
                          {...settings}
                          ref={(slider) => {
                            sliderRef = slider;
                          }}
                        >
                          {/* <div
                            onClick={handleSpinwheel}
                            className=" px-1  h-28 w-36 z-50 cursor-pointer "
                          >
                            <div className=" bg-[#22532B] w-full h-full rounded-xl p-2 relative overflow-hidden ">
                              <div className="z-30">
                                <p className="text-sm font-medium  text-white z-50">
                                  {t('features.spinToWin')}
                                </p>
                              </div>
                              <div className="">
                                <img
                                  loading="lazy"
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/spin1.svg"
                                  className=" absolute bottom-0 left-0 "
                                />
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  className="text-[#00c75d] rotate-45 absolute bottom-3 right-3 "
                                />
                              </div>
                              <div className="z-[-1]">
                                <div className=" bg-[#28EE3E]/70 rounded-full w-24 h-24 blur-xl absolute -top-10 -right-8 z-[-1] "></div>
                                <div className=" bg-[#28EE3E]/40 rounded-full w-14 h-14 blur-xl absolute -bottom-5 -right-5 z-[-1]"></div>
                                <div className=" bg-[#28EE3E]/30 rounded-full w-24 h-24 blur-xl absolute -bottom-8 -left-8  z-[-1]"></div>
                              </div>
                            </div>
                          </div> */}

                          <div
                            onClick={() => {
                              if (sub_status !== "active") {
                                handleSubscribe();
                                return;
                              }
                              if (
                                assessmentDays.length <= 0 ||
                                assessmentDays[0].status === "Completed"
                              ) {
                                return toast.error(t('toasters.comeBackTomorrow'));
                              }
                              if (assessmentDays[0].status === "Available") {
                                navigate(
                                  `/AISkillQuestWeb?day=${assessmentDays[0]?.day}`
                                );
                              }
                            }}
                            className="px-3 h-28  w-36 cursor-pointer "
                          >
                            <div className=" bg-[#4056AE] w-full h-full rounded-xl p-2 relative overflow-hidden ">
                              <p className="text-sm font-medium z-20 text-white">
                                {t('features.aiSkillQuest')}
                              </p>
                              <div className="">
                                <img
                                  loading="lazy"
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/AISkill2.svg"
                                  className=" absolute bottom-0 left-0 "
                                />
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  className="text-[#5d76d9] rotate-45 absolute bottom-3 right-3 "
                                />
                              </div>
                              <div className="z-0">
                                <div className=" bg-[#28EE3E]/70 mix-blend-overlay rounded-full w-24 h-24 blur-xl absolute -top-10 -right-8 "></div>
                                <div className=" bg-[#4056AE]/40 mix-blend-overlay rounded-full w-14 h-14 blur-xl absolute -bottom-5 -right-5"></div>
                                <div className=" bg-[#4056AE]/30 mix-blend-overlay rounded-full w-24 h-24 blur-xl absolute -bottom-8 -left-8 "></div>
                              </div>
                            </div>
                          </div>

                          <div className="px-3  h-28 w-36">
                            <div
                              onClick={() => navigate("/InvitescreenWeb")}
                              className=" cursor-pointer bg-[#22532B] w-full h-full rounded-xl p-2 relative overflow-hidden  "
                            >
                              <p className="text-sm font-medium z-10">
                                {t('features.referralBonus')}
                              </p>
                              <div className="">
                                <img
                                  loading="lazy"
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/people.svg"
                                  className=" absolute bottom-0 left-0 "
                                />
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  className="text-[#00c75d] rotate-45 absolute bottom-3 right-3 "
                                />
                              </div>
                              <div className="z-0">
                                <div className=" bg-[#28EE3E]/70 rounded-full w-24 h-24 blur-xl absolute -top-10 -right-8 "></div>
                                <div className=" bg-[#28EE3E]/40 rounded-full w-14 h-14 blur-xl absolute -bottom-5 -right-5"></div>
                                <div className=" bg-[#28EE3E]/30 rounded-full w-24 h-24 blur-xl absolute -bottom-8 -left-8 "></div>
                              </div>
                            </div>
                          </div>

                          <div
                            onClick={() => navigate("/MyRewardsWeb")}
                            className=" cursor-pointer px-3 h-28 w-36"
                          >
                            <div className=" bg-[#4056AE] w-full h-full rounded-xl p-2 relative overflow-hidden  ">
                              <p className="text-sm font-medium z-10">
                                {t('features.walletConnect')}
                              </p>
                              <div className="">
                                <img
                                  loading="lazy"
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/wallet.svg"
                                  className=" absolute bottom-0 left-0 "
                                />
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  className="text-[#5d76d9] rotate-45 absolute bottom-3 right-3 "
                                />
                              </div>
                              <div className="z-0">
                                <div className=" bg-[#28EE3E]/70 mix-blend-overlay rounded-full w-24 h-24 blur-xl absolute -top-10 -right-8 "></div>
                                <div className=" bg-[#4056AE]/40 mix-blend-overlay rounded-full w-14 h-14 blur-xl absolute -bottom-5 -right-5"></div>
                                <div className=" bg-[#4056AE]/30 mix-blend-overlay rounded-full w-24 h-24 blur-xl absolute -bottom-8 -left-8 "></div>
                              </div>
                            </div>
                          </div>
                        </Slider>
                        <div className="range">
                          <input
                            onChange={handleSliderChange}
                            value={slideIndex}
                            type="range"
                            min={0}
                            max={5}
                            className=" custom-range w-full "
                            style={{ backgroundColor: "#FFFFFF20" }}
                          />
                        </div>
                      </div>
                      <div className="absolute -right-1 top-8 h-28 w-24 bg-gradient-to-r from-[#05081C00] via-[#05081C91] to-[#05081C] "></div>
                    </div>
                  </div>
              
            )}
          </div>
        )}
      </div>
    
    </DashboardLayout>
  );
};

export default UserDashboardWeb;
