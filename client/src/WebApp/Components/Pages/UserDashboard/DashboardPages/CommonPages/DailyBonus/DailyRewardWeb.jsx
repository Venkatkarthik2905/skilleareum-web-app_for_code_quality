import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "../../../../../../../config";
import DashboardLayout from "../../../Layout/DashboardLayout";

const DailyRewardWeb = ({ onClose }) => {
  const { t } = useTranslation('dashboard');
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const userData = useSelector((state) => state.user_email);
  const [isAirDropClaimed, setisAirDropClaimed] = useState(false);
  const [streakDay, setStreakDay] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [marked, setMarked] = useState();
  const [showConfetti, setShowConfetti] = useState(false);
  // const { playSound } = useSettings();
  const [dailybonusclaimed, setDailyBonusClaimed] = useState(false);
  const [showNextClaimDate, setShowNextClaimDate] = useState(null); // Track which card's date is shown
  const [showNextClaimDate2, setShowNextClaimDate2] = useState(
    isAirDropClaimed ? streakDay : streakDay + 1
  );

  // Helper function to format date (next claim day)
  const getNextClaimDate = (dayOffset) => {
    let date = dayOffset;
    if (!isAirDropClaimed) {
      date = date - 1;
    }
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + date);
    return nextDate.toLocaleDateString();
  };

  const updateStreaks = async () => {
    const { data } = await axios.get(
      `${SERVER_URL}/api/air_drop_streak?userId=${userData?.id}&streakDay=${
        streakDay + 1
      }`,
      {
        userId: userData.id,
      }
    );
    if (data.success === false) {
      setMarked(streakDay);
    } else if (data.success === true && data.streak > 7) {
      return;
    } else {
      setDailyBonusClaimed(true);
      setTimeout(() => {
        setDailyBonusClaimed(false);
      }, 3000);
      toast.success(t('dailyReward.toastClaimed', { day: streakDay + 1 }));
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      setMarked(streakDay + 1);
      setTimeout(() => {
        setisAirDropClaimed(true);
        if (source === "ChallengeMapWeb") {
          navigate("/ChallengeMapWeb");
        } else if (source === "TaskListWeb") {
          navigate("/TaskListWeb");
        } else {
          onClose();
        }
      }, 3000);
    }
  };

  const handleCardClick = (day) => {
    if (day === streakDay + 1 && !claimed) {
      setClaimed(true);
      updateStreaks(); // Call the update function only on click
    }

    // Show next claim date on click
    setShowNextClaimDate(day);
    setTimeout(() => {
      setShowNextClaimDate(null); // Auto-hide after 3 seconds
    }, 3000);
  };

  const days = [
    { day: 1, airdrops: 10 },
    { day: 2, airdrops: 25 },
    { day: 3, airdrops: 50 },
    { day: 4, airdrops: 100 },
    { day: 5, airdrops: 175 },
    { day: 6, airdrops: 300 },
  ];
  const getRewardDetails = async () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/air_drop_streak?userId=${userData.id}&flag=${1}`,
        {
          userId: userData.id,
        }
      );
    //  console.log(data);

      setStreakDay(data.streak);
    } catch (error) {
      console.error(error);
    }
  };
  const checkIsRewardClaimed = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/air_drop_streak?userId=${userData.id}&flag=${1}`,
        {
          userId: userData.id,
        }
      );

      if (!data.success) {
        setisAirDropClaimed(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRewardDetails();
    checkIsRewardClaimed();
  }, []);
  
  const handleClose = () => {
    if (source === "ChallengeMapWeb") {
      navigate("/ChallengeMapWeb");
    } else {
      // onClose();
      navigate(-1);
    }
  };
  return (
    <DashboardLayout>
    <div className=" h-full text-white font-poppins mt-20 pb-16 translate-y-12 z-10 relative ">
      {/* {dailybonusclaimed && (
        <div className="z-50 fixed inset-0 bg-black/60">
          <div>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Daily_Streak_New_2.gif" className="w-4/12 ml-auto object-contain" />
          </div>
        </div>
      )} */}
      {showConfetti && (
        <div>
          <div className="fixed inset-0 z-50 w-full">
            <img
              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/Confeti.gif"
              alt="coin shower"
              className="h-screen w-full max-w-3xl mx-auto object-cover  "
            />
          </div>
        </div>
      )}
        <div className="w-[95%] max-w-lg relative mx-auto z-10 ">
      
            <div
              className=" absolute top-0 left-0 "
              onClick={() => {
                // playSound();
                handleClose();
              }}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} className="text-lg cursor-pointer " />
             
            </div>
          

          <div>
            <p className="text-center font-semibold md:text-lg ">
              {t('dailyReward.title')}
            </p>
            <div className="w-full max-w-md mx-auto mt-10 ">
              <div className="grid grid-cols-3 gap-2">
                {days.map(({ day, airdrops }) => (
                  <div
                    key={day}
                    className={`bg-gradient-to-r from-[#005DBB] to-[#17C969] rounded-xl p-0.5
      ${day > showNextClaimDate2 ? "" : ""}`} // Fade out days greater than today's streak day
                  >
                    <div
                      key={day}
                      className={`w-full h-full mx-auto flex flex-col relative p-3 rounded-xl cursor-pointer ${
                        streakDay >= day || marked === day
                          ? "bg-gradient-to-b from-[#10BA98] to-[#0285FF]"
                          : "bg-[#080B1C]"
                      } ${
                        isAirDropClaimed
                          ? day === streakDay
                          : day === streakDay + 1 && !claimed
                          ? "brightness-100"
                          : " brightness-50 "
                      }`}
                      onClick={() => {
                        // playSound();
                        handleCardClick(day);
                      }}
                    >
                      <p className="text-center font-semibold text-sm">
                        {t('dailyReward.day', { day })}
                      </p>
                      <div className="flex justify-center items-center">
                        <div className="bg-transparent border border-[#005DBB] rounded-full w-10 h-10 mt-2 flex justify-center items-center">
                          {streakDay >= day || marked === day ? (
                            <img
                              src="../assets/Group 1000015895.png"
                              className="w-6 h-6"
                              alt="Claimed Icon"
                            />
                          ) : (
                            <img
                              src="../assets/Group 1000015158.png"
                              className="w-6 h-6"
                              alt="Unclaimed Icon"
                            />
                          )}
                        </div>
                      </div>
                      <p className="text-center text-xs font-semibold pt-1">
                        {streakDay >= day || marked === day ? `${t('dailyReward.claimed')} ` : ""}
                        {airdrops} {t('dailyReward.skillPoints')}
                      </p>
                      {/* Show Next Claim Date only when clicked */}
                      {showNextClaimDate === day && (
                        <p className="text-center text-xs font-light mt-1">
                          {streakDay >= day || marked === day
                            ? t('dailyReward.claimedOn', { date: getNextClaimDate(day - streakDay) })
                            : t('dailyReward.availableOn', { date: getNextClaimDate(day - streakDay) })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={`mt-5 bg-gradient-to-r from-[#005DBB] to-[#17C969] rounded-xl p-0.5
  ${7 > showNextClaimDate2 ? " " : ""}`} // Apply fading for Day 7 if streakDay is less than 7
              >
                <div
                  className={`w-[100%] relative p-2 gap-5 rounded-xl cursor-pointer ${
                    streakDay >= 7 || marked >= 7
                      ? "bg-gradient-to-b from-[#10BA98] to-[#0285FF]"
                      : "bg-[#080B1C]"
                  } ${
                    isAirDropClaimed
                      ? 7 === streakDay
                      : 7 === streakDay + 1 && !claimed
                      ? "brightness-100"
                      : "brightness-50"
                  }`}
                  onClick={() => {
                    // playSound();
                    handleCardClick(7);
                  }}
                >
                  <div className="flex flex-row justify-center items-center gap-3">
                    <div className="w-[20%]">
                      <p className="text-center font-semibold text-sm">{t('dailyReward.day', { day: 7 })}</p>
                      <div className="flex justify-center items-center mt-2">
                        <div className="bg-transparent border border-[#005DBB] rounded-full w-10 h-10 flex justify-center items-center">
                          {streakDay >= 7 || marked >= 7 ? (
                            <img
                              src="../assets/Group 1000015895.png"
                              className="w-6 h-6"
                              alt="Claimed Icon"
                            />
                          ) : (
                            <img
                              src="../assets/Group 1000015158.png"
                              className="w-6 h-6"
                              alt="Unclaimed Icon"
                            />
                          )}
                        </div>
                      </div>
                      <p className="text-center text-xs font-semibold mt-1">
                        {streakDay >= 7 || marked >= 7
                          ? `${t('dailyReward.claimed')} 1000 ${t('dailyReward.skillPoints')}`
                          : ""}
                      </p>
                    </div>
                    <div className="w-[80%] flex flex-col items-center">
                      <p className="whitespace-nowrap text-xs font-semibold">
                        500 {t('dailyReward.skillPoints')}
                      </p>
                      <p className="text-xs font-semibold">+</p>
                      <p className="text-xs font-semibold">500 {t('dailyReward.skillPoints')}</p>
                      <p className="text-xs text-center font-semibold mt-2">
                        {t('dailyReward.consecutiveBonus')}
                      </p>
                      {showNextClaimDate === 7 && (
                        <p className="text-center text-xs font-light mt-1">
                          {t('dailyReward.availableOn', { date: getNextClaimDate(7 - streakDay) })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Claim Button below the Day 7 card */}
              <div className="mt-5">
                {isAirDropClaimed && (
                  <div className="bg-gradient-to-r from-[#005DBB] to-[#17C969] rounded-lg shadow-lg p-0.5">
                    <div className="bg-[#080B1C] p-2 rounded-lg flex justify-center items-center  ">
                      <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Smile_GIF.gif"
                        className="w-20 h-20"
                        alt="mascot"
                      />
                      <p className="w-[70%] text-sm text-center text-white font-semibold">
                        {t('dailyReward.tomorrowMessage')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
    </DashboardLayout>
  );
};

export default DailyRewardWeb;
