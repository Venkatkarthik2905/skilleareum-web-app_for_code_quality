import React, { useEffect, useState } from "react";
import { faArrowLeft, faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "../../../../../../config";
import DoYouKnowWeb from "./DoYouKnowWeb";
import DashboardLayout from "../../Layout/DashboardLayout";
import BoostFinalWeb from "./Boost/BoostFinalWeb";

const AiFarmingWeb = ({ onClose, Dashboard,handleRefresh, setisUpgraded }) => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const [FarmingStatus, setFarmingStatus] = useState(null);
  const [randomQuestion, setrandomQuestion] = useState(null);
  const userData = useSelector((state) => state.user_email);
  const authToken = useSelector((state) => state.token);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState("");
  const [totalDuration, setTotalDuration] = useState("");
  const [earnedCoins, setEarnedCoins] = useState(0); // New state for earned coins
  const [isLoading, setIsLoading] = useState(false);
  const [bonuspopup, setBonusPopup] = useState(false);
  const [isBoostApplied, setisBoostApplied] = useState(false);
  const [showpopup, setShowPopup] = useState(false);
  // const { playSound } = useSettings();

  const handlebonuspopup = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setBonusPopup(!bonuspopup);
    // navigate("/Farming/Boost");
  };
  const level = {
    1: 1,
    2: 2,
    4: 3,
    6: 4,
    8: 5,
    12: 6,
    24: 7,
  };

  // const onBack = () => {
  //   if (navigator.vibrate) {
  //     navigator.vibrate(100);
  //   }
  //   navigate("/Farming/Farming");
  // };

  useEffect(() => {
    const updateProgressAndTime = () => {
      if (!FarmingStatus) return;

      const now = new Date().getTime();
      const end = new Date(FarmingStatus.endTime).getTime();
      const start = new Date(FarmingStatus.startTime).getTime();
      const total = end - start;
      const elapsed = now - start;

      if (end <= now) {
        setProgress(100);
        setElapsedTime(formatTime(total));
        setTotalDuration(formatTime(total));
        calculateCoins(total, total);
      } else if (start >= now) {
        setProgress(0);
        setElapsedTime(formatTime(0));
        setTotalDuration(formatTime(total));
        calculateCoins(0, total);
      } else {
        const percentage = (elapsed / total) * 100;
        setProgress(percentage);
        setElapsedTime(formatTime(elapsed));
        setTotalDuration(formatTime(total));
        calculateCoins(elapsed, total);
      }
    };

    const calculateCoins = (elapsed, total) => {
      const baseSkillPoints = FarmingStatus.boost
        ? FarmingStatus.outputPerHour
        : 10; // Assume default output per hour is 10 if no booster
      const coinsEarned = (baseSkillPoints * elapsed) / (1000 * 60 * 60); // Coins based on hours elapsed
      setEarnedCoins(coinsEarned.toFixed(2)); // Use toFixed to show decimal points
    };

    const formatTime = (milliseconds) => {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (totalSeconds % 60).toString().padStart(2, "0");
      return `${hours}.${minutes}.${seconds}`;
    };

    updateProgressAndTime(); // Initial call
    const intervalId = setInterval(updateProgressAndTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [FarmingStatus]);

  const getFarmingStatus = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/farming/getFarmingStatus?userId=${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("AI farming", data);
      setFarmingStatus(data);
    } catch (error) {
      console.error("Error fetching farming status", error);
    }
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
      // toast.success("New Farming Started");
      // window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    //  console.log(error);
    }
  };
  const handleClaim = async (ans) => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    if (ans != randomQuestion?.answer) {
      toast.error(t('farming.status.wrongAnswer'));
      handleQuestionClose();
      return;
    }

    setIsLoading(true); // Start loading
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
        // handleRefresh()
        toast.success(t('farming.status.claimed'));
        setShowPopup(false);
        setTimeout(() => {
          getFarmingStatus();
          // if (setisUpgraded) {
          //   setisUpgraded();
          // }
          toast.dismiss();
        }, 1000);
      }
    } catch (error) {
    //  console.log(error);
      toast.error(t('aiFarming.errors.failedToClaim')); // Show error message if needed
    } finally {
      setIsLoading(false); // End loading
    }
  };
  const handleQuestionClose = () => {
    setShowPopup(!showpopup);
  };
  const handleShow = async () => {
    // playSound();
    try {
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

  useEffect(() => {
    getFarmingStatus();
  }, [isBoostApplied]);

  return (
    <DashboardLayout>
    <div className="w-full h-screen relative text-white font-poppins mt-28 ">
  
     
      {bonuspopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg z-50 ">
            <BoostFinalWeb
              reload={getFarmingStatus}
              setisBoostApplied={setisBoostApplied}
              onClose={handlebonuspopup}
            />
          </div>
        </div>
      )}

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

     
       
        <div className="w-full h-full max-w-md mx-auto relative z-10 pt-5 ">
          <div className=" h-full flex flex-col justify-between ">
            <div>
              <div className="flex justify-center items-center">
                <div
                  onClick={() => {
                    if (navigator.vibrate) {
                      navigator.vibrate(100);
                    }
                    navigate(-1);
                    // playSound();
                    // if (Dashboard) {
                      // onClose();
                    // } else {
                    //   onBack();
                    // }
                  }}
                  className=" cursor-pointer absolute -left-14 top-5 "
                >
                  <FontAwesomeIcon icon={faArrowLeftLong} className="text-lg font-bold" />
                </div>
                {/* <p className="text-center text-lg font-medium font-zendots w-[80%] ">
                  AI Farming
                </p> */}
              </div>
              <div className="w-[85%] md:pt-5 pt-10 md:w-[100%] mx-auto ">
                <div className="w-full flex justify-between items-center">
                  <p className="font-semibold">{t('aiFarming.level')} </p>
                  <p
                    style={{
                      fontWeight: 700,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      backgroundImage:
                        "linear-gradient(to right, #0285FF,#1EEF32)",
                    }}
                    className="text-white font-semibold"
                  >
                    {elapsedTime || "00.00.00"} / {totalDuration || "00.00.00"}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-1 mt-3 relative">
                  <div
                    className="bg-gradient-to-r from-[#0285FF] to-[#17C969] p-4 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                  <div className="w-8 h-8 absolute top-1 rounded-full flex justify-center items-center bg-gradient-to-r from-[#0285FF] to-[#1EEF32]">
                    <div className="bg-white w-7 h-7 rounded-full flex justify-center items-center">
                      <p
                        style={{
                          fontWeight: 700,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                          backgroundImage:
                            "linear-gradient(to bottom, #0285FF,#1EEF32)",
                        }}
                      >
                        {(FarmingStatus && level[FarmingStatus.duration]) || 1}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0.5 w-full flex justify-end">
                    <img
                      src="../assets/coin3.svg"
                      className="w-10"
                      alt="coin"
                    />
                  </div>
                </div>
                <div className="py-5">
                  <div className="flex justify-between items-center">
                    <div
                      onClick={handlebonuspopup}
                      className="flex flex-col items-center"
                    >
                      <div className="flex items-center">
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Boost.gif"
                          className="w-9 h-9"
                          alt="rocket"
                        />
                        <p className="font-bold">
                          {(FarmingStatus && FarmingStatus.boost) || 0}x
                        </p>
                      </div>

                      {FarmingStatus && !FarmingStatus.isNewUser && (
                        <p className=" cursor-pointer font-bold">{t('aiFarming.boost')}</p>
                      )}
                    </div>
                    <div className="flex items-center pr-5">
                      <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                        alt="coin"
                        className="w-10 h-10"
                      />
                      <p className="text-2xl font-bold mt-1 pl-2">
                        {earnedCoins.toString().padStart(5, "0")}
                      </p>
                    </div>
                    <div className="">
                      {/* <p className="text-xs font-semibold text-[#080B1C]">i</p> */}
                    </div>
                  </div>
                </div>

                {FarmingStatus &&
                  new Date(FarmingStatus.endTime) < new Date() && (
                    <div
                      onClick={handleShow}
                      className={`w-32 py-2 mx-auto bg-gradient-to-r from-[#0285FF] to-[#17C969] rounded-xl ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <p className="text-sm font-semibold text-center">
                        {isLoading ? t('aiFarming.claiming') : t('aiFarming.claim')}
                      </p>
                    </div>
                  )}
              </div>
            </div>

            <div className="w-full relative">
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/farm.png"
                className="w-full h-full "
                alt="farm"
              />
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                className="absolute top-[44%] left-[42%] w-7 h-7 "
                alt="coin"
              ></img>
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                className="absolute top-[46%] left-[51%] w-8 h-8 "
                alt="coin"
              ></img>
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                className="absolute top-[48%] right-[5%] w-9 h-9 "
                alt="coin"
              ></img>
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                className="absolute top-[60%] left-[22%] w-8 h-8 "
                alt="coin"
              ></img>
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                className="absolute top-[73%] left-[3%] w-8 h-8 "
                alt="coin"
              ></img>
            </div>
          </div>
        </div>
      </div>
      
     
  </DashboardLayout>
  );
};

export default AiFarmingWeb;
