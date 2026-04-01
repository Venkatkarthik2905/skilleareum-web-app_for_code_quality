import {
  faArrowLeft,
  faArrowLeftLong,
  faCheck,
  faCheckCircle,
  faLock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "../../../../../../../config";

const BoostFinalWeb = ({
  onClose,
  setisBoostApplied,
  setisUpgraded,
  reload,
}) => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  // const { playSound } = useSettings();
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.user_email);
  const authToken = useSelector((state) => state.token);
  const [showPopup, setShowPopup] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [boostProgress, setBoostProgress] = useState(0);
  const [cardId, setCardId] = useState(null);
  const [FarmingStatus, setFarmingStatus] = useState(null);

  const [boostData, setBoostData] = useState({
    left: "0x",
    right: "1x",
    leftpoint: 10,
    rightpoint: 25,
  });
  const handlepopup = (boostId) => {
    if (FarmingStatus && FarmingStatus.boost >= boostId) {
      return;
    }
    setShowPopup(true);
    setCardId(boostId);
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
  const ApplyBoost = async (card) => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/farming/booster?userId=${userData.id}&boosterId=${cardId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success(data.message);
      setTimeout(() => {
        startFarming();
        if (reload) {
          reload();
          setisBoostApplied(true);
        }
        if (setisUpgraded) {
          setisUpgraded();
        }
        getFarmingStatus();
        onClose();
      }, 2000);
      handleClose();
    } catch (error) {
      toast.error(error.response.data.message);
      setTimeout(() => {
        toast.dismiss();
        setShowPopup(false);
      }, 1000);
     // console.log(error);
    }
  };
  const handleClose = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setShowPopup(false);
  };
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

      setFarmingStatus(data);

      updateBoostData(data.boost);
    } catch (error) {
      console.error("Error fetching farming status", error);
    }
  };
  const updateBoostData = (boost) => {
    let newBoostData;

    switch (boost) {
      case 1:
        newBoostData = {
          left: "1x",
          right: "2x",
          leftpoint: 25,
          rightpoint: 50,
        };
        break;
      case 2:
        newBoostData = {
          left: "2x",
          right: "3x",
          leftpoint: 50,
          rightpoint: 75,
        };
        break;
      case 3:
        newBoostData = {
          left: "3x",
          right: "4x",
          leftpoint: 75,
          rightpoint: 100,
        };
        break;
      case 4:
        newBoostData = {
          left: "3x",
          right: "4x",
          leftpoint: 75,
          rightpoint: 100,
        };
        break;
      default:
        newBoostData = {
          left: "0x",
          right: "1x",
          leftpoint: 10,
          rightpoint: 25,
        };
        break;
    }

    setBoostData(newBoostData);
  };
  const getBoostExpiration = async () => {
    try {
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

          // Set the calculated progress
          setBoostProgress(Math.max(0, Math.min(100, progress)));

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
    getFarmingStatus();
    getBoostExpiration();
  }, []);

  return (
    <div className="">
      <div className="bg-[#01000A]  relative bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins">
        <div
          className=" bg-cover bg-center h-screen overflow-hidden overflow-y-auto  "
          style={{ backgroundImage: "url(/assets/WebApp/stars.svg)" }}
        >
          <div
            className=" h-screen w-full overflow-hidden overflow-y-auto "
            style={{
              background:
                "radial-gradient(378.88% 129.46% at 50% -1.69%, rgba(19, 36, 128, 0) 5.86%, rgba(10, 18, 64, 0.626421) 11.28%, #04071A 24.38%, rgba(4, 8, 29, 0.974934) 60.44%, rgba(4, 7, 26, 0.85) 68.06%, rgba(10, 18, 64, 0.626421) 80.94%, rgba(19, 36, 128, 0) 89.04%)",
            }}
          >
            
            <div className="relative">
              <div className="w-full z-10 absolute top-0 py-5 min-h-screen">
                <div className="flex justify-center items-center">
                  <div
                    onClick={() => {
                      if (navigator.vibrate) {
                        navigator.vibrate(100);
                      }
                      // playSound();
                      onClose();
                    }}
                    className="cursor-pointer absolute top-5 left-5 "
                  >
                    <FontAwesomeIcon icon={faArrowLeftLong} className="text-lg font-bold" />
                  </div>
                 
                </div>
                <div className="">
                  <p
                    className="text-center font-medium uppercase font-zendots "
                    // style={{
                    //   backgroundClip: "text",
                    //   color: "transparent",
                    //   WebkitBackgroundClip: "text",
                    //   backgroundImage:
                    //     "linear-gradient( to right, #0285FF, #1EEF32 )",
                    // }}
                  >
                    {t('boost.title')}
                  </p>
                </div>
                <div className="h-[43%] w-[5%] sm:w-[10%] flex justify-center items-center absolute right-0">
                  <div className="w-full h-[0.5px] border-[#0285FF] border border-dashed -rotate-12   "></div>
                </div>
                <div className="mt-20 w-[95%] mx-auto flex justify-center items-center ">
                  <div
                    onClick={() => {
                      if (navigator.vibrate) {
                        navigator.vibrate(100);
                      }
                      // playSound();
                      setCardId(1);
                      // ApplyBoost(1);
                      handlepopup(1);
                    }}
                    className={`w-[40%] sm:w-[30%]  ${
                      FarmingStatus && FarmingStatus.boost > 1 && "opacity-50"
                    } `}
                  >
                    <div className="relative ">
                      {/* <img
                    src={
                      FarmingStatus && FarmingStatus.boost === 1
                        ? `https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Rectangle166.png`
                        : "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Rectangle166+(1).png"
                    }
                    className="h-[12rem] "
                  /> */}
                      <div className="w-[100%] h-[11.5rem] -skew-y-6 bg-gradient-to-b from-[#1AE348] to-[#0368C0] p-[0.9px] rounded-xl flex flex-col justify-center items-center gap-2">
                        <div className=" bg-gradient-to-b from-[#0b0245] from-80% to-black/90 w-full h-full rounded-xl relative ">
                          <div
                            className="w-full h-full rounded-xl"
                            style={{
                              background:
                                FarmingStatus && FarmingStatus.boost >= 1
                                  ? "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 30.97%, rgba(48, 62, 138, 0) 100%)"
                                  : "",
                              backdropFilter:
                                FarmingStatus && FarmingStatus.boost >= 1
                                  ? "blur(15px)"
                                  : "",
                            }}
                          >
                            <div className="skew-y-6 h-full rounded-xl">
                              <div className="absolute rounded-xl top-0.5 right-1 flex justify-center items-center ">
                                <div className=" ">
                                  {FarmingStatus && FarmingStatus.boost >= 1 ? (
                                    <div className=" relative ">
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                        className=" w-7 h-7 "
                                        alt="music"
                                      />
                                      <div className=" w-4 h-4 bg-[#1FEA32] opacity-25 blur-sm absolute top-1 left-1.5 "></div>
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        size="sm"
                                        className="text-[#1FEA32] absolute top-1.5 left-2 "
                                      />
                                    </div>
                                  ) : (
                                    <div className=" relative ">
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                        className=" w-7 h-7 "
                                        alt="music"
                                      />
                                      <div className=" w-4 h-4 bg-[#1FEA32] opacity-25 blur-sm absolute top-1 left-1.5 "></div>
                                      <FontAwesomeIcon
                                        icon={faLock}
                                        size="sm"
                                        className="text-[#1FEA32] absolute top-1.5 left-2 "
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="pt-5">
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                  className="w-14 mx-auto"
                                  alt="coin"
                                />
                              </div>
                              <p
                                style={{ textShadow: "2px 3px 2px #00000040" }}
                                className="text-2xl text-[#FFE500] text-center font-bold"
                              >
                                1000
                              </p>
                              <div
                                style={{ textShadow: "2px 3px 2px #00000040" }}
                                className="w-[80%] mx-auto my-1 font-semibold text-center text-sm"
                              >
                                {FarmingStatus && FarmingStatus.boost === 1 ? (
                                  <div>
                                    {t('boost.expiresIn')}
                                    <p>{timeRemaining}</p>
                                  </div>
                                ) : (
                                  t('boost.pointsPerHour', { points: 25 })
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[10%] h-[0.5px] border-[#0285FF] border border-dashed -rotate-12 "></div>
                  <div
                    className="w-5 h-5 bg-[#0285FF] rotate-[85deg] -translate-y-[7.5px]"
                    style={{ clipPath: "polygon(51% 48%, 20% 100%, 82% 100%)" }}
                  ></div>
                  <div
                    onClick={() => {
                      if (navigator.vibrate) {
                        navigator.vibrate(100);
                      }
                      // playSound();
                      setCardId(2);
                      // ApplyBoost(2);
                      handlepopup(2);
                    }}
                    className={`w-[40%] sm:w-[30%] -translate-y-7 ${
                      FarmingStatus && FarmingStatus.boost > 2 && "opacity-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-[100%] h-[11.5rem] -skew-y-6 bg-gradient-to-b from-[#1AE348] to-[#0368C0] p-[0.9px] rounded-xl flex flex-col justify-center items-center gap-2">
                        <div className=" w-full h-full bg-gradient-to-b from-[#0b0245] from-80% to-black/90  rounded-xl relative ">
                          <div
                            className="w-full h-full rounded-xl"
                            style={{
                              background:
                                FarmingStatus && FarmingStatus.boost >= 2
                                  ? "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 30.97%, rgba(48, 62, 138, 0) 100%)"
                                  : "",
                              backdropFilter:
                                FarmingStatus && FarmingStatus.boost >= 2
                                  ? "blur(15px)"
                                  : "",
                            }}
                          >
                            <div className="skew-y-6 h-full">
                              <div className="absolute top-0.5 right-1 flex justify-center items-center ">
                                <div className=" ">
                                  {FarmingStatus && FarmingStatus.boost >= 2 ? (
                                    <div className=" relative ">
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                        className=" w-7 h-7 "
                                        alt="music"
                                      />
                                      <div className=" w-4 h-4 bg-[#1FEA32] opacity-25 blur-sm absolute top-1 left-1.5 "></div>
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        size="sm"
                                        className="text-[#1FEA32] absolute top-1.5 left-2 "
                                      />
                                    </div>
                                  ) : (
                                    <div className=" relative ">
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                        className=" w-7 h-7 "
                                        alt="music"
                                      />
                                      <div className=" w-4 h-4 bg-[#1FEA32] opacity-25 blur-sm absolute top-1 left-1.5 "></div>
                                      <FontAwesomeIcon
                                        icon={faLock}
                                        size="sm"
                                        className="text-[#1FEA32] absolute top-1.5 left-2 "
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="pt-5">
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                  className="w-14 mx-auto"
                                  alt="coin"
                                />
                              </div>
                              <p
                                style={{ textShadow: "2px 3px 2px #00000040" }}
                                className="text-2xl text-[#FFE500] text-center font-bold"
                              >
                                2500
                              </p>
                              <div
                                style={{ textShadow: "2px 3px 2px #00000040" }}
                                className="w-[80%] mx-auto my-1 font-semibold text-center text-sm"
                              >
                                {FarmingStatus && FarmingStatus.boost === 2 ? (
                                  <div>
                                    {t('boost.expiresIn')}
                                    <p>{timeRemaining}</p>
                                  </div>
                                ) : (
                                  t('boost.pointsPerHour', { points: 50 })
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="flex justify-center items-center ">
                      <div className=" ">
                        {FarmingStatus && FarmingStatus.boost >= 2 ? (
                          <FontAwesomeIcon icon={faCheckCircle} />
                        ) : (
                          <FontAwesomeIcon icon={faLock} />
                        )}
                      </div>
                    </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[43%] w-[5%] sm:w-[10%] flex justify-center items-center  absolute left-0">
                  <div className="w-full h-[0.5px] border-[#0285FF] border border-dashed -rotate-12   "></div>
                </div>

                <div className="mt-5 w-[95%] mx-auto flex justify-center items-center ">
                  <div
                    onClick={() => {
                      if (navigator.vibrate) {
                        navigator.vibrate(100);
                      }
                      // playSound();
                      setCardId(3);
                      // ApplyBoost(3);
                      handlepopup(3);
                    }}
                    className={`w-[40%] sm:w-[30%]  ${
                      FarmingStatus && FarmingStatus.boost > 3 && "opacity-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-[100%] h-[11.5rem] -skew-y-6 bg-gradient-to-b from-[#1AE348] to-[#0368C0] p-[0.9px] rounded-xl flex flex-col justify-center items-center gap-2">
                        <div className=" w-full h-full bg-gradient-to-b from-[#0b0245] from-80% to-black/90  rounded-xl relative ">
                          <div
                            className="w-full h-full rounded-xl"
                            style={{
                              background:
                                FarmingStatus && FarmingStatus.boost >= 3
                                  ? "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 30.97%, rgba(48, 62, 138, 0) 100%)"
                                  : "",
                              backdropFilter:
                                FarmingStatus && FarmingStatus.boost >= 3
                                  ? "blur(15px)"
                                  : "",
                            }}
                          >
                            <div className="skew-y-6 h-full">
                              <div className="absolute top-0.5 right-1 flex justify-center items-center ">
                                <div className=" ">
                                  {FarmingStatus && FarmingStatus.boost >= 3 ? (
                                    <div className=" relative ">
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                        className=" w-7 h-7 "
                                        alt="music"
                                      />
                                      <div className=" w-4 h-4 bg-[#1FEA32] opacity-25 blur-sm absolute top-1 left-1.5 "></div>
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        size="sm"
                                        className="text-[#1FEA32] absolute top-1.5 left-2 "
                                      />
                                    </div>
                                  ) : (
                                    <div className=" relative ">
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                        className=" w-7 h-7 "
                                        alt="music"
                                      />
                                      <div className=" w-4 h-4 bg-[#1FEA32] opacity-25 blur-sm absolute top-1 left-1.5 "></div>
                                      <FontAwesomeIcon
                                        icon={faLock}
                                        size="sm"
                                        className="text-[#1FEA32] absolute top-1.5 left-2 "
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="pt-5">
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                  className="w-14 mx-auto"
                                  alt="coin"
                                />
                              </div>
                              <p
                                style={{ textShadow: "2px 3px 2px #00000040" }}
                                className="text-2xl text-[#FFE500] text-center font-bold"
                              >
                                5000
                              </p>
                              <div
                                style={{ textShadow: "2px 3px 2px #00000040" }}
                                className="w-[80%] mx-auto my-1 font-semibold text-center text-sm"
                              >
                                {FarmingStatus && FarmingStatus.boost === 3 ? (
                                  <div>
                                    {t('boost.expiresIn')}
                                    <p>{timeRemaining}</p>
                                  </div>
                                ) : (
                                  t('boost.pointsPerHour', { points: 75 })
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="flex justify-center items-center ">
                      <div className=" ">
                        {FarmingStatus && FarmingStatus.boost >= 2 ? (
                          <FontAwesomeIcon icon={faCheckCircle} />
                        ) : (
                          <FontAwesomeIcon icon={faLock} />
                        )}
                      </div>
                    </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="w-[10%] h-[0.5px] border-[#0285FF] border border-dashed -rotate-12 "></div>
                  <div className="w-3 h-3 bg-[#0285FF] -translate-y-[7px] rounded-full "></div>
                  <div
                    onClick={() => {
                      if (navigator.vibrate) {
                        navigator.vibrate(100);
                      }
                      // playSound();
                      setCardId(4);
                      // ApplyBoost(4);
                      handlepopup(4);
                    }}
                    className={`w-[40%] sm:w-[30%] -translate-y-7 ${
                      FarmingStatus && FarmingStatus.boost == 6 && "opacity-50"
                    } `}
                  >
                    <div className="relative">
                      <div className="w-[100%] h-[11.5rem] -skew-y-6 bg-gradient-to-b from-[#1AE348] to-[#0368C0] p-[0.9px] rounded-xl flex flex-col justify-center items-center gap-2">
                        <div className=" w-full h-full bg-gradient-to-b from-[#0b0245] from-80% to-black/90  rounded-xl relative ">
                          <div
                            className="w-full h-full rounded-xl"
                            style={{
                              background:
                                FarmingStatus && FarmingStatus.boost >= 4
                                  ? "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 30.97%, rgba(48, 62, 138, 0) 100%)"
                                  : "",
                              backdropFilter:
                                FarmingStatus && FarmingStatus.boost >= 4
                                  ? "blur(15px)"
                                  : "",
                            }}
                          >
                            <div className="skew-y-6 h-full">
                              <div className="absolute top-0.5 right-1 flex justify-center items-center ">
                                <div className=" ">
                                  {FarmingStatus && FarmingStatus.boost == 4 ? (
                                    <div className=" relative ">
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                        className=" w-7 h-7 "
                                        alt="music"
                                      />
                                      <div className=" w-4 h-4 bg-[#1FEA32] opacity-25 blur-sm absolute top-1 left-1.5 "></div>
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        size="sm"
                                        className="text-[#1FEA32] absolute top-1.5 left-2 "
                                      />
                                    </div>
                                  ) : (
                                    <div className=" relative ">
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                        className=" w-7 h-7 "
                                        alt="music"
                                      />
                                      <div className=" w-4 h-4 bg-[#1FEA32] opacity-25 blur-sm absolute top-1 left-1.5 "></div>
                                      <FontAwesomeIcon
                                        icon={faLock}
                                        size="sm"
                                        className="text-[#1FEA32] absolute top-1.5 left-2 "
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="pt-5">
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                  className="w-14 mx-auto"
                                  alt="coin"
                                />
                              </div>
                              <p
                                style={{ textShadow: "2px 3px 2px #00000040" }}
                                className="text-2xl text-[#FFE500] text-center font-bold"
                              >
                                10000
                              </p>
                              <div
                                style={{ textShadow: "2px 3px 2px #00000040" }}
                                className="w-[80%] mx-auto my-1 font-semibold text-center text-sm"
                              >
                                {FarmingStatus && FarmingStatus.boost === 4 ? (
                                  <div>
                                    {t('boost.expiresIn')}
                                    <p>{timeRemaining}</p>
                                  </div>
                                ) : (
                                  t('boost.pointsPerHour', { points: 100 })
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="flex justify-center items-center ">
                      <div className=" ">
                        {FarmingStatus && FarmingStatus.boost >= 2 ? (
                          <FontAwesomeIcon icon={faCheckCircle} />
                        ) : (
                          <FontAwesomeIcon icon={faLock} />
                        )}
                      </div>
                    </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {showPopup && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-0.5 rounded-xl relative w-[90%] mx-auto max-w-md">
                      <div className="bg-[#080B1C] p-5 rounded-xl">
                        <p className="text-center text-lg font-semibold">
                          {t('boost.confirmTitle')}
                        </p>
                        <div className="flex justify-center items-center gap-5 mt-5">
                          <button
                            onClick={() => {
                              if (navigator.vibrate) {
                                navigator.vibrate(100);
                              }
                              // playSound();
                              ApplyBoost();
                            }}
                            className="bg-gradient-to-b from-[#0285FF] to-[#1EEF32] px-5 py-2 rounded-lg text-sm font-semibold"
                          >
                            {t('boost.yes')}
                          </button>
                          <button
                            onClick={handleClose}
                            className="bg-gradient-to-b from-[#0285FF] to-[#1EEF32] px-5 py-2 rounded-lg text-sm font-semibold"
                          >
                            {t('boost.no')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostFinalWeb;
