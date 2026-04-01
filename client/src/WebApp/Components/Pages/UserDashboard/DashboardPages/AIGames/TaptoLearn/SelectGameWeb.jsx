import React, { useState, useEffect } from "react";
import "./Taptoearn.css";
import "animate.css";
import axios from 'axios'; 
import { useSelector } from "react-redux";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../../../../../config";
import { useTranslation } from "react-i18next";


const SelectGameWeb = ({ onExit,onNext, onSelectGame }) => {
  const { t } = useTranslation("dashboard");
  const userId = useSelector((state) => state.user_email.id);
  // const { playSound } = useSettings();
  const location = useLocation();
  const navigate=useNavigate()
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");

  const [fadeOut, setFadeOut] = useState(false);
  const [lifeData, setLifeData] = useState();

  const handleClose=()=>{
    if(source==="TaskListWeb"){
            navigate("/TaskListWeb")
          }else
    navigate('/ChallengeMapWeb');
  }

 

  const getAllGameLife = async()=>{
    try {
      const {data} = await axios.get(`${SERVER_URL}/api/jumbleWord/getgameslife?userId=${userId}`);
      // console.log(data)
      setLifeData(data.data)      
    } catch (error) {
      // console.log(error)
    }
  }

  const handleGameSelect = (game) => {
    onNext();
    // playSound();
    onSelectGame(game);
    // console.log("game selected", game);
  };

   useEffect(() => {
    getAllGameLife()
  }, []);

  return (
    <div className="w-full fixed inset-0 z-50 font-zendots ">
    <div className="bg-[#080B1C]  relative bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins">
    <div className=" bg-cover bg-center h-screen overflow-hidden overflow-y-auto  " style={{ backgroundImage: "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/subscribebg.png)"}} >
    <div className=" h-screen w-full overflow-hidden overflow-y-auto flex justify-center items-center " style={{background: "radial-gradient(378.88% 129.46% at 50% -1.69%, rgba(19, 36, 128, 0) 5.86%, rgba(10, 18, 64, 0.626421) 11.28%, #04071A 24.38%, rgba(4, 8, 29, 0.974934) 60.44%, rgba(4, 7, 26, 0.85) 68.06%, rgba(10, 18, 64, 0.626421) 80.94%, rgba(19, 36, 128, 0) 89.04%)"
}}>
    <div className="w-[90%] max-w-md mx-auto border border-[#1AE348]/70 rounded-xl ">
        <div className=" rounded-xl bg-[#080a47]">
           <div className="px-3 py-5 rounded-xl  " style={{ background: "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)" }}>
      <div className="relative w-full ">
    
        <div className="w-full bg-[#000A14]  rounded-2xl px-3 pt-2 pb-10 ">
        <div className='w-full flex justify-end'>
            <button onClick={() => {
                 if (navigator.vibrate) {
                    navigator.vibrate(100);
                  }
                  handleClose();
                  //  playSound();
                }} className='text-2xl text-[#1EEF32] font-semibold rotate-45' >
                +
            </button>
        </div>
      
          <div className="bg-[#001528] w-[100%] mx-auto rounded-md">
            <p className="text-center text-lg text-[#1EEF32] uppercase font-zendots ">
              {t('aiGames.tap2Learn.games.playAndLearn')}
            </p>
          </div>
        
          <div className="grid grid-cols-2 gap-3 relative mt-5">
            {/* <div className="absolute -top-5 w-20 h-20 bg-[#1EEF3259] blur-xl rounded-full"></div>
            <div className="absolute top-[40%] -right-5 w-20 h-20 bg-[#1EEF3259] blur-xl rounded-full"></div> */}
            <div
              onClick={() => handleGameSelect("Missingletters")}
              className="cursor-pointer  h-40 rounded-xl p-0.5 bg-gradient-to-b from-[#1AE348] to-[#0368C0]"
            >
              <div className="w-full bg-[#0a0342] h-full rounded-xl">
                <div className="w-full h-full rounded-tr-xl rounded-tl-xl "style={{ background: "radial-gradient(111.21% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)"}}>
                <div style={{ backgroundImage: "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/aibg.svg)"}} className=" bg-cover bg-center h-[80%]  w-full rounded-t-xl" >
                <div className="w-full h-full rounded-xl bg-black/60">
                    <div className="w-full h-full rounded-t-xl bg-gradient-to-b from-black/0 to-black/60 to-48% ">
                    {/* <div className="w-full h-full bg-gradient-to-b from-black/0 from-30% to-black/75 to-66% rounded-t-xl "> */}
                    <div className="flex flex-col justify-center items-center gap-1">
                <div className="w-full flex justify-end px-1 pt-1" >
                <div className='rounded-md bg-[#1EEF32]/15 p-0.5 border border-[#1EEF32] flex justify-end items-center gap-1'>
            <FontAwesomeIcon icon={faHeart} size='xs' className='text-[#1EEF32]' />
            <p translate="no" className='text-center text-[10px] font-zendots text-white my-auto' style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" }}>{lifeData?.missing_life < 0 ? "0" :lifeData?.missing_life || 0}</p>
          </div>
          </div>
                  <img src="../assets/missingletters.png" className="w-12 mx-auto" />
                  <p className="text-xs text-center font-semibold uppercase">
                    {t('aiGames.tap2Learn.games.missingLetters').split(' ')[0]}<br/> {t('aiGames.tap2Learn.games.missingLetters').split(' ').slice(1).join(' ')}
                  </p>
                </div>
                </div>
                </div></div>
                   <div className=" flex justify-center items-center p-1">
                <div className=" rounded-2xl w-full h-6 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-6 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-6 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-6 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              
                  <p className="uppercase font-medium text-sm text-center font-zendots" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t('aiGames.tap2Learn.games.play')}</p>
              </div>
              </div>
                </div>
                </div>

             
              </div>
            </div>


            <div
              onClick={() => handleGameSelect("JumbledLetters")}
              className="cursor-pointer  h-40 rounded-xl p-0.5 bg-gradient-to-b from-[#1AE348] to-[#0368C0]"
            >
              <div className="w-full bg-[#0a0342] h-full rounded-xl">
                <div className="w-full h-full rounded-tr-xl rounded-tl-xl "style={{ background: "radial-gradient(111.21% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)"}}>
                <div style={{ backgroundImage: "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/aibg.svg)"}} className=" bg-cover bg-center h-[80%]  w-full rounded-t-xl" >
                <div className="w-full h-full rounded-xl bg-black/60">
                    <div className="w-full h-full rounded-t-xl bg-gradient-to-b from-black/0 to-black/60 to-48% ">
                    {/* <div className="w-full h-full bg-gradient-to-b from-black/0 from-30% to-black/75 to-66% rounded-t-xl "> */}
                    <div className="flex flex-col justify-center items-center gap-1">
                <div className="w-full flex justify-end px-1 pt-1" >
                <div className='rounded-md bg-[#1EEF32]/15 p-0.5 border border-[#1EEF32] flex justify-end items-center gap-1'>
            <FontAwesomeIcon icon={faHeart} size='xs' className='text-[#1EEF32]' />
            <p translate="no" className='text-center text-[10px] font-zendots text-white my-auto' style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" }}>{lifeData?.jumble_life <0 ? "0" :lifeData?.jumble_life || 0}</p>
          </div>
          </div>
          <img src="../assets/jumbledletters.png" className="w-12" />
                  <p className="text-xs text-center font-semibold uppercase">
                  {t('aiGames.tap2Learn.games.jumbleLetters').split(' ')[0]} <br/>{t('aiGames.tap2Learn.games.jumbleLetters').split(' ').slice(1).join(' ')}
                  </p>
                </div>
                </div>
                </div></div>
                   <div className=" flex justify-center items-center p-1">
                <div className=" rounded-2xl w-full h-6 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-6 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-6 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-6 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              
                  <p className="uppercase font-medium text-sm text-center font-zendots" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t('aiGames.tap2Learn.games.play')}</p>
              </div>
              </div>
                </div>
                </div>

             
              </div>
            </div>


            <div
              onClick={() => handleGameSelect("PerfectMatch")}
              className="cursor-pointer  h-full rounded-xl p-0.5 bg-gradient-to-b from-[#1AE348] to-[#0368C0]"
            >
              <div className="w-full bg-[#0a0342] h-full rounded-xl">
                <div className="w-full h-full rounded-tr-xl rounded-tl-xl "style={{ background: "radial-gradient(111.21% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)"}}>
                <div style={{ backgroundImage: "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/aibg.svg)"}} className=" bg-cover bg-center h-[80%]  w-full rounded-t-xl" >
                <div className="w-full h-full rounded-xl bg-black/60">
                    <div className="w-full h-full rounded-t-xl bg-gradient-to-b from-black/0 to-black/60 to-48% relative ">
                    {/* <div className="w-full h-full bg-gradient-to-b from-black/0 from-30% to-black/75 to-66% rounded-t-xl "> */}
                    <div className="flex flex-col h-full justify-center items-center ">
                <div className=" absolute top-1 right-1 " >
                <div className='rounded-md bg-[#1EEF32]/15 p-0.5 border border-[#1EEF32] flex justify-end items-center gap-1'>
            <FontAwesomeIcon icon={faHeart} size='xs' className='text-[#1EEF32]' />
            <p translate="no" className='text-center text-[10px] font-zendots text-white my-auto' style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" }}>{lifeData?.perfectmatch_life <0 ? "0" :lifeData?.perfectmatch_life || 0}</p>
          </div>
          </div>
          <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/ABC.png"
                    className="w-16 pr-1 "
                  />
                  <p className="text-xs -translate-y-2 text-center font-semibold uppercase">
                  {t('aiGames.tap2Learn.games.perfectMatch').split(' ')[0]}<br/> {t('aiGames.tap2Learn.games.perfectMatch').split(' ').slice(1).join(' ')}
                  </p>
                </div>
                </div>
                </div></div>
                   <div className=" flex justify-center items-center p-1">
                <div className=" rounded-2xl w-full h-6 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-6 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-6 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-6 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              
                  <p className="uppercase font-medium text-sm text-center font-zendots" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t('aiGames.tap2Learn.games.play')}</p>
              </div>
              </div>
                </div>
                </div>

             
              </div>
            </div>


            <div
             onClick={() => handleGameSelect("MemoryGame")}
              className="cursor-pointer  h-40 rounded-xl p-0.5 bg-gradient-to-b from-[#1AE348] to-[#0368C0]"
            >
              <div className="w-full bg-[#0a0342] h-full rounded-xl">
                <div className="w-full h-full rounded-tr-xl rounded-tl-xl "style={{ background: "radial-gradient(111.21% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)"}}>
                <div style={{ backgroundImage: "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/aibg.svg)"}} className=" bg-cover bg-center h-[80%]  w-full rounded-t-xl" >
                <div className="w-full h-full rounded-xl bg-black/60">
                    <div className="w-full h-full rounded-t-xl bg-gradient-to-b from-black/0 to-black/60 to-48% ">
                    {/* <div className="w-full h-full bg-gradient-to-b from-black/0 from-30% to-black/75 to-66% rounded-t-xl "> */}
                    <div className="flex flex-col justify-center items-center gap-1">
                <div className="w-full flex justify-end px-1 pt-1" >
                <div className='rounded-md bg-[#1EEF32]/15 p-0.5 border border-[#1EEF32] flex justify-end items-center gap-1'>
            <FontAwesomeIcon icon={faHeart} size='xs' className='text-[#1EEF32]' />
            <p translate="no" className='text-center text-[10px] font-zendots text-white my-auto' style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" }}>{lifeData?.memory_life <0 ? "0" :lifeData?.memory_life || 0}</p>
          </div>
          </div>
          <div className=" grid grid-cols-2 gap-1 ">
                    <div className=" bg-[#C1FCC7] rounded-md p-1 flex justify-center items-center">
                      <img src="../assets/memory.png" className="w-4" />
                    </div>
                    <div className=" bg-[#1CEA3C] rounded-md p-1 flex justify-center items-center">
                      <img
                        src="../assets/Group_1000015161.png"
                        className="w-3"
                      />
                    </div>
                    <div className=" bg-[#1CEA3C] rounded-md p-1 flex justify-center items-center">
                      <img
                        src="../assets/Group_1000015161.png"
                        className="w-3"
                      />
                    </div>
                    <div className=" bg-[#C1FCC7] rounded-md p-1 flex justify-center items-center">
                      <img src="../assets/memory.png" className="w-4" />
                    </div>
                  </div>
                  <p className="text-xs translate-y-1 text-center font-semibold uppercase">
                  {t('aiGames.tap2Learn.games.memoryGame').split(' ')[0]}<br/> {t('aiGames.tap2Learn.games.memoryGame').split(' ').slice(1).join(' ')}
                  </p>
                </div>
                </div>
                </div></div>
                   <div className=" flex justify-center items-center p-1">
                <div className=" rounded-2xl w-full h-6 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-6 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-6 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-6 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              
                  <p className="uppercase font-medium text-sm text-center font-zendots" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t('aiGames.tap2Learn.games.play')}</p>
              </div>
              </div>
                </div>
                </div>

             
              </div>
            </div>     
          </div>

         
           
          </div>
          <div className="mt-3">
         <p className="text-center tracking-widest font-zendots text-[#1EEF32] opacity-25 uppercase ">{t('aiGames.tap2Learn.games.chooseAny')}</p>
         </div>
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

export default SelectGameWeb;
