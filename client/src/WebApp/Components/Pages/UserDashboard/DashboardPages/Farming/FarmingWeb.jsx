import {
  faArrowLeft,
  faArrowLeftLong,
  faArrowUpLong,
  faCrown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { SERVER_URL } from "../../../../../../config";
import DashboardLayout from "../../Layout/DashboardLayout";
import CountdownTimer from "./CountTimerWeb";
import CountdownTimerWeb from "./CountTimerWeb";
import UpgradeWeb from "./UpgradeWeb";
import BoostFinalWeb from "./Boost/BoostFinalWeb";
import AiFarmingWeb from "./AIFarmingWeb";

import { useTranslation } from "react-i18next";

const FarmingWeb = ({ onBack }) => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user_email);
  const authToken = useSelector((state) => state.token);
  const [userDetails, setuserDetails] = useState();
  const [FarmingStatus, setFarmingStatus] = useState();
  const [AiFarmingpopup, setAiFarmingpopup] = useState(false);
  const [isUpgraded, setisUpgraded] = useState(false);
  const [upgradepopup, setUpgradePopup] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);
  // const { playSound } = useSettings();
  const [boostpopup, setBoostPopup] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");

  const startFarming = async () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
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
      setisUpgraded(true);
    } catch (error) {
      toast.error(error.response.data.message);
    //  console.log(error);
    }
  };
  const getUserEarnings = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/farming/getUserEarnings?userId=${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setuserDetails(data);
    } catch (error) {}
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
    } catch (error) {}
  };
  // const navigate = useNavigate();
  const onClose = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    navigate("/Farming/play");
  };

  const handleAiFarming = () => {
    navigate("/AIFarmingWeb");
  };
  const handleupgrade = () => {
    // playSound();

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setUpgradePopup(!upgradepopup);
  };

  const handleboostpopup = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setBoostPopup(!boostpopup);
  };

  const handleRefresh = () => {
    setisUpgraded(!isUpgraded);
  };

  const handleTimerClick = () => {
    // playSound();

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    // navigate("/Farming/AiFarming");
    //setAiFarmingpopup(!AiFarmingpopup);
    navigate("/AIFarmingWeb");
  };

  useEffect(() => {
    toast.dismiss();
    getUserEarnings();
    getFarmingStatus();
  }, []);
  useEffect(() => {
    getFarmingStatus();
  }, [isUpgraded]);
  useEffect(() => {
    toast.dismiss();
    const updateProgressAndTime = () => {
      if (!FarmingStatus) return;

      const now = new Date().getTime();
      const end = new Date(FarmingStatus.endTime).getTime();
      const start = new Date(FarmingStatus.startTime).getTime();
      const total = end - start;
      const elapsed = now - start;

      if (end <= now) {
        calculateCoins(total, total);
      } else if (start >= now) {
        calculateCoins(0, total);
      } else {
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

    updateProgressAndTime(); // Initial call
    const intervalId = setInterval(updateProgressAndTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [FarmingStatus]);

  return (
    <DashboardLayout>
      <div>
        <div className=" w-full  text-white font-poppins scale-90 mt-20">
        

          {/* {AiFarmingpopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-full max-w-lg z-50 ">
                <AiFarmingWeb
                  handleRefresh={handleRefresh}
                  onClose={handleAiFarming}
                />
              </div>
            </div>
          )} */}

          <div className=" relative w-[95%] md:w-[90%] mx-auto md:mx-0 md:ml-auto z-10 px-10 ">
            <div className="flex justify-center items-center">
              <div
                // onClick={() => {playSound(); navigate(-1) }}
                onClick={() => {
                  if (navigator.vibrate) {
                    navigator.vibrate(100);
                  }
                  // playSound();
                  if (source === "UserDashboardWeb") {
                    navigate("/UserDashboardWeb");
                    return;
                  } else if (source === "ChallengeMapWeb") {
                    navigate("/ChallengeMapWeb");
                    return;
                  } else if (source === "TaskListWeb") {
                    navigate("/TaskListWeb");
                  } else {
                    navigate("/DailyBonusWeb");
                  }
                }}
                className="cursor-pointer absolute top-5 left-5  "
              >
                <FontAwesomeIcon
                  icon={faArrowLeftLong}
                  className="text-lg font-bold"
                />
              </div>
              {/* <p className=" font-zendots text-lg font-medium w-[80%] ">
                    Farming
                  </p> */}
            </div>
            <div className="z-10 flex sm:flex-row flex-col items-start w-full mt-16 gap-10 ">
              <div className=" sm:w-1/2 w-full rounded-xl backdrop-blur-sm bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A] to-[#070E3A]/0 bg-[#070E3A] ">
                <div
                  className="w-full h-full backdrop-blur-lg rounded-xl"
                  style={{
                    background:
                      "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                  }}
                >
                  <div className="rounded-xl w-full h-full border-[0.5px] border-[#1AE348]/40 p-2 flex flex-col justify-between">
                    <div className="w-full  justify-center items-center flex flex-col z-10 relative">
                      <div className=" bg-[#1FEA32]/65 w-[110px] h-[110px] rounded-full blur-md ">
                        {" "}
                      </div>
                      <div className="w-24 h-24 absolute top-2 rounded-full flex justify-center items-center bg-black/70  border-4 border-[#1EEF32]/50  ">
                        <div className="w-full h-full pt-3 overflow-hidden bg-gradient-to-t from-[#0285FF] to-[#1EEF32] bg-cover bg-center rounded-full mx-auto flex justify-center items-center">
                          <img
                            src={
                              userData?.avatar
                                ? userData.avatar
                                : "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png"
                            }
                            alt="User Avatar"
                            className="rounded-full w-24 h-24"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-3">
                      <p className="font-bold text-lg">
                        {userData.referral_code}
                      </p>
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="text-[#1EEF32]"
                      />
                    </div>
                    {!FarmingStatus && (
                      <p className="font-semibold text-center mt-1">
                        Status:{" "}
                        <span className="text-[#ef3d1e] text-sm pl-2">
                          Not Activated
                        </span>
                      </p>
                    )}
                    {FarmingStatus &&
                      new Date(FarmingStatus.endTime) > new Date() && (
                        <p className="font-semibold text-center mt-1">
                          Status:{" "}
                          <span className="text-[#1EEF32] text-sm pl-2">
                            Live and Active
                          </span>
                        </p>
                      )}
                    {FarmingStatus &&
                      new Date(FarmingStatus.endTime) < new Date() && (
                        <p className="font-semibold text-center mt-1">
                          Status:{" "}
                          <span className="text-[#FFA500] text-sm pl-2">
                            Ready to Harvest
                          </span>
                        </p>
                      )}
                    <div
                      className="mt-5 flex justify-center items-center"
                      translate="no"
                    >
                      <div className=" px-2 rounded">
                        <p className="text-center font-medium">{t('farming.earned')}</p>
                        <p className="text-[#1EEF32] font-bold text-lg text-center">
                          {`00${userDetails?.farmingBonus || 0}`}
                        </p>
                      </div>
                      <div className="h-12 w-0.5 bg-[#C9C9C9] rounded"></div>
                      <div className=" px-2 rounded">
                        <p className="text-center font-medium">{t('farming.farm')}</p>
                        <p className="text-[#1EEF32] font-bold text-lg text-center">
                          {earnedCoins.toString().padStart(5, "0")}
                        </p>
                      </div>
                    </div>
                    <div className="w-[85%] mx-auto mt-5 ">
                      <p className="text-xs font-medium text-center">
                        Farming happens based on fixed time intervals, upgrade
                        to earn more points.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" sm:w-1/2 w-full z-10 pb-10 md:pb-0 ">
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium font-zendots ">
                    Game options
                  </p>
                  {/* <div className=" bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full w-5 h-5 flex justify-center items-center">
                  <p className="text-xs font-bold text-[#080B1C]">i</p>
                </div> */}
                </div>

                {FarmingStatus && !FarmingStatus.farmingStatus && (
                  <div
                    onClick={startFarming}
                    className="cursor-pointer rounded-xl p-0.5 mt-5"
                    style={{
                      background:
                        "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
                    }}
                  >
                    <div className=" rounded-xl p-1 flex justify-between items-center px-3">
                      <div className="flex items-center gap-2  h-10">
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                          className="w-9"
                        />
                        <div>
                          <p className="font-semibold">{t('farming.startNow')}</p>
                        </div>
                      </div>

                      <div>
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className=" rotate-45 text-[#007842]"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* TIMER */}
                {FarmingStatus && FarmingStatus.farmingStatus && (
                  <div className="cursor-pointer" onClick={handleTimerClick}>
                    <CountdownTimerWeb
                      endTime={FarmingStatus && FarmingStatus.endTime}
                    />

                    <div
                      className="rounded-xl p-0.5 mt-5"
                      style={{
                        background:
                          "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
                      }}
                    >
                      <div className=" rounded-xl flex px-3  justify-between items-center">
                        <div className="flex items-center gap-4 h-12">
                          <img
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                            className="w-9"
                          />
                          <div>
                            <p className="font-semibold">{t('farming.goToFarm')}</p>
                          </div>
                        </div>

                        <div>
                          <FontAwesomeIcon
                            icon={faArrowUpLong}
                            className=" rotate-45 text-[#007842]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {FarmingStatus &&
                  FarmingStatus.farmingStatus &&
                  !FarmingStatus.isNewUser && (
                    <div>
                      <div
                        onClick={handleupgrade}
                        className=" cursor-pointer rounded-xl p-0.5 mt-5"
                        style={{
                          background:
                            "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
                        }}
                      >
                        <div className="rounded-xl px-3 h-12 flex justify-between items-center">
                          <div className="flex justify-center items-center gap-2">
                            <img
                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/Upgrade(1).gif"
                              className="w-12 sm:w-16 h-12"
                            />
                            <div>
                              <p className="font-semibold">{t('farming.upgradeNow')}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-white/50 font-medium">
                              To earn more
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={handleboostpopup}
                        className=" cursor-pointer rounded-xl p-0.5 mt-5"
                        style={{
                          background:
                            "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
                        }}
                      >
                        <div className=" rounded-xl px-3 h-12 flex justify-between items-center">
                          <div className="flex justify-center items-center gap-2">
                            <img
                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/Boost(1).gif"
                              className="w-12 sm:w-16 h-10"
                            />
                            <div>
                              <p className="font-semibold">{t('farming.boostNow')}</p>
                            </div>
                          </div>

                          <div>
                            <FontAwesomeIcon
                              icon={faArrowUpLong}
                              className=" rotate-45 text-[#007842]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        {upgradepopup && (
          <div className="fixed inset-0 w-full z-50 backdrop-blur-md ">
            <div className=" w-full max-w-md mx-auto ">
              <UpgradeWeb
                setisUpgraded={setisUpgraded}
                onClose={handleupgrade}
              />
            </div>
          </div>
        )}

        {boostpopup && (
          <div className="fixed inset-0 w-full z-50 backdrop-blur-md ">
            <div className=" w-full max-w-md mx-auto ">
              <BoostFinalWeb
                setisUpgraded={handleRefresh}
                onClose={handleboostpopup}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FarmingWeb;
