import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";

const Day2IntroWeb = ({ onClose,currDay }) => {
  const { t } = useTranslation('dashboard');
  return (
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
              <div
                className={` cursor-pointer bg-cover bg-center bg-no-repeat w-16 h-16 mx-auto rounded-lg text-3xl  text-white font-bold flex  items-center justify-center z-10 `}
                style={{ backgroundImage: "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/newuserbg.svg)" }}
              >
                {currDay || 1}
              </div>
              <div className=" mt-5 ">
                <div className=" uppercase text-[13px] text-center tracking-widest mt-3 flex flex-col gap-3 justify-center items-center ">
                  <p className=" text-center uppercase">
                    COMPLETE TASKS TO EARN
                    <span className="inline-block align-middle mx-1">
                      <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                        alt="Coin"
                        className="w-6 h-6 inline"
                      />
                    </span>
                    SKILL POINTS
                    AND UNLOCK{" "}
                    <span className="inline-block align-middle mx-1">
                      <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/treasurebox.svg"
                        alt="chest"
                        className="w-6"
                      />
                    </span>{" "}
                    TREASURE.
                  </p>

                  <p className=" text-center uppercase">
                    seek out the
                    <span className="inline-block align-middle mx-1">
                    <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/treasurebox.svg"
                        alt="chest"
                        className="w-6"
                      />
                    </span>
                    optional challenges
                    for extra 
                    <span className="inline-block align-middle mx-1">
                    <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Coin_Flip_256x256(1).gif"
                        alt="Coin"
                        className="w-6 h-6 inline"
                      />
                      
                    </span>{" "}
                   skill points
                  </p>
                  <p className=" uppercase tracking-widest leading-6 "> {t('pilot.completeTasks')} <span className=" text-[#1EEF32] ">{t('pilot.skillPoints')}</span> will add up, bringing you closer to your <span className=" text-[#1EEF32] font-semibold ">{t('pilot.skillionaireBadge')}</span> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day2IntroWeb;
