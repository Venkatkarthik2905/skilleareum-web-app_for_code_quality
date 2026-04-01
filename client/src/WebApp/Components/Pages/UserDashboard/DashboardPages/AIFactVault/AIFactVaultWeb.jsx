import {
  faArrowLeft,
  faArrowLeftLong,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import "animate.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Joyride from "react-joyride";
import toast, { Toaster } from "react-hot-toast";
import { useCallback } from "react";
import { SERVER_URL } from "../../../../../../config.js";
import AIFunfactWeb from "./AIFunFactWeb.jsx";
import DashboardLayout from "../../Layout/DashboardLayout.jsx";
import axiosInstance from "../../../../../../config/axiosInstance.js";

export default function AIFactVaultWeb() {
  const { t } = useTranslation("ai_vault");
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user_email);
  const authToken = useSelector((state) => state.token);

  const [isaifunfactopen, setAIFunFactOpen] = useState(false);
  const [isgetstarted, setGetStarted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [canClaim, setcanClaim] = useState(false);
  const [userVisitData, setuserVisitData] = useState([]);
  const [isdaycompleted, setIsDayCompleted] = useState(false);
  // const { playSound } = useSettings();
  const [subscribe, setSubscribe] = useState(false);
  const [startJoyride, setStartJoyride] = useState(false);
  const [run, setRun] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const { NewUser } = location.state || { NewUser: false };
  // const NewUser  = true;

  const [steps] = useState([
    {
      target: ".fact",
      content: (
        <span>
          {t("ui.joyride")}
        </span>
      ),
    },
  ]);
  const claimReward = useCallback(async () => {
    // playSound();
    try {
      const { data } = await axiosInstance.post(
        `${SERVER_URL}/api/aivault/claimReward?userId=${userData.id}`
      );
      // console.log(data);
      if (data.message === "Reward claimed successfully.") {
        setcanClaim(false);
        toast.success(t("ui.task_completed"));
        setTimeout(() => {
          if(source==="TaskListWeb"){
            navigate("/TaskListWeb")
          }else
            navigate("/ChallengeMapweb");
         
        }, 2000);
      }
    } catch (error) {
      // console.log(error);
    }
  }, []);
  useEffect(() => {
    if (NewUser) {
      setStartJoyride(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { action, index, type } = data;
    if (type === "tour:end") {
      setRun(false);
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

  const handlefunfact = () => {
    // playSound();
    setFadeOut(true);
    setAIFunFactOpen(true);

    setIsNewUser(false);
  };
  const handlefactvault = () => {
    // Check if the user is new by looking for the "isNewUser" flag in localStorage
    const isNewUser = localStorage.getItem("isNewToFact") === null;
    // console.log("IS NEW====", isNewUser, localStorage.getItem("isNewToFact"));
    if (isNewUser) {
      // If the user is new, show the modal and set the "isNewUser" flag in localStorage
      setIsNewUser(true);
      localStorage.setItem("isNewToFact", "false"); // User is no longer considered new
    }
  };
  // const fetchAIFact = async () => {
  //   try {

  //     const { data } = await axios.get(`${SERVER_URL}/api/aivault?userId=${userData.id}`);
  //     console.log(data)
  //     setuserVisitData(data.UserVisit);

  //     setcanClaim(data.UserVisit.canClaim);
  //   } catch (error) {
  //     console.log(error)
  //   }

  // };

  useEffect(() => {
    handlefactvault();

    // fetchAIFact();
  }, []);

  return (
    <DashboardLayout>
      <div className="relative text-white font-poppins mt-20 scale-90   ">

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

        <div className="w-full max-w-lg mx-auto z-10 ">
          <div className="fact">           
            <div className="">
              {isNewUser ? (
                <div
                  className={` animate__animated flex flex-col justify-center items-center py-10 `}
                >
                  <div className="flex justify-center items-center">
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                      className="w-7/12"
                    />
                  </div>

                  <div className="mt-5">
                    <p className="w-full font-medium font-zendots text-center text-sm ">
                      {t("ui.welcome_to")}
                    </p>
                    <p className="w-full mt-2 text-center font-zendots text-xl font-medium">
                      {t("ui.fact_vault_title")}
                    </p>
                  </div>

                  <div
                    onClick={handlefunfact}
                    className=" w-[100%] md:w-[75%] mx-auto cursor-pointer mt-5 rounded-2xl h-10 relative "
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                    }}
                  >
                    <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40 "></div>
                    <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                    <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
                    <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
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
                        {t("ui.get_started")}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`animate__animated`}>
                  <AIFunfactWeb
                    authToken={authToken}
                    onClaim={claimReward}
                    canClaim={canClaim}
                    setcanClaim={setcanClaim}
                    source={source}
                    onClose={() => setAIFunFactOpen(false)}
                  />
                </div>
              )}
            </div>

            {/* <div className='w-[90%] mx-auto bg-gradient-to-b from-[#0285FF] to-[#1EEF32] rounded-3xl shadow-md p-0.5 mt-5'>
                  <div className='bg-[#080B1C] text-center rounded-3xl shadow-md p-1'>    
                    <div className=' relative '>                
                      <img src='../assets/staytunedvault.jpeg' className='mx-auto rounded-3xl'></img>
                      <div className='w-full  mt-4 absolute top-0 flex justify-center items-center '>
                        <div  className='font-semibold border rounded-full px-3'>Stay Tuned</div>
                        </div>
                      </div>
                      <div className='py-3 px-5 flex items-center justify-between'>
                      <div>
                          <h1 style={{ backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", backgroundImage: 'linear-gradient( to right, #0285FF, #1EEF32 )' }} className='text-xl font-semibold '>AI Fact's Vault</h1>
                          <p className='text-sm'>Terms & Conditions</p>
                      </div>
                      <div>
                      <div className='bg-white rounded-full w-10 h-10 text-lg flex items-center justify-center'>
                      <i className='fa-solid fa-heart shadow-lg'></i>
                      </div>
                      </div>
                  </div>
                  </div>
               
              </div> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
