import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TasksIntroWeb = ({onClose,day}) => {
  const { t } = useTranslation("dashboard");

  return (
     <div>
          <div className="w-full text-white fixed bottom-20 left-0 right-0 mx-auto flex justify-center items-center z-50 ">
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
                <div
                      className="w-[76px] h-[84px] mx-auto bg-white p-[2px] flex items-center justify-center cursor-pointer"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      <div style={{
                        clipPath:
                          'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }} className="bg-gradient-to-b from-[#0985F1] to-[#00FF9F] rounded-xl p-4 w-[75px] h-20 flex items-center justify-center">
                        <div className="bg-gradient-to-b from-[#0985F1] to-[#00FF9F] border-2 border-white w-8 h-8 flex justify-center items-center rounded-full">
                          <span className="text-sm font-bold">{day || 1}</span>
                        </div>
                      </div>
                    </div>
                  <div className=" mt-5 ">
                    <div className=" uppercase text-[13px] text-center tracking-widest mt-3 flex flex-col gap-4 justify-center items-center font-light ">
                    <p className=" uppercase tracking-widest leading-6 ">{t("tasksIntro.instruction")}</p>
                      <p className=" text-center uppercase">
                        <span className="inline-block align-middle mx-1">
                          <img
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                            alt="Coin"
                            className="w-6 h-6 inline"
                          />
                        </span>
                        {t("tasksIntro.skillPointsEarned")}
                      </p>
    
                      <p className=" text-center uppercase">
                        {t("tasksIntro.treasureChests").split(' treasure')[0]}
                        <span className="inline-block align-middle mx-1">
                        <img
                            src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/treasurebox.svg"
                            alt="chest"
                            className="w-6"
                          />
                        </span>
                        {t("tasksIntro.treasureChests").split('forget ')[1]}
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default TasksIntroWeb


