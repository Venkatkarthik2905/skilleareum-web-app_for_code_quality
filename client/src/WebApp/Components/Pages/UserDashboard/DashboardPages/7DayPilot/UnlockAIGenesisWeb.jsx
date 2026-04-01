import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import Subpack from "../Subscription/Subpack";
import { SERVER_URL } from "../../../../../../config";
import DashboardLayout from "../../Layout/DashboardLayout";

const UnlockAIGenesisWeb = () => {
  const { t } = useTranslation("dashboard");
  // const { playSound } = useSettings();
  const authToken = useSelector((state) => state.token);

  const userId = useSelector((state) => state.user_email.id);
  const [dayData, setDayData] = useState(null);
  const navigate = useNavigate();
  const [subscribe, setSubscribe] = useState(false);

  const handleSubscribe = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
      // setSubscribe(!subscribe);
    navigate("/SubPackWeb");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/getUserCurrentDay?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // console.log("Daily Progress Response:", response.data);
      const { lastCompletedDay } = response.data;
      setDayData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
    <div className="relative text-white font-poppins mt-24 ">
    
          {/* {subscribe && (
                  <div className="fixed inset-0 model-overlay backdrop-blur-sm flex items-end z-50">
                    <div className="relative w-full">
                      <div className=" absolute top-3 bg-[#1EEF3273] blur-xl w-full h-10 z-0 " ></div>
                      <Subpack onClose={handleSubscribe} />
                    </div>
                  </div>
                )} */}
          <div className="w-full z-10 relative max-w-md mx-auto  ">
          
              <div className=" text-center tracking-wider  text-sm mt-5 pt-7 px-3">
                <h2 className="text-[#1EEF32] text-lg font-zendots">
                  {t("unlockGenesis.title")}
                </h2>
                <p className="text-[#1EEF32] text-sm mt-1 font-zendots">
                  {t("unlockGenesis.price")}
                </p>

                <div className="my-4">
                  <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                    alt="Robot"
                    className="w-28 mx-auto mb-3 z-10 relative"
                  />
                </div>

                <p className=" tracking-wider font-medium text-sm mb-6">
                  {t("unlockGenesis.provenCurious")}{" "}<br/>
                  <span className="text-[#1EEF32]">{t("unlockGenesis.committed")}</span>
                </p>

                <div className=" flex justify-center items-center">
                
                  <div onClick={() => navigate("/ChallengePathWeb")} className=" cursor-pointer bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-xl p-[1px] ">
                    <div className="bg-[#05061c] p-4 rounded-xl inline-block">
                      <div className="flex flex-col items-center">
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/tick.svg"
                          alt="click"
                          className="w-10 mb-2"
                        />
                        <button className="text-white text-xs tracking-widest">
                          {t("unlockGenesis.tapToUpgrade")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[#1EEF32] font-medium  text-xs mt-6 tracking-wide">
                  {t("unlockGenesis.futureWait")}
                </p>
              </div>

              <div
                onClick={() => navigate("/ChallengePathWeb")}
                className=" cursor-pointer rounded-2xl w-[80%] mx-auto h-10 mt-5 relative"
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
                    className="uppercase font-medium text-sm text-center font-zendots"
                    style={{
                      color: "transparent",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      backgroundImage:
                        "linear-gradient(to right, #0285FF, #1EEF32)",
                    }}
                  >
                    {" "}
                    {t("unlockGenesis.unlockBtn")}{" "}
                  </p>
                </div>
              </div>
          
          </div>
        </div>
   
    </DashboardLayout>
  );
};

export default UnlockAIGenesisWeb;
