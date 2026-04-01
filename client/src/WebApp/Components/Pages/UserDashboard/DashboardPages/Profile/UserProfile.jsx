import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowUpLong,
  faWebAwesome,
  faLeftLong,
  faArrowLeftLong,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../../../../../config/index";
import { SERVER_URL } from "../../../../../../config";
import DashboardLayout from "../../Layout/DashboardLayout";
import SkinChangeWeb from "./SkinChangeWeb";

export default function UserProfile() {
  const { t } = useTranslation("dashboard");
  const navigate = useNavigate();
  const [isEmail, setIsEmail] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [xInput, setXInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showXInput, setShowXInput] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isEmailLoading, setisEmailLoading] = useState(false);
  const [isXLoading, setisXLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    "../assets/Vector_(5).png"
  );
  const [userData, setUserData] = useState({});
  const [xid, setXid] = useState("");
  const [updatedxid, setUpdatedXid] = useState("");
  const [loading, setloading] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState(t("profile.tooltipCopy"));
  const email = useSelector((state) => state.user_email.id);
  const [Email, setEmail] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [userNameData, setUserNameData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [leaderboard, setLeaderBoard] = useState(false);
  const [claimrewards, setClaimRewards] = useState(false);
  const [unfreezacc, setUnfreezacc] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const usersData = useSelector((state) => state.user_email);
  const sub_status = useSelector((state) => state.user_email.sub_status);
  const userId = useSelector((state) => state.user_email.id);
  const isBgm = true;
  const isMuted = true;

  const handleSubscribe = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
     // setSubscribe(!subscribe);
    navigate("/SubPackWeb");
  };

  const handleTextCopy = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    const referralCode = userData.referral_code;
    navigator.clipboard.writeText(referralCode).then(() => {
      setTooltipContent(t("profile.tooltipCopied"));
      setTimeout(() => {
        setTooltipContent(t("profile.tooltipCopy"));
        setTooltipVisible(false);
      }, 3000);
    });
  };
  const onClose = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    navigate("/ChallengeMapScreen");
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/fetch-user-data`, {
        params: { email },
      });
      // console.log("response", response);

      if (response.data.status === "success") {
        setUserData(response.data.data);
        setUpdatedXid(response.data.data.x_userName);
        setEmail(response.data.data.email);
        // setXid("");
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  const handleSave = async () => {
    setisXLoading(true);
    if (!xInput) return toast.error(t("profile.usernameEnter"));
   // console.log("xinput :", xInput);
    try {
      const response = await axios.post(`${SERVER_URL}/api/update-user-xid`, {
        userId: email,
        x_userName: xInput,
      });

      // console.log("response", response);
      if (response.data.status === "success") {
        toast.success(t("profile.usernameAdded"));
        setIsSaved(true);
        setIsEditable(false);
        setShowXInput(false);
        fetchUserData();
      } else {
        toast.error(response.data.message);
        // console.error("Failed to update xid");
      }
    } catch (error) {
      console.error("Error updating xid:", error.message);
    } finally {
      setisXLoading(false);
    }
  };
  const handleEditClick = () => {
    setEmailInput(Email); // Set current email in input field
    setShowInput(true);
  };

  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;

      if (user) {
        toast.success(t("profile.verifiedSuccessfully"));
       // console.log(user);
        // const registerUser = await axios.get(
        //   `${SERVER_URL}/api/isexist?email=${user.reloadUserInfo.screenName}&flag=1`
        // );
        const { screenName, displayName, photoUrl } = user.reloadUserInfo;
        handleSave(screenName, displayName, photoUrl);
      }
    } catch (error) {
      console.error("Error signing in with Twitter:", error);
    }
  };
  const handleCloseModal = (confirmed) => {
    setOpenModal(false);
    if (confirmed) {
      // console.log("Action confirmed!");
      handleSave();
    } else {
//console.log("Action canceled!");
    }
  };
  //console.log("userdata",userData)
  const getStatus = async () => {
    try {
      // setisApiCall(true);
      const registerUser = await axios.get(
        `${SERVER_URL}/api/check_twitter_reward?userId=${email}`
      );
      if (registerUser.data.isEmail === 0) {
        setIsEmail(true);
      }
    } catch (e) {
    //  console.log(e);
    }
  };
  useEffect(() => {
    fetchUserData();
    getStatus();
  }, []);
  const saveEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
      toast.error(t("profile.emailInvalid"));
      return;
    }
    if (emailInput == userData?.email) {
      toast.error(t("profile.emailSame"));
      return;
    }
    // Add your logic to save the email (e.g., API call)
   // console.log("Saved email:", emailInput);
    setShowInput(false);
    handleEmailSubmit();
  };

  const handleEmailSubmit = async () => {
    setisEmailLoading(true);
   // console.log(userData);
    try {
   //   console.log(userData.id);

      try {
        const res = await axios.post(
          `${SERVER_URL}/api/telegram/sendVeficationEmail?email=${emailInput}&userId=${usersData.id}`
        );

        toast.success(t("profile.mailSent"));
        setTimeout(() => setShowEmailModal(false), 2000);
      } catch (error) {
        console.error("Error sending email:", error);
        toast.error("Error updating mail");
      }

      setisEmailLoading(false);
    } catch (error) {
      console.error("Error checking email existence:", error);
      toast.error(t("dailyBonus.toasters.errorCheckingEmail"));
      setisEmailLoading(false);
    }
  };
  const handleEmail = async () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    if (!isEmail) {
      setShowEmailModal(true);
    }
  };
  useEffect(() => {
    if (selectedImage !== "../assets/Vector_(5).png") {
      handleSaveAvatar();
    }
  }, [selectedImage]);

  const handleSaveAvatar = async () => {
    try {
     // console.log("email", email);
      const response = await axios.post(
        `${SERVER_URL}/api/update-user-avatar`,
        {
          avatar: selectedImage,
          id: email,
        }
      );

      if (response.data.status === "success") {
        fetchUserData();
        setIsModalOpen(false);
      } else {
      //  console.log("Error:", response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const handleImageSelect = (imageSrc) => {
    setSelectedImage(imageSrc);
    setUserData((prevData) => ({
      ...prevData,
      avatar: imageSrc,
    }));
    setIsModalOpen(false);
  };

  const avatarSrc = userData.avatar
    ? userData.avatar
    : "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png";

  const handleleaderboard = () => {
    navigate("/Leaderboard");
  };
  const handleclaimrewards = () => {
    setClaimRewards(!claimrewards);
  };
  const handleunfreezacc = () => {
    setUnfreezacc(!unfreezacc);
  };

  const avatarImages = [
    {
      src: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png",
      alt: "Option 1",
    },
    {
      src: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_02.png",
      alt: "Option 2",
    },
    {
      src: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_03.png",
      alt: "Option 3",
    },
    {
      src: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_04.png",
      alt: "Option 4",
    },
    {
      src: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_05.png",
      alt: "Option 5",
    },
    {
      src: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_06.png",
      alt: "Option 6",
    },
    {
      src: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_07.png",
      alt: "Option 7",
    },
    {
      src: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_08.png",
      alt: "Option 8",
    },
    {
      src: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_09.png",
      alt: "Option 9",
    },
    {
      src: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_10.png",
      alt: "Option 10",
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full md:w-[85%] max-w-xl mx-auto h-full text-white font-poppins mt-24 ">
            {/* {leaderboard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-full max-w-lg">
                <Leaderboard onClose={handleleaderboard} />
              </div>
            </div>
          )} */}
            {/* {claimrewards && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full ">
            <ClaimRewards onClose={handleclaimrewards} />
          </div>
        </div>
      )} */}
            {/* {unfreezacc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full ">
            <Unfreez onClose={handleunfreezacc} />
          </div>
        </div>
      )} */}

            {/* {subscribe && (
            <div className="fixed inset-0 model-overlay backdrop-blur-sm flex items-end z-50">
              <div className="relative w-full">
                <div className=" absolute top-3 bg-[#1EEF3273] blur-xl w-full h-10 z-0 " ></div>
                <Subscribe onClose={handleSubscribe} />
              </div>
            </div>
          )} */}

            {/* <AddEmail
            isOpen={showEmailModal}
            onClose={() => setShowEmailModal(false)}
            onSubmit={handleEmailSubmit}
            isLoading={isEmailLoading}
          /> */}

            <div className="z-23">
              {/* {userNameData && (
              <TwitterNameModal
                isOpen={openModal}
                onClose={handleCloseModal}
                username={userNameData.name}
                avatar={userNameData.avatar}
              />
            )} */}
            </div>
            <div className={`relative ${openModal ? "hidden" : "block"}`}>
              <div className="w-full z-10 py-3 ">            
            {/* <div
              className=" absolute top-3 left-5 "
              onClick={() => {
                onClose();
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </div> */}
          
                {/* <button className=" absolute top-6 left-3 font-poppins " onClick={() => {
                if (navigator.vibrate) {
                  navigator.vibrate(100);
                }
                
                onClose();
              }}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </button > */}

                <div className="pb-5 mt-3">
                  <p className=" text-center uppercase font-zendots font-medium">
                    {t("profile.title")}
                  </p>
                  <div className="flex flex-col gap-5 mt-12 relative">
                    <div className=" absolute -top-5 w-full mx-auto ">
                      <div className="w-full  justify-center items-center flex flex-col z-10 relative">
                        <div className=" bg-[#1FEA32]/65 w-[110px] h-[110px] rounded-full blur-md ">
                          {" "}
                        </div>
                        <div className="w-24 h-24 absolute top-2 rounded-full flex justify-center items-center bg-black/70  border-4 border-[#1EEF32]/50  ">
                          <div
                            onClick={() => {
                              if (navigator.vibrate) {
                                navigator.vibrate(100);
                              }
                              setIsModalOpen(true);
                            }}
                            className="w-full h-full pt-3 overflow-hidden bg-gradient-to-t from-[#0285FF] to-[#1EEF32] bg-cover bg-center rounded-full mx-auto flex justify-center items-center"
                          >
                            <img
                              src={avatarSrc}
                              alt="User Avatar"
                              className="rounded-full w-24 h-24"
                            />
                          </div>
                        </div>

                        <div className="flex justify-center items-center gap-2 -translate-y-5 ">
                          <div className=" w-full bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A]/65 to-[#070E3A]/0 rounded-lg py-1 ">
                            <div className=" w-full bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A] to-[#070E3A]/0 rounded-lg py-1 px-5 backdrop-blur border border-[#1AE348]/50 ">
                              <p
                                className="relative text-center cursor-pointer text-sm font-medium"
                                onMouseEnter={() => setTooltipVisible(true)}
                                onMouseLeave={() => setTooltipVisible(false)}
                                onClick={handleTextCopy}
                                // style={{
                                //   backgroundClip: "text",
                                //   WebkitBackgroundClip: "text",
                                //   color: "transparent",
                                //   backgroundImage:
                                //     "linear-gradient(to right, #0EB69F, #0285FF)",
                                // }}
                              >
                                {userData.name &&
                                !userData.name.includes("TELE")
                                  ? userData.name
                                  : userData.referral_code}
                                {tooltipVisible && (
                                  <span className="w-32 font-semibold absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-90">
                                    {tooltipContent}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="w-full mt-10 rounded-t-2xl pt-20 pb-3"
                      style={{
                        background:
                          "radial-gradient(192.33% 281.87% at 113.72% -46.52%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 62.13%)",
                      }}
                    >
                      <div className=" flex justify-between divide-x divide-white mt-3">
                        {/* category */}
                        <div className="w-1/3 mx-auto h-16 flex flex-col justify-between  text-center ">
                          <p className=" text-xs">{t("profile.categoryValue")}</p>
                          <p className="text-white/70 text-xs mt-1">{t("profile.categoryLabel")}</p>
                        </div>

                        {/* Email */}
                        <div className="w-1/3 mx-auto h-16 flex flex-col justify-between  text-center ">
                          <p className=" flex justify-center items-center text-sm gap-2">
                            {Email ? (
                              <div>
                                {!showInput ? (
                                  <div className="flex items-center space-x-2 text-xs">
                                    {isEmailLoading
                                      ? t("profile.emailChecking")
                                      : Email.length > 5
                                      ? `${Email.slice(0, 8)}...`
                                      : Email}

                                    <img
                                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/verified.png"
                                      className="w-4"
                                    />
                                    <button
                                      className="text-gray-500 hover:text-gray-700"
                                      onClick={() => setShowInput(true)}
                                      disabled={isEmailLoading}
                                    >
                                      ✎
                                    </button>
                                  </div>
                                ) : (
                                  <div className=" fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-md ">
                                    <div className="w-[95%] max-w-md mx-auto rounded-xl backdrop-blur-sm bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A] to-[#070E3A]/0 bg-[#070E3A] ">
                                      <div
                                        className="w-full h-full backdrop-blur-lg rounded-xl"
                                        style={{
                                          background:
                                            "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                                        }}
                                      >
                                        <div className="rounded-xl w-full h-full border-[0.5px] border-[#1AE348]/40 ">
                                          <div className="w-full flex justify-end p-3 z-50">
                                            <button
                                              className="z-50"
                                              onClick={() =>
                                                setShowInput(false)
                                              }
                                            >
                                              <FontAwesomeIcon
                                                icon={faXmark}
                                                className="text-[#00ff48] text-lg"
                                              />
                                            </button>
                                          </div>
                                          <div className=" flex justify-center items-center gap-2 pb-10">
                                            <input
                                              type="text"
                                              placeholder={t("profile.emailPlaceholder")}
                                              value={Email}
                                              className=" px-3 py-1 text-sm w-52 focus:outline-none mr-2 bg-transparent  text-white border-b "
                                              onChange={(e) =>
                                                setEmailInput(e.target.value)
                                              }
                                            />
                                            <button
                                              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                              onClick={saveEmail}
                                            >
                                              ✓
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center">
                                {!showInput ? (
                                  <button
                                    className="text-gray-500 hover:text-gray-700 text-xs"
                                    onClick={() => setShowInput(true)}
                                    disabled={isEmailLoading}
                                  >
                                    {isEmailLoading
                                      ? t("profile.emailChecking")
                                      : t("profile.emailAdd")}
                                  </button>
                                ) : (
                                  <div className=" z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-md ">
                                    <div className="w-[95%] max-w-md mx-auto rounded-xl backdrop-blur-sm bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A] to-[#070E3A]/0 bg-[#070E3A] ">
                                      <div
                                        className="w-full h-full backdrop-blur-lg rounded-xl"
                                        style={{
                                          background:
                                            "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                                        }}
                                      >
                                        <div className="rounded-xl w-full h-full border-[0.5px] border-[#1AE348]/40 ">
                                          <div className="w-full flex justify-end p-3 z-50">
                                            <button
                                              className="z-50"
                                              onClick={() =>
                                                setShowInput(false)
                                              }
                                            >
                                              <FontAwesomeIcon
                                                icon={faXmark}
                                                className="text-[#00ff48] text-lg"
                                              />
                                            </button>
                                          </div>
                                          <div className="flex justify-center items-center gap-2 pb-10">
                                            <input
                                              type="text"
                                              placeholder={t("profile.emailPlaceholder")}
                                              value={Email}
                                              className=" px-3 py-1 text-sm w-52 focus:outline-none mr-2 bg-transparent  text-white border-b "
                                              onChange={(e) =>
                                                setEmailInput(e.target.value)
                                              }
                                            />
                                            <button
                                              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                              onClick={saveEmail}
                                            >
                                              ✓
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </p>
                          <p className="text-white/70 text-xs">{t("profile.emailLabel")}</p>
                        </div>

                        {/* X username */}
                        <div className="w-1/3 mx-auto h-16 flex flex-col justify-between relative text-center ">
                          {updatedxid ? (
                            <div>
                              {!showXInput ? (
                                <div className="flex justify-center items-center gap-1">
                                  <div className="flex justify-center items-center gap-1">
                                    <p className=" w-[75px] text-sm truncate ">
                                      {updatedxid}{" "}
                                    </p>
                                    <img
                                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/verified.png"
                                      className="w-4"
                                    />
                                  </div>
                                  <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowXInput(true)}
                                    disabled={isXLoading}
                                  >
                                    ✎
                                  </button>
                                </div>
                              ) : (
                                <div className=" fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-md ">
                                  <div className="w-[95%] max-w-md mx-auto rounded-xl backdrop-blur-sm bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A] to-[#070E3A]/0 bg-[#070E3A] ">
                                    <div
                                      className="w-full h-full backdrop-blur-lg rounded-xl"
                                      style={{
                                        background:
                                          "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                                      }}
                                    >
                                      <div className="rounded-xl w-full h-full border-[0.5px] border-[#1AE348]/40 ">
                                        <div className="w-full flex justify-end p-3 z-50">
                                          <button
                                            className="z-50"
                                            onClick={() => setShowXInput(false)}
                                          >
                                            <FontAwesomeIcon
                                              icon={faXmark}
                                              className="text-[#00ff48] text-lg"
                                            />
                                          </button>
                                        </div>
                                        <div className="flex justify-center items-center gap-2 pb-10">
                                          <input
                                            type="text"
                                            placeholder={t("profile.usernamePrompt")}
                                            value={xInput}
                                            className=" px-3 py-1 text-sm w-52 focus:outline-none mr-2 bg-transparent  text-white border-b "
                                            onChange={(e) =>
                                              setXInput(e.target.value)
                                            }
                                          />
                                          <button
                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={handleSave}
                                          >
                                            ✓
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            // <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full p-0.5">
                            <div className="flex justify-center items-center">
                              {!showXInput ? (
                                <button
                                  className="text-gray-500 hover:text-gray-700 text-center text-xs"
                                  onClick={() => setShowXInput(true)}
                                  disabled={isXLoading}
                                >
                                  {isXLoading ? t("profile.updating") : t("profile.usernamePrompt")}
                                </button>
                              ) : (
                                <div className=" z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-md ">
                                  <div className="w-[95%] max-w-md mx-auto rounded-xl backdrop-blur-sm bg-gradient-to-r from-[#070E3A]/0 via-[#070E3A] to-[#070E3A]/0 bg-[#070E3A] ">
                                    <div
                                      className="w-full h-full backdrop-blur-lg rounded-xl"
                                      style={{
                                        background:
                                          "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                                      }}
                                    >
                                      <div className="rounded-xl w-full h-full border-[0.5px] border-[#1AE348]/40 ">
                                        <div className="w-full flex justify-end p-3 z-50">
                                          <button
                                            className="z-50"
                                            onClick={() => setShowXInput(false)}
                                          >
                                            <FontAwesomeIcon
                                              icon={faXmark}
                                              className="text-[#00ff48] text-lg"
                                            />
                                          </button>
                                        </div>
                                        <div className="flex justify-center items-center gap-2 pb-10">
                                          <input
                                            type="text"
                                            placeholder={t("profile.usernamePrompt")}
                                            value={xInput}
                                            className=" px-3 py-1 text-sm w-52 focus:outline-none mr-2 bg-transparent  text-white border-b "
                                            onChange={(e) =>
                                              setXInput(e.target.value)
                                            }
                                          />
                                          <button
                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={handleSave}
                                          >
                                            ✓
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            // </div>
                          )}
                          <p className="text-white/70 text-xs">{t("profile.xUsernameLabel")}</p>
                        </div>

                        {/* referral code */}
                        {/* <div className=" text-center ">
                <p className="text-white/70 text-sm font-semibold">
                  Referral code
                </p>
                <p className=" font-medium">{userData.referral_code}</p>
                </div> */}
                      </div>
                    </div>
                  </div>

                  {/* <div className="">
                    <div className=" bg-gradient-to-b from-[#1EEF32]/30 from-19% via-[#05081C]/0 via-63% to-[#010208] to-78% rounded-md w-[100%] mx-auto px-2 py-4 flex items-center gap-5 ">
                      <div className="w-1/2 border-gray-600 border-r flex justify-center items-center gap-5">
                        <div
                          className={` w-10 h-5 p-0.5 bg-[#04071B] border border-[#4B7D56] rounded-full cursor-pointer flex justify-center items-center `}
                          onClick={() => {
                            // toggleBGM();
                          }}
                        >
                          <div
                            className={`w-8 h-full flex items-center p-1 rounded-full bg-[#04071B]  cursor-pointer transition-all duration-300  `}
                          >
                            <div
                              className={`w-full h-full  rounded-full shadow-md transform transition-transform duration-300  ${
                                isBgm ? "translate-x-4  " : "-translate-x-2  "
                              }`}
                            >
                              {isBgm ? (
                                <div className=" relative ">
                                  <img
                                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                    className=" -translate-y-1.5 "
                                  />
                                  <div className=" bg-[#1FEA32] w-3 h-3 absolute -top-0.5 left-1 rounded-full "></div>
                                  <div className=" bg-[#1FEA32] blur-[5px] w-4 h-4 absolute -top-1.5 left-0.5 rounded-full "></div>
                                </div>
                              ) : (
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                  className=" -translate-y-1.5 "
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p
                            className={` ${
                              isBgm ? "text-white" : "text-gray-500"
                            }  text-xs font-semibold `}
                          >
                            {t("profile.music")}
                          </p>
                        </div>
                      </div>

                      <div className="w-1/2  flex items-center gap-5">
                        <div
                          className={` w-10 h-5 p-0.5 bg-[#04071B] border border-[#4B7D56] rounded-full cursor-pointer flex justify-center items-center `}
                          onClick={() => {
                            // toggleSound();
                          }}
                        >
                          <div
                            className={`w-8 h-full flex items-center p-1 rounded-full cursor-pointer transition-all duration-300  ${
                              isMuted ? "bg-[#080B1C]" : "bg-[#04071B] "
                            }`}
                          >
                            <div
                              className={`w-full h-full  rounded-full shadow-md transform transition-transform duration-300  ${
                                isMuted
                                  ? " -translate-x-2.5 "
                                  : " translate-x-3 "
                              }`}
                            >
                              {isMuted ? (
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                  className=" -translate-y-1.5 "
                                />
                              ) : (
                                <div className=" relative ">
                                  <img
                                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                    className=" -translate-y-1.5 "
                                  />
                                  <div className=" bg-[#1FEA32] w-3 h-3 absolute -top-0.5 left-1 rounded-full "></div>
                                  <div className=" bg-[#1FEA32] blur-[5px] w-4 h-4 absolute -top-1.5 left-0.5 rounded-full "></div>
                                </div>
                              )}
                              {/* <div
                        className={`w-full h-full rounded-full ${isBgm ? " bg-[#1EEF32] " : " bg-[#9e9e9e]"
                          }`}
                      ></div> 
                            </div>
                          </div>
                        </div>
                        <div>
                          <p
                            className={` ${
                              !isMuted ? "text-white" : "text-gray-500"
                            }  text-xs font-semibold `}
                          >
                            {t("profile.soundFXs")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="w-[90%] mx-auto mt-5 z-20 ">
                    <p className="text-lg font-medium">{t("profile.featuresTitle")}</p>
                    <div className="mt-5 flex flex-col gap-3 z-20 ">
                      {/* <div
                  onClick={() => {
                    if (sub_status !== "active") {
                      handleSubscribe();
                    } else {
                      handleclaimrewards();
                    }
                  }}
                  className="bg-[#D9D9D90F] rounded-xl p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-5">
                  <i class="fa-solid fa-gem "></i>
                    <p className="font-medium mt-1">{t('profile.claimRewards')}</p>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="mt-1" />
                </div>

                {amount > 0 ?
                  <div
                    onClick={() => {
                      if (sub_status !== "active") {
                        handleSubscribe();
                      } else {
                        handleunfreezacc();
                      }
                    }}
                    className="bg-[#D9D9D90F] rounded-xl p-3 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-5">
                      <i class="fa-solid fa-lock"></i>
                      <p className="font-medium mt-1">{t('profile.unfreezAccount')}</p>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className="mt-1" />
                  </div> : <></>
                } */}
                      <div>
                        {sub_status !== "active" && (
                          <div
                            className=" rounded-xl py-2 px-5 flex justify-between items-center cursor-pointer z-20"
                            style={{
                              background:
                                "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
                            }}
                            onClick={() => {
                              if (sub_status !== "active") {
                                handleSubscribe();
                              } else {
                                setPopupOpen(true);
                               }
                            }}
                          >
                            <div className="flex items-center gap-5">
                              <div className=" relative ">
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                  className="w-9 h-9 "
                                />

                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/scale.svg"
                                  className="  absolute top-2 left-2.5 "
                                />
                                <div className=" bg-[#1FEA32] blur-[12px] w-6 h-6 absolute top-1.5 left-1 rounded-full "></div>
                              </div>
                              <p className="font-medium mt-1">{t("profile.aiMascotSkin")}</p>
                            </div>
                            <FontAwesomeIcon
                              icon={faArrowUpLong}
                              className="mt-1 rotate-45 text-[#007842]"
                            />
                          </div>
                        )}

                        {isPopupOpen && (
                        <div>
                          <SkinChangeWeb onClose={() => setPopupOpen(false)} />
                        </div>
                      )} 

                      </div>
                      <div
                        onClick={handleleaderboard}
                        className="z-20  cursor-pointer rounded-xl py-2 px-5 flex justify-between items-center backdrop-blur-md"
                        style={{
                          background:
                            "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
                        }}
                      >
                        <div className="flex items-center gap-5">
                          <div className=" relative ">
                            <img
                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                              className=" w-9 h-9 "
                            />
                            <FontAwesomeIcon
                              icon={faWebAwesome}
                              size="xs"
                              className="text-[#00ff48]   absolute top-2.5 left-2.5 "
                            />
                            <div className=" bg-[#1FEA32]  blur-[12px] w-6 h-6 absolute top-1.5 left-1 rounded-full "></div>
                          </div>
                          <p className="font-medium mt-1">{t("profile.leaderboard")}</p>
                        </div>
                        <FontAwesomeIcon
                          icon={faArrowUpLong}
                          className="mt-1 rotate-45 text-[#007842]"
                        />
                      </div>
                    </div>
                  </div>
                  {isModalOpen && (
                    <div className="absolute top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                      <div className="bg-[#080B1C] p-5 rounded-lg w-[80%] max-w-sm mx-auto">
                        <div className="flex justify-between items-start">
                          <p className="text-white font-bold">
                            {t("profile.avatarTitle")}
                          </p>
                          <button
                            onClick={() => {
                              if (navigator.vibrate) {
                                navigator.vibrate(100);
                              }

                              setIsModalOpen(false);
                            }}
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2  mt-5">
                          {avatarImages.map((image, index) => (
                            <img
                              key={index}
                              src={image.src}
                              alt={image.alt}
                              className="cursor-pointer h-16"
                              onClick={() => {
                                if (navigator.vibrate) {
                                  navigator.vibrate(100);
                                }

                                handleImageSelect(image.src);
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
    </DashboardLayout>
  );
}
