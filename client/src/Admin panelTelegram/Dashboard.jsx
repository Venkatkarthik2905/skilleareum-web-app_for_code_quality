import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SERVER_URL } from "../config";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [totalTokenBalance, setTotalTokenBalance] = useState(0);
  const [Data, setData] = useState();
  const [coinTotals, setCoinTotals] = useState({
    totalDogs: 0,
    totalHamster: 0,
    totalNotCoin: 0,
    totalTon: 0,
  });

  useEffect(() => {
    // Fetch user count from the backend API
    axios
      .get(`${SERVER_URL}/api/users/count`) 
      .then((response) => {
        console.log(response.data.userCount);
        setUserCount(response.data.userCount);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });

    // Fetch total token balance
    axios
      .get(`${SERVER_URL}/api/tokens/total`)  
      .then((response) => {
        setData(response.data);
        setTotalTokenBalance(response.data.totalTokenBalance);
      })
      .catch((error) => {
        console.error("Error fetching token balance:", error);
      });

    // Fetch coin totals
    axios
      .get(`${SERVER_URL}/api/coins/total`)
      .then((response) => {
        console.log(response.data); 
        setCoinTotals({
          totalDogs: response.data.totalDogs,
          totalHamster: response.data.totalHamster,
          totalNotCoin: response.data.totalNotCoin,
          totalTon: response.data.totalTon,
        });
      })
      .catch((error) => {
        console.error("Error fetching coin totals:", error);
      });
  }, []);

  // Dynamically define data array
  const data = [
    {
      amt: coinTotals.totalTon,  // Dynamically populated
      text: "TON",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/TonCoin1.png",
    },
    {
      amt: coinTotals.totalNotCoin,  // Dynamically populated
      text: "NOT",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/images(1)-Photoroom1.png",
    },
    {
      amt: coinTotals.totalHamster,  // Dynamically populated
      text: "Hamster",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/HamsterCoin1.png",
    },
    {
      amt: coinTotals.totalDogs,  // Dynamically populated
      text: "DOGS",
      img: "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/dogs1.png",
    },
  ];

  return (
    <div>
      <div className="font-san md:mt-0 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center items-center">
  <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-md p-0.5">
    <div className="bg-[#080B1C] rounded-md p-3 flex flex-col justify-center items-center h-full">
      <p>Skill Points Distributed</p>
      <p className="text-[#0285FF] text-3xl font-bold">{totalTokenBalance}</p>
    </div>
  </div>
  <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-md p-0.5">
    <div className="bg-[#080B1C] rounded-md p-3 flex flex-col justify-center items-center h-full">
      <p>Users Count</p>
      <p className="text-[#0285FF] text-3xl font-bold">{userCount}</p>
    </div>
  </div>
  <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-md p-0.5">
    <div className="bg-[#080B1C] rounded-md p-3 flex flex-col justify-center items-center h-full">
      <p>Paid Users</p>
      <p className="text-[#0285FF] text-2xl font-bold cursor-pointer">{Data?.totalPaidUser || 0}</p>
    </div>
  </div>
 
  <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-md p-0.5">
    <div className="bg-[#080B1C] rounded-md p-3 flex flex-col justify-center items-center h-full">
      <p>Revenue</p>
      <p className="text-[#0285FF] text-3xl font-bold">${Data?.totalAmountPaid || 0}</p>
    </div>
  </div>
  <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-md p-0.5">
    <div className="bg-[#080B1C] rounded-md p-3 flex flex-col justify-center items-center h-full">
      <p>Withdraw</p>
      <p className="text-[#0285FF] text-3xl font-bold">${Data?.totalWithdraw?.toFixed(2) || 0}</p>
    </div>
  </div>
  <div className="bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-md p-0.5">
    <div className="bg-[#080B1C] rounded-md p-3 flex flex-col justify-center items-center h-full">
      <p>Support Tickets</p>
      <p className="text-[#0285FF] text-3xl font-bold">89</p>
    </div>
  </div>
</div>


        <div className="flex md:flex-row flex-col w-[95%] mx-auto mt-10 gap-10">
          <div className="md:w-[60%] font-san">
            <div className="bg-black/50 rounded-lg py-3 px-3 md:px-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="sm:text-xl text-lg font-bold">
                    Tokens Distributed
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 pb-10">
                {data.map((item, index) => (
                  <div key={index}>
                    <div className=" flex justify-center items-center h-28">
                      <p
                        style={{
                          color: "transparent",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          backgroundImage:
                            "linear-gradient( to right, #0285FF, #1EEF32 ) ",
                        }}
                        className="w-full text-center text-4xl font-bold z-10 mt-2"
                      >
                        {item.amt} 
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <img src={item.img} className="w-6" />
                      <p className="font-semibold text-center text-lg">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-[40%] font-san">
            <div className="bg-gradient-to-b from-[#10BA98] to-[#0285FF] flex gap-5 rounded-lg px-7 py-4">
              <div>
                <div className="flex items-center gap-3">
                  <p
                    className="lg:text-3xl md:text-2xl text-3xl font-bold text-white"
                    style={{ textShadow: "3px 3px #00000040" }}
                  >
                    Referral Stats
                  </p>
                  <FontAwesomeIcon icon={faCalendarDays} className="text-white" />
                </div>
                <div className="mt-5">
                  <div className="flex items-center gap-3">
                    <p className="w-[25%] font-bold flex items-center gap-3 2xl:text-xl md:text-lg text-xl text-white"></p>
                    <p className="w-[75%] font-normal 2xl:text-xl text-sm text-left">
                      User Referrals
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="w-[25%] font-bold flex items-center gap-3 2xl:text-xl md:text-lg text-xl text-white">
                      0
                    </p>
                    <p className="w-[75%] font-normal 2xl:text-xl text-sm text-left">
                      Merchant Referrals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
