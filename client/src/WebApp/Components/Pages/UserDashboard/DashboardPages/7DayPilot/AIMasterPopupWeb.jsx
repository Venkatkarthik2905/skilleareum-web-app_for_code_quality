import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from "react-i18next";

const AIMasterPopupWeb = ({onClose}) => {
  const { t } = useTranslation('dashboard');
  return (
    <div>
        <div>
                  <div className="w-full fixed bottom-20 left-0 right-0 mx-auto flex justify-center items-center z-50 ">
                    <div
                      style={{
                        background:
                          "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)",
                      }}
                      className="w-full max-w-md mx-auto backdrop-blur rounded-xl p-3 z-50 "
                    >
                      <div className=" bg-[#000A14] rounded-xl z-50 p-4">
                        <div className="w-full flex justify-end ">
                          <button onClick={onClose}>
                            <FontAwesomeIcon
                              icon={faXmark}
                              className=" text-[#1EEF32] text-xl"
                            />
                          </button>
                        </div>
                        <div>
                        <div className="relative mt-5">
               
        <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif" alt="Robot" className="w-36 mx-auto z-10 relative" />
        <div className=" flex flex-col items-center justify-center ">
                <div className={` rotate-90 h-0.5 w-16 mx-auto  bg-gradient-to-r from-[#0285FF] to-[#1EEF32] `} />
                <div className={` rotate-45 h-2 w-2 mx-auto translate-y-8  bg-gradient-to-r from-[#0285FF] to-[#1EEF32] `} />
                </div>
      </div>
                          <div className=" mt-10 ">
                            <div className=" font-zendots text-center ">
                            <p className=" uppercase text-sm tracking-widest leading-6 ">{t('pilot.completeMastery')}<br/> <span className=' text-[#1EEF32] '>{t('pilot.aiMastery')}</span> {t('pilot.path')}</p>
                            <p className=" uppercase text-sm tracking-wider mt-2 leading-6 ">to become a <span className=' text-[#1EEF32] '>technopreneur</span> at Skilleareum</p>
                             
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

export default AIMasterPopupWeb