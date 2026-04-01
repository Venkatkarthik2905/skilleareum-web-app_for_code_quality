import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeftLong, faChevronLeft, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Joyride from "react-joyride";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "../../../../../../config";
import DashboardLayout from "../../Layout/DashboardLayout";

const Leaderboard = ({ onClose }) => {
  const { t } = useTranslation("dashboard");
  // const { playSound } = useSettings();
  // const { playSound } = useSettings();
  const [audio] = useState(new Audio("../assets/EveryTap.mp3"));

  // useEffect(() => {
  //   audio.load();
  // }, [audio]);

  // const playSound = () => {
  //   audio.currentTime = 0;
  //   audio.play();
  // };

  const userData = useSelector((state) => state.user_email);
  const navigate = useNavigate();
  const [DailyChallenge, setDailyChallenge] = useState([]);
  const [Invite, setInvite] = useState([]);
  const [SkillPoint, setSkillPoint] = useState([]);
  const [AiSpace, setAiSpace] = useState([]);
  const [SkillQuest, setSkillQuest] = useState([]);
  const [AIblog, setAIblog] = useState([]);
  const [EmojiGame, setEmojiGame] = useState([]);
  const [showAll, setShowAll] = useState(false);
   const location = useLocation();
  const [startJoyride, setStartJoyride] = useState(false);
    const [run, setRun] = useState(false);
      const { NewUser } = location.state || { NewUser: false };
      // const NewUser  = true;

  const options = [
    { id: "dailyChallenge", label: t("leaderboard.tabs.dailyChallenge") },
    { id: "inviteFandF", label: t("leaderboard.tabs.inviteFandF") },
    { id: "skillPoints", label: t("leaderboard.tabs.skillPoints") },
  ];

  // const handlenavigation = () => {
  //   if (navigator.vibrate) {
  //     navigator.vibrate(100);
  //   }
  //   navigate("/Profile");
  // };

  const getLeaderboardData = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/leaderboard?userId=${userData.id}`
      );
     // console.log(data);
      setDailyChallenge(data.dailyChallenge);
      setInvite(data.inviteFandF);
      setSkillPoint(data.skillPoints);
      setAiSpace(data.AISpaceData);
      setSkillQuest(data.quizData);
      setEmojiGame(data.emojiGameData);
      setAIblog(data.aiBlogData)
    } catch (error) { }
  };
  useEffect(() => {
    getLeaderboardData();
  }, []);
  const [activeTab, setActiveTab] = useState("dailyChallenge");
  // console.log(DailyChallenge, Invite, SkillPoint, activeTab);

  const profile = [
    {
      img: "../assets/Rank3.png",
      id: "Skill-id#sklrm",
      email: "abc@gmail.com",
      count: "112",
      rank: "1"
    },
    {
      img: "../assets/user1.png",
      id: "Skill-id#sklrm",
      email: "abc@gmail.com",
      count: "112",
    },
    {
      img: "../assets/Rank2.png",
      id: "Skill-id#sklrm",
      email: "abc@gmail.com",
      count: "112",
    },
    {
      img: "../assets/user2.png",
      id: "Skill-id#sklrm",
      email: "abc@gmail.com",
      count: "112",
    },
  ];

   const [steps] = useState([
    {
      target: ".leaderboard",
      content: <span>{t("leaderboard.joyride")}</span>,
      disableBeacon: true,
    },
  ]);
       
       useEffect (() => {
        if(NewUser){
          setStartJoyride(true); 
        }
       },[]);
  
       const handleJoyrideCallback = (data) => {
        const { action, index, type } = data;
        if (type === "tour:end") {
          setRun(false);
        }
      };
  

  return (
    <DashboardLayout>
    <div className="w-full md:w-[85%] lg:mx-auto ml-auto relative h-full overflow-hidden overflow-y-auto text-white font-poppins lg:px-20 sm:px-5 mt-28 ">
            <div className="w-full relative z-10 py-3 ">

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
                          fontSize: "14px"
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
              )}  */}

    <button className=" absolute top-3  md:left-0 left-5 font-poppins " onClick={() => {
                if (navigator.vibrate) {
                  navigator.vibrate(100);
                }
                // playSound();
               navigate("/UserProfile")
              }}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </button >

                {/* <div className="w-full ">
                  <div>
                    <p className="w-full font-medium text-center font-zendots uppercase">
                      Leaderboard
                    </p>
                  </div>
                </div> */}

                <div className=" flex justify-center items-center gap-1 w-[95%] md:w-[100%] mx-auto mt-10 ">
                  <div  className="flex justify-between items-center gap-2 overflow-hidden overflow-x-auto font-zendots ">
                    {/* {(showAll ? options : options.slice(0, 10)).map((option) => ( */}
                    {options.map((option) => (
                      <div
                        key={option.id}
                        className={`w-36 text-center cursor-pointer py-1.5 px-4 rounded-xl bg-gradient-to-l from-[#1EEF32]/20 from-5% to-[#303E8A]/20 to-54%  ${activeTab === option.id
                          ? "bg-gradient-to-l from-[#1EEF32]/85 to-[#303E8A]/85 to-40% text-white font-semibold border border-[#1AE348]/60"
                          : ""
                          } `}
                        onClick={() => {
                          if (navigator.vibrate) {
                            navigator.vibrate(100);
                          }
                          // playSound();
                          setActiveTab(option.id);
                        }}
                      >
                        <p
                          className={` ${activeTab === option.id ? "" : " text-gray-400 "
                            } text-xs font-medium whitespace-nowrap `}
                        >
                          {option.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div
                    className="cursor-pointer text-sm font-medium"
                    onClick={() => {
                      // playSound();
                      setShowAll(!showAll);
                    }}
                  >
                    {/* {showAll ? (
                      <button
                        style={{
                          backgroundClip: "text",
                          color: "transparent",
                          WebkitBackgroundClip: "text",
                          backgroundImage:
                            "linear-gradient(to right, #0285FF, #1EEF32 )",
                        }}
                        className="text-2xl"
                      >
                        −
                      </button>
                    ) : (
                      <button
                        style={{
                          backgroundClip: "text",
                          color: "transparent",
                          WebkitBackgroundClip: "text",
                          backgroundImage:
                            "linear-gradient(to right, #0285FF, #1EEF32 )",
                        }}
                        className="text-2xl"
                      >
                        +
                      </button>
                    )} */}
                  </div>
                </div>

                <div  className="leaderboard relative flex justify-around mt-24 h-[8rem] rounded-t-xl bg-gradient-to-tr from-[#303E8A]/40 from-60% to-[#1EEF32]/40 gap-5 px-5 backdrop-blur ">
                  <div className=" bg-gradient-to-r from-[#415243] via-[#1EEF32]/60 to-[#415243] h-0.5 w-full absolute bottom-0 " />

                  <div translate="no"  className="w-full -translate-y-5  justify-center items-center flex flex-col z-10 relative">
                    <div className=" bg-[#1FEA32]/55 w-[110px] h-[110px]  absolute -top-7 z-0 rounded-full blur-sm "> </div>
                    <div className="z-20 w-24 h-24 rounded-full flex justify-center items-center bg-black/70  border-4 border-[#1EEF32] p-1 relative">
                      <div className=" absolute top-1 -right-3  bg-[#1EEF32] w-8 h-8 flex justify-center items-center rounded-full border-2 border-black/50 text-[#222222] font-bold ">
                        <p className="text-xs">
                          2
                          <sup className="font-bold uppercase">
                            {t("leaderboard.rankSuffix.nd")}
                          </sup>
                        </p>
                      </div>
                      <div
                      translate="no"
                        className="w-full h-full pt-3 overflow-hidden bg-gradient-to-t from-[#0285FF] to-[#1EEF32] bg-cover bg-center rounded-full mx-auto flex justify-center items-center"
                      >
                        <img
                          src={
                            activeTab === "dailyChallenge" && DailyChallenge.length > 1 && DailyChallenge[1]?.avatar
                              ? DailyChallenge[1]?.avatar
                              : activeTab === "inviteFandF" && Invite.length > 1 && Invite[1]?.avatar
                                ? Invite[1]?.avatar
                                : activeTab === "skillPoints" && SkillPoint.length > 1 && SkillPoint[1]?.avatar
                                  ? SkillPoint[1]?.avatar
                                  : activeTab === "AISpace" && AiSpace.length > 1 && AiSpace[1]?.avatar
                                    ? AiSpace[1]?.avatar
                                    : activeTab === "AIskillquest" && SkillQuest.length > 1 && SkillQuest[1]?.avatar
                                      ? SkillQuest[1]?.avatar
                                      : activeTab === "EmojiGame" && EmojiGame.length > 1 && EmojiGame[1]?.avatar
                                ? EmojiGame[1]?.avatar
                                : activeTab === "AIblog" && AIblog.length > 1 && AIblog[1]?.avatar
                                ? AIblog[1]?.avatar
                                      : "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png"
                          }
                          alt="User Avatar"
                          translate="no" 
                          className="rounded-full w-16 h-16"
                        />




                      </div>
                    </div>

                    <div className="z-30">
                      <div className="flex justify-center items-center gap-2 -translate-y-4 z-30 ">
                        <div className=" w-full bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A]/65 to-[#070E3A]/0 rounded-lg ">
                          <div className=" w-full  rounded-lg py-1 px-2 backdrop-blur border border-[#1AE348]/50 " style={{ background: "radial-gradient(220.68% 479.94% at 50% 327.68%, #022505 50.11%, #059412 73.33%)" }}>
                            <p translate="no"  className="relative uppercase text-center cursor-pointer text-sm font-medium"
                            >
                              {activeTab === "dailyChallenge" &&
                                DailyChallenge.length > 1 &&
                                DailyChallenge[1].referral_code}
                              {activeTab === "inviteFandF" &&
                                Invite.length > 1 &&
                                Invite[1].referral_code}
                              {activeTab === "skillPoints" &&
                                SkillPoint.length > 1 &&
                                SkillPoint[1].referral_code}
                              {activeTab === "AISpace" &&
                                AiSpace.length > 1 &&
                                AiSpace[1].referral_code}
                              {activeTab === "AIskillquest" &&
                                SkillQuest.length > 1 &&
                                SkillQuest[1].referral_code}
                              {activeTab === "EmojiGame" &&
                                EmojiGame.length > 1 &&
                                EmojiGame[1].referral_code}
                              {activeTab === "AIblog" &&
                                AIblog.length > 1 &&
                                AIblog[1].referral_code}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className=" relative -translate-y-2">
                        <p translate="no"   style={{ textShadow: "3px 3px 10px #1EEF32" }} className=" text-center text-[#1EEF32] font-semibold ">
                          {activeTab === "dailyChallenge" &&
                            DailyChallenge.length > 1 &&
                            DailyChallenge[1].airdrops}
                          {activeTab === "inviteFandF" &&
                            Invite.length > 1 &&
                            Invite[1].referral_count}
                          {activeTab === "skillPoints" &&
                            SkillPoint.length > 1 &&
                            SkillPoint[1].token_balance}
                          {activeTab === "AISpace" &&
                            AiSpace.length > 1 &&
                            AiSpace[1].action_count}
                          {activeTab === "AIskillquest" &&
                            SkillQuest.length > 1 &&
                            SkillQuest[1].highest_day}
                          {activeTab === "AIblog" &&
                            AIblog.length > 1 &&
                            AIblog[1].claimed_days}
                          {activeTab === "EmojiGame" &&
                            EmojiGame.length > 1 &&
                            EmojiGame[1].completed_days}</p>
                        <p className=" text-xs font-medium text-white/70 uppercase text-center  ">
                          {activeTab === "dailyChallenge" && (
                            <span translate="yes"> {t("leaderboard.stats.dailyStreak")}</span>
                          )}
                          {activeTab === "inviteFandF" && (
                            <span translate="yes">{t("leaderboard.stats.referrals")}</span>
                          )}
                          {activeTab === "skillPoints" && (
                            <span translate="yes">{t("leaderboard.stats.skillPoints")}</span>
                          )}
                          {activeTab === "AIskillquest" && (
                            <span translate="yes">{t("leaderboard.stats.days")}</span>
                          )}
                          {activeTab === "AISpace" && (
                            <span translate="yes">{t("leaderboard.stats.claims")}</span>
                          )}
                          {activeTab === "AIblog" && (
                            <span translate="yes">{t("leaderboard.stats.days")}</span>
                          )}
                          {activeTab === "EmojiGame" && (
                            <span translate="yes">{t("leaderboard.stats.days")}</span>
                          )}
                        </p>
                      </div>
                    </div>

                  </div>

                

                  <div translate="no"  className="w-full -translate-y-12  justify-center items-center flex flex-col z-10 relative">
                    <div className=" bg-[#0285FF]/55 w-[110px] h-[110px]  absolute -top-7 z-0 rounded-full blur-sm "> </div>
                    <div className="z-20 w-24 h-24 rounded-full flex justify-center items-center bg-black/70  border-4 border-[#0285FF] p-1 relative ">
                      <div className=" absolute top-1 -right-3  bg-[#0285FF] w-8 h-8 flex justify-center items-center rounded-full border-2 border-black/50 text-[#222222] font-bold ">
                        <p className="text-xs">
                          1
                          <sup className="font-bold uppercase">
                            {t("leaderboard.rankSuffix.st")}
                          </sup>
                        </p>
                      </div>
                      <div
                      translate="no" 
                        className="w-full h-full pt-3 overflow-hidden bg-gradient-to-t from-[#0285FF] to-[#1EEF32] bg-cover bg-center rounded-full mx-auto flex justify-center items-center"
                      >
                        <img
                          src={
                            activeTab === "dailyChallenge" && DailyChallenge.length > 0 && DailyChallenge[0]?.avatar
                              ? DailyChallenge[0]?.avatar
                              : activeTab === "inviteFandF" && Invite.length > 0 && Invite[0]?.avatar
                                ? Invite[0]?.avatar
                                : activeTab === "skillPoints" && SkillPoint.length > 0 && SkillPoint[0]?.avatar
                                  ? SkillPoint[0]?.avatar
                                  : activeTab === "AISpace" && AiSpace.length > 0 && AiSpace[0]?.avatar
                                    ? AiSpace[0]?.avatar
                                    : activeTab === "AIskillquest" && SkillQuest.length > 0 && SkillQuest[0]?.avatar
                                      ? SkillQuest[0]?.avatar
                                    : activeTab === "EmojiGame" && EmojiGame.length > 0 && EmojiGame[0]?.avatar
                                      ? EmojiGame[0]?.avatar
                                    : activeTab === "AIblog" && AIblog.length > 0 && AIblog[0]?.avatar
                                      ? AIblog[0]?.avatar
                                      : "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png"
                          }
                          alt="User Avatar"
                          className="rounded-full w-16 h-16"
                        />

                      </div>
                    </div>

                    <div className="z-30">
                      <div className="flex justify-center items-center gap-2 -translate-y-4 z-30 ">
                        <div className=" w-full bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A]/65 to-[#070E3A]/0 rounded-lg ">
                          <div className=" w-full  rounded-lg py-1 px-2 backdrop-blur border border-[#1AE348]/50 " style={{
                            background: "radial-gradient(220.68% 479.94% at 50% 327.68%, #071E33 50.11%, #0285FF 73.33%)"
                          }}>
                            <p translate="no"  className="relative uppercase text-center cursor-pointer text-sm font-medium"
                            >{activeTab === "dailyChallenge" &&
                              DailyChallenge.length > 0 &&
                              DailyChallenge[0].referral_code}
                              {activeTab === "inviteFandF" &&
                                Invite.length > 0 &&
                                Invite[0].referral_code}
                              {activeTab === "skillPoints" &&
                                SkillPoint.length > 0 &&
                                SkillPoint[0].referral_code}
                              {activeTab === "AISpace" &&
                                AiSpace.length > 0 &&
                                AiSpace[0].referral_code}
                              {activeTab === "AIskillquest" &&
                                SkillQuest.length > 0 &&
                                SkillQuest[0].referral_code}
                              {activeTab === "EmojiGame" &&
                                EmojiGame.length > 0 &&
                                EmojiGame[0].referral_code}
                              {activeTab === "AIblog" &&
                                AIblog.length > 0 &&
                                AIblog[0].referral_code}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className=" relative -translate-y-2">
                        <p translate="no"  style={{ textShadow: "3px 3px 10px #0285FF" }} className=" text-center text-[#0285FF] font-semibold ">
                          {activeTab === "dailyChallenge" &&
                            DailyChallenge.length > 0 &&
                            DailyChallenge[0].airdrops}
                          {activeTab === "inviteFandF" &&
                            Invite.length > 0 &&
                            Invite[0].referral_count}
                          {activeTab === "skillPoints" &&
                            SkillPoint.length > 0 &&
                            SkillPoint[0].token_balance}
                          {activeTab === "AISpace" &&
                            AiSpace.length > 0 &&
                            AiSpace[0].action_count}
                          {activeTab === "AIskillquest" &&
                            SkillQuest.length > 0 &&
                            SkillQuest[0].highest_day}
                          {activeTab === "AIblog" &&
                            AIblog.length > 0 &&
                            AIblog[0].claimed_days}
                          {activeTab === "EmojiGame" &&
                            EmojiGame.length > 0 &&
                            EmojiGame[0].completed_days}


                        </p>
                        <p className=" text-xs font-medium text-white/70 uppercase text-center  ">
                          {activeTab === "dailyChallenge" && (
                            <span translate="yes"> {t("leaderboard.stats.dailyStreak")}</span>
                          )}
                          {activeTab === "inviteFandF" && (
                            <span translate="yes">{t("leaderboard.stats.referrals")}</span>
                          )}
                          {activeTab === "skillPoints" && (
                            <span translate="yes">{t("leaderboard.stats.skillPoints")}</span>
                          )}
                          {activeTab === "AIskillquest" && (
                            <span translate="yes">{t("leaderboard.stats.days")}</span>
                          )}
                          {activeTab === "AISpace" && (
                            <span translate="yes">{t("leaderboard.stats.claims")}</span>
                          )}
                          {activeTab === "AIblog" && (
                            <span translate="yes">{t("leaderboard.stats.days")}</span>
                          )}
                          {activeTab === "EmojiGame" && (
                            <span translate="yes">{t("leaderboard.stats.days")}</span>
                          )}
                        </p>
                      </div>
                    </div>

                  </div>

                 

                  <div translate="no" className="w-full -translate-y-5  justify-center items-center flex flex-col z-10 relative">
                    <div className=" bg-[#B3FEDA]/55 w-[110px] h-[110px]  absolute -top-7 z-0 rounded-full blur-sm "> </div>
                    <div className="z-20 w-24 h-24 rounded-full flex justify-center items-center bg-black/70  border-4 border-[#B3FEDA] p-1 relative ">
                      <div className=" absolute top-1 -right-3  bg-[#B3FEDA] w-8 h-8 flex justify-center items-center rounded-full border-2 border-black/50 text-[#222222] font-bold ">
                        <p className="text-xs">
                          3
                          <sup className="font-bold uppercase">
                            {t("leaderboard.rankSuffix.rd")}
                          </sup>
                        </p>
                      </div>
                      <div
                      translate="no" 
                        className="w-full h-full pt-3 overflow-hidden bg-gradient-to-t from-[#0285FF] to-[#1EEF32] bg-cover bg-center rounded-full mx-auto flex justify-center items-center"
                      >
                        <img
                          src={
                            activeTab === "dailyChallenge" && DailyChallenge.length > 2 && DailyChallenge[2]?.avatar
                              ? DailyChallenge[2]?.avatar
                              : activeTab === "inviteFandF" && Invite.length > 2 && Invite[2]?.avatar
                                ? Invite[2]?.avatar
                                : activeTab === "skillPoints" && SkillPoint.length > 2 && SkillPoint[2]?.avatar
                                  ? SkillPoint[2]?.avatar
                                  : activeTab === "AISpace" && AiSpace.length > 2 && AiSpace[2]?.avatar
                                    ? AiSpace[2]?.avatar
                                    : activeTab === "AIskillquest" && SkillQuest.length > 2 && SkillQuest[2]?.avatar
                                      ? SkillQuest[2]?.avatar
                                    : activeTab === "AIblog" && AIblog.length > 2 && AIblog[2]?.avatar
                                      ? AIblog[2]?.avatar
                                    : activeTab === "EmojiGame" && EmojiGame.length > 2 && EmojiGame[2]?.avatar
                                      ? EmojiGame[2]?.avatar
                                      : "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png"
                          }
                          alt="User Avatar"
                          className="rounded-full w-16 h-16"
                        />


                      </div>
                    </div>

                    <div className="z-30">
                      <div className="flex justify-center items-center gap-2 -translate-y-4 z-30 ">
                        <div className=" w-full bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A]/65 to-[#070E3A]/0 rounded-lg ">
                          <div className=" w-full  rounded-lg py-1 px-2 backdrop-blur border border-[#B3FEDA]/50 " style={{
                            background: "radial-gradient(220.68% 479.94% at 50% 327.68%, #092618 50.11%, #6A907E 73.33%)"
                          }}>
                            <p className="relative uppercase text-center cursor-pointer text-sm font-medium"
                            translate="no" 
                            >
                              {" "}
                              {activeTab === "dailyChallenge" &&
                                DailyChallenge.length > 2 &&
                                DailyChallenge[2].referral_code}
                              {activeTab === "inviteFandF" &&
                                Invite.length > 2 &&
                                Invite[2].referral_code}
                              {activeTab === "skillPoints" &&
                                SkillPoint.length > 2 &&
                                SkillPoint[2].referral_code}
                              {activeTab === "AISpace" &&
                                AiSpace.length > 0 &&
                                AiSpace[2].referral_code}
                              {activeTab === "AIskillquest" &&
                                SkillQuest.length > 0 &&
                                SkillQuest[2].referral_code}
                              {activeTab === "EmojiGame" &&
                                EmojiGame.length > 0 &&
                                EmojiGame[2].referral_code}
                              {activeTab === "AIblog" &&
                                AIblog.length > 0 &&
                                AIblog[2].referral_code}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className=" relative -translate-y-2">
                        <p translate="no"  style={{ textShadow: "3px 3px 10px #B3FEDA" }} className=" text-center text-[#B3FEDA] font-semibold ">
                          {activeTab === "dailyChallenge" &&
                            DailyChallenge.length > 2 &&
                            DailyChallenge[2].airdrops}
                          {activeTab === "inviteFandF" &&
                            Invite.length > 2 &&
                            Invite[2].referral_count}
                          {activeTab === "skillPoints" &&
                            SkillPoint.length > 2 &&
                            SkillPoint[2].token_balance}
                          {activeTab === "AISpace" &&
                            AiSpace.length > 0 &&
                            AiSpace[2].action_count}
                          {activeTab === "AIskillquest" &&
                            SkillQuest.length > 0 &&
                            SkillQuest[2].highest_day}
                          {activeTab === "AIblog" &&
                            AIblog.length > 0 &&
                            AIblog[2].claimed_days}
                          {activeTab === "EmojiGame" &&
                            EmojiGame.length > 0 &&
                            EmojiGame[2].completed_days}
                        </p>
                        <p className=" text-xs font-medium text-white/70 uppercase text-center  ">
                          {activeTab === "dailyChallenge" && (
                            <span translate="yes"> {t("leaderboard.stats.dailyStreak")}</span>
                          )}
                          {activeTab === "inviteFandF" && (
                            <span translate="yes">{t("leaderboard.stats.referrals")}</span>
                          )}
                          {activeTab === "skillPoints" && (
                            <span translate="yes">{t("leaderboard.stats.skillPoints")}</span>
                          )}
                          {activeTab === "AIskillquest" && (
                            <span translate="yes">{t("leaderboard.stats.days")}</span>
                          )}
                          {activeTab === "AISpace" && (
                            <span translate="yes">{t("leaderboard.stats.claims")}</span>
                          )}
                          {activeTab === "AIblog" && (
                            <span translate="yes">{t("leaderboard.stats.days")}</span>
                          )}
                          {activeTab === "EmojiGame" && (
                            <span translate="yes">{t("leaderboard.stats.days")}</span>
                          )}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="mt-5 w-[95%] mx-auto relative" >

                  {activeTab === "dailyChallenge" &&
                    DailyChallenge.length > 3 &&
                    DailyChallenge.slice(3).map((data, index) => (
                      // <div
                      // onClick={handleTelegram}
                      // className="w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3">
                      // <div className="rounded-xl  bg-[#070E3A] w-full h-full">
                      //   <div className="py-2 px-3 rounded-xl flex justify-between items-center" style={{
                      //     background: "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)"
                      //   }}>
                      <div
                        key={index}
                        className="w-[95%] mx-auto h-full relative bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                      >
                        <div className="rounded-xl  bg-[#070E3A] w-full h-full flex items-center justify-between gap-3">
                          <div className="w-full py-3 pr-3 pl-10 rounded-xl flex justify-between items-center" style={{
                            background: "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)"
                          }}>

                            <div className=" absolute -left-3 rounded-full flex justify-center items-center overflow-hidden">
                              <div className="relative ">
                                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg" className="w-12 h-12" />
                                <div className="w-8 h-8 absolute top-2 right-2 overflow-hidden flex justify-center items-center bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-full pt-4">
                                  <img
                                    src={data?.avatar ? data?.avatar : "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png"}
                                    className=" "
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-5" >
                              <p className=" text-white/40 font-extrabold ">#{data.rank}</p>

                              <div>
                                <p className="font-medium text-white/85 tracking-wider text-sm">
                                  {userData.id === data.id
                                    ? data.referral_code + t("leaderboard.youSuffix")
                                    : data.referral_code}
                                </p>
                                <p className="text-[10px] text-[#B7B3B3]">
                                  {/* {data.email} */}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-center text-sm">
                                {`${data.airdrops} ${
                                  data.airdrops > 1
                                    ? t("leaderboard.days")
                                    : t("leaderboard.day")
                                }`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {activeTab === "inviteFandF" &&
                    Invite.length > 3 &&
                    Invite.slice(3).map((data, index) => (
                      <div
                        key={index}
                        className="w-[95%] mx-auto h-full relative bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                      >
                        <div className="rounded-xl  bg-[#070E3A] w-full h-full flex items-center justify-between gap-3">
                          <div className="w-full py-3 pr-3 pl-10 rounded-xl flex justify-between items-center" style={{
                            background: "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)"
                          }}>

                            <div className=" absolute -left-3 rounded-full flex justify-center items-center overflow-hidden">
                              <div className="relative ">
                                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg" className="w-12 h-12" />
                                <div className="w-8 h-8 absolute top-2 right-2 overflow-hidden flex justify-center items-center bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-full pt-4">
                                  <img
                                    src={data?.avatar ? data?.avatar : "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png"}
                                    className=" "
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-5" >
                              <p className=" text-white/40 font-extrabold ">#{data.rank}</p>
                              <div>
                                <p className="font-medium text-sm">
                                  {userData.id === data.id
                                    ? data.referral_code + t("leaderboard.youSuffix")
                                    : data.referral_code}
                                </p>
                                <p className="text-[10px] text-[#B7B3B3]">
                                  {/* {data.email} */}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-center text-sm">
                                {`${data.referral_count} ${t(
                                  "leaderboard.stats.referrals"
                                )}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {activeTab === "skillPoints" &&
                    SkillPoint.length > 3 &&
                    SkillPoint.slice(3).map((data, index) => (
                      <div
                        key={index}
                        className="w-[95%] mx-auto h-full relative bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                      >
                        <div className="rounded-xl  bg-[#070E3A] w-full h-full flex items-center justify-between gap-3">
                          <div className="w-full py-3 pr-3 pl-10 rounded-xl flex justify-between items-center" style={{
                            background: "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)"
                          }}>

                            <div className=" absolute -left-3 rounded-full flex justify-center items-center overflow-hidden">
                              <div className="relative ">
                                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg" className="w-12 h-12" />
                                <div className="w-8 h-8 absolute top-2 right-2 overflow-hidden flex justify-center items-center bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-full pt-4">
                                  <img
                                    src={data?.avatar ? data?.avatar : data?.img}
                                    className=" "
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-5" >
                              <p className=" text-white/40 font-extrabold ">#{data.rank}</p>

                              <div>
                                <p className="font-medium text-sm">
                                  {userData.id === data.id
                                    ? data.referral_code + t("leaderboard.youSuffix")
                                    : data.referral_code}
                                </p>
                                <p className="text-[10px] text-[#B7B3B3]">
                                  {/* {data.email} */}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-center text-sm">
                                <span>
                                  <img
                                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                    alt="Coin"
                                    className="inline-block w-8 h-8"
                                  />{" "}
                                  {data.token_balance}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {activeTab === "AISpace" &&
                    AiSpace.length > 3 &&
                    AiSpace.slice(3).map((data, index) => (
                      <div
                        key={index}
                        className="w-[95%] mx-auto h-full relative bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                      >
                        <div className="rounded-xl  bg-[#070E3A] w-full h-full flex items-center justify-between gap-3">
                          <div className="w-full py-3 pr-3 pl-10 rounded-xl flex justify-between items-center" style={{
                            background: "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)"
                          }}>

                            <div className=" absolute -left-3 rounded-full flex justify-center items-center overflow-hidden">
                              <div className="relative ">
                                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg" className="w-12 h-12" />
                                <div className="w-8 h-8 absolute top-2 right-2 overflow-hidden flex justify-center items-center bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-full pt-4">
                                  <img
                                    src={data?.avatar ? data?.avatar : data?.img}
                                    className=" "
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-5" >
                              <p className=" text-white/40 font-extrabold ">#{data.rank}</p>

                              <div>
                                <p className="font-medium text-sm">
                                  {userData.id === data.id
                                    ? data.referral_code + t("leaderboard.youSuffix")
                                    : data.referral_code}
                                </p>
                                <p className="text-[10px] text-[#B7B3B3]">
                                  {/* {data.email} */}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-center text-sm">
                                <span>
                                  {/* <img
                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                              alt="Coin"
                              className="inline-block w-8 h-8"
                            />{" "} */}
                                  {`${data.action_count} ${t(
                                    "leaderboard.stats.claims"
                                  )}`}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {activeTab === "AIskillquest" &&
                    SkillQuest.length > 3 &&
                    SkillQuest.slice(3).map((data, index) => (
                      <div
                        key={index}
                        className="w-[95%] mx-auto h-full relative bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                      >
                        <div className="rounded-xl  bg-[#070E3A] w-full h-full flex items-center justify-between gap-3">
                          <div className="w-full py-3 pr-3 pl-10 rounded-xl flex justify-between items-center" style={{
                            background: "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)"
                          }}>

                            <div className=" absolute -left-3 rounded-full flex justify-center items-center overflow-hidden">
                              <div className="relative ">
                                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg" className="w-12 h-12" />
                                <div className="w-8 h-8 absolute top-2 right-2 overflow-hidden flex justify-center items-center bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-full pt-4">
                                  <img
                                    src={data?.avatar ? data?.avatar : data?.img}
                                    className=" "
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-5" >
                              <p className=" text-white/40 font-extrabold ">#{data.rank}</p>

                              <div>
                                <p className="font-medium text-sm">
                                  {userData.id === data.id
                                    ? data.referral_code + t("leaderboard.youSuffix")
                                    : data.referral_code}
                                </p>
                                <p className="text-[10px] text-[#B7B3B3]">
                                  {/* {data.email} */}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-center text-sm">
                                <span>
                                  {/* <img
                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                              alt="Coin"
                              className="inline-block w-8 h-8"
                            />{" "} */}
                                  {`${data.highest_day} ${
                                    data.highest_day > 1
                                      ? t("leaderboard.days")
                                      : t("leaderboard.day")
                                  }`}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  {activeTab === "AIblog" &&
                    AIblog.length > 3 &&
                    AIblog.slice(3).map((data, index) => (
                      <div
                        key={index}
                        className="w-[95%] mx-auto h-full relative bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                      >
                        <div className="rounded-xl  bg-[#070E3A] w-full h-full flex items-center justify-between gap-3">
                          <div className="w-full py-3 pr-3 pl-10 rounded-xl flex justify-between items-center" style={{
                            background: "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)"
                          }}>

                            <div className=" absolute -left-3 rounded-full flex justify-center items-center overflow-hidden">
                              <div className="relative ">
                                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg" className="w-12 h-12" />
                                <div className="w-8 h-8 absolute top-2 right-2 overflow-hidden flex justify-center items-center bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-full pt-4">
                                  <img
                                    src={data?.avatar ? data?.avatar : data?.img}
                                    className=" "
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-5" >
                              <p className=" text-white/40 font-extrabold ">#{data.rank}</p>

                              <div>
                                <p className="font-medium text-sm">
                                  {userData.id === data.id
                                    ? data.referral_code + t("leaderboard.youSuffix")
                                    : data.referral_code}
                                </p>
                                <p className="text-[10px] text-[#B7B3B3]">
                                  {/* {data.email} */}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-center text-sm">
                                <span>
                                  {/* <img
                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                              alt="Coin"
                              className="inline-block w-8 h-8"
                            />{" "} */}
                                  {`${data.claimed_days} ${
                                    data.claimed_days > 1
                                      ? t("leaderboard.days")
                                      : t("leaderboard.day")
                                  }`}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  {activeTab === "EmojiGame" &&
                    EmojiGame.length > 3 &&
                    EmojiGame.slice(3).map((data, index) => (
                      <div
                        key={index}
                        className="w-[95%] mx-auto h-full relative bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                      >
                        <div className="rounded-xl  bg-[#070E3A] w-full h-full flex items-center justify-between gap-3">
                          <div className="w-full py-3 pr-3 pl-10 rounded-xl flex justify-between items-center" style={{
                            background: "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)"
                          }}>

                            <div className=" absolute -left-3 rounded-full flex justify-center items-center overflow-hidden">
                              <div className="relative ">
                                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg" className="w-12 h-12" />
                                <div className="w-8 h-8 absolute top-2 right-2 overflow-hidden flex justify-center items-center bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-full pt-4">
                                  <img
                                    src={data?.avatar ? data?.avatar : data?.img}
                                    className=" "
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-5" >
                              <p className=" text-white/40 font-extrabold ">#{data.rank}</p>

                              <div>
                                <p className="font-medium text-sm">
                                  {userData.id === data.id
                                    ? data.referral_code + t("leaderboard.youSuffix")
                                    : data.referral_code}
                                </p>
                                <p className="text-[10px] text-[#B7B3B3]">
                                  {/* {data.email} */}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-center text-sm">
                                <span>
                                  {/* <img
                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                              alt="Coin"
                              className="inline-block w-8 h-8"
                            />{" "} */}
                                  {`${data.completed_days} ${
                                    data.completed_days > 1
                                      ? t("leaderboard.days")
                                      : t("leaderboard.day")
                                  }`}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
             
            </div>
          </div>
        
    </DashboardLayout>
  );
};

export default Leaderboard;
