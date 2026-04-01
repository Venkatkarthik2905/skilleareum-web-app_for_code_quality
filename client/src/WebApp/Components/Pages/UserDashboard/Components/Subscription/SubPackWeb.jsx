import {
  faArrowLeft,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubButtonWeb from "./SubButtonWeb";
import DashboardLayout from "../../Layout/DashboardLayout";
import { useTranslation } from "react-i18next";

const SubPackWeb = ({ onClose }) => {
  const { t } = useTranslation('dashboard');
  const [subscribe, setSubscribe] = useState(false);
  const navigate = useNavigate();
  // const { isMuted, toggleSound, playSound, playBgmSound, toggleBGM, isBgm } = useSettings();
  const { created_at, discount_percentage } = useSelector(
    (state) => state.user_email
  );
  const createdAtDate = new Date(created_at);

  // Get the date 7 days ago
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Check if discount applies
  const isDiscountValid =
    discount_percentage === 50.0 && createdAtDate >= oneWeekAgo;
  const handleSubscribe = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    // setSubscribe(!subscribe)
    navigate("/SubscriptionWeb");
  };

  return (
    <DashboardLayout>
    <div className=" relative text-white font-poppins mt-24 ">     
          <div className="  max-w-md mx-auto relative  ">
            {/* {subscribe && (
                        <div className="fixed inset-0 model-overlay backdrop-blur-sm flex items-end z-50">
                            <div className="relative w-full">
                                <div className=" absolute top-3 bg-[#1EEF3273] blur-xl w-full h-10 z-0 " ></div>
                                <Subscribe onClose={handleSubscribe} />
                            </div>
                        </div>
                    )} */}
            <div className="absolute top-5 left-0">
              <button onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeftLong} size="lg" />
              </button>
            </div>
            <div className="mt-2 pt-5">
              <p
                style={{ textShadow: "2px 2px 10px #FFFFFF90" }}
                className=" font-zendots uppercase text-lg text-center  "
              >
                {t('subscription.packagesTitle')}
              </p>
            </div>
            <div className="relative">
              <div className="w-[90%] mx-auto">
                <div>
                  <div className="max-w-md w-full mx-auto overflow-hidden translate-y-1">
                    <p
                      className=" px-4 text-2xl font-bold font-zendots uppercase text-transparent translate-y-3"
                      style={{
                        WebkitTextStrokeColor: "white",
                        WebkitTextStrokeWidth: "0.5px",
                      }}
                    >
                      {t('subscription.aiGenesis')}
                    </p>
                  </div>
                  <div className="relative flex justify-center items-center">
                    <div
                      className="w-[100%] relative flex  justify-center items-center p-3 gap-3"
                      style={{ zIndex: 1 }}
                    >
                      <div className="w-[70%] mx-auto max-w-sm px-3">
                        <div className="flex items-center">
                          {/* Price & Discount */}
                          <div className="flex items-center flex-col space-x-2">
                            <p
                              style={{
                                color: "transparent",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                backgroundImage:
                                  "linear-gradient(to right, #0285FF, #1EEF32)",
                              }}
                              className="font-zendots text-2xl font-bold"
                            >
                              {isDiscountValid ? "$7.50" : "$15"}
                            </p>
                            {isDiscountValid && (
                              <p className="text-red-500 font-bold text-sm">
                                50% OFF
                              </p>
                            )}
                          </div>

                          {/* Divider */}
                          <div className="mx-2 h-7 w-[1px] bg-white"></div>

                          {/* AI Genesis Text */}
                          <div>
                            <p className="font-zendots uppercase leading-4">
                              {t('subscription.aiGenesis')}
                            </p>
                          </div>
                        </div>

                        {/* Subscribe Button */}
                        <div>
                          <SubButtonWeb onClick={handleSubscribe} />
                        </div>
                      </div>

                      <div className="w-[30%]">
                        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub1.svg"></img>
                      </div>
                    </div>
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub.svg"
                      className="absolute"
                    ></img>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-[90%] mx-auto">
                <div>
                  <div className="overflow-hidden translate-y-1">
                    <p
                      className=" px-4 text-2xl font-bold font-zendots uppercase text-transparent translate-y-3"
                      style={{
                        WebkitTextStrokeColor: "white",
                        WebkitTextStrokeWidth: "0.5px",
                      }}
                    >
                      {t('subscription.blockLiteAlt')}
                    </p>
                  </div>
                  <div className="relative flex justify-center items-center">
                    <div
                      className="w-[100%] relative flex gap-3"
                      style={{ zIndex: 1 }}
                    >
                      <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub2.png"></img>
                    </div>
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/subbw.png"
                      className="absolute top-3 right-2 z-10"
                    ></img>
                  </div>
                </div>
              </div>
            </div>

            <div className=" relative ">
              <div className=" blur-sm">
                <div className="relative">
                  <div className="w-[90%] mx-auto">
                    <div>
                      <div className="overflow-hidden translate-y-1">
                        <p
                          className=" px-4 text-2xl font-bold font-zendots uppercase text-transparent translate-y-3"
                          style={{
                            WebkitTextStrokeColor: "white",
                            WebkitTextStrokeWidth: "0.5px",
                          }}
                        >
                          {t('subscription.blockLiteAlt')}
                        </p>
                      </div>
                      <div className="relative flex justify-center items-center">
                        <div
                          className="w-[100%] relative flex gap-3"
                          style={{ zIndex: 1 }}
                        >
                          <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub2.png"></img>
                        </div>
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/subbw.png"
                          className="absolute top-3 right-2 z-10"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-[90%] mx-auto">
                    <div>
                      <div className="overflow-hidden translate-y-1">
                        <p
                          className=" px-4 text-2xl font-bold font-zendots uppercase text-transparent translate-y-3"
                          style={{
                            WebkitTextStrokeColor: "white",
                            WebkitTextStrokeWidth: "0.5px",
                          }}
                        >
                          {t('subscription.blockLiteAlt')}
                        </p>
                      </div>
                      <div className="relative flex justify-center items-center">
                        <div
                          className="w-[100%] relative flex gap-3"
                          style={{ zIndex: 1 }}
                        >
                          <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub2.png"></img>
                        </div>
                        <img
                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/subbw.png"
                          className="absolute top-3 right-2 z-10"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[55%] mx-auto absolute top-28 left-0 right-0  ">
                <div
                  className=" rounded-2xl  w-full h-7 relative"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                  }}
                >
                  <div className="h-7 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                  <div className="h-7 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                  <div className=" bg-[#070e3a4b] backdrop-blur-sm h-7 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
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
                      {t('common.comingSoon')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>     
    </DashboardLayout>
  );
};

export default SubPackWeb;
