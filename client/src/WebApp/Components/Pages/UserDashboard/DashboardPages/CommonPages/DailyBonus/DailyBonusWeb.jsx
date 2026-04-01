import React, { useEffect, useState } from "react";
import {
  faArrowLeft,
  faArrowLeftLong,
  faArrowRight,
  faCheck,
  faCheckCircle,
  faCircle,
  faMinus,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "../../../../../../../config";
import DashboardLayout from "../../../Layout/DashboardLayout";
import DailyRewardWeb from "./DailyRewardWeb";
import AddEmailWeb from "./AddEmailWeb";

const DailyBonusWeb = ({ onBack }) => {
  const { t } = useTranslation("dashboard");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user_email);
  // console.log(userData);
  const [loadingNotificationId, setloadingNotificationId] = useState(null);
  const [loading, setloading] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isEmailLoading, setisEmailLoading] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [OpenRetweet, setOpenRetweet] = useState(false);
  const [isAirDropClaimed, setisAirDropClaimed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [unread, setunread] = useState([]);
  const [Farmingpopup, setFarmingpopup] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);

  const [showMore, setShowMore] = useState(false);
  const [NewshowMore, setNewshowMore] = useState(false);
  const tweets = showMore ? unread : unread.slice(0, 2);
  const [isfollowed, setIsFollowed] = useState(false);
  const [achievedBonus, setAchievedBonus] = useState(null);
  const [referralCount, setReferralCount] = useState(0);

  const [nextBonus, setNextBonus] = useState(null);
  const [isInvited, setIsInvited] = useState(false);
  const [rewardspopup, setRewardsPopup] = useState(false);
  const [streakDay, setStreakDay] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [endTime, setendTime] = useState();
  const [streakPoint, setStreakPoint] = useState(0);
  const [assessmentDays, setAssessmentDays] = useState([]);

  const [payments, setPayments] = useState([]);
  const displayedPayments = NewshowMore ? payments : payments.slice(0, 5);
  const authToken = useSelector((state) => state.token);
  const [isTelegram, setTelegram] = useState(false);

  const [isAssessment, setAssessment] = useState(false);
  const [isTwitter, setTwitter] = useState(false);
  const [isApiCall, setisApiCall] = useState(false);
  const [isJoined, setisJoined] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setmessage] = useState(t("dailyBonus.claimNow"));

  const handleFarming = () => {
    setFarmingpopup(!Farmingpopup);
  };

  const userEmail = useSelector((state) => state.user_email.id);

  useEffect(() => {
    const fetchAssessmentDays = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/get-next-assessment-day`,
          {
            params: { email: userEmail },
          }
        );

        setAssessmentDays(response.data);
      } catch (error) {
        console.error("Error fetching assessment days:", error);
      }
    };

    fetchAssessmentDays();
  }, [userEmail]);

  const handleCloseRetweet = () => {
    setCurrentNotification(null);
    setOpenRetweet(false);
  };
  const handleOpenRetweet = (notification) => {
   // console.log(notification);
    setCurrentNotification(notification);
    setOpenRetweet(true);
  };
  const handlenextAssessment = (day) => {
    const status = assessmentDays.find(
      (assessment) => assessment.day === day
    )?.status;
    if (status === "Available") {
      window.location.href = `/AISkillQuestWeb?day=${day}`;
    } else {
      toast.error(t("dailyBonus.toasters.nextAssessment"));
    }
  };

  const ReferralBonuses = {
    5: {
      bonus_count: 5,
      bonus_point: 2500,
      condition: t("dailyBonus.referralBonuses.bonus5"),
      description: t("dailyBonus.referralBonuses.bonus5Desc"),
    },
    10: {
      bonus_count: 10,
      bonus_point: 5000,
      condition: t("dailyBonus.referralBonuses.bonus10"),
      description: t("dailyBonus.referralBonuses.bonus10Desc"),
    },
    25: {
      bonus_count: 25,
      bonus_point: 12500,
      condition: t("dailyBonus.referralBonuses.bonus25"),
      description: t("dailyBonus.referralBonuses.bonus25Desc"),
    },
    50: {
      bonus_count: 50,
      bonus_point: 20000,
      condition: t("dailyBonus.referralBonuses.bonus50"),
      description: t("dailyBonus.referralBonuses.bonus50Desc"),
    },
    100: {
      bonus_count: 100,
      bonus_point: 50000,
      condition: t("dailyBonus.referralBonuses.bonus100"),
      description: t("dailyBonus.referralBonuses.bonus100Desc"),
    },
  };

  const getRewardDetails = async () => {
    // // playsound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/air_drop_streak?userId=${userData.id}&flag=${1}`,
        {
          userId: userData.id,
        }
      );
     // console.log(data);

      setStreakDay(data.streak);

      setRewardsPopup(true);
    } catch (error) {
      console.error(error);
    }
  };
  const checkIsRewardClaimed = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/air_drop_streak?userId=${userData.id}&flag=${1}`,
        {
          userId: userData.id,
        }
      );

      setStreakPoint(data.streak);
      if (!data.success) {
        setisAirDropClaimed(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateStreaks = async () => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/air_drop_streak?userId=${userData.id}&streakDay=${
          streakDay + 1
        }`,
        {
          userId: userData.id,
        }
      );
    //  console.log(data);
      setisAirDropClaimed(true);
      toast.success(t("dailyBonus.toasters.bonusClaimed"));
    } catch (e) {
    //  console.log(e);
    }
  };

  const handleClaim = async () => {
    // // playsound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setloading(true);

    const registerUser = await axios.get(
      `${SERVER_URL}/api/isexist?email=${userData.id}`
    );
    if (!registerUser.data.username) {
      setmessage(t("dailyBonus.toasters.addUsername"));

      setTimeout(() => {
        navigate("/UserProfile");
      }, 2000);
      setloading(false);
    } else {
      setloading(true);
      const isFollow = await axios.get(
        `${SERVER_URL}/api/isFollowedX?userName=${registerUser.data.username}`
      );
      if (
        isFollow.data.message === "Follow to claim reward" ||
        isFollow.data.message === "Reward already claimed"
      ) {
        toast.error(isFollow.data.message);
      } else {
        toast.success(isFollow.data.message);
      }
      setloading(false);
      handleTwitter();
      setTwitter(false);
    }
  };

  const getAllNotification = async () => {
    const { data } = await axios.get(
      `${SERVER_URL}/api/getAllNotification?user_id=${userData.id}`
    );

    setunread(data.unread);

    setisJoined(data.telegramJoin);
  };
  const markAsReaded = async (notification_id, tweet_id, created_at) => {
    try {
    //  console.log(notification_id, tweet_id, created_at);
      // console.log(notification_id, tweet_id);
      const registerUser = await axios.get(
        `${SERVER_URL}/api/isexist?email=${userData.id}`
      );
      // console.log(registerUser.data.username);
      if (!registerUser.data.username) {
        toast.error(t("dailyBonus.toasters.addUsername"));
        setTimeout(() => {
          navigate("/UserProfile");
          // window.location.reload();
        }, 1000);
      }
      setloadingNotificationId(notification_id);
      const res = await axios.post(`${SERVER_URL}/api/markAsReaded`, {
        user_id: userData.id,
        notification_id,
        tweet_id,
        created_at,
      });
      // console.log(res);

      if (
        res.data.message === "Reward already claimed" ||
        res.data.message === "Retweet to claim reward"
      ) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
      if (res.data.message === "Reward claimed successfully") {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }

      setloadingNotificationId(null);
      getAllNotification();
      // window.location.reload();
    } catch (error) {
//console.log(error.response.data.message);
      // toast.error(error.response.data.message);
      setloadingNotificationId(null);
    }
  };

  const handleModalSubmit = async (data) => {
    const addUserName = await axios.post(
      `${SERVER_URL}/api/addUserName?name=${data.username}&userId=${userData.id}`
    );

    if (addUserName.data.success === true) {
      setShowModal(false);
      toast.success(addUserName.data.message);
    } else {
      toast.error(addUserName.data.message);
    }

    // Redirect logic if needed
    // window.location.href = `https://x.com/Skilleareum`;
  };
  const claimTelegramReward = async () => {
    // // playsound();
    try {
      setloading(true);
    //  console.log(userData);

      const { data } = await axios.get(
        `${SERVER_URL}/api/telegam/checkUserMembership`,
        {
          params: {
            chatId: userData.chatId,
            userId: userData.id,
          },
        }
      );
      toast.success(data.message);
      setTelegram(false);
      setloading(false);
      if (data.success) {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
        getAllNotification();
      }
    } catch (e) {
//console.log(e);
      setloading(false);
    }
  };

  const handleEmailSubmit = async (data) => {
    setisEmailLoading(true);
    try {
      const addEmail = await axios.get(
        `${SERVER_URL}/api/isexist?email=${data.email}&flag=3&userId=${userData.id}`
      );

      if (addEmail.data.status === "failed") {
        return toast.error(addEmail.data.message);
      } else {
      //  console.log(userData.id);

        try {
          const res = await axios.post(
            `${SERVER_URL}/api/telegram/sendVeficationEmail?email=${data.email}&userId=${userData.id}`
          );

          toast.success(t("dailyBonus.toasters.mailSent"));
          setTimeout(() => setShowEmailModal(false), 2000);
        } catch (error) {
          console.error("Error sending email:", error);
          toast.error(t("dailyBonus.toasters.errorUpdatingMail"));
        }
      }
      setisEmailLoading(false);
    } catch (error) {
      console.error("Error checking email existence:", error);
      toast.error(t("dailyBonus.toasters.errorCheckingEmail"));
      setisEmailLoading(false);
    }
  };

  const TransactionData = async (page = 1) => {
    setisApiCall(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/transaction_details`,
        {
          user_id: userData.id,
          page, // Send the page number in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.status === "success") {
        setPayments(response.data.data);
        setTotalPages(response.data.total_pages); // Store total pages
        setCurrentPage(page); // Store current page
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisApiCall(false);
    }
  };
  const fetchTransactionData = debounce(TransactionData, 300);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchTransactionData(currentPage + 1);
      return () => fetchTransactionData.cancel();
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchTransactionData(currentPage - 1);
      return () => fetchTransactionData.cancel();
    }
  };
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // Update the countdown every second
    const intervalId = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, [endTime]);

  const updateCountdown = () => {
  //  console.log("===", endTime);
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const distance = end - now;

    if (distance < 0) {
      setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft({
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    });
  };

  useEffect(() => {
    getStatus();
  }, []);
  useEffect(() => {
    checkIsRewardClaimed();
  }, [isAirDropClaimed]);

  const tokenImages = [
    // {
    //   name: "DOGS",
    //   img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/dogs1.png",
    //   token: "DOGS",
    // },
    // {
    //   name: "TON",
    //   img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/ton_symbol.png",
    //   token: "TON",
    // },
    // {
    //   name: "Hamster",
    //   img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/HamsterCoin1.png",
    //   token: "HMSTR",
    // },
    // {
    //   name: "NOT",
    //   img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/images(1)-Photoroom1.png",
    //   token: "NOT",
    // },
  ];

  const getStatus = async () => {
    try {
      const registerUser = await axios.get(
        `${SERVER_URL}/api/check_twitter_reward?userId=${userData.id}`
      );

      if (registerUser.data.isFollow === 0) {
        setIsFollowed(true);
      }
      if (registerUser.data.isEmail === 0) {
        setIsEmail(true);
      }
      const totalUsers = registerUser.data.totalUsers || 0; // Ensure it's at least 0
      setendTime(registerUser.data.endTime);
      //Fetch all twitter post
      getAllNotification();
      //Fetch all Transaction
      fetchTransactionData();

      // Determine the current and next challenges
      let currentBonus = Object.values(ReferralBonuses).find(
        (bonus) => totalUsers < bonus.bonus_count
      );

      if (totalUsers === 0) {
        currentBonus = ReferralBonuses[5]; // Always show the first bonus if total users is 0
      }

      // console.log(currentBonus);

      let completedBonus = Object.values(ReferralBonuses)
        .slice() // Make a shallow copy before reversing
        .reverse()
        .find((bonus) => totalUsers >= bonus.bonus_count);
      // console.log(completedBonus);

      if (completedBonus) {
        setAchievedBonus(completedBonus);
        setIsInvited(true);
      }

      // If no currentBonus is found and totalUsers is less than the minimum, show the first bonus (invite 5 friends)
      if (currentBonus) {
        setNextBonus(currentBonus);
      } else {
        // Ensure the bonus object exists and handle cases gracefully
        const firstBonus = ReferralBonuses[5];
        if (firstBonus) {
          setNextBonus(firstBonus);
        }
      }

      setReferralCount(totalUsers);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  const handleTelegram = () => {
    // playsound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    setTelegram(!isTelegram);
  };

  const handleTwitter = async () => {
    // playsound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    const registerUser = await axios.get(
      `${SERVER_URL}/api/check_twitter_reward?userId=${userData.id}`
    );
    console.log(registerUser);

    if (registerUser.data.status !== "failed") {
      setTwitter(!isTwitter);
    } else {
      setIsFollowed(true);
    }
  };

  const handleEmail = async () => {
    // playsound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    if (!isEmail) {
      setShowEmailModal(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year

    return `${day}${month}${year}`;
  };

  const handleStartAssessment = () => {
    // playsound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    navigate("/AISkillQuestWeb");
  };
  const handleCloseAssessment = () => {
    // playsound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setAssessment(false);
  };

  return (
    <DashboardLayout>
    <div className="relative text-white font-poppins mt-20 scale-90 ">    
          {/* <XUser
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleModalSubmit}
          /> */}
          {showConfetti && (
            <div>
              <div className="fixed inset-0 z-50 w-full">
                <img
                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/Confeti.gif"
                  alt="coin shower"
                  className="h-screen w-full max-w-4xl mx-auto object-cover  "
                />
              </div>
            </div>
          )}

          {/* {Farmingpopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-full max-w-lg">
                <Farming onBack={handleFarming} />
              </div>
            </div>
          )} */}

          {rewardspopup && (
            <DailyRewardWeb
              onClose={() => setRewardsPopup(!rewardspopup)}
              getRewardDetails={getRewardDetails}
              setisAirDropClaimed={setisAirDropClaimed}
              setStreakDay={setStreakDay}
              isAirDropClaimed={isAirDropClaimed}
              streakDay={streakDay}
              userId={userData.id}
            />
          )}
          <AddEmailWeb
            isOpen={showEmailModal}
            onClose={() => setShowEmailModal(false)}
            onSubmit={handleEmailSubmit}
            isLoading={isEmailLoading}
          />
     

          <div>
            {!rewardspopup && (
              <div>
                {!showModal && (
                  <div>
                    {" "}
                    {!showEmailModal && (
                    
                        <div className="relative pt-7 md:pt-0">
                         <div className=" w-full flex justify-between px-3 items-center gap-2 relative  md:translate-y-10 ">
                              {/* <div>
                                <button
                                  className=" text-white text-xl"
                                  onClick={() =>
                                    navigate("/ChallengeMap_7Days")
                                  }
                                >
                                  <FontAwesomeIcon icon={faArrowLeftLong} />
                                </button>
                              </div> */}
                              
                            
                            </div>

                            {!showModal && (
                              <div className="">
                                {/* Daily task */}
                                <div className="w-[95%] max-w-lg mx-auto flex md:gap-10 gap-3 mt-5">
                                  {/* <div className="mt-5">
                                <div className="flex items-center gap-2 md:w-[75%] mx-auto">
                                  <p className="font-semibold  ">
                                    Daily Active Bonus
                                  </p>
                                  {!isAirDropClaimed && (
                                    // <FontAwesomeIcon
                                    //   icon={faBell}
                                    //   className="text-[#FF0000] animate-bounce"
                                    // />
                                    <img
                                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Notification.gif"
                                      className="w-10"
                                    />
                                  )}
                                </div>

                                <div className="w-[95%] md:w-[75%] mx-auto mt-3 ">
                                  <div
                                    className="bg-[#D9D9D91C] rounded-2xl p-2 flex items-center gap-3 cursor-pointer"
                                    onClick={getRewardDetails}
                                  >
                                    <div className="pt-1">
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                        className="w-10"
                                      />
                                    </div>
                                    <div className="">
                                      <p className="font-semibold flex items-center gap-3">
                                        Daily Active Bonus
                                       
                                      </p>
                                      <div className="flex items-center gap-1">
                                        <p className="font-bold text-[#FFD600]">
                                          {isAirDropClaimed
                                            ? days[streakPoint]?.airdrops
                                            : days[streakPoint + 1]?.airdrops}
                                        </p>
                                        <FontAwesomeIcon
                                          icon={
                                            isAirDropClaimed
                                              ? faCheckCircle
                                              : faCircle
                                          }
                                          className={`${isAirDropClaimed
                                            ? "text-[#1EEF32]"
                                            : "text-[#CCCCCC]"
                                            } ml-1 opacity-50`}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}

                                  <div className="w-1/2 h-44 rounded-xl bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A] to-[#070E3A]/0 bg-[#070E3A] ">
                                    <div
                                      className="w-full h-full rounded-xl"
                                      style={{
                                        background:
                                          "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                                      }}
                                    >
                                      <div className="rounded-xl w-full h-full bg-[#334694]/50 border-[0.5px] border-[#1AE348]/40 p-2 flex flex-col justify-between  ">
                                        <div className="flex justify-between items-start">
                                          <img
                                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                            className="w-14"
                                          />
                                          <div className="bg-black/15 rounded-full px-3 mt-2 py-1 border-[0.5px] border-[#1AE348]/40 ">
                                            <p className="text-[10px] text-[#1EEF32]">
                                              {t("dailyBonus.dayLabel")}{" "}
                                              {isAirDropClaimed
                                                ? streakPoint === 0
                                                  ? streakPoint + 1
                                                  : streakPoint
                                                : streakPoint + 1}
                                            </p>
                                          </div>
                                        </div>
                                        <div>
                                          <p
                                            onClick={() => {
                                              getRewardDetails();
                                            }}
                                            className="uppercase text-white"
                                          >
                                            <span className="font-bold ">
                                              {t("dailyBonus.activeBonus").split(' bonus')[0]}
                                            </span>
                                            <br /> {t("dailyBonus.activeBonus").split(' ').pop()}
                                          </p>

                                          <div
                                            onClick={() => 
                                              { navigate(`/DailyRewardWeb`)
                                              // if (isAirDropClaimed) {
                                              //   return;
                                              // } else {
                                              //   // updateStreaks();
                                              //   setRewardsPopup(true)
                                              // }
                                            }
                                          }
                                            className=" cursor-pointer mt-2 rounded-2xl w-full h-7 md:h-8 relative"
                                            style={{
                                              backgroundImage:
                                                "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                                            }}
                                          >
                                            <div className="h-full w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                                            <div className="h-full w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                                            <div className=" bg-[#070e3a4b] backdrop-blur-sm h-full rounded-2xl w-full border-[0.5px] border-[#1AE348]/50 "></div>
                                            <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                                              <p
                                                className="uppercase font-zendots font-medium text-center text-sm z-10"
                                                style={{
                                                  color: "transparent",
                                                  backgroundClip: "text",
                                                  WebkitBackgroundClip: "text",
                                                  backgroundImage:
                                                    "linear-gradient(to right, #0285FF, #1EEF32)",
                                                }}
                                              >
                                                {isAirDropClaimed
                                                  ? t("dailyBonus.claimed")
                                                  : t("dailyBonus.claim")}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  
                                  {/* <div className="w-1/2 h-44 rounded-xl backdrop-blur-sm bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A] to-[#070E3A]/0 bg-[#070E3A] ">
                                    <div
                                      className="w-full h-full backdrop-blur-lg rounded-xl"
                                      style={{
                                        background:
                                          "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                                      }}
                                    >
                                      <div className="rounded-xl w-full h-full border-[0.5px] border-[#1AE348]/40 p-2 flex flex-col justify-between">
                                        <div>
                                          <div className="flex justify-between items-start">
                                            <img
                                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                              className="w-14"
                                            />
                                            <div
                                              onClick={() =>
                                                navigate(
                                                  "/FarmingWeb?source=DailyBonusWeb"
                                                )
                                              }
                                              className="bg-black/15 rounded-full px-3 mt-2 py-1 border-[0.5px] border-[#1AE348]/40 "
                                            >
                                              <p className="text-[10px] text-[#1EEF32]">
                                                {timeLeft.hours === "00" &&
                                                timeLeft.minutes === "00" &&
                                                timeLeft.seconds === "00" &&
                                                endTime
                                                  ? t("dailyBonus.collect")
                                                  : `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}
                                              </p>
                                            </div>
                                          </div>
                                          <p className="uppercase text-white mt-5  font-bold">
                                            {t("dailyBonus.farming")}
                                          </p>
                                        </div>
                                        <div
                                          className=" cursor-pointer mt-2 rounded-2xl w-full h-7 md:h-8 relative"
                                          style={{
                                            backgroundImage:
                                              "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
                                          }}
                                        >
                                          <div className="h-full w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
                                          <div className="h-full w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
                                          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-full rounded-2xl w-full border-[0.5px] border-[#1AE348]/40 "></div>
                                          <div
                                            onClick={() =>
                                              navigate(
                                                "/FarmingWeb?source=DailyBonusWeb"
                                              )
                                            }
                                            className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center"
                                          >
                                            <p
                                              className="uppercase font-zendots font-medium text-center text-sm z-10"
                                              style={{
                                                color: "transparent",
                                                backgroundClip: "text",
                                                WebkitBackgroundClip: "text",
                                                backgroundImage:
                                                  "linear-gradient(to right, #0285FF, #1EEF32)",
                                              }}
                                            >
                                              {t("dailyBonus.explore")}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div> */}

                                  {/* <div className="w-[95%] md:w-[75%] mx-auto mt-3 ">
                                  <div
                                    className="bg-[#D9D9D91C] rounded-2xl p-2 flex items-center gap-3 cursor-pointer"
                                    onClick={() => handleFarming()} 
                                  >
                                    <div className="pt-1">
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                        className="w-10"
                                      />
                                    </div>
                                    <div className="">
                                      <p className="font-semibold flex items-center gap-3">
                                        Farming
                                      </p>
                                    </div>
                                  </div>
                                </div> */}
                                </div>
                                {/* Task list */}
                              <div className="w-[95%] lg:w-[70%] mx-auto mt-7 flex md:flex-row flex-col items-start justify-center gap-5 ">
                                  <div className="md:w-1/2 w-full max-w-lg mx-auto z-10 ">
                                    <div className="  mx-auto flex justify-between items-center gap-3 ">
                                      <p className="font-medium font-zendots uppercase text-sm ">
                                        {t("dailyBonus.socialMediaMission")}
                                      </p>
                                      <div className=" m-2 z-20">
                                        {!showMore && unread.length > 2 && (
                                          <div
                                            className="text-sm text-[#1EEF32] font-semibold flex items-center gap-2"
                                            onClick={() => {
                                              // playsound();
                                              setShowMore(true);
                                            }}
                                          >
                                            <p>{t("dailyBonus.showMore")}</p>
                                            <FontAwesomeIcon icon={faPlus} />
                                          </div>
                                        )}
                                        {showMore && (
                                          <div
                                            className="text-sm text-[#FF0000] font-semibold flex items-center gap-2"
                                            onClick={() => {
                                              // playsound();
                                              setShowMore(false);
                                            }}
                                          >
                                            <p>{t("dailyBonus.showLess")}</p>
                                            <FontAwesomeIcon icon={faMinus} />
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="mt-5 ">
                                      <div>
                                        {/*  TWITTER FOLLOW */}
                                        {!isfollowed && (
                                          <div
                                            onClick={handleTwitter}
                                            className="w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                                          >
                                            <div className="rounded-xl  bg-[#070E3A] w-full h-full">
                                              <div
                                                className="py-2 px-3 rounded-xl flex justify-between items-center"
                                                style={{
                                                  background:
                                                    "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                                                }}
                                              >
                                                <div className="flex items-center gap-3">
                                                  <div>
                                                    <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/X_icon+1.png" className="w-12 h-12" />
                                                  </div>
                                                  <div>
                                                    <p className="font-medium">
                                                      {t("dailyBonus.followX")}
                                                    </p>
                                                    <div className="flex items-center gap-1">
                                                      <img
                                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                                        alt="coin"
                                                        className="w-7 h-7 text-xs"
                                                      />
                                                      <p className="font-bold text-[#FFD600]">
                                                        +250
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className=" w-6 h-6 bg-black/15 flex justify-center items-center rounded-full border border-[#1AE348]/40 ">
                                                  <FontAwesomeIcon
                                                    icon={faCircle}
                                                    size="sm"
                                                    className="text-white/50"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {/* JOIN OUR TELEGRAM CHANNEL */}

                                        {!isJoined && (
                                          <div
                                            onClick={handleTelegram}
                                            className="w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                                          >
                                            <div className="rounded-xl  bg-[#070E3A] w-full h-full">
                                              <div
                                                className="py-2 px-3 rounded-xl flex justify-between items-center"
                                                style={{
                                                  background:
                                                    "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                                                }}
                                              >
                                                <div className="flex items-center gap-3">
                                                  <div>
                                                    <img
                                                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/email_icon.png"
                                                      className="w-12 h-12"
                                                    />
                                                  </div>
                                                  <div>
                                                    <p className="font-medium">
                                                      {t("dailyBonus.joinTelegram")}
                                                    </p>
                                                    <div className="flex items-center gap-1">
                                                      <img
                                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                                        className="w-7 h-7"
                                                      />
                                                      <p className="font-bold text-[#FFD600]">
                                                        +250
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className=" w-6 h-6 bg-black/15 flex justify-center items-center rounded-full border border-[#1AE348]/40 ">
                                                  <FontAwesomeIcon
                                                    icon={faCircle}
                                                    size="sm"
                                                    className="text-white/50"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {/* ADD EMAIL  */}

                                        {!isEmail && (
                                          <div
                                            onClick={handleEmail}
                                            className="w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                                          >
                                            <div className="rounded-xl  bg-[#070E3A] w-full h-full">
                                              <div
                                                className="py-2 px-3 rounded-xl flex justify-between items-center"
                                                style={{
                                                  background:
                                                    "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                                                }}
                                              >
                                                <div className="flex items-center gap-3">
                                                  <div>
                                                    <img
                                                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/email_icon.png"
                                                      className="w-12 h-12"
                                                    />
                                                  </div>
                                                  <div>
                                                    <p className="font-medium">
                                                      {t("dailyBonus.addEmailTask")}
                                                    </p>
                                                    <div className="flex items-center gap-1">
                                                      <img
                                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                                        className="w-7 h-7"
                                                      />
                                                      <p className="font-bold text-[#FFD600]">
                                                        +500
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className=" w-6 h-6 bg-black/15 flex justify-center items-center rounded-full border border-[#1AE348]/40 ">
                                                  <FontAwesomeIcon
                                                    icon={faCircle}
                                                    size="sm"
                                                    className="text-white/50"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {/* INVITE FRIENDS */}
                                        {!isInvited && (
                                          <div
                                            onClick={() => {
                                              if (navigator.vibrate) {
                                                navigator.vibrate(100);
                                              }
                                              // playsound();
                                              navigate("/InvitescreenWeb");
                                            }}
                                          >
                                            <div className="w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3">
                                              <div className="rounded-xl  bg-[#070E3A] w-full h-full">
                                                <div
                                                  className="py-2 px-3 rounded-xl flex justify-between items-center"
                                                  style={{
                                                    background:
                                                      "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                                                  }}
                                                >
                                                  <div className="flex items-center gap-2">
                                                    <div>
                                                      <img
                                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Invite_icon4.png"
                                                        alt="Invite Icon"
                                                        className="w-12 h-12 text-xs"
                                                      />
                                                    </div>
                                                    <div>
                                                      <p className="font-medium">
                                                        {t("dailyBonus.inviteFriends")}
                                                      </p>
                                                      <div className="flex items-center gap-1">
                                                        <img
                                                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                                          className="w-7 h-7"
                                                          alt="Coin Icon"
                                                        />
                                                        <p className="font-bold text-[#FFD600] flex items-center gap-2">
                                                          +2500
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className=" w-6 h-6 bg-black/15 flex justify-center items-center rounded-full border border-[#1AE348]/40 ">
                                                    <FontAwesomeIcon
                                                      icon={faCircle}
                                                      size="sm"
                                                      className="text-white/50"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {/* INVITE FRIENDS NEXT TARGET */}
                                        {nextBonus && isInvited && (
                                          <div
                                            onClick={() => {
                                              if (navigator.vibrate) {
                                                navigator.vibrate(100);
                                              }
                                              // playsound();
                                              navigate("/Invitescreen");
                                            }}
                                          >
                                            <div className="w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3">
                                              <div className="rounded-xl  bg-[#070E3A] w-full h-full">
                                                <div
                                                  className="py-2 px-3 rounded-xl flex justify-between items-center"
                                                  style={{
                                                    background:
                                                      "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                                                  }}
                                                >
                                                  <div className="flex items-center gap-3">
                                                    <div>
                                                      <img
                                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Invite_icon4.png"
                                                        alt="Invite Icon"
                                                      />
                                                    </div>
                                                    <div>
                                                      <p className="font-medium">
                                                        {t("dailyBonus.inviteNextFriends")}
                                                      </p>
                                                      <div className="flex items-center gap-1">
                                                        <img
                                                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                                          className="w-7 h-7"
                                                          alt="Coin Icon"
                                                        />
                                                        <p className="font-bold text-[#FFD600] flex items-center gap-2">
                                                          <div>
                                                            {" "}
                                                            {
                                                              achievedBonus.bonus_point
                                                            }
                                                            <FontAwesomeIcon
                                                              icon={faCircle}
                                                              className="text-[#1EEF32] ml-1 opacity-50"
                                                            />
                                                          </div>
                                                          +2500
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className=" w-6 h-6 bg-black/15 flex justify-center items-center rounded-full border border-[#1AE348]/40 ">
                                                    <FontAwesomeIcon
                                                      icon={faCircle}
                                                      size="sm"
                                                      className="text-white/50"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {/* AI SKILL QUEST  */}
                                        <div className="">
                                          {assessmentDays
                                            .filter(
                                              ({ status }) =>
                                                status === "Available"
                                            )
                                            .map(({ day, status }) => (
                                              <div
                                                key={day}
                                                onClick={() => {
                                                  if (navigator.vibrate) {
                                                    navigator.vibrate(100);
                                                  }
                                                  // playsound();
                                                  handlenextAssessment(day);
                                                }}
                                                className="w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3"
                                              >
                                                <div className="rounded-xl  bg-[#070E3A] w-full h-full">
                                                  <div
                                                    className="py-2 px-3 rounded-xl flex justify-between items-center"
                                                    style={{
                                                      background:
                                                        "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                                                    }}
                                                  >
                                                    <div className="flex items-center gap-3">
                                                      <div>
                                                        <img
                                                          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Assesment_Icon.png"
                                                          className="w-12 h-12"
                                                          alt="Assessment Icon"
                                                        />
                                                      </div>
                                                      <div>
                                                        <p className="font-semibold text-sm">
                                                          {t("dailyBonus.skillQuestDay", { day })}
                                                        </p>
                                                        <div className="flex items-center gap-1">
                                                          <img
                                                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                                            className="w-7 h-7"
                                                            alt="Coin Icon"
                                                          />
                                                          <p className="font-bold text-[#FFD600]">
                                                            +250
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className=" w-6 h-6 bg-black/15 flex justify-center items-center rounded-full border border-[#1AE348]/40 ">
                                                      <FontAwesomeIcon
                                                        icon={faCircle}
                                                        size="sm"
                                                        className="text-white/50"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                        </div>
                                        {/* X RETWEED NOTIFICATION */}
                                        <div>
                                          {tweets.length > 0 &&
                                            tweets.map((notification) => {
                                              const createdAt = new Date(
                                                notification.created_at
                                              );
                                              const expirationDate = new Date(
                                                createdAt
                                              );
                                              expirationDate.setDate(
                                                createdAt.getDate() + 7
                                              );
                                              const isExpired =
                                                expirationDate <= new Date();

                                              return (
                                                <div key={notification.id}>
                                                  <div
                                                    onClick={() => {
                                                      if (navigator.vibrate) {
                                                        navigator.vibrate(100);
                                                      }
                                                      // playsound();
                                                      if (isExpired) return;
                                                      handleOpenRetweet(
                                                        notification
                                                      );
                                                    }}
                                                    className={`w-full h-full bg-gradient-to-b from-[#1AE348]/60 to-[#0368C0]/80 rounded-xl p-[0.9px] mb-3 ${
                                                      isExpired && "opacity-50"
                                                    }`}
                                                  >
                                                    <div className="rounded-xl  bg-[#070E3A] w-full h-full">
                                                      <div
                                                        className="py-2 px-3 rounded-xl flex justify-between items-center"
                                                        style={{
                                                          background:
                                                            "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%)",
                                                        }}
                                                      >
                                                        <div className="flex items-center gap-3 relative">
                                                          <div>
                                                            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/X_icon+1.png" />
                                                          </div>
                                                          <div>
                                                            <p className="font-medium">
                                                              {t("dailyBonus.repostX", { date: formatDate(notification.created_at) })}
                                                            </p>
                                                            <div className="flex items-center gap-1">
                                                              <div className="relative">
                                                                <img
                                                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                                                  className="w-7 h-7"
                                                                />
                                                              </div>
                                                              <p className="font-bold text-[#FFD600]">
                                                                +250
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>

                                                        <div className="relative gap-2">
                                                          {isExpired ? (
                                                            <p className="text-red-500 font-bold">
                                                              {t("dailyBonus.expired")}
                                                            </p>
                                                          ) : (
                                                            <FontAwesomeIcon
                                                              icon={
                                                                notification.isReaded ===
                                                                1
                                                                  ? faCheckCircle
                                                                  : faCircle
                                                              }
                                                              className={`${
                                                                notification.isReaded ===
                                                                1
                                                                  ? "text-[#1EEF32]"
                                                                  : "text-[#CCCCCC]"
                                                              } ml-1 `}
                                                            />
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  {OpenRetweet &&
                                                    currentNotification?.id ===
                                                      notification.id &&
                                                    notification.isReaded ===
                                                      0 && (
                                                      <div
                                                        className="fixed inset-0 model-overlay backdrop-blur-sm flex items-end z-30"
                                                        data-aos="fade-up"
                                                        data-aos-duration="1000"
                                                      >
                                                        <div className="w-[100%] max-w-lg mx-auto text-center text-white bg-[#080B1C] rounded-2xl p-5 pb-5">
                                                          {/* <div className="bg-[#0285FF]/30 w-[10rem] h-[20rem] rounded-full blur-3xl absolute -left-10"></div> */}
                                                          <div className="flex justify-end">
                                                            <button
                                                              onClick={() => {
                                                                if (
                                                                  navigator.vibrate
                                                                ) {
                                                                  navigator.vibrate(
                                                                    200
                                                                  );
                                                                }
                                                                // playsound();
                                                                handleCloseRetweet(
                                                                  null
                                                                );
                                                              }}
                                                              className="text-white"
                                                            >
                                                              <FontAwesomeIcon
                                                                icon={
                                                                  faXmarkCircle
                                                                }
                                                              />
                                                            </button>
                                                          </div>
                                                          <img
                                                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/twitter.png"
                                                            className="mx-auto w-24"
                                                            alt="Twitter Logo"
                                                          />
                                                          <p className="text-xl font-semibold">
                                                            {t("dailyBonus.repostAndEarn")}
                                                          </p>
                                                          <p className="text-xl font-semibold mt-3">
                                                            <span className="text-[#FFD600] text-2xl font-bold">
                                                              + 250
                                                            </span>{" "}
                                                            {t("dailyReward.skillPoints")}
                                                          </p>
                                                          <div className="mt-5 flex flex-col justify-center items-center gap-2">
                                                            <a
                                                              href={`https://twitter.com/i/status/${notification.tweetid_str}`}
                                                              target="_blank"
                                                              rel="noreferrer"
                                                              className="bg-gradient-to-r from-[#3AB6FF] to-[#1EEF32]  px-10 py-1 rounded-full font-bold"
                                                            >
                                                              {t("dailyBonus.goToPost")}
                                                            </a>
                                                            {notification.isReaded ===
                                                            1 ? (
                                                              loadingNotificationId ===
                                                              notification.id ? (
                                                                <div className="bg-white/30 cursor-pointer rounded-full w-[30%] mx-auto py-1 flex justify-center items-center">
                                                                  <div className="w-7 h-7 border-4 border-t-4 border-white border-opacity-30 rounded-full animate-spin mx-auto"></div>
                                                                </div>
                                                              ) : (
                                                                <button className="bg-gradient-to-r from-[#3AB6FF] to-[#1EEF32] mb-14 px-10 py-1 rounded-full font-bold">
                                                                  {t("dailyBonus.claimed")}
                                                                </button>
                                                              )
                                                            ) : (
                                                              <button
                                                                onClick={() => {
                                                                  if (
                                                                    navigator.vibrate
                                                                  ) {
                                                                    navigator.vibrate(
                                                                      200
                                                                    );
                                                                  }
                                                                  // playsound();
                                                                  markAsReaded(
                                                                    notification.id,
                                                                    notification.tweetid_str,
                                                                    notification.created_at
                                                                  );
                                                                }}
                                                                className="bg-gradient-to-r from-[#3AB6FF] to-[#1EEF32] mb-14 px-10 py-1 rounded-full font-semibold"
                                                              >
                                                                {loadingNotificationId ===
                                                                notification.id ? (
                                                                  <div className="w-7 h-7 border-4 border-t-4 border-white border-opacity-30 rounded-full cursor-wait animate-spin mx-auto"></div>
                                                                ) : (
                                                                  t("dailyBonus.claimNow")
                                                                )}
                                                              </button>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )}
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                       <div className="md:w-1/2 w-full max-w-lg mx-auto ">
                                  <p className="font-medium font-zendots uppercase text-sm ">
                                    {t("dailyBonus.recentActivity")}
                                  </p>
                                  <div className=" mt-5 ">
                                    <div>
                                      {isApiCall ? (
                                        <div>
                                          {Array.from({ length: 5 }).map(
                                            (_, index) => (
                                              <div
                                                key={index}
                                                className="w-full bg-[#334694]/5 border-[0.5px] border-[#1AE348]/40 rounded-xl mt-2 animate-pulse"
                                              >
                                                <div className="w-full bg-gradient-to-tr from-[#303E8A]/35 from-55% to-[#1EEF32]/20 to-90% backdrop-blur rounded-xl py-3 flex justify-between items-center">
                                                  {/* Left Text Placeholder */}
                                                  <div className="w-[30%] text-xs text-center">
                                                    <div className="h-3 w-2/3 bg-[#1EEF32]/30 rounded mx-auto"></div>
                                                  </div>

                                                  {/* Center Icon + Amount Placeholder */}
                                                  <div className="w-[45%] flex justify-center items-center gap-1">
                                                    <div className="w-[20%] flex items-center justify-center">
                                                      <div className="w-6 h-6 bg-[#1EEF32]/20 rounded-full"></div>
                                                    </div>
                                                    <div className="w-[70%]">
                                                      <div className="h-3 w-full bg-[#1EEF32]/30 rounded"></div>
                                                    </div>
                                                  </div>

                                                  {/* Right Date Placeholder */}
                                                  <div className="w-[25%] text-center">
                                                    <div className="h-3 w-2/3 bg-[#1EEF32]/30 rounded mx-auto"></div>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      ) : (
                                        <div>
                                          {displayedPayments?.length === 0 ? (
                                             <div className="text-center text-sm font-medium text-white w-full bg-gradient-to-tr from-[#303E8A]/35 to-[#1EEF32]/35 from-55% border-[0.5px] border-[#1AE348]/50 backdrop-blur-sm  rounded-xl py-5">
                                               {t("dailyBonus.noActivityFound")}
                                             </div>
                                          ) : (
                                            <div className=" rounded-lg px-1 gap-2">
                                              {displayedPayments.map(
                                                (data, index) => {
                                                  const tokenMatch =
                                                    data.description.match(
                                                      /(\d+\.?\d*)\s+(TON|NOT|HMSTR|DOGS)\s+Points awarded/
                                                    );
                                                  const tokenName = tokenMatch
                                                    ? tokenMatch[2]
                                                    : null;
                                                  const tokenImage =
                                                    tokenImages.find(
                                                      (t) =>
                                                        t.token === tokenName
                                                    )?.img;

                                                  return (
                                                    <div
                                                      key={index}
                                                      className="w-full bg-[#334694]/5 border-[0.5px] border-[#1AE348]/40 rounded-xl mt-2"
                                                    >
                                                      <div className="w-full bg-gradient-to-tr from-[#303E8A]/35 from-55% to-[#1EEF32]/20 to-90% backdrop-blur rounded-xl py-3 flex justify-between items-center">
                                                        <p className="w-[30%] uppercase text-xs text-center font-semibold">
                                                          {data.action}
                                                        </p>
                                                        <div className="w-[45%] flex justify-center items-center gap-1">
                                                          {/* Image Placeholder */}
                                                          <div className="w-[20%] flex items-center justify-center">
                                                            {![
                                                              "AI Fact bonus",
                                                              "50% Off- AI Gensis",
                                                              "Lucky draw entry",
                                                            ].includes(
                                                              data.description
                                                            ) ? (
                                                              <img
                                                                src={
                                                                  tokenImage ||
                                                                  "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                                                                }
                                                                className="w-6 h-6"
                                                              />
                                                            ) : (
                                                              <div className="w-6 h-6" /> // Invisible placeholder to maintain alignment
                                                            )}
                                                          </div>

                                                          {/* Text */}
                                                          <p
                                                            className={`${
                                                              data.amount < 0
                                                                ? "text-[#FF0000]"
                                                                : "text-[#1EEF32]"
                                                            } w-[70%] text-xs font-medium`}
                                                          >
                                                            {[
                                                              "AI Fact bonus",
                                                              "50% Off- AI Gensis",
                                                              "Lucky draw entry",
                                                            ].includes(
                                                              data.description
                                                            )
                                                              ? data.description
                                                              : tokenName
                                                              ? `${data.amount} ${tokenName}`
                                                              : `${data.amount} ${t("dailyReward.skillPoints")}`}
                                                          </p>
                                                        </div>

                                                        <p className="w-[25%] text-xs font-medium text-center">
                                                          {data.created_at.slice(
                                                            0,
                                                            10
                                                          )}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  );
                                                }
                                              )}

                                              <div className="flex justify-between mt-2">
                                                {/* Previous button */}
                                                <button
                                                  onClick={() => {
                                                    if (navigator.vibrate) {
                                                      navigator.vibrate(100);
                                                    }
                                                    // playsound();
                                                    handlePreviousPage();
                                                  }}
                                                  className={`bg-[#D9D9D90F] hover:bg-[#00AFFF33] cursor-pointer font-poppins text-white py-1 px-1 rounded-lg ${
                                                    currentPage === 1
                                                      ? "opacity-0 pointer-events-none"
                                                      : ""
                                                  }`} // Hide or disable the button on the first page
                                                >
                                                  <FontAwesomeIcon
                                                    className="w-6"
                                                    icon={faArrowLeft}
                                                  />
                                                </button>

                                                {/* Next button */}
                                                <button
                                                  onClick={() => {
                                                    if (navigator.vibrate) {
                                                      navigator.vibrate(100);
                                                    }
                                                    // playsound();
                                                    handleNextPage();
                                                  }}
                                                  className={` bg-[#D9D9D90F] hover:bg-[#00AFFF33] cursor-pointer font-poppins text-white py-1 px-1 rounded-lg ${
                                                    currentPage === totalPages
                                                      ? "opacity-0 pointer-events-none"
                                                      : ""
                                                  }`} // Hide or disable the button on the last page
                                                >
                                                  <FontAwesomeIcon
                                                    className="w-6"
                                                    icon={faArrowRight}
                                                  />
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                </div>
                           
                                {/* OPEN POPUP */}
                                {isTelegram && (
                                  <div
                                    className="fixed inset-0 flex items-end justify-center z-50 model-overlay backdrop-blur-sm"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                  >
                                    <div className="w-full max-w-md z-50 text-center text-white bg-[#080B1C] rounded-2xl p-5 relative pb-5">
                                      {/* <div className="z-50 bg-[#0285FF]/30 w-[10rem] h-[20rem] rounded-full blur-3xl absolute -left-10"></div> */}
                                      <div className="flex justify-end z-50">
                                        <button
                                          onClick={handleTelegram}
                                          className="text-white"
                                        >
                                          <FontAwesomeIcon
                                            icon={faXmarkCircle}
                                          />
                                        </button>
                                      </div>
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/telegram.png"
                                        className="mx-auto w-24"
                                      ></img>
                                       <p className="text-xl font-semibold mt-3">
                                         {t("dailyBonus.joinTelegramTitle")}
                                       </p>
                                       <p className="text-xl font-semibold mt-3">
                                         <span className="text-[#FFD600] text-2xl font-bold">
                                           +250
                                         </span>{" "}
                                         {t("dailyReward.skillPoints")}
                                       </p>
                                      <div className="flex flex-col justify-center items-center">
                                        <a
                                          href="https://t.me/skilleareumofficial"
                                          target="_blank"
                                          className="bg-gradient-to-r from-[#3AB6FF] to-[#1EEF32] mt-5 px-10 py-1 rounded-full font-bold"
                                        >
                                          {t("dailyBonus.joinNow")}
                                        </a>
                                        <button
                                          onClick={claimTelegramReward}
                                          className="bg-gradient-to-r from-[#3AB6FF] to-[#1EEF32] mt-3 mb-14 px-8 py-1 rounded-full font-bold"
                                        >
                                          {loading ? (
                                            <div className="w-7 h-7 border-4 border-t-4 border-white border-opacity-30 rounded-full cursor-wait animate-spin mx-auto"></div>
                                          ) : (
                                             t("dailyBonus.claimNow")
                                           )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {isTwitter && (
                                  <div
                                    className="fixed inset-0 z-50 model-overlay backdrop-blur-sm flex items-end"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                  >
                                    <div className="w-[100%] max-w-md mx-auto text-center text-white bg-[#080B1C] rounded-2xl p-3 pb-5">
                                      {/* <div className="bg-[#0285FF]/30 w-[10rem] h-[20rem] rounded-full blur-3xl absolute -left-10"></div> */}
                                      <div className="flex justify-end">
                                        <button
                                          onClick={handleTwitter}
                                          className="text-white"
                                        >
                                          <FontAwesomeIcon
                                            icon={faXmarkCircle}
                                          />
                                        </button>
                                      </div>
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/twitter.png"
                                        className="mx-auto w-24"
                                      ></img>
                                       <p className="text-xl font-semibold mt-2">
                                         {t("dailyBonus.joinXTitle")}
                                       </p>
                                       <p className="text-xl font-semibold mt-3">
                                         <span className="text-[#FFD600] text-2xl font-bold">
                                           + 250
                                         </span>{" "}
                                         {t("dailyReward.skillPoints")}
                                       </p>
                                      <div className="flex flex-col justify-center items-center">
                                        <a
                                          href={`https://x.com/Skilleareum`}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="bg-gradient-to-r from-[#3AB6FF] to-[#1EEF32] mt-5 px-10 py-1 rounded-full font-bold"
                                        >
                                          {t("dailyBonus.joinNow")}
                                        </a>
                                        <button
                                          onClick={handleClaim}
                                          className="bg-gradient-to-r from-[#3AB6FF] to-[#1EEF32] mt-3 mb-14 px-8 py-1 rounded-full font-bold"
                                        >
                                          {loading ? (
                                            <div className="w-7 h-7 border-4 border-t-4 border-white border-opacity-30 rounded-full cursor-wait animate-spin mx-auto"></div>
                                          ) : (
                                             message
                                           )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {isAssessment && (
                                  <div
                                    className="fixed inset-0 model-overlay backdrop-blur-sm flex items-end"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                  >
                                    <div className="w-[100%] text-center text-white bg-[#080B1C] rounded-2xl p-5 pb-5">
                                      {/* <div className="bg-[#0285FF]/30 w-[10rem] h-[20rem] rounded-full blur-3xl absolute -left-10"></div> */}
                                      <div className="flex justify-end">
                                        <button
                                          onClick={handleCloseAssessment}
                                          className="text-white"
                                        >
                                          <FontAwesomeIcon
                                            icon={faXmarkCircle}
                                          />
                                        </button>
                                      </div>
                                      <img
                                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/wallet.png"
                                        className="mx-auto w-24 "
                                      ></img>
                                       <p className="text-xl font-semibold">
                                         {t("dailyBonus.startAssessmentTitle")}
                                       </p>
                                       <p className="text-xl font-semibold mt-3">
                                         <span className="text-[#FFD600] text-2xl font-bold">
                                           +100
                                         </span>{" "}
                                         {t("dailyReward.skillPoints")}
                                       </p>
                                      <div>
                                        <button
                                          className="bg-gradient-to-r from-[#3AB6FF]  to-[#1EEF32] text-white mt-5 mb-14 px-10 py-1 rounded-full font-bold"
                                          onClick={handleStartAssessment}
                                        >
                                           {t("dailyBonus.startNow")}
                                         </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          
                        </div>
             
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
     
    </DashboardLayout>
  );
};

export default DailyBonusWeb;
