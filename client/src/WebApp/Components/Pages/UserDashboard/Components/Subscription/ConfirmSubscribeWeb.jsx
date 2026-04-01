import React, { useState, useEffect } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import axios from "axios";
import BigNumber from "bignumber.js";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { useAppKitProvider, useAppKitNetwork, useAppKitAccount, useDisconnect } from "@reown/appkit/react";

import { SERVER_URL, SUBSCRIPTION_CONTRACT, PROVIDER_URL } from "../../../../../../config";
import { Subscription_ABI, Token_ABI } from "../../../../../../ABI";
import { SET_TOKEN, setUserEmail } from "../../../../../../store";
import { useTranslation } from "react-i18next";

export default function ConfirmSubscribeWeb() {
  const { t } = useTranslation('dashboard');
  const { address, isConnected, status } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { chainId } = useAppKitNetwork();
  const { walletProvider } = useAppKitProvider('eip155');
  const [selectedToken, setSelectedToken] = useState(null);
  const { created_at, discount_percentage,email,id,sub_status,evm_wallet_address } = useSelector((state) => state.user_email)
  const createdAtDate = new Date(created_at);
const [isDiscountValid, setIsDiscountValid] = useState(false);
const [isInProgress, setIsInProgress] = useState(false);
 const navigate = useNavigate()
  const dispatch = useDispatch()
  // Get the date 7 days ago
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Check if discount applies

  const [referrerAddress, setReferrerAddress] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [isInputChanged, setIsInputChanged] = useState(false);
const [selectedPackage, setSelectedPackage] = useState({
  label: "$15",
  value: 15,
  id: 1
});

const packages = [
  { label: isDiscountValid ? "$7.50" : "$15", value: isDiscountValid ? 7.5 : 15, id: 1 }
];
useEffect(() => {
  if (isDiscountValid) {
    setSelectedPackage({ label: "$7.50", value: 7.5, id: 1 });
  } else {
    setSelectedPackage({ label: "$15", value: 15, id: 1 });
  }
}, [isDiscountValid]);
  const handlePackageChange = (event) => {
    const plan = event.target.value;
    const selected = packages.find((pkg) => pkg.label === plan);
    setSelectedPackage(selected);
  };
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [amount, setAmount] = useState(0);
  const [chatID, setChatID] = useState(0);
  const [addressStatus, setAddressStatus] = useState(null);

  const location = useLocation();

  const tokens = [
    {
      name: "BNB",
      symbol: "BNB",
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      decimals: 18,
      img: "https://bscscan.com/assets/bsc/images/svg/logos/token-light.svg?v=24.7.2.1",
    },
    {
      name: "USDC",
      symbol: "USDC",
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      decimals: 18,
      img: "https://bscscan.com/token/images/centre-usdc_28.png",
    },
    {
      name: "USDT",
      symbol: "USDT",
      address: "0x12D155a31120662F04a8A0062FE22C3EF8d80B67",
      decimals: 18,
      img: "https://bscscan.com/token/images/tether_32.png",
    },
    {
      name: "DAI",
      symbol: "DAI",
      address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
      decimals: 18,
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png",
    },
  ];
 

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isInputChanged) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isInputChanged]);


  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get('chatId');
  };

  useEffect(() => {
    setChatID(getQueryParams());
  }, [location.search]);
  var referrer;
 const getWalletAddress = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/getWalletAddress?email=${email}`);

    if (response.data.status === true) {
      const { userAddress, referrerAddress, isEligibleForDiscount } = response.data.data;

      setUserAddress(userAddress);
      setIsDiscountValid(isEligibleForDiscount); // <-- NEW STATE UPDATE

      const finalReferrer = referrerAddress || "0x0000000000000000000000000000000000000000";
      setReferrerAddress(finalReferrer);
      sessionStorage.setItem(email, finalReferrer);
    } else {
      const defaultReferrer = "0x0000000000000000000000000000000000000000";
      setReferrerAddress(defaultReferrer);
      sessionStorage.setItem(email, defaultReferrer);
    }
  } catch (error) {
    console.error("Error fetching Wallet address:", error);
    const defaultReferrer = "0x0000000000000000000000000000000000000000";
    setReferrerAddress(defaultReferrer);
    sessionStorage.setItem(email, defaultReferrer);
  }
};


  useEffect(() => {
    if (email) {
      getWalletAddress();
    }
  }, [email]);

  useEffect(() => {
    CheckAddress();
  }, [address]);

  const validateAmount = async () => {
    try {
      if (!selectedToken.symbol) {
        console.error("No token selected.");
        return;
      }

      const tokenSymbol = selectedToken.symbol;
      const usdAmount =isDiscountValid ? 7.50 : 15.01;

      const response = await axios.get(
        `https://min-api.cryptocompare.com/data/price?api_key=830c94225fed427911d9c8e4ea29b220d78e466ee4f597fa8ecce33ee602355c&fsym=${tokenSymbol}&tsyms=USD`
      );

      const data = response.data;

      if (!data || data.Response === "Error") {
        console.error("Error in API response:", data?.Message || "No data received");
        return;
      }

      const conversionRate = data.USD;
      // console.log(conversionRate)
      const tokenAmount = (usdAmount / conversionRate).toFixed(4);
      // console.log(tokenAmount);
      setAmount(tokenAmount);
    } catch (error) {
      console.error("Error fetching token conversion rate:", error);
    }
  };

  useEffect(() => {
    if (selectedToken) {
      validateAmount();
    }
  }, [selectedToken]);

  const handleTokenChange = (event) => {
    const tokenSymbol = event.target.value;
    const selected = tokens.find((token) => token.symbol === tokenSymbol);
    setSelectedToken(selected);
  };



  const CheckAddress = async () => {
    if(!address) return;
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/checkAddress?address=${address}&id=${id}`
    );

    if (response.data.exists === "yes") {
      setAddressStatus(true);
    } else if (response.data.exists === "no") {
      setAddressStatus(false);
    }
  } catch (err) {
    // Show error toast
    toast.error(err.response?.data?.message || "Something went wrong");

    // Log out wallet if an error occurs
    console.log(isConnected)
    if (isConnected) {
      disconnect();
      // toast.success("Wallet disconnected");
    }

    console.error("Error while fetching the user address: ", err);
  }
};

const handleSubmit = async () => {
  try {
    setIsInputChanged(true);
    if(sub_status==="active"){
      toast.error("You already have an active subscription.");
      return;
    }
    console.log(walletProvider)
    if (!walletProvider) {
      console.error("Wallet not connected");
      toast.error("Please connect your wallet first!");
      return;
    }
    if (!address) {
      toast.error("Please connect the wallet");
      return;
    }
    if (!selectedToken || !selectedPackage) {
      toast.error("Please select token and package.");
      return;
    }
    if (!isCheckboxChecked) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    
    setIsInProgress(true);
    const response = await axios.get(`${SERVER_URL}/api/getPlatform?id=${id}`);
    const data = response.data.platform;
    let platform;
    if (data === 'MBC') {
      platform = 'MBC';
    } else if (data === 'SKLR') {
      platform = 'SKILLEAREUM';
    } else {
      platform = 'SKILLEAREUM';
    }

    const provider = new ethers.providers.Web3Provider(walletProvider);
    const network = await provider.getNetwork();

    if (network.chainId !== 97) {
      await walletProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }], // BSC Testnet chainId
      });
    }

    const signer = provider.getSigner();

    const SubsContract = new ethers.Contract(SUBSCRIPTION_CONTRACT, Subscription_ABI, signer);
    let TokenContract, ApprovegasLimit;
    let balance;
    
    if (selectedToken.symbol === "BNB") {
      balance = await signer.getBalance();
    } else {
      // Validate token address
      if (!ethers.utils.isAddress(selectedToken.address)) {
        toast.error("Invalid token address");
        setIsInProgress(false);
        return;
      }

      // Check if contract exists at address
      const code = await provider.getCode(selectedToken.address);
      if (code === "0x") {
        toast.error("Token contract not found on this network");
        setIsInProgress(false);
        return;
      }

      TokenContract = new ethers.Contract(selectedToken.address, Token_ABI, signer);
      
      try {
        balance = await TokenContract.balanceOf(address);
      } catch (balanceError) {
        console.error("Error fetching balance:", balanceError);
        toast.error("Unable to fetch token balance. Please verify the token is valid.");
        setIsInProgress(false);
        return;
      }
    }
    
    const formattedBalance = new BigNumber(balance / 10 ** 18).toFixed();

    if (Number(formattedBalance) < Number(amount)) {
      toast.error("Insufficient Balance");
      setIsInProgress(false);
      return;
    }

    const referrerId = await SubsContract.getPartnersId(platform);
    const TransferAmount = ethers.utils.parseUnits(amount.toString(), 18);
    const gasPrice = await provider.getGasPrice();
    
    if (selectedToken.symbol !== "BNB") {
      ApprovegasLimit = await TokenContract.estimateGas.approve(SUBSCRIPTION_CONTRACT, TransferAmount);
      const allowance = await TokenContract.allowance(address, SUBSCRIPTION_CONTRACT);
      
      if (allowance < TransferAmount) {
        const Approve = await TokenContract.approve(SUBSCRIPTION_CONTRACT, TransferAmount, {
          gasPrice: ethers.utils.parseUnits(ethers.utils.formatUnits(gasPrice, "gwei"), "gwei"),
          gasLimit: ApprovegasLimit,
        });
        await Approve.wait();
      }
    }

    let referrer = sessionStorage.getItem(email);
    if (!referrer || referrer === "" || referrer === "undefined") {
      referrer = ethers.constants.AddressZero;
    }

    let referralId = referrerId;
    if (typeof referralId === "string" && !referralId.startsWith("0x")) {
      referralId = ethers.utils.formatBytes32String(referralId);
    }

    const params = {
      referrer,
      referralId,
      planId: selectedPackage?.id,
      paymentToken: selectedToken?.address,
    };

    let Subscribe;
    if (selectedToken.symbol === "BNB") {
      Subscribe = await SubsContract.registerwithReferralwithETH(params, {
        value: TransferAmount,
        gasPrice: ethers.utils.parseUnits(ethers.utils.formatUnits(gasPrice, "gwei"), "gwei"),
        gasLimit: 2_000_000,
      });
    } else {
      Subscribe = await SubsContract.registerwithReferralwithTokens(params, {
        gasPrice: ethers.utils.parseUnits(ethers.utils.formatUnits(gasPrice, "gwei"), "gwei"),
        gasLimit: 2_000_000,
      });
    }

    const tx = await Subscribe.wait();
    const status = tx.status === 1 ? "success" : "failed";

    const transactionDetails = {
      email: email,
      chatId: chatID,
      userAddress: address,
      referrerAddress: sessionStorage.getItem(email),
      plan: selectedPackage.label,
      token: selectedToken.symbol,
      hash: tx.transactionHash,
      amount: amount,
      status: status,
    };

    if (status === "success") {
      const saveResponse = await saveTransactionHistory(transactionDetails);
      if (saveResponse.success) {
        console.log("Subscription and transaction history saved successfully.",saveResponse);
        toast.success("Subscription successful!");
        dispatch(setUserEmail(saveResponse?.userData));
      handleLogout()

      }
    } else {
      toast.error("Subscription failed.");
    }
    setIsInProgress(false);
  } catch (error) {
    console.error("Error during subscription process:", error);
    toast.error("An unexpected error occurred. Please try again.");
    setIsInProgress(false);
  } finally {
    setIsInputChanged(false);
    setIsInProgress(false);
  }
};
const handleLogout = () => {
  // Clear Redux state
  // dispatch(SET_TOKEN(null));
  // dispatch(setUserEmail(null));
  setTimeout(() => {
   navigate("/MyRewardsWeb");
}, 3000);

};
  const saveTransactionHistory = async (transactionDetails) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/storeSubscription`, transactionDetails);
      if (response.data.success === true) {
        // console.log("Transaction history saved successfully.");
        return { success: true,userData: response.data.data };
      } else {
        console.error("Failed to save transaction history.");
        return { success: false };
      }
    } catch (error) {
      console.error("Error saving transaction history:", error);
      return { success: false };
    }
  };

  const button = document.querySelector('appkit-button');

  if (button) {
    button.style.setProperty('--wui-color-accent-100', '#070E3A');
    button.style.setProperty('--wui-spacing-l', '20px');
    button.style.setProperty('--wui-border-radius-m', '10px');
  }


  return (
    <DashboardLayout>
      <div className="w-full max-w-md mx-auto z-20 font-poppins flex items-center justify-center py-10 mt-20 ">
         <Toaster position="top-center" />
        <div className="z-10 ">
          <div className="flex items-center justify-center relative">
            <img
              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/p1.svg"
              className="w-[50%] scale-x-[-1] absolute left-5 "
            />
            <p className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] inline bg-clip-text text-transparent text-center font-extrabold text-2xl">
              $15 <br />
              <span>{t('subscription.aiGenesisCaps')}</span>
            </p>
            <img
              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/p1.svg"
              className="w-[50%] absolute right-5 "
            />
          </div>
          <img
            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
            className="w-[150px] h-[150px] mx-auto"
          />
          <div className="flex justify-center mt-3">
            {/* <div className="bg-gradient-to-t from-[#0285FF] to-[#1EEF32] rounded-xl p-[1px]">
              <div className="bg-[#070E3A] rounded-xl py-1 px-3 text-white text-[10px] lg:text-sm">
                02345t6yujmnbvcxsdrtyui76543xyz
              </div>
            </div> */}
            <div className=" flex justify-center items-center">
                  <appkit-button />
                </div>
          </div>
          <div className="px-5 mt-5 space-y-3 w-auto lg:w-[100%] mx-auto">
            <div className="h-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg p-[1px]">
              <select
                className="w-full p-2 text-sm focus:outline-none rounded-lg bg-[#070E3A] text-white"
                onChange={handleTokenChange}
              >
                <option value="">{t('subscription.chooseToken')}</option>
                {tokens.map((token) => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-full bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg p-[1px]">
 <select
                    className="w-full p-2 text-sm focus:outline-none rounded bg-[#070E3A] text-white"
                    onChange={handlePackageChange}
                    disabled={!isConnected || !selectedToken || !selectedPackage}
                  >
                    {/* <option value="">Choose a package</option> */}
                    {packages.map((pkg) => (
                      <option key={pkg.label} value={pkg.label}>
                        {pkg.label}
                      </option>
                    ))}
                  </select>

            </div>
            <p className="text-center text-white text-xs w-[95%] mx-auto">
              <span>
                <input
                  type="checkbox"
                  className="bg-transparent mt-1 translate-y-1 mr-1 "
                  checked={isCheckboxChecked}
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                ></input>
              </span>{" "}
              I agree and confirm that the connected wallet address will serve
              as the permanent wallet address for skilleareum.
            </p>
          </div>
          <div className="z-20 px-5 mt-5 space-y-3 w-auto lg:w-[100%] mx-auto">
            <div
              onClick={handleSubmit}
              className="z-10 cursor-pointer rounded-2xl w-[80%] mx-auto h-10 relative"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
              }}
            >
              <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
              <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
              <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-xl w-full border-[0.5px] border-[#1AE348] "></div>
              <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                <p
                  className="uppercase text-sm font-medium text-center font-zendots"
                  style={{
                    color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage:
                      "linear-gradient(to right, #0285FF, #1EEF32)",
                  }}
                >
                  {
                    isInProgress ? "Processing..." :
                  "Confirm Payment"
}
                </p>
              </div>
            </div>
            {/* <div className="z-10 cursor-pointer bg-gradient-to-t from-[#0285FF] to-[#1EEF32] rounded-xl p-[1px]">
              <div className="bg-[#070E3A] rounded-xl py-1.5">
                <p
                  className="uppercase text-sm font-medium text-center font-zendots"
                  style={{
                    color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage:
                      "linear-gradient(to right, #0285FF, #1EEF32)",
                  }}
                >
                  Cancel{" "}
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
