import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "animate.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import Learningdays from "./Learningdays.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faCheck,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SERVER_URL, handleSpeak } from "../../../../../../config.js";
import CompletedLearningsWeb from "./CompletedLearningsWeb.jsx";
import PopupWeb from "./PopupWeb.jsx";
import AIAssessmentWeb from "./AIAssessmentWeb.jsx";
import AIvideoWeb from "./AIVideoWeb.jsx";
import DashboardLayout from "../../Layout/DashboardLayout.jsx";

export default function AILearningWeb() {
  const { t, i18n } = useTranslation("games");
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useSelector((state) => state.user_email.id);
  const authToken = useSelector((state) => state.token);
  const sub_status = useSelector((state) => state.user_email.sub_status);
  const [factvaultopen, setFactVaultOpen] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  // const { playSound } = useSettings();
  const [subscribe, setSubscribe] = useState(false);
  const [openvideo, setOpenVideo] = useState(false);
  const [openreplayvideo, setOpenReplayVideo] = useState(false);
  const [openAssessment, setOpenAssessment] = useState(false);
  const [unlockedData, setUnlockedData] = useState(null);
  const [allTopics, setAllTopics] = useState([]);
  const [completedTopics, setcompletedTopics] = useState([]);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

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

  const handleplay = () => {
    if (unlockedData?.status === "locked") return;
    setOpenVideo(!openvideo);
    if (isCompleted) {
      setOpenReplayVideo(false);
      setOpenVideo(true);
    }
   // console.log("Playing video", openvideo);
  };

  const handlefactvault = () => {
    setFactVaultOpen(!factvaultopen); // Toggle the fact vault if not new
  };

  const handlereplayvideo = () => {
    setOpenReplayVideo(!openreplayvideo);
    //console.log("Playing video", openvideo);
  };

  const handleassessment = () => {
    setOpenAssessment(!openAssessment);
    setOpenReplayVideo(false);
    setOpenVideo(false);
  };

  const isCompleted = () => {
    setIsVideoCompleted(true);
    completeQuestAPI();
    handlereplayvideo();
  };
  const handleHomeScreen = () => {
    setOpenVideo(!openvideo);
    setOpenReplayVideo(!openreplayvideo);
    fetchTodaysAIlearning();
  };
  const completeQuestAPI = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/ailearning/video/complete`,
        {
          userId,
          day: unlockedData?.day,
          language: i18n.language || 'en',
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
     // console.log(response);
      if (response.status === 200) {
       // console.log("Rewarded");
        toast.success(t("ai_learning.video_completed"));
      }
    } catch (error) {
     // console.log(error);
      toast.error(t("ai_learning.failed_to_complete"));
    }
  };
  const handleSubscribe = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
      // setSubscribe(!subscribe);
    navigate("/SubPackWeb");
  };

  const calculateTimeLeft = () => {
    // console.log("unlockedData", unlockedData);
    if (!unlockedData?.createdAt) return "00:00:00";

    const { unlockIntervalMinutes, nextUnlockTime, createdAt } = unlockedData;

    let expiryTime;

    if (unlockIntervalMinutes > 0 && nextUnlockTime) {
      expiryTime = new Date(nextUnlockTime);
    } else {
      // Midnight flow
      const createdDate = new Date(createdAt || new Date());
      const istOffset = 5.5 * 60 * 60 * 1000;
      const createdAtIST = new Date(createdDate.getTime() + istOffset);
      const nextMidnightIST = new Date(
        Date.UTC(
          createdAtIST.getUTCFullYear(),
          createdAtIST.getUTCMonth(),
          createdAtIST.getUTCDate() + 1,
          0,
          0,
          0
        )
      );
      expiryTime = new Date(nextMidnightIST.getTime() - istOffset);
    }

    const now = new Date();
    const difference = expiryTime - now;

    if (difference <= 0) return "00:00:00";

    const hours = String(
      Math.floor((difference / (1000 * 60 * 60)) % 24)
    ).padStart(2, "0");
    const minutes = String(
      Math.floor((difference / (1000 * 60)) % 60)
    ).padStart(2, "0");
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
      2,
      "0"
    );

    return `${hours}:${minutes}:${seconds}`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [unlockedData?.createdAt]);
  // Recalculate if createdAt changes

  const goToPageOne = () => {
    // playSound();
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    navigate("/Aispace");
    handleSpeak(t("ai_learning.speak.engage_tools"));
  };

  const goToPageTwo = () => {
    // playSound();
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    handleSpeak(t("ai_learning.speak.play_more"));
    navigate("/Farming/Play");
  };

  const goToPageThree = () => {
    // playSound();
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    navigate("/Aivault");
    handleSpeak(t("ai_learning.speak.unlock_facts"));
  };

  const goToPageFour = () => {
    // playSound();
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    navigate("/Learning");
    handleSpeak(t("ai_learning.speak.unlock_facts"));
  };

  const goToPageFive = () => {
    // playSound();
    if (sub_status !== "active") {
      handleSubscribe();
      return;
    }
    navigate("/Aiblog");
    handleSpeak(t("ai_learning.speak.unlock_facts"));
  };

  const fetchTodaysAIlearning = async () => {
    setAllTopics([]);

    try {
      const response = await axios.get(
        `${SERVER_URL}/api/ailearning?userId=${userId}&language=${i18n.language || 'en'}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
     // console.log(response);
      setUnlockedData(response?.data?.video);
      setAllTopics(response?.data?.nextTopics);
      setcompletedTopics(response?.data?.completedTopics);
    } catch (error) {
    //  console.log(error);
    }
  };
  useEffect(() => {
    fetchTodaysAIlearning();
  }, []);
  
  const handleClose = (source) => {
   // console.log("handleClose : ", source);
    if (source === "TaskListWeb") {
      navigate("/TaskListWeb");
    } else {
      navigate("/ChallengeMapWeb");
    }
  };
  return (
    <DashboardLayout>      
      <div>


    <div className="relative text-white font-poppins mt-24 z-10 scale-90 ">     
          <div
            className={`z-20 w-full max-w-lg mx-auto ${
              factvaultopen ? "hidden" : "block"
            }`}
          >                 
                <div className="w-full flex justify-between px-3 items-center gap-2 relative">
                  <div
                    onClick={() => {
                      if (navigator.vibrate) {
                        navigator.vibrate(100);
                      }
                      // playSound();
                      handleClose(source);
                    }}
                    className="cursor-pointer absolute top-0 left-5 "
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeftLong}
                      className="font-bold"
                    />
                  </div>

            
                
                </div>

                {/* <div className="w-[100%] mt-7 mx-auto font-zendots text-sm ">
                                                 <div className="w-[100%] mx-auto mt-5 px-2 custom-slider">
                         <Slider {...settings} className=" ">
                           {[
                   
                             { name: "AI Space", path: "/Aispace", action: goToPageOne },
                             { name: "AI Games", path: "/Farming/Play", action: goToPageTwo },
                             { name: "AI Fact Vault", path: "/Aivault", action: goToPageThree },
                             { name: "AI Learning", path: "/Learning", action: goToPageFour },
                             { name: "AI Blog", path: "/Aiblog", action: goToPageFive },
                   
                           ].map(({ name, path, action }) => (
                            <div className=" py-3 px-1 ">
                             <button
                               key={name}
                               onClick={action}
                               className={`w-full py-1 rounded-lg px-2 shrink-0 transition-all duration-300 ${
                                 location.pathname === path
                                   ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 to-40% text-white font-semibold border border-[#1AE348]/60"
                                   : "bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54% text-white/60"
                               } text-xs focus:outline-none`}
                             >
                               {name}
                             </button>
                             </div>
                           ))}
                         </Slider>
                       </div>
                             </div> */}

               
                  <div className={` `}>
                   
                      <p className=" uppercase text-[#DAD6D6] font-bold text-center  font-zendots ">
                        {t("ai_learning.day", { day: unlockedData?.day })}
                      </p>
                 

                    <div>
                      <div className="w-[95%] mx-auto flex justify-center items-center mt-7 z-20 ">
                        <div className="w-full min-h-[10rem] max-h-full p-[0.5px] bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-3xl">
                          <div className="w-full bg-[#0a0342] h-full rounded-3xl ">
                            <div
                              className="w-full min-h-[10rem] max-h-full rounded-3xl "
                              style={{
                                background:
                                  "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)",
                              }}
                            >
                              <div className="bg-[#070E3A]/70 w-full h-full py-3 px-5 rounded-t-3xl font-zendots flex justify-between">
                                <div>
                                  <p className="w-full z-10 text-left uppercase font-medium">
                                    {unlockedData?.topic_name}
                                  </p>
                                </div>
                              </div>

                              <div className=" p-3 h-full ">
                                <p className="text-sm text-center ">
                                  {unlockedData?.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="w-full flex justify-between items-center mt-7 z-20 ">
                        <div>
                          <p className="text-xl font-semibold text-[#DAD6D6]">
                            {t("ai_learning.ai_learning_for_the_day")}
                          </p>
                          <p className="text-[#DAD6D6] text-xs  mt-1">
                            {t("ai_learning.welcome_to_day", {
                              day: unlockedData?.day,
                            })}
                          </p>
                        </div>
                        <div onClick={() => handlefactvault()}>
                          <div className="flex items-center gap-1">
                            <div className="rounded-full w-[10px] h-[10px] bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-0.5">
                              <div className=" w-full h-full bg-[#080B1C] rounded-full"></div>
                            </div>
                            <div className="bg-[#0285FF] w-[12px] h-[3px] rounded-full"></div>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="bg-[#0285FF] w-[12px] h-[3px] rounded-full"></div>
                            <div className="rounded-full w-[10px] h-[10px] bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-0.5">
                              <div className=" w-full h-full bg-[#080B1C] rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex overflow-y-auto flex-col gap-2 z-20 ">
                        <div
                          className=" w-full backdrop-blur font-montserrat rounded-xl py-3 px-5 flex justify-between items-center gap-3 "
                          style={{
                            background:
                              "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%) ",
                          }}
                        >
                          <div className=" flex justify-between items-center gap-10">
                            <p className="font-bold text-white">
                              {unlockedData?.day}
                            </p>
                            <div className="h-9 w-0.5 rounded-full bg-[#868686]"></div>
                          </div>

                          <div className="w-[80%] flex justify-between items-center ">
                            <div>
                              <p className=" text-sm text-[#1EEF32] font-bold ">
                                {unlockedData?.topic_name}
                              </p>
                            </div>

                            <div className="relative">
                              <div
                                onClick={handleplay}
                                className="rounded-xl cursor-pointer w-28 h-8 relative flex items-center justify-center"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                                }}
                              >
                                <div className="h-8 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
                                <div className="h-8 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
                                <div className="bg-[#070e3a4b] backdrop-blur-sm h-8 rounded-xl w-full border-[0.5px] border-[#1AE348]"></div>

                                {/* Button Content */}
                                <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                                  {unlockedData?.status === "locked" ? (
                                    <div className="flex flex-col items-center">
                                      <span className="text-[10px] text-gray-300 leading-none">
                                        {t("ai_learning.unlocks_in")}
                                      </span>
                                      <span className="text-xs font-bold text-white">
                                        {timeLeft}
                                      </span>
                                    </div>
                                  ) : (
                                    <p
                                      className="uppercase font-medium text-center font-zendots text-sm"
                                      style={{
                                        color: "transparent",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        backgroundImage:
                                          "linear-gradient(to right, #0285FF, #1EEF32)",
                                      }}
                                    >
                                      {t("ai_learning.play")}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Completed */}
                        {allTopics.length > 0 &&
                          allTopics.map((item, index) => (
                            <div
                              className="  w-full backdrop-blur font-montserrat rounded-xl py-3 px-5 flex justify-between items-center gap-3 z-20 "
                              style={{
                                background:
                                  item.day < unlockedData?.day
                                    ? "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.25) 5.14%, rgba(48, 62, 138, 0.25) 54.1%)"
                                    : "rgba(255, 255, 255, 0.05)",
                              }}
                              key={index}
                            >
                              <div className=" flex justify-between items-center gap-10">
                                <p className="font-bold text-white">
                                  {item.day}
                                </p>
                                <div className="h-9 w-0.5 rounded-full bg-[#868686]"></div>
                              </div>

                              <div className="w-[80%] flex justify-between items-center ">
                                <div>
                                  <p className=" text-sm text-[#9D9D9D] font-bold ">
                                    {item.topic_name}
                                  </p>
                                </div>

                                {item.day < unlockedData?.day ? (
                                  <div className="w-28 h-7 rounded-xl bg-gradient-to-b from-[#1AE348] to-[#0368C0] p-[1px] ">
                                    <div className=" rounded-xl bg-[#004732] w-full h-full flex justify-center items-center ">
                                      <p className="uppercase text-[#1EEF32] font-semibold text-center text-[11px]">
                                        {t("ai_learning.completed")}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className=" relative ">
                                    <img
                                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                      className=" w-8 h-8 "
                                    />
                                    <FontAwesomeIcon
                                      icon={faLock}
                                      size="xs"
                                      className="text-[#00ff48] absolute top-2 left-2.5 "
                                    />
                                    <div className=" bg-[#1FEA32]  blur-[9px] w-4 h-4 absolute top-2 left-1.5 rounded-full "></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
               
              </div>
           
    
         
        </div>

        
         {openvideo && (
           <div className=" fixed inset-0 w-full z-50 backdrop-blur-md flex justify-center items-center ">
              <div className=" w-full max-w-md mx-auto z-50">
                <AIvideoWeb
                  handleHomeScreen={handleHomeScreen}
                  onClose={() => setOpenVideo(false)}
                  unlockedData={unlockedData}
                  isCompleted={isCompleted}
                  videoSrc={"http://localhost:3000/assets/HOMERusiianFNl.mp4"}
                />
              </div>
            </div>
          )}

          {factvaultopen && (
           <div className="fixed inset-0 w-full z-50 backdrop-blur-md flex justify-center items-center">
              <div className=" w-full max-w-md mx-auto ">
                <CompletedLearningsWeb
                  completedTopics={completedTopics}
                  onClose={handlefactvault}
                />
              </div>
            </div>
          )}

          {openreplayvideo && (
            <div className="fixed inset-0 w-full z-50 backdrop-blur-md flex justify-center items-center">
              <div className=" w-full max-w-md mx-auto ">
                <PopupWeb
                  toast={toast}
                  handleplay={handleplay}
                  handleHomeScreen={handleHomeScreen}
                  handlereplayvideo={handlereplayvideo}
                  unlockedData={unlockedData}
                  handleassessment={handleassessment}
                />
              </div>
            </div>
          )}

          {openAssessment && (
           <div className="fixed inset-0 w-full z-50 backdrop-blur-md flex justify-center items-center">
              <div className=" w-full max-w-md mx-auto ">
                <AIAssessmentWeb
                  authToken={authToken}
                  source={source}
                  toast={toast}
                  handleHomeScreen={handleHomeScreen}
                  handleassessment={handleassessment}
                  unlockedData={unlockedData}
                />
              </div>
            </div>
          )}
        </div>
      
    </DashboardLayout>
  );
}
