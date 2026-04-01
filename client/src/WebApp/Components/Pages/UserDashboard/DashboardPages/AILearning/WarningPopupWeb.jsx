import React from 'react'
import { useTranslation } from "react-i18next";
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const WarningpopupWeb = ({onClose, closeVideo }) => {
  const { t } = useTranslation("games");

  //  const { playSound } = useSettings();

  return (
    <div className="w-full fixed inset-0 left-0 right-0 mx-auto flex justify-center items-center z-50 ">
                       <div style={{background: "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 0%, rgba(48, 62, 138, 0) 100%)"}} className="w-full max-w-md mx-auto backdrop-blur rounded-xl p-3 z-50 ">
                        <div className=" bg-[#000A14] rounded-xl z-50 p-4">
                     
                          <div className="text-center text-white p-4">
  <p className="mb-4 text-sm font-medium">
    {t("ai_learning.watch_fully_warning")}
  </p>
  <div className="flex justify-center gap-4">
  <div onClick={() => { 
                      if (navigator.vibrate) {
                        navigator.vibrate(100);
                      }
                      // playSound();
                      onClose();
                    }} className="mt-2 rounded-2xl w-28 mx-auto h-10 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              
                  <p className="uppercase font-medium text-xs text-center font-zendots" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t("ai_learning.continue")} </p>
              </div>
              </div>
              <div onClick={() => { 
                      if (navigator.vibrate) {
                        navigator.vibrate(100);
                      }
                      // playSound();
                      closeVideo();
                      onClose();
                    }} className="mt-2 rounded-2xl w-32 mx-auto h-10 relative" style={{ backgroundImage: "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)" }}>
          <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  ">
          </div>
          <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  ">
          </div>
          <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
          <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              
                  <p className="uppercase font-medium text-xs text-center font-zendots" style={{color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(to right, #0285FF, #1EEF32)"}}>{t("ai_learning.exit_anyway")} </p>
              </div>
              </div>
  </div>
</div>
                        </div>
                       </div>
                    </div>
  )
}

export default WarningpopupWeb