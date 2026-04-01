import {
  faArrowLeftLong,
  faBell,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import axios from "axios";
import "../../Styles/Style.css";
import { useSelector } from "react-redux";
import DashboardLayout from "../../Layout/DashboardLayout";
// import { useSettings } from "../../Components/VolumeSettings/SettingsContext";
import IslandLoader from "./Loaders/IslandLoader";
import { SERVER_URL } from "../../../../../../config";
import Day2IntroWeb from "./Day2IntroWeb";
import AIExplorerWeb from "./AIExplorerWeb";
import { useTranslation } from "react-i18next";

const ChallengeMap_7Days = () => {
  const { t } = useTranslation("dashboard");
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.token);
  const [completedDays, setcompletedDays] = useState([]);
  const [dayData, setDayData] = useState(null);
  const [usersData, setusersData] = useState(null);
  const [currDay, setcurrDay] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [aiexplorer, setAiExplorer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [otherDays, setotherDays] = useState(false);
  const [isTodayCompleted, setisTodayCompleted] = useState(false);
  // const { playSound } = null;
  const userId = useSelector((state) => state.user_email?.id);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [avatar, setAvatar] = useState("");
  const userData = useSelector((state) => state.user_email);
  const sub_status = useSelector((state) => state.user_email?.sub_status);

  const tiles = [
    {
      id: 2,
      bottom: "27%",
      left: "47%",
      width: "36px",
      height: "36px",
      text: "22px",
      shadowBottom: "26%",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/map_01.png",
    },
    {
      id: 3,
      top: "52%",
      left: "68.5%",
      width: "30px",
      height: "30px",
      text: "18px",
      shadowTop: "58%",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/map_02.png",
    },
    {
      id: 5,
      top: "19%",
      left: "69%",
      width: "26px",
      height: "26px",
      text: "13px",
      shadowTop: "24%",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/map_04.png",
    },
    {
      id: 4,
      top: "32%",
      left: "72%",
      width: "28px",
      height: "28px",
      text: "15px",
      shadowTop: "38%",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/map_03.png",
    },
    {
      id: 6,
      top: "15%",
      left: "49%",
      width: "23px",
      height: "23px",
      text: "13px",
      shadowTop: "19%",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/map_05.png",
    },
    {
      id: 7,
      top: "18%",
      left: "38.5%",
      width: "25px",
      height: "25px",
      text: "14px",
      shadowTop: "23%",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/map_06.png",
    },
    {
      id: 1,
      top: "50%",
      left: "21%",
      width: "28px",
      height: "28px",
      text: "16px",
      shadowTop: "55.5%",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/map_00.png",
    },
  ];

  const [currentTile, setcurrentTile] = useState(null);

  const debouncedFetchData = debounce(async () => {
    try {
      setLoading(true);
      if (userId) {
        const response = await axios.get(
          `${SERVER_URL}/api/getUserCurrentDay?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const { lastCompletedDay, currentDayToWorkOn, isTodayCompleted } =
          response.data;
        setcurrDay(currentDayToWorkOn);
        setcurrentTile(
          tiles.find((tile) => tile.id === (currentDayToWorkOn ?? 1))
        );

        setDayData(response.data);
        setisTodayCompleted(isTodayCompleted);

        // ✅ Set completedDays here
        const dayDone = [];
        for (let i = 0; i <= lastCompletedDay; i++) {
          dayDone.push(i);
        }
        console.log("daydone", dayDone)
        setcompletedDays(dayDone);
      }

      // Show popup
      const hasSeenPopupThisSession =
        sessionStorage.getItem("hasSeenDailyPopup");
      if (!hasSeenPopupThisSession) {
        const timer = setTimeout(() => {
          if (currDay === 1) {
            setAiExplorer(true);
            localStorage.setItem("hasSeenAIExplorer", "true");
          } else {
            setotherDays(true);
          }
          sessionStorage.setItem("hasSeenDailyPopup", "true");
        }, 2000);

        return () => clearTimeout(timer);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, 1000);

  useEffect(() => {
    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel();
    };
  }, []);

  useEffect(() => {
    if (!dayData) return;

    const { lastCompletedDay, current_program } = dayData;
    const { apprentice_completed, genesis_completed } = dayData;

    if (apprentice_completed === 1 && genesis_completed === 0 ) {
      navigate("/ChallengePathWeb");
      return;
    }

 
    if (lastCompletedDay === 7) {
      const hasSeenBadge = localStorage.getItem("hasSeenAIExplorerBadge");

      if (!hasSeenBadge) {
        // Mark as seen so subsequent logins (same device) skip the badge
        localStorage.setItem("hasSeenAIExplorerBadge", "true");
        navigate("/AIExplorerbadgeWeb");
      } else {
        navigate("/ChallengePathWeb");
      }
      return;
    }

    // RULE 3: Normal apprentice user, days 1–6 — stay on this page.
  }, [dayData, navigate]);

  const mascotPositions = {
    1: { top: "26%", left: "-3%" },
    2: { bottom: "16%", left: "38%" },
    3: { top: "27%", left: "56%" },
    4: { top: "8%", left: "63%" },
    5: { top: "-5.5%", left: "58%" },
    6: { top: "-10%", left: "36%" },
    7: { top: "-6%", left: "14%" },
  };

  const getMascotStyle = (tileId) => {
    return mascotPositions[tileId] || {};
  };

  const dayMessages = useMemo(() => ({
    1: {
      title: t("challengeMap.dayMessages.1.title"),
      message: t("challengeMap.dayMessages.1.message"),
      cta: t("challengeMap.dayMessages.1.cta"),
    },
    2: {
      title: t("challengeMap.dayMessages.2.title"),
      message: t("challengeMap.dayMessages.2.message"),
      cta: t("challengeMap.dayMessages.2.cta"),
    },
    3: {
      title: t("challengeMap.dayMessages.3.title"),
      message: t("challengeMap.dayMessages.3.message"),
      cta: t("challengeMap.dayMessages.3.cta"),
    },
    4: {
      title: t("challengeMap.dayMessages.4.title"),
      message: t("challengeMap.dayMessages.4.message"),
      cta: t("challengeMap.dayMessages.4.cta"),
    },
    5: {
      title: t("challengeMap.dayMessages.5.title"),
      message: t("challengeMap.dayMessages.5.message"),
      cta: t("challengeMap.dayMessages.5.cta"),
    },
    6: {
      title: t("challengeMap.dayMessages.6.title"),
      message: t("challengeMap.dayMessages.6.message"),
      cta: t("challengeMap.dayMessages.6.cta"),
    },
    7: {
      title: t("challengeMap.dayMessages.7.title"),
      message: t("challengeMap.dayMessages.7.message"),
      cta: t("challengeMap.dayMessages.7.cta"),
    },
  }), [t]);

  const data = dayMessages[currDay || 1];

  // const getTimeLeftToNextUnlock = () => {
  //   if (!dayData || !dayData.lastCompletedTime) return { hours: 0, minutes: 0, seconds: 0 };
    
  //   // Convert UTC lastCompletedTime to local Date object
  //   const lastCompletedUTC = new Date(dayData.lastCompletedTime);
    
  //   // Add 10 minutes to the completion time
  //   const nextUnlockTime = new Date(lastCompletedUTC.getTime() + 10 * 60 * 1000);
  //   const now = new Date();
    
  //   const diffMs = nextUnlockTime - now;
    
  //   if (diffMs <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    
  //   const hours = Math.floor(diffMs / 1000 / 60 / 60);
  //   const minutes = Math.floor((diffMs / 1000 / 60) % 60);
  //   const seconds = Math.floor((diffMs / 1000) % 60);
  //   return { hours, minutes, seconds };
  // };

  // useEffect(() => {
  //   const updateTime = () => {
  //     setTimeLeft(getTimeLeftToNextUnlock());
  //   };

  //   if (dayData && dayData.lastCompletedTime) {
  //     updateTime();
  //     const interval = setInterval(updateTime, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [dayData]);





  const getTimeLeftToNextUnlock = () => {
    if (!dayData) return { hours: 0, minutes: 0, seconds: 0 };

    const { unlockIntervalMinutes, nextUnlockTime, lastCompletedTime } = dayData;

    let expiryTime;

    if (unlockIntervalMinutes > 0 && nextUnlockTime) {
      expiryTime = new Date(nextUnlockTime);
    } else {
      // Midnight flow
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      expiryTime = midnight;
    }

    const now = new Date();
    const diffMs = expiryTime - now;

    if (diffMs <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    const hours = Math.floor(diffMs / 1000 / 60 / 60);
    const minutes = Math.floor((diffMs / 1000 / 60) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    return { hours, minutes, seconds };
  };

  useEffect(() => {
    const updateTime = () => {
      setTimeLeft(getTimeLeftToNextUnlock());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [dayData]);


  return (
    <DashboardLayout>
      <div className=" relative h-full mt-16 scale-90 ">
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center ">
            <IslandLoader />
          </div>
        )}
        <div className="relative bg-cover h-full overflow-hidden overflow-y-auto text-white font-poppins">
          <div className="relative max-w-xl mx-auto ">
            <div className=" w-full flex flex-col justify-center items-center mx-auto ">
              <div className=" w-[390px] h-[390px] sm:w-[400px]  sm:h-[400px]">
                <div className="w-full h-full mx-auto relative translate-y-5 ">
                  <img
                    src={
                      (currentTile && currentTile?.img) ||
                      "https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/map_01.png"
                    }
                    alt="challenge map"
                    className=" w-full h-full mx-auto z-0 glow-animation "
                  />

                  {tiles.map((tile) => (
                    <div
                      key={tile.id}
                      className="w-full h-full absolute top-0 "
                    >
                      <div className="flex items-center gap-2  ">
                        <div className="">
                          {tile.id === 7 && (
                            <img
                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/flag-pole.svg"
                              alt="challenge map"
                              className="w-14 mx-auto absolute z-0"
                              style={{ top: "12%", left: "27%" }}
                            />
                          )}
                        </div>

                        <div className="group">
                          <div
                            onClick={() => {
                              if (navigator.vibrate) navigator.vibrate(100);
                              // playSound();
                              if (tile.id <= dayData?.maxUnlockedDay) {
                                navigate(`/ChallengeMapWeb?day=${tile.id}`);
                              } else {
                                if (!showTooltip) {
                                  setShowTooltip(true);
                                  const timeout = setTimeout(
                                    () => setShowTooltip(false),
                                    3000
                                  );
                                  return () => clearTimeout(timeout);
                                }
                                return;
                              }
                            }}
                            className="z-10 cursor-pointer absolute rounded-lg text-white font-semibold flex items-center justify-center bg-cover bg-no-repeat bg-center font-gilroy"
                            style={{
                              top: tile.top,
                              bottom: tile.bottom,
                              left: tile.left,
                              width: tile.width,
                              height: tile.height,
                              fontSize: tile.text,
                              backgroundImage:
                                "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/newuserbg.svg)",
                            }}
                          >
                            {completedDays.length > 0 &&
                            completedDays.includes(tile.id) ? (
                              <img
                                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/checkmark.svg"
                                alt="Tick"
                              />
                            ) : (
                              tile.id
                            )}
                          </div>
                          <div
                            className="absolute z-20 bg-black/80 rounded-full blur-sm"
                            style={{
                              top: tile.shadowTop,
                              bottom: tile.shadowBottom,
                              left:
                                typeof tile.left === "number"
                                  ? tile.left + 4
                                  : `calc(${tile.left} - 1%)`,
                              width:
                                typeof tile.width === "number"
                                  ? tile.top + 4
                                  : `calc(${tile.width} + 6px)`,
                              height: "12px",
                            }}
                          />
                          <div>
                            {(isTodayCompleted
                              ? currDay + 1 === tile.id
                              : currDay === tile.id) && (
                              <div
                                className=" absolute flex flex-col justify-center items-center "
                                style={getMascotStyle(tile.id)}
                              >
                                {showTooltip && (
                                  <div
                                    className="absolute whitespace-nowrap top-3 left-1/2 -translate-x-20 
        bg-blue-500/30 text-white text-xs px-3 py-1 rounded 
        transition-opacity duration-200 pointer-events-none z-50 backdrop-blur-sm"
                                  >
                                    {t("challengeMap.unlocksIn")}{" "}
                                    {String(timeLeft.hours).padStart(2, "0")}:
                                    {String(timeLeft.minutes).padStart(2, "0")}:
                                    {String(timeLeft.seconds).padStart(2, "0")}
                                  </div>
                                )}
                                <div className="relative">
                                  <div className="">
                                    <svg
                                      width="172"
                                      height="176"
                                      viewBox="0 0 172 176"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g filter="url(#filter0_f_3001_881)">
                                        <path
                                          d="M133.013 132.742C118.634 146.889 111.381 137.243 84.6966 137.243C58.012 137.243 42.1323 148.175 36.3799 132.742C30.6275 117.309 42.1318 35 84.6965 35C120.934 35 147.393 118.595 133.013 132.742Z"
                                          fill="black"
                                          fill-opacity="0.75"
                                        />
                                      </g>
                                      <g filter="url(#filter1_f_3001_881)">
                                        <path
                                          d="M116.42 129.378C107.116 140.722 102.423 132.988 85.1566 132.988C67.8901 132.988 57.615 141.754 53.8929 129.378C50.1707 117.003 57.6147 51 85.1566 51C108.605 51 125.725 118.034 116.42 129.378Z"
                                          fill="#0AA6C0"
                                        />
                                      </g>
                                      <g filter="url(#filter2_f_3001_881)">
                                        <path
                                          d="M85.1055 50.5C90.0821 50.5 95.23 54.1348 100.146 60.876C104.985 67.5101 109.177 76.5968 112.337 86.1836C115.492 95.7551 117.567 105.671 118.252 113.884C118.594 117.993 118.583 121.606 118.213 124.501C117.833 127.472 117.116 129.36 116.324 130.334C113.995 133.201 112.134 134.633 110.497 135.346C108.903 136.039 107.27 136.161 105.139 135.914C102.853 135.649 100.496 135.048 97.0762 134.42C93.785 133.816 89.8814 133.275 85.1055 133.275C80.3142 133.275 76.0336 133.889 72.3018 134.575C68.4506 135.283 65.4975 135.997 62.8281 136.331C60.1978 136.661 58.5421 136.503 57.3848 135.893C56.3981 135.372 55.3594 134.291 54.5098 131.729L54.3428 131.197C53.9428 129.855 53.642 127.559 53.5391 124.419C53.4378 121.328 53.5322 117.573 53.8477 113.398C54.4789 105.046 55.9859 95.1244 58.5078 85.6289C61.0381 76.102 64.5466 67.1729 69.0938 60.6826C73.6426 54.19 78.9507 50.5 85.1055 50.5Z"
                                          stroke="#1EEF32"
                                          stroke-opacity="0.85"
                                          stroke-width="5"
                                        />
                                      </g>
                                      <defs>
                                        <filter
                                          id="filter0_f_3001_881"
                                          x="0"
                                          y="0"
                                          width="172"
                                          height="176"
                                          filterUnits="userSpaceOnUse"
                                          color-interpolation-filters="sRGB"
                                        >
                                          <feFlood
                                            flood-opacity="0"
                                            result="BackgroundImageFix"
                                          />
                                          <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                          />
                                          <feGaussianBlur
                                            stdDeviation="17.5"
                                            result="effect1_foregroundBlur_3001_881"
                                          />
                                        </filter>
                                        <filter
                                          id="filter1_f_3001_881"
                                          x="43"
                                          y="41"
                                          width="86"
                                          height="105"
                                          filterUnits="userSpaceOnUse"
                                          color-interpolation-filters="sRGB"
                                        >
                                          <feFlood
                                            flood-opacity="0"
                                            result="BackgroundImageFix"
                                          />
                                          <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                          />
                                          <feGaussianBlur
                                            stdDeviation="5"
                                            result="effect1_foregroundBlur_3001_881"
                                          />
                                        </filter>
                                        <filter
                                          id="filter2_f_3001_881"
                                          x="41"
                                          y="38"
                                          width="90"
                                          height="111"
                                          filterUnits="userSpaceOnUse"
                                          color-interpolation-filters="sRGB"
                                        >
                                          <feFlood
                                            flood-opacity="0"
                                            result="BackgroundImageFix"
                                          />
                                          <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                          />
                                          <feGaussianBlur
                                            stdDeviation="5"
                                            result="effect1_foregroundBlur_3001_881"
                                          />
                                        </filter>
                                      </defs>
                                    </svg>
                                  </div>
                                  <img
                                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                                    alt="mascot"
                                    // title={isTodayCompleted ? "Task completed for today!" : ""}
                                    className="w-[100px] mx-auto absolute top-9 -left-2 right-0 z-0 "
                                  />
                                  <div className=" bg-black/80 absolute bottom-10 left-0 right-0 z-30 blur-sm h-3.5 w-14 rounded-full mx-auto " />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex justify-center items-center gap-2  ">
                {/* <div className=" w-[40%] "> 
<img
  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
  alt="robot"
  className=" "
/>
</div> */}
                <div className="w-[95%] mx-auto mt-5 max-w-md text-center text-sm font-zendots z-10">
                  {completedDays.includes(7) ? (
                    <div
                      onClick={() => navigate("/AIExplorerbadgeWeb")}
                      className=" cursor-pointer rounded-2xl w-[70%] mx-auto h-10 relative"
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
                          className="uppercase text-sm font-medium text-center font-zendots"
                          style={{
                            color: "transparent",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            backgroundImage:
                              "linear-gradient(to right, #0285FF, #1EEF32)",
                          }}
                        >
                          {t("challengeMap.claimBadge")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className=" flex items-center ">
                      <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                        className="h-32 mx-auto"
                        alt="Robot"
                      />
                      <div className="font-zendots uppercase tracking-widest text-center text-white -translate-x-5 ">
                        {isTodayCompleted ? (
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <p className="text-[#A8FFB1] text-xs leading-relaxed lowercase" style={{ letterSpacing: "0.1em" }}>
                               {t("challengeMap.activitiesCompleted")}
                            </p>
                            <button className="px-5 py-2 bg-gradient-to-r from-[#1EEF32] to-[#0285FF] rounded-full text-white text-xs font-bold shadow-lg shadow-[#1EEF32]/20 hover:scale-105 transition-transform">
                              {t("challengeMap.seeYouTomorrow")}
                            </button>
                          </div>
                        ) : currDay && (
                          <div>
                            <p
                              className=" text-xs "
                              style={{ letterSpacing: "0.2em" }}
                            >
                              {dayMessages[currDay].title}
                            </p>
                            <p className="text-[#A8FFB1] text-2xl mt-1 mb-1">{`${t("dashboard:dailyReward.day", { day: currDay })}`}</p>
                            <hr className="w-[90%] mx-auto border border-[#1AE348] my-2" />
                            <p
                              className="text-xs"
                              style={{ letterSpacing: "0.2em" }}
                            >
                              {dayMessages[currDay].message}
                            </p>
                            <p
                              className="text-[#A8FFB1] text-xs tracking-widest mt-1"
                              style={{ letterSpacing: "0.2em" }}
                            >
                              {dayMessages[currDay].cta}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {aiexplorer && (
              <div className=" z-50 transition-all ease-in-out duration-300">
                <AIExplorerWeb onClose={() => setAiExplorer(false)} />
              </div>
            )}

            {otherDays && (
              <div className=" z-50 transition-all ease-in-out duration-300">
                <Day2IntroWeb
                  currDay={currDay}
                  onClose={() => setotherDays(false)}
                />
              </div>
            )}
          </div>
          {/* <div className="z-20 ">
          <svg
            width="1440"
            height="136"
            viewBox="0 0 1440 136"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M703.5 0.5C932.514 0.5 1139.82 36.6466 1289.86 95.0703C1364.88 124.283 1425.56 159.055 1467.48 197.642C1509.39 236.228 1532.5 278.59 1532.5 323C1532.5 367.41 1509.39 409.772 1467.48 448.358C1425.56 486.945 1364.88 521.717 1289.86 550.93C1139.82 609.353 932.514 645.5 703.5 645.5C474.486 645.5 267.175 609.353 117.137 550.93C42.1157 521.717 -18.5622 486.945 -60.4756 448.358C-102.388 409.772 -125.5 367.41 -125.5 323C-125.5 278.59 -102.388 236.228 -60.4756 197.642C-18.5622 159.055 42.1157 124.283 117.137 95.0703C267.175 36.6466 474.486 0.5 703.5 0.5Z"
              fill="#020013"
              stroke="url(#paint0_linear_816_817)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_816_817"
                x1="703.5"
                y1="0"
                x2="703.5"
                y2="139.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#283C86" />
                <stop offset="1" stop-color="#1D2E6D" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChallengeMap_7Days;
