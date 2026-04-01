import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SERVER_URL } from '../../../../../../config';
import DashboardLayout from '../../Layout/DashboardLayout';

const AIExplorerbadgeWeb = () => {
  const { t } = useTranslation("dashboard");

     const [dayData, setDayData] = useState(null);
       const authToken = useSelector((state) => state.token);

      // const { playSound } = useSettings();
       const userId = useSelector((state) => state.user_email.id);
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
    <div className="relativetext-white font-poppins mt-20 ">
   
        <div className="w-full z-10 relative max-w-xl mx-auto pt-3">             
        

               <div style={{
                          background:
                            "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                        }}
                        className="w-[95%] max-w-md mx-auto backdrop-blur rounded-xl p-3 z-50 mt-5"
                      >
                        <div className=" bg-[#000A14] rounded-xl z-50 p-4">
                          <div className="w-full flex justify-end z-50 ">
                            <button className='z-50' onClick={() => {
                              // playSound();
                              navigate("/AccomplishedWeb");
                            }
                            }>
                              <FontAwesomeIcon
                                icon={faXmark}
                                className=" text-[#1EEF32] z-50 text-xl"
                              />
                            </button>
                          </div>

                           <div className='w-full mb-2'>
                  <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/p1.svg' className='absolute -left-10 -top-10 scale-x-[-1] w-64 z-30 ' />
                  <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/Landing/p1.svg' className='absolute -right-10 -top-10 w-64 z-30  ' />
                </div> 
        <img 
         src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/exploreraibadge.png" 
          alt="AI Explorer Badge" 
          className="mx-auto mb-3 w-44"
        />
<div className={` rotate-90 -translate-x-1 translate-y-5 h-0.5 w-20 mx-auto  bg-gradient-to-r from-[#0285FF] to-[#1EEF32] `} />
        <img 
          src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
          alt="robot"
          className="w-32 my-4 mx-auto -translate-x-1"
        />
          <div className=' uppercase text-center font-zendots '>
          <p className="text-sm tracking-wide text-white mb-1">{t("badge.youVeEarned")}</p>
        <p className="text-sm tracking-wide text-white mb-1">{t("badge.yourFirstBadge")}</p>
        <p className="text-[#1EEF32] text-sm ">{t("badge.badgeName")}</p>
          </div>
       
                          <div>

                          </div>
                          </div>
                          </div>
           
        </div>
        </div>
        </DashboardLayout>
      
  )
}

export default AIExplorerbadgeWeb