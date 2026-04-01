import React, { useEffect, useState } from "react";
import {
  faArrowLeft,
  faCheck,
  faChevronUp,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSwipeable } from "react-swipeable";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SERVER_URL } from "../../../../../../config";

const UpgradeWeb = ({ onClose, setisUpgraded }) => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  // const { playSound } = useSettings();
  const [isSwipedUp, setIsSwipedUp] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [farmingStatus, setFarmingStatus] = useState(null);
  const userData = useSelector((state) => state.user_email);
  const authToken = useSelector((state) => state.token);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [upgradedata, setUpgradeData] = useState([
    {
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/upgradeclock.png",
      time: "2",
      no: "01",
      amt: "1000",
    },
    {
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/upgradeclock.png",
      time: "4",
      no: "02",
      amt: "2500",
    },
    {
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/upgradeclock.png",
      time: "6",
      no: "03",
      amt: "5000",
    },
    {
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/upgradeclock.png",
      time: "8",
      no: "04",
      amt: "10000",
    },
  ]);

  const data = {
    1: { time: "2 hours", amt: "1000" },
    2: { time: "4 hours", amt: "2500" },
    3: { time: "6 hours", amt: "5000" },
    4: { time: "8 hours", amt: "10000" },
  };

  const handleSwipeUp = () => {
    setIsSwipedUp(true);
    ApplyInterval();
    setTimeout(() => {
      setIsSwipedUp(false);
    }, 1000);
  };
  // const onClose = () => {
  //   navigate("/Farming/Farming");
  // };
  const handleSwipeDown = () => {
    setIsSwipedUp(false);
  };

  const rearrangeUpgradeData = (duration) => {
    // Convert duration to a number to match with the 'time' values
    const targetDuration = Number(duration);

    const equalToDuration = upgradedata.filter(
      (item) => Number(item.time) === targetDuration
    );
    const greaterThanDuration = upgradedata.filter(
      (item) => Number(item.time) > targetDuration
    );
    const lessThanDuration = upgradedata.filter(
      (item) => Number(item.time) < targetDuration
    );

    // Combine arrays so that the item matching the duration comes first
    return [...equalToDuration, ...greaterThanDuration, ...lessThanDuration];
  };
  const handlers = useSwipeable({
    onSwipedUp: handleSwipeUp,
    onSwipedDown: handleSwipeDown,
  });

  const handlepopup = (boostId) => {
    // playSound();
    setShowPopup(true);
  };
  const handleClose = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setShowPopup(false);
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
      // console.log(error);
    }
  };
  const ApplyInterval = async () => {
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/farming/upgrade-burn?userId=${userData.id}&burnId=${farmingStatus.nextIntervalId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      startFarming();

      toast.success(data.message);
      setTimeout(() => {
        toast.dismiss();
        setShowPopup(true);
        setisUpgraded();
        onClose();
      }, 2000);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      setTimeout(() => {
        toast.remove();
        // toast.dismiss(toastId); // Dismiss the toast first
        onClose(); // Add a slight delay to ensure the toast is dismissed before navigating
      }, 2000);
    }
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

      if (data.farmingStatus) {
        setFarmingStatus(data);
        setUpgradeData(rearrangeUpgradeData(data.duration));
      }
    } catch (error) { }
  };

  useEffect(() => {
    getFarmingStatus();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    centerMode: true,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const totalSlides = upgradedata.length;
  const highlightedSlideIndex = currentSlide % totalSlides;

  return (
    <div className="bg-[#080B1C] relative bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins">
      <div className=" bg-cover bg-center h-screen overflow-hidden overflow-y-auto  " style={{ backgroundImage: "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/subscribebg.png)" }} >
        <div className=" h-screen w-full overflow-hidden overflow-y-auto " style={{
          background: "radial-gradient(378.88% 129.46% at 50% -1.69%, rgba(19, 36, 128, 0) 5.86%, rgba(10, 18, 64, 0.626421) 11.28%, #04071A 24.38%, rgba(4, 8, 29, 0.974934) 60.44%, rgba(4, 7, 26, 0.85) 68.06%, rgba(10, 18, 64, 0.626421) 80.94%, rgba(19, 36, 128, 0) 89.04%)"
        }}>

          <div className="relative">

            <div className="w-full z-10 absolute top-0 py-5 min-h-screen">
              <div className="w-full flex justify-center items-center">
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
                  <FontAwesomeIcon icon={faArrowLeft} className="font-bold" />
                </div>
                <div className="w-full flex justify-center items-center">
                  <p className=" text-center font-zendots uppercase text-case font-medium w-[80%] ">
                    {t('upgrade.title')}
                  </p>
                </div>

              </div>



              <div className=" mt-14 ">
                <Slider
                  className=" flex justify-center items-center"
                  {...settings}
                >
                  {upgradedata.map((item, index) => (
                    <div
                      className={` ${highlightedSlideIndex === index ? " " : " translate-y-4"
                        } flex justify-center items-center  `}
                      key={index}
                    >
                      <div
                        className={` ${highlightedSlideIndex === index ? " " : "  "
                          } md:size-7/12 size-10/12 mx-auto p-[0.9px] bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  rounded-xl flex flex-col justify-center items-center `}
                      >
                        <div className={`w-full rounded-xl ${farmingStatus && farmingStatus.duration >= item.time
                          ? " bg-[#0b0245] "
                          : " bg-black "
                          }`}>
                          <div className=" w-full rounded-xl p-1" style={{
                            background: farmingStatus && farmingStatus.duration >= item.time
                              ? "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 30.97%, rgba(48, 62, 138, 0) 100%)"
                              :
                              "radial-gradient(385.61% 96.45% at 50% 18.62%, #070E3A 0%, rgba(19, 40, 160, 0) 81.89%)"
                          }}>
                            <img src={item.img} className="w-full" alt="upgrade" />
                            <div className="w-full -translate-y-6 ">
                              <div className=" w-full flex justify-end">
                                <p className="w-[90%] mx-auto text-sm text-right">
                                  {t('upgrade.hours', { time: item.time })}
                                </p>
                              </div>
                              <div className="flex justify-center items-center -translate-y-3 ">
                                <div className=" w-8 h-8 rounded-full bg-white flex justify-center items-center ">
                                  <div className="w-7 h-7 rounded-full bg-[#070917] flex justify-center items-center  ">
                                    <p className="font-medium text-sm">{item.no}</p>
                                  </div>
                                </div>
                              </div>
                              <div className=" flex justify-center items-center gap-2 ">
                                {farmingStatus &&
                                  farmingStatus.duration >= item.time ? (
                                  <div className="flex items-center gap-2">
                                    <p
                                      className="text-xl font-bold text-center mt-1"
                                      style={{
                                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                                      }}
                                    >
                                      {t('upgrade.upgraded')}
                                      <span className="text-[#FCE932] ml-2">
                                        {item.amt}
                                      </span>
                                    </p>

                                    <img
                                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/verified.png"
                                      className="w-8"
                                      alt="verified"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <p
                                      className="text-xl font-bold text-center mt-1"
                                      style={{
                                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                                      }}
                                    >
                                      {t('upgrade.buyFor')}
                                      <span className="text-[#FCE932] ml-2">
                                        {item.amt}
                                      </span>
                                    </p>

                                    <img
                                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                      className="w-8"
                                      alt="coin"
                                    />
                                  </div>
                                )}
                              </div>
                              <p className="w-full text-center font-bold text-xs mt-1 ">
                                {t('upgrade.description', { time: item.time })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {farmingStatus &&
                        farmingStatus.duration >= item.time
                        ?
                        <div className="mt-5 rounded-2xl w-[90%] mx-auto h-10 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
                          <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
                          </div>
                          <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
                          </div>
                          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">

                            <p className="uppercase font-semibold text-sm text-center font-zendots" style={{
                              color: "transparent",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"
                            }}>{t('upgrade.alreadyUpgraded')}</p>
                          </div>
                        </div>
                        :
                        <div
                          onClick={handlepopup}
                          className="flex justify-center items-center mt-5"
                        >
                          <div className=" rounded-2xl w-[90%] mx-auto  h-10 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
                            <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
                            </div>
                            <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
                            </div>
                            <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                            <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">

                              <p className="uppercase font-semibold text-sm text-center font-zendots" style={{
                                color: "transparent",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"
                              }}>{t('upgrade.upgradeNow')}</p>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  ))}

                </Slider>
              </div>
              <div className="mt-10">
                <p className="text-center text-4xl text-white/5 font-bold">
                  Skilleareum.ai
                </p>
              </div>
              {/* {farmingStatus && farmingStatus.nextIntervalId != null ?
               
 
              } */}
              <div className="mt-1">
                <p className="text-center text-sm text-white/25 font-medium">
                  {t('upgrade.scrollOptions')}
                </p>
              </div>
              {showPopup && farmingStatus.nextIntervalId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-0.5 rounded-xl relative w-[90%] mx-auto max-w-md">
                    <div className="bg-[#080B1C] p-5 rounded-xl">
                      <p className="text-center text-lg font-semibold">
                        {t('upgrade.confirmTitle', { amt: data[farmingStatus.nextIntervalId].amt })}
                      </p>
                      <div className="flex justify-center items-center gap-5 mt-5">
                        <button
                          onClick={() => {
                            if (navigator.vibrate) {
                              navigator.vibrate(100);
                            }
                            // playSound();
                            ApplyInterval();
                          }}
                          className="bg-gradient-to-b from-[#0285FF] to-[#1EEF32] px-5 py-2 rounded-lg text-sm font-semibold"
                        >
                          {t('upgrade.yes')}
                        </button>
                        <button
                          onClick={handleClose}
                          className="bg-gradient-to-b from-[#0285FF] to-[#1EEF32] px-5 py-2 rounded-lg text-sm font-semibold"
                        >
                          {t('upgrade.no')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div></div>
  );
};

export default UpgradeWeb;
