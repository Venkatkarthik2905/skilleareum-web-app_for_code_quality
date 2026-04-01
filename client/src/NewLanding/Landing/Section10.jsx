import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";




export default function Section10() {
  const { t } = useTranslation('landing');

  const [visibleSteps, setVisibleSteps] = useState([]);
  const stepOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const delayBetweenSteps = 1000;
  const resetDelay = 2000;
  const maxRepeats = 10;
  const [repeatCount, setRepeatCount] = useState(0);

  useEffect(() => {
    if (repeatCount >= maxRepeats) return; 

    let timeouts = [];

    const revealSteps = () => {
      setVisibleSteps([]); 
      stepOrder.forEach((step, index) => {
        const timeout = setTimeout(() => {
          setVisibleSteps((prev) => [...prev, step]);
        }, index * delayBetweenSteps);
        timeouts.push(timeout);
      });

      const restartTimeout = setTimeout(() => {
        setRepeatCount((prev) => prev + 1);
      }, stepOrder.length * delayBetweenSteps + resetDelay);

      timeouts.push(restartTimeout);
    };

    revealSteps();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [repeatCount]);

  return (
     <div className="  py-20 font-gilroy ">

    <div
      className=' relative overflow-hidden flex flex-col justify-center items-center'>

       <div  className='w-full h-full absolute top-0 '>
         {/* <div className='w-[80%] mx-auto h-10 absolute top-0 left-0 right-0 opacity-60 bg-[#727272] rounded-full '></div> */}
         <div className=' w-32 h-16 absolute top-20 -right-10 bg-[#00BA34] opacity-55 rounded-full '></div>
         <div className=' w-8 h-24 absolute top-16 -left-5 bg-[#00BA34] opacity-55 rounded-full '></div>
         </div>

   <div className='w-[100%] mx-auto flex flex-col justify-center items-center overflow-hidden overflow-x-auto  py-10 font-gilroy bg-[#8989890D] border border-white/5 backdrop-blur-3xl rounded-2xl '>
     <div className="w-[1280px] py-5 -translate-x-5  mx-auto overflow-hidden overflow-x-auto flex flex-col justify-center items-center ">
      <div className="w-[100%] -translate-x-14 flex justify-center items-center gap-3">

        {/* step 1 */}
        <div className={` translate-y-3 relative flex flex-col items-center ${
          visibleSteps.includes(1) ? "opacity-100" : "opacity-30"
        }`}>
        <div className=" relative flex flex-col items-center justify-center">
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Group4.svg" className=" w-28 "/>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif" className=" absolute w-10 " />
        </div>
        <div className="flex justify-center items-center">
            <p className=" text-sm font-semibold w-[50%] text-center ">{t('section10.learningHub')}</p>
        </div>

        <div>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Connectorline.svg"  className=" size-24 absolute -top-7  translate-x-10 "/>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Connectorline.svg"  className=" size-24 absolute bottom-0  translate-x-10 scale-y-[-1] "/>
        </div>
        </div>

        <div className="w-[72%] -translate-x-10 relative border-2 border-dashed rounded-2xl border-white/30  px-5 flex justify-between items-center gap-5 ">
        <div className=" bg-[#080808] px-5 py-1 absolute -top-4 left-1/2 transform -translate-x-1/2 ">
     <p style={{color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )" }} className=" font-medium text-white text-center uppercase text-lg  ">{t('section10.gamifiedLearning')}</p>
     </div>
        {/* step 2 */}
        <div className={` relative flex flex-col justify-between items-center ${
          visibleSteps.includes(2) ? "opacity-100" : "opacity-30"
        } `}>
        <div className="  relative -translate-y-3  ">
        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/repeat2.svg" alt="Repeat" className="w-36 h-36       object-cover" />
        <img 
          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/robowbook.svg" 
          alt="Overlay" 
          className="w-9 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="  relative translate-y-2">
        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/grow3.svg" alt="Repeat" className="w-36 h-36       object-cover" />
        <img 
          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/handshake2.png" 
          alt="Overlay" 
          className="w-10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Connectorline2.svg"  className=" size-20 absolute top-12 -right-9  "/>
            <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Connectorline2.svg"  className=" size-20 absolute bottom-12 -right-9 scale-y-[-1] "/>
        </div>
      </div>

{/* step 3 */}
      <div className={`${
          visibleSteps.includes(3) ? "opacity-100" : "opacity-30"
        } flex items-center `}>
      <div className=" bg-white/5 rounded-xl py-3 px-5 flex flex-col gap-8 "> 

        <div className=" bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg p-[1px] ">
            <div className=" bg-[#121212] rounded-lg  ">
                <div className=" w-full bg-gradient-to-r from-[#0285FF1A] to-[#0285FF00] px-3 py-1.5 rounded-lg ">
                <p className=" font-semibold text-white text-center text-sm ">{t('section10.learnerA')}</p>
            </div>
            </div>
        </div>

        <div className=" bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg p-[1px] ">
            <div className=" bg-[#121212] rounded-lg  ">
                <div className=" w-full bg-gradient-to-r from-[#0285FF1A] to-[#0285FF00] px-3 py-1.5 rounded-lg ">
                <p className=" font-semibold text-white text-center text-sm ">{t('section10.learnerB')}</p>
            </div>
            </div>
        </div>


      </div>

       <div className=" flex items-center ">
      <div className=" w-14 h-0.5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] "></div>
      <div className=" w-3 h-3 bg-[#1EEF32] rotate-45 "></div>
        </div>
        </div> 

 {/* step 4 */}
        <div className={` ${
          visibleSteps.includes(4) ? "opacity-100" : "opacity-30"
        } flex items-center `}>
        <div className=" flex flex-col items-center ">
          <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/userflow1.svg" className=" w-14 " />
          <p className=" text-xs font-semibold text-center ">{t('section10.walletConnectivity')} </p>
        </div>

        <div className=" flex items-center ">
      <div className=" w-14 h-0.5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] "></div>
      <div className=" w-3 h-3 bg-[#1EEF32] rotate-45 "></div>
        </div>
        </div>

{/* step 5 */}
        <div className={` ${
          visibleSteps.includes(5) ? "opacity-100" : "opacity-30"
        } flex items-center `}>
        <div className=" flex flex-col items-center gap-1 ">
          <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif" className=" w-12 " />
          <p className=" text-xs font-semibold text-center ">{t('section10.tokenPurchase')} </p>
        </div>

        <div className=" flex items-center ">
      <div className=" w-14 h-0.5 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] "></div>
      <div className=" w-3 h-3 bg-[#1EEF32] rotate-45 "></div>
        </div>
        </div> 



{/* step 6 */}
        <div className={` ${
          visibleSteps.includes(6) ? "opacity-100" : "opacity-30"
        } flex flex-col items-center mt-14 `}>
        <div className=" flex flex-col items-center gap-1 ">
          <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/userflow2.svg" className=" w-12 " />
          <p className=" text-xs font-semibold text-center ">{t('section10.subscribesPackages')} </p>
        </div>

        <div className=" flex flex-col items-center ">
      <div className=" w-0.5 h-10 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] "></div>
      <div className=" w-3 h-3 bg-[#1EEF32] rotate-45 "></div>
        </div>

        <div className=" translate-y-3 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg p-[1px] ">
            <div className=" bg-[#121212] rounded-lg  ">
                <div className=" w-full  px-3 py-1.5 rounded-lg ">
                <p style={{color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )" }} className=" font-medium text-white text-center uppercase ">{t('section10.playLearn')}</p>
            </div>
            </div>
        </div>
        </div>


     </div>
     </div>

     <div className=" w-[100%] flex justify-end my-7 pr-24 relative ">
      {/* step 7 */}
      <div className={` ${
          visibleSteps.includes(7) ? "opacity-100" : "opacity-30"
        } flex flex-col items-center `}>
      <div className=" absolute -top-9 flex flex-col items-center ">
      <div className=" w-0.5 h-8 bg-[#1EEF32] "></div>
        </div>
     <div className=" w-[70%] bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg p-[1px] ">
            <div className=" bg-[#121212] rounded-lg  ">
                <div className="w-full bg-gradient-to-r from-[#0285FF1A] to-[#0285FF00] px-3 py-1.5 rounded-lg ">
                <p className=" font-semibold text-white text-center text-sm  text-center ">{t('section10.smartMinting')}</p>
            </div>
            </div>
        </div>
        <div className=" absolute -bottom-32 flex flex-col items-center ">
      <div className=" w-0.5 h-28 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] "></div>
      <div className=" w-3 h-3 bg-[#1EEF32] rotate-45 "></div>
        </div>
      </div>
        </div>

     <div className=" relative w-full flex justify-center items-center  ">
{/* step 10 */}
      <div className={` absolute top-20 left-10 ${
          visibleSteps.includes(10) ? "opacity-100" : "opacity-30"
        } `}>
      <div className=" flex items-center relative ">
      <p style={{color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )" }} className=" font-medium text-white absolute top-0 left-8 text-center uppercase text-lg -rotate-90  ">{t('section10.repeat')}</p>
        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Connectorline3.svg" className=" size-80 -translate-x-4 -translate-y-36 " />
      </div>
      </div>

     <div className="w-[72%]  relative border-2 border-dashed rounded-2xl border-white/30 py-12 px-5 flex items-center gap-2 ">
     <div className=" bg-[#080808] px-5 py-1 absolute -bottom-4 left-1/2 transform -translate-x-1/2 ">
     <p style={{color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )" }} className=" font-medium text-white text-center uppercase text-lg  ">{t('section10.incentivizedEarning')}</p>
     </div>
    {/* step 9 */}
     <div className={` lg:w-[85%] w-[100%] relative flex flex-col justify-center items-center ${
          visibleSteps.includes(9) ? "opacity-100" : "opacity-30"
        }`}>
   <div className='w-full mx-auto py-5 px-3 font-gilroy bg-[#8989890D] border border-white/5 backdrop-blur-3xl rounded-2xl relative '>

  <div className=" flex justify-center ">
   <div className=" -translate-y-10 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-lg p-[1px] ">
            <div className=" bg-black rounded-lg px-10  ">
                <div className=" w-full  px-3 py-1.5 rounded-lg ">
                <p className=" font-semibold text-white text-center ">{t('section10.web3Contributors')}</p>
            </div>
            </div>
        </div>
        </div>


   <div className="w-[95%] left-3  absolute top-28 ">
   <div className="w-full mx-auto flex justify-around">
  <div className="w-1/3 flex flex-col justify-center items-center ">
      <div className=" w-0.5 h-12 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] "></div>
      <div className=" w-3 h-3 bg-[#1EEF32] rotate-45 "></div>
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center ">
      <div className=" w-0.5 h-12 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] "></div>
      <div className=" w-3 h-3 bg-[#1EEF32] rotate-45 "></div>
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center ">
      <div className=" w-0.5 h-12 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] "></div>
      <div className=" w-3 h-3 bg-[#1EEF32] rotate-45 "></div>
        </div>
  </div>
   </div>
  
   <div className="w-full h-12 flex justify-between items-center border border-dashed border-[#1EEF32]/70 bg-[#004017] rounded-xl px-5 py-2">
   <div className="w-full flex justify-around items-center ">
   <p className="w-1/3 uppercase text-xs text-center ">{t('section10.toolDeveloper')}</p>
   <p className="w-1/3 uppercase text-xs text-center ">{t('section10.contentCreator')}</p>
   <p className="w-1/3 uppercase text-xs text-center ">{t('section10.aiSme')}</p>
   </div>
   </div>

   <div className=" py-5 flex justify-center items-center gap-32 ">
    <p className="text-center text-2xl opacity-50 font-medium  " style={{color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )"  }}>OR</p>
    <p className="text-center text-2xl opacity-50 font-medium  " style={{color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )"  }}>OR</p>
   </div>

   <div className="w-full h-12 flex justify-between items-center border border-dashed border-[#1EEF32]/70 bg-[#004017] rounded-xl px-5 py-2">
   <div className="w-full flex justify-around items-center ">
   <p className="w-1/3 uppercase text-xs text-center ">{t('section10.aiTool')}</p>
   <p className="w-1/3 uppercase text-xs text-center ">{t('section10.aiCourse')}</p>
   <p className="w-1/3 uppercase text-xs text-center ">{t('section10.mentorship')}</p>
   </div>
   </div>


   </div>
   </div>

   {/* step 8 */}
   <div className={`flex items-start -translate-y-6 ${
          visibleSteps.includes(8) ? "opacity-100" : "opacity-30"
        }`}>

   <div className="">
   <p style={{color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )" }} className=" font-medium text-white text-center uppercase text-lg ">{t('section10.grow')}</p>
   <div className=" flex items-center ">
   <div className=" w-3 h-3 bg-[#1EEF32] rotate-45 "></div>
      <div className="w-[95%] h-0.5 bg-[#1EEF32] "></div>
        </div>
        <p className=" w-[65%] mx-auto text-[11px] font-semibold text-center ">{t('section10.contributorDesc')}</p>
        </div>
  
   <div className=" flex flex-col items-center gap-3 ">
   <div className="bg-gradient-to-r from-[#0285FF]/70 to-[#1EEF32]/70 rounded-lg border border-white/60 py-2 px-5 ">
   <p className=" uppercase font-semibold text-center text-xs  ">{t('section10.claimRewards')}</p>
   </div>
   <div>
   <p style={{color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )" }} className=" font-medium text-white text-center uppercase text-lg ">{t('section10.earn')}</p>
   </div>
   </div>


   </div>
  </div>

     <div className=" absolute top-5 right-5 ">
     <div className=" flex items-center relative ">
      <p style={{color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: "linear-gradient( to right, #0285FF, #1EEF32 )" }} className=" font-medium text-white absolute -top-5 right-14 text-center uppercase text-lg -rotate-90  ">{t('section10.repeat')}</p>
        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Arrow 98.svg" className=" size-[295px] -translate-y-44 " />
      </div>
      </div>
   </div>
    </div>
    </div>
    </div>
    </div>
  );
}
