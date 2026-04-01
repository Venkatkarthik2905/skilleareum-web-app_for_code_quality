import React from "react";
import Header from "../Layout/Header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Home = () => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();

  // Auth state from Redux
  const userData = useSelector((state) => state.user_email);
  const authToken = useSelector((state) => state.token);
  const isLoggedIn = !!(authToken && userData && userData.id);

  return (
    <div>
    <Header />
    <div className="w-full  h-screen overflow-hidden  bg-black text-white relative pb-20 sm:pb-0 ">
      <div className="w-full max-w-7xl mx-auto font-poppins h-full pt-5 flex flex-col justify-around sm:relative">
        <div className=" sm:block hidden ">
          <div className=" h-[100vh] overflow-hidden w-full mx-auto flex flex-col justify-start items-center ">
          <div className=" flex justify-center items-center gap-5 ">
            <div className="w-52 border border-white rounded-full py-2.5 -translate-y-3 ">
              <p className="text-[11.5px] text-center font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#0285FF] to-[#1EEF32] ">
                {t('welcomeTo')} SKILLEAREUM.AI
              </p>
            </div>
            <div>
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                className="h-32 mx-auto"
                alt="Robot"
              />
             
            </div>
            <div className="w-52 border border-white rounded-full py-2.5 -translate-y-3 ">
              <p className="text-[11.5px] text-center font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#0285FF] to-[#1EEF32] ">
                {t('hiIAmYourSkillGene')}
              </p>
            </div>
          </div>

           <div className=" w-[1px] h-[50%] bg-gradient-to-b from-[#0285FF] to-[#1EEF32]  "/>
            <div
          onClick={() => navigate(isLoggedIn ? "/ChallengeMap_7Days" : "/UserLogin")}
          className="mb-5 z-30 cursor-pointer w-full flex justify-center items-center "
        >
          <div className=" cursor-pointer bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-[1px] text-white rounded-full w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center ">
            <div className="cursor-pointer bg-black px-5 py-1.5 font-semibold rounded-full flex gap-3 w-full h-full flex justify-center items-center">
              <p className=" text-xs sm:text-sm text-center sm:font-medium font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0285FF] to-[#1EEF32]  ">
                {t('getStarted')}
              </p>
            </div>
          </div>
        </div>
          </div>
        </div> 

        <div className=" sm:hidden block ">
          <div className=" flex flex-col justify-center items-center gap-5 ">
            <div className="w-52 border border-white rounded-full py-2.5 ">
              <p className="text-[11.5px] text-center font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#0285FF] to-[#1EEF32] ">
                {t('welcomeTo')} SKILLEAREUM.AI
              </p>
            </div>
            <div className="w-52 border border-white rounded-full py-2.5">
              <p className="text-[11.5px] text-center font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#0285FF] to-[#1EEF32] ">
                {t('hiIAmYourSkillGene')}
              </p>
            </div>
            <div>
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                className="h-32 mx-auto"
                alt="Robot"
              />
            </div>
          </div>
        </div>

        <div className="w-full sm:absolute sm:-translate-y-12 ">
          <div className=" w-full flex justify-around items-center ">
            <div className="relative">
              <div className=" sm:block hidden left-16 top-10 absolute bg-gradient-to-r from-[#0285FF] to-[#1EEF32] w-20 z-0 h-28 blur-2xl rounded-3xl " />
              <div className="relative z-30">
                <img src="/assets/WebApp/p.svg" className=" w-56 " />
              </div>
            </div>
            <div className="relative">
              <div className=" sm:block hidden left-16 top-14 absolute bg-[#0285FF] w-20 z-0 h-28 blur-3xl rounded-3xl " />
              <div className="relative z-30">
                <img src="/assets/WebApp/l.svg" className=" w-56 " />
              </div>
            </div>
            <div className="relative">
              <div className=" sm:block hidden left-16 top-14 absolute bg-[#1EEF32] w-20 z-0 h-28 blur-3xl rounded-3xl " />
              <div className="relative z-30">
                <img src="/assets/WebApp/a.svg" className=" w-56 " />
              </div>
            </div>
            <div className="relative">
              <div className=" sm:block hidden left-10 top-6 absolute bg-[#1EEF32] w-20 z-0 h-28 blur-3xl rounded-3xl " />
              <div className="relative z-30 ">
                <img src="/assets/WebApp/y.svg" className=" w-56 " />
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => navigate(isLoggedIn ? "/ChallengeMap_7Days" : "/UserLogin")}
          className="mb-5 z-30 sm:hidden block cursor-pointer w-full flex justify-center items-center "
        >
          <div className=" cursor-pointer bg-gradient-to-b from-[#0285FF] to-[#1EEF32] p-[1px] text-white rounded-full w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center ">
            <div className="cursor-pointer bg-black px-5 py-1.5 font-semibold rounded-full flex gap-3 w-full h-full flex justify-center items-center">
              <p className=" text-xs sm:text-sm text-center sm:font-medium font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0285FF] to-[#1EEF32]  ">
                {t('getStarted')}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between items-end absolute bottom-0 sm:bottom-16 ">
          <img
            src="/assets/WebApp/trophy.svg"
            className=" 2xl:w-[19%] w-[22%] "
          />
          <img
            src="../assets/gamecontroller.png"
            className=" 2xl:w-[15%] sm:w-[18%] w-[23%] translate-y-8 translate-x-0 lg:translate-y-16 lg:translate-x-10 sm:translate-y-12 sm:translate-x-5 "
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
