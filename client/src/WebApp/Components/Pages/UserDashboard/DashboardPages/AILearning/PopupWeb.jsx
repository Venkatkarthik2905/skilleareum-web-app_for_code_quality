import React from 'react'
import { useTranslation } from "react-i18next";
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PopupWeb = ({handleplay, handleassessment}) => {
  const { t } = useTranslation("games");
    
  
      
  return (
    <div>
         <div className="mt-3 flex  flex-col gap-2">
                     <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-[90%] max-w-md p-[1px] shadow-lg shadow-black/25 bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-xl">
                              <div className="w-full bg-[#0a0342] h-full rounded-xl">
                                <div
                                  className="w-full h-full rounded-xl p-2"
                                  style={{
                                    background:
                                      "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 30.97%, rgba(48, 62, 138, 0) 100%)",
                                  }}
                                >
                                  <div className="w-full h-full relative rounded-xl">
                                    <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/learningbg.svg" className="" />
                                    <div
                                      className="absolute top-0 z-10 w-full h-full rounded-xl"
                                      style={{
                                        background:
                                          "radial-gradient(87.83% 75.46% at 50% 36.47%, rgba(0, 0, 0, 0.75) 0%, #000000 86.43%)",
                                      }}
                                    ></div>
                                    <div className="absolute top-0 bottom-0 left-0 right-0 z-20">
                                      <button className="w-full mx-auto">
                                        <FontAwesomeIcon
                                          icon={faCirclePlay}
                                          className="w-full mx-auto text-[#1EEF32] text-5xl mt-20"
                                        />
                                      </button>
                                    </div>
                                
                                  </div>
                    
                                 <div className=' flex justify-center items-center gap-5 translate-y-5 '>
                                  <div onClick={handleplay} className="rounded-xl cursor-pointer w-28 h-8 relative flex items-center justify-center"
    style={{
      backgroundImage:
        "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
    }}
  >
    <div className="h-8 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
    <div className="h-8 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
    <div className="bg-[#070e3a4b] backdrop-blur-sm h-8 rounded-xl w-full border-[0.5px] border-[#1AE348]"></div>
    
    {/* Button Content */}
    <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
      
        <p
          className="uppercase font-medium text-center font-zendots text-sm"
          style={{
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
          }}
        >
          {t("ai_learning.replay")}
        </p>
      
    </div>
                                  </div>

                                  <div onClick={handleassessment} className="rounded-xl cursor-pointer w-28 h-8 relative flex items-center justify-center"
    style={{
      backgroundImage:
        "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
    }}
  >
    <div className="h-8 w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40"></div>
    <div className="h-8 w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]"></div>
    <div className="bg-[#070e3a4b] backdrop-blur-sm h-8 rounded-xl w-full border-[0.5px] border-[#1AE348]"></div>
    
    {/* Button Content */}
    <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
      
        <p
          className="uppercase font-medium text-center font-zendots text-sm"
          style={{
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)",
          }}
        >
          {t("ai_learning.next")}
        </p>
      
    </div>
                                  </div>
                                  </div>


                                </div>
                              </div>
                            </div>
                          </div>
                 
        
                   
                     
        
                      
                   
                    </div>
    </div>
  )
}

export default PopupWeb