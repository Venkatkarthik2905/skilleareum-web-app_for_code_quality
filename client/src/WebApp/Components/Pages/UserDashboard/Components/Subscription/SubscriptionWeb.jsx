import { faArrowLeftLong, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "../../../../../../config";
import SubsciptioncsWeb from "./SubscriptioncsWeb";
import DashboardLayout from "../../Layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SubscriptionWeb = ({ onClose }) => {
  const { t } = useTranslation('dashboard');
  const [ispopupopen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user_email);
   const { created_at, discount_percentage } = useSelector((state) => state.user_email)
      const createdAtDate = new Date(created_at);
  
      // Get the date 7 days ago
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
      // Check if discount applies
      const isDiscountValid = discount_percentage === 50.00 && createdAtDate >= oneWeekAgo;
  const chatId = user.chatId;
  const handlemodal = () => {
    setIsPopupOpen(!ispopupopen);
  };
  const subscribeUrl = `${BASE_URL}/ConfirmSubscribeWeb?chatId=${chatId}`;

  const handleSubscribe = () => {
    window.open(subscribeUrl, "_blank", "noopener,noreferrer");
  };

  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
  };

  return (
    <DashboardLayout>
    <div
    className="relative text-white font-poppins mt-28 "
  >
   
    <div className="  ">
      <div className="w-full  max-w-md mx-auto  text-center text-white  relative z-10">
        {ispopupopen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full">
              <SubsciptioncsWeb onClose={handlemodal} />
            </div>
          </div>
        )}
        <div
          className=" w-full  relative h-screen overflow-hidden overflow-y-auto "
        >
          <div>
            {/* <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/subscribebg.png" /> */}
            {/* <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/subg.png" className="h-screen w-screen" /> */}
          </div>
          <div
            className="h-1/2 absolute top-0 w-full "
            // style={{
            //   background:
            //     "radial-gradient(250.39% 148.6% at 50% 0%, #04071A 15.99%, rgba(10, 18, 64, 0.5) 25.97%, rgba(19, 36, 128, 0) 71.03%)",
            // }}
          >
              <button onClick={() => navigate("/SubPackWeb")} className=" absolute top-3 left-0 ">
                <FontAwesomeIcon icon={faArrowLeftLong} size="lg" />
              </button>

            <div className="mt-3">
              <p
                style={{ textShadow: "2px 2px 10px #FFFFFF90" }}
                className="uppercase font-zendots text-center  "
              >
                {t('promos.subPackages')}
              </p>
              <Slider
                className="w-[90%] mx-auto mt-5  flex justify-center items-center"
                {...settings}
              >
                <div>
                  <div className="overflow-hidden translate-y-1">
                    <p
                      className="text-left px-7 text-2xl font-bold font-zendots uppercase text-transparent translate-y-3"
                      style={{
                        WebkitTextStrokeColor: "white",
                        WebkitTextStrokeWidth: "0.5px",
                      }}
                    >
                      {t('promos.aiGenesis')}
                    </p>
                  </div>
                  <div className="relative h-full flex justify-center items-center">
                    <div
                      className="w-[100%] mx-auto relative flex gap-3"
                      style={{ zIndex: 1 }}
                    >
                      <div className="w-[70%] mx-auto pl-3 place-content-center mb-3 grid content-center gap-2">
                        <div className="flex items-center">
                          <div className="flex items-center flex-col space-x-2">
                            <p
                              style={{
                                color: "transparent",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                backgroundImage:
                                  "linear-gradient(to right, #0285FF, #1EEF32)",
                              }}
                              className="font-zendots text-2xl font-bold "
                            >
                             {isDiscountValid ? "$7.50" : "$15"}
                            </p>
                            {isDiscountValid && (
                <p className="text-red-500 font-bold text-sm">50% OFF</p>
            )}
                          </div>
                          <div className="mx-2 h-7 w-[1px] bg-white"></div>
                          <div>
                            <p className="font-zendots uppercase leading-4">
                              {t('promos.aiGenesis')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-[30%]">
                        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub1.svg"></img>
                      </div>
                    </div>
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub.svg"
                      className="w-full absolute top-0 h-full"
                    ></img>
                  </div>
                </div>

                <div>
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

                <div className="relative">
                  <div className="w-[55%] mx-auto absolute top-16 left-0 right-0 z-50 ">
            <div className=" rounded-2xl  w-full h-7 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-7 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-7 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-7 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              
                  <p className="uppercase font-medium text-center font-zendots text-sm" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t('common.comingSoon')}</p>
              </div>
              </div>
              </div>
                <div className="relative blur-sm">
                <div className="w-[90%] mx-auto">
                    <div>

                        <div className="overflow-hidden translate-y-1">
                            <p className=" px-4 text-2xl font-bold font-zendots uppercase text-transparent translate-y-3" style={{ WebkitTextStrokeColor: 'white', WebkitTextStrokeWidth: '0.5px' }}>{t('subscription.blockLiteAlt')}</p>
                        </div>
                        <div className="relative flex justify-center items-center">
                            <div className="w-[100%] relative flex gap-3" style={{ zIndex: 1 }}>
                            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub2.png"></img>
                            </div>
                            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/subbw.png" className="absolute top-3 right-2 z-10"></img>

                        </div>
                    </div>
                </div>
                </div>
                </div>

                <div className="relative">
                  <div className="w-[55%] mx-auto absolute top-16 left-0 right-0 z-50  ">
            <div className=" rounded-2xl  w-full h-7 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-7 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-7 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-7 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              
                  <p className="uppercase font-medium text-center font-zendots text-sm" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t('common.comingSoon')}</p>
              </div>
              </div>
              </div>
                <div className="relative blur-sm">
                <div className="w-[90%] mx-auto">
                    <div>

                        <div className="overflow-hidden translate-y-1">
                            <p className=" px-4 text-2xl font-bold font-zendots uppercase text-transparent translate-y-3" style={{ WebkitTextStrokeColor: 'white', WebkitTextStrokeWidth: '0.5px' }}>{t('subscription.blockLiteAlt')}</p>
                        </div>
                        <div className="relative flex justify-center items-center">
                            <div className="w-[100%] relative flex gap-3" style={{ zIndex: 1 }}>
                            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/sub2.png"></img>
                            </div>
                            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/subbw.png" className="absolute top-3 right-2 z-10"></img>

                        </div>
                    </div>
                </div>
                 </div>
                </div>
              </Slider>
            </div>

            {/* <div className="mt-14 relative flex justify-center items-center ">
            <div className="absolute w-[65%] h-full  mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0"></div>
            <button className=" bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full py-2 px-10 uppercase z-10">
              {" "}
              <p style={{ textShadow: "2px 2px 2px #00000065" }}>{t('subscription.aiGenesis')}</p>
            </button>
          </div> */}

            {/* <div
            className=" w-[75%] mx-auto p-2 mt-10 rounded-xl"
            style={{
              background:
                "radial-gradient(66.08% 137.12% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
            }}
          >
            <div className="z-10 bg-gradient-to-b from-[#1AE348]/50 to-[#0368C0]/50 rounded-lg p-0.5">
              <div className=" bg-[#070E3A]/90 w-full h-full rounded-lg flex items-center justify-between py-2 px-3 gap-3 ">
                <p
                  style={{
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient( to right, #0285FF,#1EEF32 )",
                  }}
                  className="w-full text-center text-2xl font-semibold"
                >
                  $15.00
                </p>
              
              </div>
            </div>
          </div> */}

            <div className="scale-90 w-[90%] mx-auto border border-[#0258F8]/50 rounded-xl mt-10">
              <div className="relative">
                <div
                  className=" h-12 rounded-t-xl"
                  style={{
                    backgroundImage:
                      "linear-gradient( to bottom, #0C1E91 7%, #B9C2F8 37%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96% )",
                  }}
                >
                  <div className=" bg-[#070E3A]/40 backdrop-blur-[2px] w-full h-full rounded-t-xl "></div>
                </div>
                <div className="absolute top-3 w-full">
                  <p className="text-center font-zendots uppercase w-full  ">
                    Benefits
                  </p>
                </div>
              </div>
              <div className="w-[100%]  mx-auto relative bg-[#040813] rounded-b-xl ">
                <img
                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/key.png"
                  className="rounded-b-xl mx-auto"
                />
                <div className=" absolute top-0 left-0 right-0 w-[90%] font-poppins mx-auto  mt-5 ">
                  <div className="w-full flex justify-center items-center ">
                    <div className="w-1/3 flex flex-col items-center gap-1 ">
                      <div className=" w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#132556CC] border border-[#0285FF] ">
                        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Exchange.svg" />
                      </div>
                      <p className="text-xs break-words ">
                        Referrer
                        <br />
                        Bonus
                      </p>
                    </div>

                    <div className="w-1/3 flex flex-col items-center gap-1 ">
                      <div className=" w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#132556CC] border border-[#0285FF] ">
                        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Gift.svg" />
                      </div>
                      <p className="text-xs break-words ">
                        Daily
                        <br />
                        Bonus
                      </p>
                    </div>

                    <div className="w-1/3 flex flex-col items-center gap-1  ">
                      <div className=" w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#132556CC] border border-[#0285FF] ">
                        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Learning.svg" />
                      </div>
                      <p className="text-xs break-words ">
                        AI Learning Modules
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-10 mt-5">
                    <div className="flex flex-col items-center gap-1 ">
                      <div className=" w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#132556CC] border border-[#0285FF]  ">
                        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Roulette.svg" />
                      </div>
                      <p className="text-xs break-words ">{t('subscription.dailySpin')}</p>
                    </div>

                    <div className=" flex flex-col items-center  gap-1">
                      <div className=" w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#132556CC] border border-[#0285FF] ">
                        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/GameController.svg" />
                      </div>
                      <p className="text-xs break-words">{t('subscription.exploreSkillGame')}</p>
                    </div>
                  </div>

                  <a
                    href={subscribeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      className=" rounded-2xl w-full h-10 mt-10 relative"
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
                          {t('subscription.subscribe')}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* <div className=" w-[85%] mx-auto mt-10 font-poppins">
          <div className=" flex justify-start ">
            <div className=" w-[15%] ">
              <div className=" bg-gradient-to-b from-[#0285FF] to-[#1EEF32] w-9 h-9 rounded-full flex justify-center items-center ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1427_1434)">
                    <path
                      d="M9.66667 3L11.7827 6.75421L16.007 7.60655L13.0905 10.7791L13.5852 15.0601L9.66667 13.2667L5.7481 15.0601L6.24286 10.7791L3.32629 7.60655L7.55064 6.75421L9.66667 3Z"
                      stroke="white"
                      stroke-width="1.66667"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1427_1434">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className=" w-[85%] mt-1 ">
              <p className="text-lg text-left font-medium ">
                How{" "}
                <span
                  className=" font-bold "
                  style={{
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient( to right, #0285FF,#1EEF32 )",
                  }}
                >
                  AI Genesis
                </span>{" "}
                works
              </p>
              <p className=" text-left text-xs mt-2">
                AI Genesis is the foundation of AI learning, designed to make
                learning fun and rewarding with interactive games and
                challenges.{" "}
              </p>
            </div>
          </div>

          <div className=" flex justify-start mt-3">
            <div className=" w-[15%] ">
              <div className=" bg-gradient-to-b from-[#0285FF] to-[#1EEF32] w-9 h-9 rounded-full flex justify-center items-center ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1427_1434)">
                    <path
                      d="M9.66667 3L11.7827 6.75421L16.007 7.60655L13.0905 10.7791L13.5852 15.0601L9.66667 13.2667L5.7481 15.0601L6.24286 10.7791L3.32629 7.60655L7.55064 6.75421L9.66667 3Z"
                      stroke="white"
                      stroke-width="1.66667"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1427_1434">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className=" w-[85%] mt-1 ">
              <p className="text-lg text-left font-medium ">
              Gain {" "}
                <span
                  className=" font-bold "
                  style={{
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient( to right, #0285FF,#1EEF32 )",
                  }}
                >
                 Exclusive access 
                </span>{" "}
                To
              </p>
              <p className=" text-left text-sm mt-2">
              AI Games, AI Space (Tools), Spin to Win, AI Fact Vault and Daily Bonuses — where every action builds knowledge and assets.
              </p>
            </div>
          </div>

          <div className=" flex justify-start mt-3">
            <div className=" w-[15%] ">
              <div className=" bg-gradient-to-b from-[#0285FF] to-[#1EEF32] w-9 h-9 rounded-full flex justify-center items-center ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1427_1434)">
                    <path
                      d="M9.66667 3L11.7827 6.75421L16.007 7.60655L13.0905 10.7791L13.5852 15.0601L9.66667 13.2667L5.7481 15.0601L6.24286 10.7791L3.32629 7.60655L7.55064 6.75421L9.66667 3Z"
                      stroke="white"
                      stroke-width="1.66667"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1427_1434">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className=" w-[85%] mt-1 ">
              <p className="text-lg text-left font-medium ">
              Earn As You {" "}
                <span
                  className=" font-bold "
                  style={{
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient( to right, #0285FF,#1EEF32 )",
                  }}
                >
                Refer
                </span>{" "}
                
              </p>
              <p className=" text-left text-sm mt-2">
              Get 20% Referral Bonuses for every successful subscription.{" "}
              </p>
            </div>
          </div>
        </div> */}
        </div>
      </div>

      {/* <div className=" bg-[#080B1C] w-full fixed bottom-0 z-50 ">
          <hr className="my-5 border-t-[#1EEF32A6]" />
          <div className="  relative  pt-3 pb-5 flex justify-center items-center font-zendots ">
            <div className="absolute w-full h-20  mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0"></div>
            <a
              href={subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              // onClick={handleSubscribe}
              className="w-[75%] mx-auto flex justify-between items-center bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg py-3 px-10 uppercase z-10"
            >
              {" "}
              <p
                className=" w-[80%] text-center z-10"
                style={{ textShadow: "2px 2px 2px #00000065" }}
              >
                Subscribe
              </p>
              <FontAwesomeIcon icon={faPlay} className=" z-10 " />
            </a>
          </div>
        </div> */}
    </div>
    </div>
  
    </DashboardLayout>
  );
};

export default SubscriptionWeb;
