import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { SERVER_URL } from "../../../../../../config";
import DashboardLayout from "../../Layout/DashboardLayout";

const EarnedWeb = () => {
  const { t } = useTranslation("dashboard");
  // const { playSound } = useSettings();
  const authToken = useSelector((state) => state.token);

  const userId = useSelector((state) => state.user_email.id);
  const [dayData, setDayData] = useState(null);
  const navigate = useNavigate();

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
      // console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
    <div className="relative text-white font-poppins mt-24 ">      
          <div className="w-full z-10 relative max-w-xl mx-auto pt-5 ">     
              <h1 className="text-center text-[#1EEF32] tracking-wider font-zendots text-sm mt-5 mb-2">
                {t("earned.title")}
              </h1>

              {/* <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                alt="Robot"
                className="w-32 mx-auto mb-4 z-10 relative"
              /> */}

              <p className="mt-5 max-w-sm mx-auto text-center text-sm font-light tracking-widest text-white mb-4 px-4">
                <Trans i18nKey="earned.claimTitle" ns="dashboard">
                  NOW, IT’S TIME TO CLAIM YOUR SEAT IN THE AI-POWERED FUTURE WITH{" "}
                  <span className="text-[#1EEF32]  font-bold">{t('earned.aiGenesis')}</span>
                </Trans>
              </p>

              <div className=" flex justify-center  ">
                <div
                  style={{
                    background:
                      "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                  }}
                  className="w-[70%] max-w-64 text-sm mb-5 mx-auto backdrop-blur rounded-xl p-3 z-50 "
                >
                  <div className="bg-[#000a14] rounded-xl p-4 ">
                    {[
                      { key: "dailyQuests", text: t("earned.items.dailyQuests") },
                      { key: "learnWithGames", text: t("earned.items.learnWithGames") },
                      { key: "aiLearning", text: t("earned.items.aiLearning") },
                      { key: "factVault", text: t("earned.items.factVault") },
                      { key: "emojiGame", text: t("earned.items.emojiGame") },
                      { key: "visualBlogs", text: t("earned.items.visualBlogs") },
                      { key: "aiSpace", text: t("earned.items.aiSpace") },
                      { key: "spinWheel", text: t("earned.items.spinWheel") },
                      { key: "farming", text: t("earned.items.farming") },
                      { key: "referral", text: t("earned.items.referral") },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center mb-1 tracking-wider"
                      >
                        <span className="text-green-400 mr-2">
                          {" "}
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-[#00FF18]"
                          />
                        </span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                onClick={() => navigate("/UnlockAIGenesisWeb")}
                className=" cursor-pointer rounded-2xl md:w-[60%] w-[80%] mx-auto h-10 relative"
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
                    className="uppercase font-medium text-center font-zendots"
                    style={{
                      color: "transparent",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      backgroundImage:
                        "linear-gradient(to right, #0285FF, #1EEF32)",
                    }}
                  >
                    {t("earned.next")}
                  </p>
                </div>
              </div>
            
          </div>
        </div>     
    </DashboardLayout>
  );
};

export default EarnedWeb;
