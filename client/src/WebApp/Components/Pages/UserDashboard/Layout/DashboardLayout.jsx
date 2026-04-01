import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import IslandLoader from "../DashboardPages/7DayPilot/Loaders/IslandLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../../../../config";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import LanguageSwitcher from "../../../Common/LanguageSwitcher";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
    const [usersData, setusersData] = useState(null);
  
   const [notificationCount, setnotificationCount] = useState(0);
  const userData = useSelector((state) => state.user_email);
   const {sub_status,current_program} = useSelector((state) => state.user_email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/fetch-user-data`, {
          params: { userId: userData.id, email: userData.id },
        });
      //  console.log(response)
        const data = response.data.data;
        setusersData(data)
        setAvatar(data.avatar);
        setnotificationCount(data.notifications.total);
      } catch (error) {
        // console.error("Error fetching data", error);
      }
    };
    const debounceFetchData = debounce(fetchData, 300);
    debounceFetchData();
  }, []);

  const handleSubscribe = () => {
    // playSound();
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    // setSubscribe(!subscribe);
    navigate("/SubPackWeb");
  };

  return (
    <div className="bg-[#01000A] relative">
      {/* {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <IslandLoader />
        </div>
      )} */}

      <div
        className="flex bg-contain bg-center"
        style={{ backgroundImage: "url(/assets/WebApp/stars.svg)" }}
      >
        <div className="">
          <Sidebar />
        </div>
        <main className="w-full min-h-screen overflow-hidden relative">
         
          <div style={{ backgroundImage: "url(/assets/WebApp/stars.svg)" }} className="bg-contain bg-center bg-[#01000A] z-20 fixed top-0 right-0 left-0 -translate-x-[16.5px] text-white pt-3 flex md:flex-row flex-col items-center justify-center  ">
            <div className="absolute top-2 right-5 ">
              <LanguageSwitcher />
            </div>
            <div className=" absolute top-14 right-10 flex items-center gap-5 ">
             
              {/* <div
                          onClick={() => {
                            if (sub_status !== "active") {
                              // playSound();
                              handleSubscribe();
                            } else {
                              // playSound();
                              navigate("/DailyBonusWeb");
                            }
                          }}
                          className="relative cursor-pointer "
                        >
                          <img
                            loading="lazy"
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Notification_icon.gif"
                            className="w-8"
                          />
                          <div className="absolute top-0 right-0 w-4 h-4 bg-[#FF0202] rounded-full flex justify-center items-center ">
                            <p className="text-[11px] font-bold">
                              {notificationCount}
                            </p>
                          </div>
                  </div>  */}


            <button onClick={() => {
              if(current_program==="genesis"){
                navigate("/ChallengeMap_30Days")
                return;
              }else{
                navigate("/ChallengeMap_7Days")
                return;
              }
            }}>
          
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/islandicon.svg"
                className=" w-10 "
              />
            </button>
          </div>
            <div className="flex items-center translate-y-2">
              <div className=" border py-0.5 px-10 skew-x-12 ">
                <h1 translate="no" className="text-sm font-medium bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent -skew-x-12 ">
                  {userData?.referral_code}
                </h1>
              </div>
              <div className="relative -translate-x-3 bg-black rounded-full ">
                <div
                  onClick={() => navigate("/UserProfile")}
                  className=" cursor-pointer border w-10 h-10 pt-2 overflow-hidden rounded-full "
                >
                  <img
                    loading="lazy"
                    src={
                      avatar ||
                      "https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png"
                    }
                    alt="Avatar"
                    className=" w-8 mx-auto "
                  />
                </div>
                {/* <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border border-white"></span> */}
              </div>
            </div>

            <div className=" md:block hidden ">
              <div className=" flex flex-col items-center justify-center ">
                <img
                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                  className="h-14 mx-auto z-20 "
                  alt="Robot"
                />
                <div className="flex items-start ">
                  <div
                    className="h-[1px] w-20 translate-y-1 translate-x-1 "
                    style={{
                      backgroundImage:
                        "linear-gradient(to right,#1EEF3200, #1EEF32, #0285FF, #1EEF3200 )",
                    }}
                  />
                  <img
                    src="/assets/WebApp/diamond.svg"
                    alt="diamond"
                    className=" z-0 w-20 -translate-y-3 "
                  />
                  <div
                    className="h-[1px] w-20 translate-y-1 -translate-x-1 "
                    style={{
                      backgroundImage:
                        "linear-gradient(to right,#1EEF3200, #1EEF32, #0285FF, #1EEF3200 )",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row-reverse items-center translate-y-2">
              <div className=" border py-0.5 px-10 -skew-x-12 ">
                <h1 className="text-sm font-medium bg-gradient-to-r from-[#0285FF] to-[#1EEF32] bg-clip-text text-transparent skew-x-12 ">
                  {usersData?.token_balance}
                </h1>
              </div>
                <div className="overflow-hidden translate-x-7  rounded-full ">
                  <img
                    loading="lazy"
                    // src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                    src="/assets/COIN2.png"
                    className="w-12"
                  />
                </div>
                {/* <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border border-white"></span> */}
            </div>
          </div>
          <div className="">
          {children}
          </div>
          <div className="z-0 bg-[#0285FF]/30 w-[75%] h-[13rem] mx-auto rounded-full blur-[100px] absolute -bottom-44 left-0 right-0" />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
