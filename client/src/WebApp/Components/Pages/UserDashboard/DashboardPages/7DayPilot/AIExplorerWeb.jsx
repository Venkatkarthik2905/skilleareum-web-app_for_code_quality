import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";

const AIExplorerWeb = ({ onClose }) => {
  const { t } = useTranslation('dashboard');
  return (
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
            <button
              onClick={() => {
                if (navigator.vibrate) {
                  navigator.vibrate(100);
                }
                onClose();
              }}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className=" text-[#1EEF32] text-xl"
              />
            </button>
          </div>
          <div>
            <img
              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/exploreraibadge.png"
              className=" w-36 mx-auto"
            />
            <div className=" mt-2 ">
              <p className=" text-sm text-center leading-7 tracking-wider uppercase font-zendots ">
                Finish all 7 days of challenges and unlock the{" "}
                <span className="text-[#1EEF32]">{t('pilot.aiExplorerBadge')}</span>
              </p>
              <p className=" uppercase font-light text-xs text-center tracking-widest mt-3 ">
                your first step toward becoming a Skillionaire!
              </p>
            </div>
          </div>

          <div
            onClick={() => {
              if (navigator.vibrate) {
                navigator.vibrate(100);
              }
              onClose();
            }}
            className="mt-2 rounded-2xl w-60 mx-auto h-10 relative"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
            }}
          >
            <div className="h-10 w-full absolute top-0 rounded-2xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
            <div className="h-10 w-full rounded-2xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
            <div className=" bg-[#070e3a4b] backdrop-blur-sm h-10 rounded-2xl w-full border-[0.5px] border-[#1AE348] "></div>
            <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
              <p
                className="uppercase font-medium text-sm text-center font-zendots"
                style={{
                  color: "transparent",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  backgroundImage:
                    "linear-gradient(to right, #0285FF, #1EEF32)",
                }}
              >
                LET’S GET STARTED
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIExplorerWeb;
