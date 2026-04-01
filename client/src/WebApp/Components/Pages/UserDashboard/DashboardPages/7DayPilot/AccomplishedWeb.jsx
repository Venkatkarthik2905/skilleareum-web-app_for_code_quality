import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "../../../../../../config";
import DashboardLayout from "../../Layout/DashboardLayout";

export default function AccomplishedWeb() {
  const { t } = useTranslation("dashboard");

  const authToken = useSelector((state) => state.token);
    // const { playSound } = useSettings();
      const userId = useSelector((state) => state.user_email.id);
       const [dayData, setDayData] = useState(null);
       const navigate = useNavigate();
    
      const fetchData = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/api/getUserCurrentDay?userId=${userId}`,{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      
          // console.log('Daily Progress Response:', response.data);
          const { lastCompletedDay } = response.data;
          setDayData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      
  useEffect(() => {
    fetchData();
    
  }, []);


  return (
    <DashboardLayout>
    <div
    className="relative text-white font-poppins mt-24 "
  >  
        <div className="w-full z-10 relative max-w-xl mx-auto pt-5 ">         
            {/* <div className="flex items-center justify-start gap-1 mt-3 ">
            <div className=" relative mx-3  flex items-center rounded-full border border-[#1EEF32] px-2 py-0.5 ">
                <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif" alt="coin" className=" w-8 absolute -top-1 -left-2  " />
                <p className="w-full pl-6 text-right text-[#1EEF32] text-sm font-medium ">{dayData?.balance ?? 0}</p>
               
              </div>
              <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/exploreraibadge.png" className='w-8 ' />
               </div> */}
      <div className=" px-2 text-center">
        <h1 className="text-[#00FF18] font-zendots text-base font-medium tracking-wider uppercase">
          {t("accomplished.title")} <br />
          <span className="text-base">{t("accomplished.subtitle")}</span>
        </h1>
        <div className="mt-6 space-y-2 text-xs tracking-widest font-light text-white uppercase">
            <p>{t("accomplished.youVe")}</p>
          <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faCheck} className="text-[#00FF18]" />
            <span>{t("accomplished.completedMissions")}</span>
          </div>
          <div className="flex items-items-center justify-center">
          <FontAwesomeIcon icon={faCheck} className="text-[#00FF18] mr-2" />
            <span>{t("accomplished.earnedPoints")}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-10">
      <div className='w-full mb-2'>
                  <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/p1.svg' className='absolute -left-10 -top-28 scale-x-[-1] w-64 z-30 ' />
                  <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/p1.svg' className='absolute -right-10 -top-28 w-64 z-30  ' />
                </div> 
                <div className=" flex flex-col items-center justify-center ">
                <div className={` rotate-45 h-2 w-2 mx-auto -translate-y-8  bg-gradient-to-r from-[#0285FF] to-[#1EEF32] `} />
                <div className={` rotate-90 h-0.5 w-16 mx-auto  bg-gradient-to-r from-[#0285FF] to-[#1EEF32] `} />
                </div>
        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif" alt="Robot" className="w-36 mx-auto z-10 relative" />
       
      </div>

      <div className="text-center uppercase font-light tracking-widest text-xs mt-10 mb-6 px-6 leading-relaxed text-gray-300">
        <p>{t("accomplished.teaserTitle")}</p>
        <p>{t("accomplished.teaserDesc")}</p>
      </div>

      <div onClick={() => navigate("/EarnedWeb")} className=" cursor-pointer rounded-2xl w-[80%] md:w-[60%] mx-auto h-9 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-9 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-9 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-9 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              
                  <p className="uppercase font-medium text-sm text-center font-zendots" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>
                      {t("accomplished.continue")}
                    </p>
              </div>
              </div>
    
    </div>
    </div>
    </DashboardLayout>
  
  );
}
