import React,{useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "../../config";
import axios from "axios";

const Section4 = () => {
    const { t } = useTranslation('landing');

    const [totalTokenBalance, setTotalTokenBalance] = useState(0);
    const [userCount, setUserCount] = useState(0);
      const [Data, setData] = useState();
    
    useEffect(() => {
      axios
        .get(`${SERVER_URL}/api/users/count`) 
        .then((response) => {
          // console.log(response.data.userCount);
          setUserCount(response.data.userCount);
        })
        .catch((error) => {
          console.error("Error fetching user count:", error);
        });
  
      axios
        .get(`${SERVER_URL}/api/tokens/total`)  
        .then((response) => {
          setData(response.data);
          setTotalTokenBalance(response.data.totalTokenBalance);
        })
        .catch((error) => {
          console.error("Error fetching token balance:", error);
        });
  
    }, []);


  return (
    <div className="w-full h-full relative rounded-xl  ">
      <div className="flex w-full h-full opacity-70">
        {[...Array(27)].map((_, index) => (
          <div
            key={index}
            className="w-12 h-[95vh] md:h-[80vh]  border-l border-white/10 backdrop-blur-lg opacity-55 "
            style={{
              background:
                "linear-gradient(270deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 103.91%)",
            }}
          ></div>
        ))}
      </div>

   

      <div className=" w-full absolute top-0 h-full z-30 flex lg:flex-row flex-col overflow-hidden ">
        <div className=" lg:w-[50%] z-30 h-full flex flex-col justify-center items-center ">
          <img
            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
            className=" w-6/12 lg:w-8/12 xl:w-7/12 z-30 "
          />
          <p className="section4 font-zendots text-4xl text-white font-semibold z-30 mt-7 ">
            SKILLEAREUM.AI
          </p>

          <div className=" absolute -bottom-20 bg-[#1EEF32] w-[40%] h-36 blur-3xl "></div>
        </div>

        <div className="lg:w-[50%] overflow-hidden z-30 h-full relative flex flex-col justify-between ">
          <div className="relative flex justify-start items-center">
            <img
              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/Group3.svg"
              className="w-full absolute top-0 opacity-35 "
            /><div className=" w-[100%] bg-[#0285FF] bg-blend-multiply blur-[200px] rounded-full h-40 z-0 "></div>
            <div className="">
              <img
                loading="lazy"
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif"
                className="w-24 h-24 z-30 mx-auto absolute top-4 left-3"
              />
            </div>
            <div className="bg-[#0285FF] absolute top-5 md:-left-3 blur-lg -translate-x-6 -translate-y-10  w-44 h-44 rounded-full z-0  "></div>
            
       
          </div>
         <div className="z-40">
                    <div className="mb-5 px-3 z-40 font-gilroy ">
               <div className='flex items-center relative'>
                           <div className=' bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full border-2 border-white p-1 '>
                               <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_01.png' className='w-8 rounded-full' />
                               </div>
                               <div className=' -translate-x-3 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full border-2 border-white p-1 '>
                               <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_02.png' className='w-8 rounded-full' /> 
                               </div>
                               <div className=' -translate-x-6 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-full border-2 border-white p-1 '>
                               <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKLRM_DP_03.png' className='w-8 rounded-full' />
                           </div>
                          
                        </div>
                <div className="mt-5 z-30">
                    <p className="z-40 text-white font-semibold text-2xl">{t('section4.activeUsers', { count: userCount })}</p>
                    <p className="z-40 font-semibold ">{t('section4.rewardedText', { amount: totalTokenBalance })}</p>
                </div>
            </div>
            
          {/* <div className=" w-[100%] bg-[#0285FF] bg-blend-multiply blur-[300px] rounded-full h-56 z-0 "></div> */}
          </div>
          {/* <div className=" w-[70%] mx-auto bg-[#0285FF] bg-blend-multiply blur-[300px] rounded-full h-40 z-0 "></div> */}
        </div>
      </div>
    </div>
  );
};

export default Section4;
