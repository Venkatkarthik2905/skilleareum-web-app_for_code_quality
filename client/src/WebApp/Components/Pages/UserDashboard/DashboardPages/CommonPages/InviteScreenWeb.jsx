import React, { useEffect, useState } from "react";
// import { BASE_URL } from "../config";
import {
  faArrowLeft,
  faClockRotateLeft,
  faMinus,
  faPlus,
  faShare,
  faUser,
  faUserFriends,
  faX,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  faInstagram,
  faTelegram,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import Joyride from "react-joyride";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../../../../config";
import DashboardLayout from "../../Layout/DashboardLayout";
import { useTranslation } from "react-i18next";


AOS.init();

const InvitescreenWeb = () => {
  const { t } = useTranslation("dashboard");
  const [isCopied, setIsCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);
  // const { playSound } = useSettings();
  const [startJoyride, setStartJoyride] = useState(false);
  const [run, setRun] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { NewUser } = location.state || { NewUser: false };
  // const NewUser  = true;

  const [steps] = useState([
    {
      target: ".invite",
      content: <span>{t("invite.joyride")}</span>,
      disableBeacon: true,
    },
  ]);

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

  const [referralCount, setReferralCount] = useState([]); // Example initial value
  const toShow = showMore ? referralCount : referralCount.slice(0, 4);
  const userData = useSelector((state) => state.user_email);
  // console.log(userData);
  // const handleCopy = () => {
  //   const url = `https://t.me/SKLRM_bot?start=${userData.referral_code}`;
  //   const text = `
  //   ${url}

  //   🌟 Welcome to Skilleareum! 🚀

  //   Learn, Earn, Grow & Repeat.

  //   Step into the Future of AI Learning & Earning!

  //   🎁 Join now and earn 1000 SkillPoints!
  //   🤝 Invite friends & get referral bonuses.
  //   📲 Complete social media quests for daily rewards!
  //   🎮 Level up your AI skills and become a Knowledge Champion!

  //   Join Skilleareum DeX and start your AI Learning journey today! 🚀✨

  //   `;

  //   navigator.clipboard.writeText(text).then(() => {
  //     setIsCopied(true);
  //     setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  //   });
  // };
  const [isShare, setShare] = useState(false);
  const referral_url = `https://web.skilleareum.ai/UserSignup?referral_code=${encodeURIComponent(userData.referral_code)}`;

  const text = `${referral_url}\n\n${t("referral.message")}`;
  const handleShare = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setShare(!isShare);
  };

  const shareViaWhatsApp = async () => {
    // playSound();
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
    setTimeout(() => {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        text
      )}`;
      window.open(whatsappUrl, "_blank");
    }, 200);
  };

  const shareViaTelegram = async () => {
    // playSound();
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
    setTimeout(() => {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
        text
      )}&text=Skilleareum`;
      window.open(telegramUrl, "_blank");
    }, 200);
  };

  const shareViaTwitter = async () => {
    // playSound();
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
    setTimeout(() => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}`;
      window.open(twitterUrl, "_blank");
    }, 200);
  };

  const handleCopy = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    const url = `https://web.skilleareum.ai/UserSignup?referral_code=${encodeURIComponent(userData.referral_code)}`;
    const text = `${url}\n\n${t("referral.message")}`;

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const getReferralCount = async () => {
    try {
      const details = await axios.get(
        `${SERVER_URL}/api/getReferralCount?userId=${userData.id}`
      );
    //  console.log("Referal details", details.data.data);
      setReferralCount(details.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getReferralCount();
  }, []);
  function secureDisplay(text) {
    // Split the text into words
  //  console.log(text);
    const words = text.split("");
  //  console.log(words, words.length);
    if (words.length < 4) {
      return text + " ****";
    }
    if (words.length > 4 && words.length < 6) {
      return words.slice(0, 4).join(" ") + " " + "*".repeat(10);
    }
    // If the text has more than 6 words, show first 4 and last 2, with asterisks in between
    if (words.length > 6) {
      return (
        words.slice(0, 4).join(" ") +
        " " +
        "*".repeat(10) +
        " " +
        words.slice(-3).join(" ")
      );
    }

    // For texts with 4 to 6 words, display the first 4 and replace the rest with asterisks
    return text;
  }
  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <DashboardLayout>
    <div className="relative text-white font-poppins mt-28 ">
     
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
          
              <div className=" w-[95%] mx-auto sm:w-full   z-10 ">             
                <div className="w-full max-w-md mx-auto overflow-hidden overflow-y-auto pt-5 ">
                  <div className="">
                    <p className="text-lg font-medium uppercase font-zendots text-center">
                      {t("invite.title")}
                    </p>
                    <p className="text-center text-[11px] uppercase mt-1">
                      {t("invite.subtitle")}{" "}
                    </p>
                  </div>

                  <div className="mt-5 md:w-[100%] mx-auto flex justify-center items-center relative ">
                    <div
                      className="w-[47%] max-w-48 rotate-6 z-10 rounded-xl mt-5  border border-[#1AE348] "
                      style={{
                        background:
                          "radial-gradient(76.25% 347.22% at 51.11% 59.77%, #070E3A 0%, rgba(19, 40, 160, 0) 94.66%)",
                      }}
                    >
                      <div
                        className="w-full h-full  rounded-xl  flex "
                        style={{
                          background:
                            "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                        }}
                      >
                        <div className=" w-full h-full bg-[#334694]/30 rounded-xl px-1 sm:px-2 py-5 backdrop-blur-sm">
                          <p className=" font-semibold text-sm text-center uppercase ">
                            {t("invite.reward1")}
                          </p>
                          <div className=" bg-black/50 backdrop-blur border-[0.5px] border-[#1AE3484D] rounded-xl p-2 mt-5 ">
                            <div className="flex">
                              <img
                                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                className="w-12 h-12  "
                              />
                              <div>
                                <p className=" text-white uppercase text-3xl font-bold ">
                                  1000
                                </p>
                                <p className=" uppercase text-xs">
                                  {t("invite.skillPoints")}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs font-medium text-gray-400 text-center mt-2  ">
                              Skill Points for you and your F/F Joined
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[47%] max-w-48  -rotate-6 z-0 rounded-xl mt-5  border border-[#1AE348] px-1 sm:px-2 py-5 backdrop-blur-[2px] bg-[#070E3A]/50 ">
                      <p className=" font-semibold text-sm text-center uppercase ">
                        {t("invite.reward2")}
                      </p>
                      <div className=" bg-black/50 backdrop-blur border-[0.5px] border-[#1AE3484D] rounded-xl p-2 mt-5 ">
                        <div className="flex">
                          <img
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                            className="w-12 h-12  "
                          />
                          <div>
                            <p className=" text-white uppercase text-3xl font-bold ">
                              2500
                            </p>
                            <p className=" uppercase text-xs">{t("invite.skillPoints")}</p>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-400 text-center mt-2  ">
                          {t("invite.reward2Desc")}
                        </p>
                      </div>
                    </div>

                    {/* <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-2xl p-0.5">
                <div className="bg-[#080B1C] rounded-2xl p-3 flex justify-between items-center">
                  <div className="w-[10%]">
                    <img
                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                      className=" w-9 h-9"
                    />
                  </div>
                  <div className="w-[90%] mt-1 flex items-center gap-7">
                    <p className="pl-2 text-[#FFD600] text-3xl font-bold">
                      +2500
                    </p>
                    <p className="text-xs font-medium">
                      Additonal Skill Points for every 5 F&F Joined
                    </p>
                  </div>
                </div>
              </div> */}
                  </div>

                  <div className="mt-10">
                    <div
                      onClick={handleCopy}
                      className="invite cursor-pointer rounded-xl w-[80%] mx-auto h-9 relative"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                      }}
                    >
                      <div className="h-9 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                      <div className="h-9 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                      <div className=" bg-[#070e3a4b] backdrop-blur-sm h-9 rounded-xl w-full border-[0.5px] border-[#1AE348] "></div>
                      <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                        <p
                          className="uppercase font-medium text-center text-sm font-zendots"
                          style={{
                            color: "transparent",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            backgroundImage:
                              "linear-gradient(to right, #0285FF, #1EEF32)",
                          }}
                        >
                          {isCopied ? "Copied" : "INvite friends"}{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 md:w-[90%] mx-auto z-20 ">
                    <div className="flex justify-between items-center z-20 ">
                      <p className="font-medium uppercase font-zendots ">
                        {t("invite.listTitle")}
                      </p>
                      <div className=" m-2 z-20">
                        {!showMore && referralCount.length > 4 && (
                          <div
                            className="text-sm text-[#1EEF32] font-semibold flex items-center gap-2"
                            onClick={() => {
                              // playSound();
                              setShowMore(true);
                            }}
                          >
                            <p>{t("invite.showMore")}</p>
                            <FontAwesomeIcon icon={faPlus} />
                          </div>
                        )}
                        {showMore && (
                          <div
                            className="text-sm text-[#FF0000] font-semibold flex items-center gap-2"
                            onClick={() => {
                              // playSound();
                              setShowMore(false);
                            }}
                          >
                            <p>{t("invite.showLess")}</p>
                            <FontAwesomeIcon icon={faMinus} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full mt-5 z-20 ">
                      {toShow.length > 0 ? (
                        <div>
                          {Array.isArray(toShow) &&
                            toShow.map((data, index) => (
                              <div
                                key={index}
                                className="z-20 rounded-xl py-5 px-3 mb-2 flex justify-between items-center"
                                style={{
                                  background:
                                    "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
                                }}
                              >
                                <p className="w-1/2 text-sm text-white/50 font-medium text-center">
                                  {(data.email && secureDisplay(data.email)) ||
                                    (data.name && secureDisplay(data.name))}
                                </p>
                                <p className="w-1/2 text-xs text-white/50 font-medium text-center">
                                  {formatDate(data.created_at)}
                                </p>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div
                          className="w-full rounded-xl py-5 px-3 mb-2 flex justify-center items-center"
                          style={{
                            background:
                              "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
                          }}
                        >
                          <p className=" text-sm text-white/50 font-medium text-center">
                            {t("invite.noReferrals")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
       
     

        {isShare && (
          <div
            className="fixed model-overlay inset-0 backdrop-blur-sm bg-black/50 flex items-end  z-50"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="bg-black rounded-t-xl w-full p-5">
              <div className="flex justify-end">
                <FontAwesomeIcon icon={faXmarkCircle} onClick={handleShare} />
              </div>
              <div className="flex justify-center gap-2">
                {/* <div
                className=" px-1.5 py-0.5 rounded cursor-pointer "
                onClick={shareViaWhatsApp}
              >
              <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/whatsapp_neon.png" className="w-10 h-10"></img>
              </div>
              <div
                className=" px-1.5 py-0.5 rounded cursor-pointer"
                onClick={shareViaTwitter}
              >
                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/X1.png" className="w-10 h-10"></img>
              </div> */}
                <div
                  className=" px-1.5 py-0.5 rounded cursor-pointer"
                  onClick={shareViaTelegram}
                >
                  <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/telegram_neon.png"
                    className="w-10 h-10"
                  ></img>
                  {/* <FontAwesomeIcon icon={faTelegram} className="text-4xl " />*/}
                </div>
              </div>
            </div>
          </div>
        )}
     
    </DashboardLayout>
  );
};

export default InvitescreenWeb;
