import {
  faArrowLeftLong,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../../../../config";
import IslandLoader from "../7DayPilot/Loaders/IslandLoader";
import DashboardLayout from "../../Layout/DashboardLayout";
import { useTranslation } from "react-i18next";

const ChallengeMap_30Days = () => {
  const { t } = useTranslation("dashboard");
  const totalDays = 30;
  const navigate = useNavigate();
  const [completedDays, setcompletedDays] = useState([1]);
  const [dayData, setDayData] = useState(null);
  const [currDay, setcurrDay] = useState(null);
  const [aiexplorer, setAiExplorer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [otherDays, setotherDays] = useState(false);
  // const { playSound } = useSettings();
  const authToken = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user_email.id);
  // console.log("currDay", currDay);
  const [isprofileopen, setIsProfileOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const userData = useSelector((state) => state.user_email);
  const sub_status = useSelector((state) => state.user_email.sub_status);

  const debouncedFetchData = debounce(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${SERVER_URL}/api/getUserCurrentDay?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const { lastCompletedDay, currentDayToWorkOn, maxUnlockedDay } = response.data;
      setcurrDay(currentDayToWorkOn);
      setDayData(response.data);

      const hasSeenPopupThisSession =
        sessionStorage.getItem("hasSeenDailyPopup");

      if (!hasSeenPopupThisSession) {
        const timer = setTimeout(() => {
          if (currentDayToWorkOn === 1) {
            setAiExplorer(true);
            localStorage.setItem("hasSeenAIExplorer", "true");
          } else {
            setotherDays(true);
          }
          sessionStorage.setItem("hasSeenDailyPopup", "true");
        }, 2000);

        return () => clearTimeout(timer);
      }

      for (let i = 0; i <= lastCompletedDay; i++) {
        completedDays.push(i);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user data:", error);
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

  return (
    <DashboardLayout>
    <div>
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center ">
          <IslandLoader />
        </div>
      )}
      <div className=" relative bg-cover text-white mt-24 ">        
            <div className="relative max-w-sm  mx-auto ">
              <div className="w-full z-10 absolute top-0 pt-1 pb-5 h-screen overflow-hidden overflow-y-auto">
                {/* {isprofileopen && (
                  <div className="w-full fixed inset-0 z-50 bg-black bg-opacity-50">
                    <Profile onClose={() => setIsProfileOpen(false)} />
                  </div>
                )}
                <div className="w-full flex justify-center items-center gap-2 relative">
                  <img
                    loading="lazy"
                    alt="challenge map"
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif"
                    className="w-12 h-12"
                  />
                  <p
                    className="uppercase font-semibold text-xs font-zendots"
                    style={{
                      color: "transparent",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      backgroundImage:
                        "linear-gradient(to right, #00E0FF, #061FA1)",
                    }}
                  >
                    Skilleareum.Ai
                  </p>
                </div>
                <div
                  onClick={() => {
                    if (navigator.vibrate) {
                      navigator.vibrate(100);
                    }
                    // playSound();
                    navigate("/Profile");
                  }}
                  className=" absolute top-3 right-3 cursor-pointer"
                >
                  <div className="border w-9 h-9 pt-1 overflow-hidden rounded-full ">
                    <img
                      loading="lazy"
                      src={
                        avatar ||
                        "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png"
                      }
                      alt="Avatar"
                      className=""
                    />
                  </div>
                </div> */}

                <div className="text-center mt-6 px-4">
                  <h2 className="text-sm font-medium tracking-widest leading-7 font-zendots ">
                    {t("challengeMap.welcomeTo")}{" "}
                    <span
                      style={{
                        color: "transparent",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        backgroundImage:
                          "linear-gradient(to right, #0285FF, #1EEF32)",
                      }}
                      className=""
                    >
                      AI GENESIS
                    </span>{" "}
                    {t("challengeMap.hereIsYour")}{" "}
                    <span className="text-[#1EEF32]">{t("challengeMap.thirtyDaysChallenge")}</span>
                  </h2>
                </div>

                {/* <div className="flex justify-center items-center mt-4 relative pr-10">
                  <div className=" relative mx-3 rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-[1.5px] ">
                    <div className=" bg-[#04041b] flex items-center rounded-full pr-2 py-[0.5px] ">
                      <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                        alt="coin"
                        className=" w-6 "
                      />
                      <p className="w-full pl-3 text-right text-[#1EEF32] text-sm font-medium ">
                        {dayData?.balance ?? 0}
                      </p>
                    </div>
                  </div>
                  <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                    className="h-24"
                    alt="Robot"
                  />
                </div> */}

                <div className="relative px-4 pb-36 ">
                  {/* <div className="absolute right-3 -top-14 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32] p-0.5 ">
        <div className=" bg-[#04041b] flex items-center rounded-full py-[0.5px] ">
         <button className=" text-white px-2 py-1 rounded-full text-[10px] font-medium shadow-md">
          Start Your Journey
        </button> 
        </div>
        </div> */}

                  <div
                    className=" grid grid-cols-3 -translate-y-10 gap-5 mt-20 "
                    style={{ direction: "rtl" }}
                  >
                    {[...Array(totalDays)].map((_, i) => (
                      <div
                        key={i + 1}
                        className={`flex justify-center ${
                          i % 3 === 0
                            ? "translate-y-0"
                            : i % 3 === 1
                            ? "translate-y-10 translate-x-3"
                            : "translate-x-6 translate-y-[85px]"
                        }`}
                      >
                        <div className="relative">
                          {completedDays.includes(i + 1) && (
                            <div className="absolute -top-6 left-12 transform -translate-x-1/2 flex gap-1">
                              <img
                                src="../assets/New/Taskstars.svg"
                                className=" scale-150 "
                              />
                            </div>
                          )}

                          <div
                            onClick={() => {
                              if (navigator.vibrate) navigator.vibrate(100);
                              const maxGenesisUnlocked = (dayData?.maxUnlockedDay || 7) - 7;
                              if (i + 1 > maxGenesisUnlocked) return;
                              // playSound();
                              navigate(`/TaskListWeb?day=${i + 1}`);
                            }}
                            className="cursor-pointer rounded-2xl shadow-lg w-24 h-24 flex items-center justify-center font-bold relative"
                          >
                            <img src="../assets/New/checkpoint.svg" />
                            <div className="absolute top-7">
                              {i + 1 <= ((dayData?.maxUnlockedDay || 7) - 7) ? (
                                <p
                                  style={{
                                    textShadow: "2px 2px 2px #00000090",
                                    fontSize: "26px",
                                  }}
                                  className="text-white"
                                >
                                  {i + 1}
                                </p>
                              ) : (
                                <img
                                  src="../assets/New/Tasklock.svg"
                                  className="scale-[0.8]"
                                />
                              )}
                            </div>
                          </div>

                          <img
                            src="../assets/New/Line.svg"
                            className={`rotate-6 absolute ${
                              i % 3 === 0
                                ? "-bottom-8 -left-10"
                                : i % 3 === 1
                                ? "-bottom-8 -left-10"
                                : "-bottom-8 -left-10"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </DashboardLayout>
  );
};

export default ChallengeMap_30Days;
