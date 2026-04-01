import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowLeftLong,
  faArrowRight,
  faCircleArrowRight,
  faCircleInfo,
  faLock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
// import { SERVER_URL, SUBSCRIPTION_CONTRACT, PROVIDER_URL, BASE_URL } from "../config";
import { useSelector } from "react-redux";
// import Subscribe from "./Subscription/Subscribe";
import axios from "axios";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

// import Subpack from "./Subscription/Subpack";
// import Joyride from "react-joyride";
// import Rewardswelcome from "./Onboarding/Rewardswelcome";
import { debounce } from "lodash";
import { Subscription_ABI } from "../../../../../../ABI";
import {
  SERVER_URL,
  SUBSCRIPTION_CONTRACT,
  PROVIDER_URL,
  BASE_URL,
} from "../../../../../../config";
import DashboardLayout from "../../Layout/DashboardLayout";

const MyRewardsWeb = () => {
  const { t } = useTranslation("dashboard");
  // const { playSound } = useSettings();
  // const { playSound } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user_email);
  const chatId = user.chatId;
  const subscribeUrl = `${SERVER_URL}/ConfirmSubscribe?chatId=${chatId}`;
  const [subscribe, setSubscribe] = useState(false);
  const [istokenselected, setIsTokenSelected] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const userData = useSelector((state) => state.user_email);
  const [activity, setActivity] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const sub_status = useSelector((state) => state.user_email.sub_status);
  const [amount, setAmount] = useState(0);
  const userId = useSelector((state) => state.user_email.id);
  const [userAddress, setUserAddress] = useState(null);
  const [freezedamt, setFreezedAmt] = useState(0);
  const [message, setMessage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawamt, setWithdrawAmt] = useState(0);
  const [usdtValue, setUSDTvalue] = useState(0);
  const [availableRewards, setAvailableRewards] = useState(0);
  const siteURL = `${BASE_URL}/AddReferrer?chatId=${chatId}&userId=${userId}`;
  const withdrawURL = `${BASE_URL}/WithdrawRewards?chatId=${chatId}`;
  const { NewUser } = location.state || { NewUser: false };
  // const NewUser  = true;
  const [showWelcome, setShowWelcome] = useState(NewUser);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  const [livefunds, setLiveFunds] = useState([
    {
          name: "TON",
          img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/ton_symbol.png",
          token: "TON",
          amt: 0,
          approxUSD: 0,
          price: 0
        },
          {
          name: "DOGS",
          img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/dogs1.png",
          token: "DOGS",
          amt: 0,
          approxUSD: 0,
          price: 0
        },
        {
          name: "Hamster",
          img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/HamsterCoin1.png",
          token: "HMSTR",
          amt: 0,
          approxUSD: 0,
          price: 0
        },
        {
          name: "NOT",
          img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/images(1)-Photoroom1.png",
          token: "NOT",
          amt: 0,
          approxUSD: 0,
          price: 0
        }
  ]);

  async function fetchAllPrices(tokens) {
    const baseURL = "https://min-api.cryptocompare.com/data/price";
    try {
      const responses = await Promise.all([
        axios.get(baseURL, { params: { fsym: "USDT", tsyms: "USD" } }),
        ...tokens.map((token) =>
          axios.get(baseURL, { params: { fsym: token, tsyms: "USD" } })
        ),
      ]);

      const usdtValue = responses[0].data.USD;
      const tokenPrices = {};
      tokens.forEach((token, index) => {
        tokenPrices[token] = responses[index + 1].data.USD;
      });

      return { usdtValue, tokenPrices };
    } catch (error) {
      console.error("Error fetching prices", error.message);
      return { usdtValue: 1, tokenPrices: {} }; // fallback
    }
  }

  async function calculateHoldingsValue(livefunds) {
    const tokens = livefunds.map((item) => item.token);
    const { tokenPrices } = await fetchAllPrices(tokens);

    const holdings = livefunds.map((item) => {
      const price = tokenPrices[item.token] || 0;
      const value = item.amt * price;
      return {
        ...item,
        price,
        approxUSD: value.toFixed(5),
      };
    });

    return holdings;
  }

  const debouncedUpdateLiveFunds = useCallback(
  debounce(
    async (
      fundsToUpdate, // Accept funds as parameter instead of using state
      freezedamt,
      withdrawamt,
      setLiveFunds,
      setUSDTvalue,
      setAvailableRewards
    ) => {
      const tokens = fundsToUpdate.map((item) => item.token);
      const { usdtValue, tokenPrices } = await fetchAllPrices(tokens);
      // console.log("Fetched Prices:", { usdtValue, tokenPrices });
      
      const updatedFunds = fundsToUpdate.map((item) => {
        const price = tokenPrices[item.token] || 0;
        const approxUSD = item.amt * price;
        return {
          ...item,
          price,
          approxUSD,
        };
      });
      
      // console.log("Updated Funds:", updatedFunds);
      setLiveFunds(updatedFunds);
      setUSDTvalue(usdtValue);

      const totalValue =
        updatedFunds.reduce((sum, item) => sum + item.approxUSD, 0) +
        freezedamt * usdtValue +
        withdrawamt * usdtValue;

      setAvailableRewards(totalValue.toFixed(2));
    },
    500
  ),
  []
);

const fetchTransactionData = async (page = 1) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/transaction_specificActions?page=${page}&userId=${userData.id}&email=${userData.email}`,
      {
        headers: {
          Authorization: `Bearer`,
        },
      }
    );

    if (response.data.status === "success") {
      const { total_ton, total_hmstr, total_not_coin, total_dogs } =
        response.data.walletDetails[0];
      // console.log("Wallet Details:", response.data.walletDetails[0]);
      
      const tokenMap = {
        DOGS: parseFloat(total_dogs || 0),
        TON: parseFloat(total_ton || 0),
        HMSTR: parseFloat(total_hmstr || 0),
        NOT: parseFloat(total_not_coin || 0),
      };

      const updatedLiveFunds = livefunds.map((fund) => ({
        ...fund,
        amt: tokenMap[fund.token] || 0,
      }));
      
      // console.log("Updated Live Funds with amounts:", updatedLiveFunds);
      setActivity(response.data.data);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page);

      // Directly call debouncedUpdateLiveFunds with the updated funds
      debouncedUpdateLiveFunds(
        updatedLiveFunds,
        freezedamt,
        withdrawamt,
        setLiveFunds,
        setUSDTvalue,
        setAvailableRewards
      );
      
    } else {
      console.error(response.data.error);
    }
  } catch (error) {
    console.error(error);
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchTransactionData(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchTransactionData(currentPage - 1);
    }
  };
  useEffect(() => {
    if (userData) {
      fetchTransactionData();
      
    }
  }, [userData]);

  const GetRewards = async () => {
    if (!userAddress) return;
    try {
      const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
      const signer = provider.getSigner(userAddress);
      const SubsContract = new ethers.Contract(
        SUBSCRIPTION_CONTRACT,
        Subscription_ABI,
        signer
      );
      const response = await SubsContract.userStats(userAddress);
      const rawValue = response[1].toString(); // Convert the value to a string
      const decimals = 18;
      const reward = new BigNumber(rawValue)
        .dividedBy(new BigNumber(10).pow(decimals))
        .toFixed(2); // 2 decimal places
      setWithdrawAmt(reward);
    } catch (error) {
      console.error("Error fetching reward:", error);
    }
  };

  useEffect(() => {
    if (userAddress) GetRewards();
  }, [userAddress]);

  const getFreezedAmount = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/getFreezedAmount?userId=${userId}`
      );
      if (response.data.success === true) {
        setFreezedAmt(response.data.totalFreezedAmount);
        setMessage(response.data.messages);
      }
    } catch (error) {
      console.error("Error fetching Wallet address:", error);
    }
  };

  const getWalletAddress = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/getWalletAddressByID?userId=${userId}`
      );
      if (response.data.status === true) {
        setUserAddress(response.data.data.userAddress);
      } else {
        setUserAddress("0x0000000000000000000000000000000000000000");
      }
    } catch (error) {
      console.error("Error fetching Wallet address:", error);
    }
  };

  useEffect(() => {
    getWalletAddress();
    getFreezedAmount();
  }, [userId]);

  const calculateTotalValue = async (livefunds) => {
    const liveFundsTotal = livefunds.reduce(
      (total, fund) => total + Number(fund.approxUSD),
      0
    );
    const frozenTotal = freezedamt * usdtValue;
    const withdrawnTotal = withdrawamt * usdtValue;
    const finalValue = liveFundsTotal + frozenTotal + withdrawnTotal;
    setAvailableRewards(finalValue.toFixed(2));
  };
  const handleMarkAsRead = async (messageId) => {

    // console.log(messageId);

    try {
      // API call to mark message as read
      const markReaded = await axios.post(
        `${SERVER_URL}/api/taptoset/markMessageAsRead`,
        { messageId }
      );
      setMessage((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, readed: 1 } : msg
        )
      );
      if (markReaded.status === 200) {
        getFreezedAmount();
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };
  const button = document.querySelector("appkit-button");
  if (button) {
    button.style.setProperty("--wui-color-accent-100", "#070E3A");
    button.style.setProperty("--wui-spacing-l", "20px");
    button.style.setProperty("--wui-border-radius-m", "10px");
  }

  return (
    <DashboardLayout>
    <div className="relative text-white font-poppins z-10 mt-24 ">

          {/* {subscribe && (
            <div className="fixed inset-0 model-overlay backdrop-blur-sm flex items-end z-50">
              <div className="relative w-full">
                <div className=" absolute top-3 bg-[#1EEF3273] blur-xl w-full h-10 z-0 "></div>
                <Subpack onClose={handleSubscribe} />
              </div>
            </div>
          )} */}

          {/* {showWelcome && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-full">
                <Rewardswelcome onComplete={handleWelcomeComplete} />
              </div>
            </div>
          )} */}       
            <div className="w-full z-10 max-w-lg mx-auto relative ">
              {/* <div className="w-full flex justify-between px-3 items-center gap-2 relative"> */}
             
              <div className="mt-5 py-10 max-w-md mx-auto">
                <p className="w-full text-center font-medium uppercase font-zendots ">
                  {t("rewards.title")}{" "}
                </p>

                <div className="mt-3">
                  <div
                    className="w-full relative bg-[070E3A] rounded-3xl border border-[#1AE348]/60 h-40 backdrop-blur-xl "
                    style={{
                      background:
                        "radial-gradient(76.25% 347.22% at 51.11% 59.77%, #070E3A 0%, rgba(19, 40, 160, 0) 94.66%)",
                    }}
                  >
                    <div
                      className="h-full rounded-3xl opacity-60 w-[100%] mx-auto"
                      style={{
                        background:
                          "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                      }}
                    ></div>
                    <div className="w-full absolute top-0 ">
                      <div className=" w-full bg-[#070E3AB2] backdrop-blur rounded-t-3xl p-2 flex flex-col items-center justify-center gap-2 ">
                        <p className=" text-xs font-medium uppercase ">
                          {t("rewards.walletLabel")}
                        </p>
                        <p
                          className="font-semibold text-xs truncate"
                          style={{
                            backgroundClip: "text",
                            color: "transparent",
                            WebkitBackgroundClip: "text",
                            backgroundImage:
                              "linear-gradient( to right, #0285FF, #1EEF32 )",
                          }}
                        >
                          {userAddress ? (
                            userAddress
                          ) : (
                            <div>
                              {" "}
                              <appkit-button />
                            </div>
                          )}
                        </p>
                      </div>

                      <div
                        className="py-2 flex flex-col justify-center items-center gap-2"
                        translate="no"
                      >
                        {showBreakdown && (
                          <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
                            <div className="bg-[#101530] rounded-xl p-4 w-[90%] max-w-md text-white space-y-4">
                              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <h3 className="text-lg font-bold">
                                  {t("rewards.breakdownTitle")}
                                </h3>
                                <button
                                  onClick={() => setShowBreakdown(false)}
                                  className="text-xl"
                                >
                                  ✕
                                </button>
                              </div>

                              {livefunds.map((fund) => (
                                <div
                                  key={fund.token}
                                  className="flex justify-between items-center text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={fund.img}
                                      alt={fund.name}
                                      className="w-5 h-5"
                                    />
                                    <span className="uppercase font-medium">
                                      {fund.name}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <div>
                                      {fund.amt} × $
                                      {fund.price < 0.01
                                        ? Number(fund.price).toPrecision(2)
                                        : fund.price.toFixed(2)}
                                    </div>
                                    <div className="text-white/60 text-xs">
                                      = $
                                      {isNaN(fund?.approxUSD)
                                        ? "0.00"
                                        : Number(fund.approxUSD).toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                              ))}

                              {freezedamt > 0 && (
                                <div className="flex justify-between items-center text-sm border-t border-white/10 pt-2">
                                  <span className="text-white/80">
                                    Freezed: {freezedamt} × $
                                    {usdtValue.toFixed(2)}
                                  </span>
                                  <span className="text-white/60 text-sm font-medium">
                                    = ${(freezedamt * usdtValue).toFixed(2)}
                                  </span>
                                </div>
                              )}

                              {withdrawamt > 0 && (
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-white/80">
                                    Withdrawable: {withdrawamt} × $
                                    {usdtValue.toFixed(2)}
                                  </span>
                                  <span className="text-white/60 text-sm font-medium">
                                    = ${(withdrawamt * usdtValue).toFixed(2)}
                                  </span>
                                </div>
                              )}

                              {/* ✅ Final Total */}
                              <div className="flex justify-between items-center text-base border-t border-white/10 pt-3 font-semibold">
                                <span className="text-white">{t("rewards.total")}</span>
                                <span className="text-[#1EEF32]">
                                  ${availableRewards ?? "0.00"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <p className="text-sm tracking-wide text-[#1EEF32] uppercase font-medium text-center flex items-center gap-1">
                          {t("rewards.totalValueLabel")}
                          <button
                            onClick={() => setShowBreakdown(true)}
                            className="text-white/60 hover:text-white"
                          >
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              className="text-white w-4 h-4"
                            />
                          </button>
                        </p>

                        <p className="text-2xl font-medium font-zendots">
                          ${availableRewards ?? 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className=" bg-gradient-to-r from-white/20 via-[#1EEF32]/60 to-white/20 h-0.5 w-full mt-5 " />

                  <div>
                    <div className=" mt-5">
                      <div>
                        <div className="flex justify-between items-center">
                          <p className=" font-zendots text-sm font-medium uppercase ">
                            {t("rewards.liveFundsTitle")}
                          </p>
                          <div className="flex justify-end items-center">
                            <p className="text-[10px] font-medium text-right ">
                              {t("rewards.liveFundsDesc")}
                            </p>
                            <div className=" bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full w-5 h-5 flex justify-center items-center">
                              <p className="text-xs font-bold text-[#080B1C]">
                                i
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3" translate="no">
                          {withdrawamt >= 0 ? (
                            <div className="h-full mt-3 cursor-pointer bg-gradient-to-r from-[#070E3A00] to-[#233394] rounded-full py-1 px-3 flex justify-between items-center">
                              {/* Left: Token icon, name, and ≈ USD value */}
                              <div className="flex items-center gap-2">
                                <hr className="bg-[#43A4FF] rounded-full h-7 w-1" />
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/usdt.svg"
                                  className="w-6 h-6"
                                />
                                <div className="flex flex-col">
                                  <p className="font-semibold">USDT</p>
                                  <span className="text-white/50 text-[10px]">
                                    (≈ $
                                    {usdtValue < 0.01
                                      ? usdtValue.toPrecision(2)
                                      : usdtValue.toFixed(2)}
                                    )
                                  </span>
                                </div>
                              </div>

                              {/* Right: Withdraw amount and total USD */}
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col items-end text-right">
                                  <p className="font-bold">{withdrawamt}</p>
                                  <p className="text-white/50 text-[10px]">
                                    (≈ ${(withdrawamt * usdtValue).toFixed(2)})
                                  </p>
                                </div>

                                <div className="relative">
                                  <img
                                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                    className="w-9 h-9"
                                  />
                                  <div className="bg-[#1FEA32] w-5 h-5 absolute top-2 left-2 rounded-full"></div>
                                  <div className="bg-[#1FEA32] blur-[5px] w-4 h-4 absolute top-2 left-2 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {livefunds.map((data, index) => (
                            <div
                              key={index}
                              onClick={() => toast.error(t("rewards.releasingSoon"))}
                              translate="no"
                              className="h-full mt-3 cursor-pointer bg-gradient-to-r from-[#070E3A00] to-[#233394] rounded-full py-1 px-3 flex justify-between items-center"
                            >
                              {/* Left Side: Name + ≈ USD value */}
                              <div className="flex items-center gap-2">
                                <hr className="bg-[#43A4FF] rounded-full h-7 w-1" />
                                <img src={data.img} className="w-6 h-6" />
                                <div className="flex flex-col">
                                  <p className="font-semibold uppercase">
                                    {data.name}
                                  </p>
                                  <span className="text-white/50 text-[10px]">
                                    ($
                                    {data?.price < 0.01
                                      ? Number(data?.price).toPrecision(2)
                                      : data?.price.toFixed(2)}
                                    )
                                  </span>
                                </div>
                              </div>

                              {/* Right Side: Total Tokens + Total USD */}
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col items-end text-right">
                                  <p className="font-bold">{data.amt}</p>
                                  <span className="text-white/50 text-[10px]">
                                    (≈ ${(data?.amt * data?.price).toFixed(2)})
                                  </span>
                                </div>

                                <div className="relative">
                                  <img
                                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                    className="w-9 h-9"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className=" mt-5">
                      <div>
                        <div className="flex justify-between items-center">
                          <p className=" font-zendots text-sm font-medium uppercase ">
                            {t("rewards.frozenFundsTitle")}
                          </p>
                          {sub_status !== "active" && (
                            <div className="flex justify-end items-center">
                              <p className="text-[10px] font-medium text-right">
                                {t("rewards.frozenFundsDesc")}
                              </p>
                              <div
                                className="relative bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                              >
                                <p className="text-xs font-bold text-[#080B1C]">
                                  i
                                </p>
                                {message.some((msg) => msg.readed === 0) && (
                                  <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full" />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Modal for showing messages */}
                        {isModalOpen && (
                          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50">
                            <div className="bg-[#1A1D2E] w-full max-w-sm p-5 rounded-2xl shadow-lg">
                              <div className="flex justify-between items-center mb-3">
                                <h2 className="text-white text-lg font-semibold">
                                  {t("rewards.messagesTitle")}
                                </h2>
                                <button
                                  onClick={() => setIsModalOpen(false)}
                                  className="text-gray-300 hover:text-white text-xl"
                                >
                                  ✖
                                </button>
                              </div>

                              <div className="max-h-60 overflow-y-auto space-y-3">
                                {message.length > 0 ? (
                                  message.map((msg) => (
                                    <div
                                      key={msg.id}
                                      className="flex justify-between items-center bg-[#2C2F40] p-3 rounded-lg"
                                    >
                                      <div className="flex items-center space-x-2">
                                        {!msg.readed && (
                                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        )}
                                        <div>
                                          <p className="text-white text-sm">
                                            {msg.message}
                                          </p>
                                        </div>
                                      </div>
                                      {!msg.readed ? (
                                        <button
                                          onClick={() =>
                                            handleMarkAsRead(msg.id)
                                          }
                                          className="text-xs font-semibold px-3 py-1 rounded-lg bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-black"
                                        >
                                          {t("rewards.markAsRead")}
                                        </button>
                                      ) : (
                                        <button className="text-xs font-semibold px-3 py-1 rounded-lg bg-gradient-to-r from-[#0285FF] to-[#1EEF32] text-black">
                                          {t("rewards.readed")}
                                        </button>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-gray-400 text-center">
                                    {t("rewards.noMessages")}
                                  </p>
                                )}
                              </div>

                              <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-4 w-full py-2 bg-gray-600 text-white rounded-lg text-sm font-medium"
                              >
                                {t("rewards.close")}
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="mt-5">
                          {freezedamt > 0 ? (
                            <div className="h-full mt-3 cursor-pointer bg-gradient-to-r from-[#070E3A00] to-[#233394] rounded-full py-1 px-3 flex justify-between items-center ">
                              <div className=" flex items-center gap-2 ">
                                <hr
                                  className={` bg-[#C3FF00] rounded-full h-7 w-1 `}
                                />
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/usdt.svg"
                                  className="w-6 h-6"
                                />
                                <p className="font-semibold">USDT</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <div>
                                  <p className=" font-bold ">
                                    {freezedamt} <span>USDT</span>{" "}
                                  </p>
                                  <p className=" text-white/50 text-[10px]">
                                    ( ≈ ${freezedamt * usdtValue})
                                  </p>
                                </div>
                                {/* <div className="w-9 h-9 flex justify-center items-center bg-gradient-to-t from-[#1EEF32] to-[#0285FF] rounded-full p-[1px] ">
                              <div className="w-full h-full bg-[#09124A] rounded-full p-1 ">
                                <div className="w-full h-full bg-[#2A3894] rounded-full "> */}
                                {/* <div className=" border-2 border-white rounded-full bg-gradient-to-t from-[#1EEF32] to-[#0285FF] flex justify-center items-center w-full h-full ">
                                  <FontAwesomeIcon icon={faLock} size="sm" />
                                </div> */}
                                {/* </div>
                              </div>
                            </div> */}
                                <div className=" relative ">
                                  <img
                                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                                    className="w-9 h-9 "
                                  />
                                  {/* <div className=" bg-[#1FEA32] w-5 h-5 absolute top-2 left-2 rounded-full "></div>
                        <div className=" bg-[#1FEA32] blur-[5px] w-4 h-4 absolute top-2 left-2   rounded-full ">
                        </div> */}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full w-full mt-3 py-3 cursor-pointer bg-gradient-to-r from-[#070E3A00] to-[#233394] rounded-full  px-3 flex justify-between items-center ">
                              <p className="w-full text-sm text-center font-medium text-white/60 ">
                                {t("rewards.noData")}
                              </p>
                            </div>
                          )}

                          {/* {frozenfunds.map((data, index) => (
                        <div
                          key={index}
                          className="h-full mt-3 cursor-pointer bg-gradient-to-r from-[#070E3A00] to-[#233394] rounded-full py-1 px-3 flex justify-between items-center "
                        >
                          <div className=" flex items-center gap-2 ">
                            <hr
                              className={` bg-[#C3FF00] rounded-full h-7 w-1 `}
                            />
                            <img src={data.img} className="w-6 h-6" />
                            <p className="font-semibold">{data.name}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <div>
                              <p className=" font-bold ">
                                {data.amt}
                                <span>{data.token}</span>{" "}
                              </p>
                              <p className=" text-white/50 text-[10px]">
                                {data.apporxvalue}
                              </p>
                            </div>
                            <div className="w-9 h-9 flex justify-center items-center bg-gradient-to-t from-[#1EEF32] to-[#0285FF] rounded-full p-[1px] ">
                              <div className="w-full h-full bg-[#09124A] rounded-full p-1 ">
                                <div className="w-full h-full bg-[#2A3894] rounded-full ">
                                  <div className=" border-2 border-white rounded-full bg-gradient-to-t from-[#1EEF32] to-[#0285FF] flex justify-center items-center w-full h-full ">
                                    <FontAwesomeIcon icon={faLock} size="sm" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}  */}
                          {/* <div className='h-full cursor-pointer mt-2 bg-gradient-to-r from-[#070E3A00] to-[#233394] rounded-full border border-[#1EEF3266] py-1 px-3 flex justify-between items-center ' >
                            <div className=' flex items-center gap-2 '>
                            <hr className=' bg-[#C3FF00] rounded-full h-7 w-1 '/>
                            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/usdt.svg" className='w-6 h-6' />
                            <p className='font-semibold'>USDT</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <div>
                                <p className=' font-bold '>250 USDT</p>
                                <p className=' text-white/50 text-[10px]'>(≈ 250 $)</p>
                                </div>
                                <div className='w-9 h-9 flex justify-center items-center bg-gradient-to-t from-[#1EEF32] to-[#0285FF] rounded-full p-[1px] '>
                                    <div className='w-full h-full bg-[#09124A] rounded-full p-1 '>
                                        <div className='w-full h-full bg-[#2A3894] rounded-full ' ></div>

                                    </div>
                                </div>                               
                            </div>
                        </div> */}
                        </div>
                      </div>
                    </div>
                    {sub_status === "active" && (
                      <div className=" mt-5">
                        <div>
                          <div className="flex justify-between items-center">
                            <p className=" font-zendots text-sm font-medium uppercase ">
                              {t("rewards.transactionHistory")}
                            </p>
                          </div>

                          <div className="mt-5">
                            {activity.length > 0 ? (
                              activity.map((item, index) => (
                                <div
                                  key={index}
                                  className="h-full mt-3 cursor-pointer bg-gradient-to-r from-[#070E3A00] to-[#233394] rounded-full py-1 px-3 flex justify-between items-center"
                                >
                                  <div className="w-[60%] flex items-center gap-2">
                                    <hr className="bg-[#C3FF00] rounded-full h-7 w-1" />
                                    <img
                                      src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/usdt.svg"
                                      className="w-6 h-6"
                                    />
                                    <p
                                      className={`font-semibold break-all uppercase text-sm ${
                                        item.type === "withdraw"
                                          ? "text-red-500"
                                          : "text-white"
                                      }`}
                                    >
                                      {item.type}
                                    </p>
                                  </div>

                                  <div className="w-[40%] flex justify-end items-center gap-2">
                                    <div>
                                      <p
                                        className={`text-right  font-bold text-sm ${
                                          item.type === "withdraw"
                                            ? "text-red-500"
                                            : "text-white"
                                        }`}
                                      >
                                        {item?.token == "BNB"
                                          ? item.amount.toFixed(4)
                                          : item.amount.toFixed(2)}{" "}
                                        <span>{item?.token || "USDT"}</span>
                                      </p>
                                      <p className="text-white/50 text-[10px]">
                                        {new Date(
                                          item.createdAt
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="h-full w-full mt-3 py-3 cursor-pointer bg-[#233394] rounded-full px-3 flex justify-between items-center">
                                <p className="w-full text-sm text-center font-medium text-white/60">
                                  {t("rewards.noData")}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <hr className="my-10 border-t-[#1EEF32A6]" />
                  <div>
                    {/* <a
                  href={withdrawURL}
                  target='_blank'
                  rel="noopener noreferrer">
                  <div className="  relative  py-3 flex justify-center items-center ">
                    <div className={`absolute w-full h-20  mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0`}></div>
                    <div className={` w-[85%] mx-auto bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg py-3 uppercase z-10`}>
                      {" "}
                      <p
                        className="w-full text-center z-10 uppercase font-zendots "
                        style={{ textShadow: "2px 2px 2px #00000065" }}
                      >
                        Withdraw funds
                      </p>
                    </div>


                  </div>
                </a> */}
                   

                    {sub_status !== "active" && (
                      <div
                        onClick={handleSubscribe}
                        className="z-30 cursor-pointer w-[75%] mx-auto bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg z-10 p-[1px] "
                      >
                        <div className="py-2.5 bg-black uppercase rounded-lg flex justify-center items-center gap-2 ">
                          <div>
                            <p
                              className="w-full text-sm text-center z-10 uppercase font-zendots "
                              style={{ textShadow: "2px 2px 2px #00000065" }}
                            >
                              {t("rewards.subscribeNow")}
                            </p>
                          </div>
                          <div className=" border-2 border-white w-5 h-5 flex justify-center items-center rounded-full ">
                            <FontAwesomeIcon icon={faArrowRight} size="xs" />
                          </div>
                        </div>
                      </div>
                    ) }
                  </div>
                </div>
              </div>
            </div>
          </div>
    
     
    </DashboardLayout>
  );
};

export default MyRewardsWeb;
