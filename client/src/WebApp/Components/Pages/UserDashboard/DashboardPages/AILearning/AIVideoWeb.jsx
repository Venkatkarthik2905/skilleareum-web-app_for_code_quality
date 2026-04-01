import { faCirclePlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import WarningpopupWeb from "./WarningPopupWeb";

const AIvideoWeb = ({ onClose,isCompleted,unlockedData }) => {
  const { t } = useTranslation("games");
  const [play, setPlay] = useState(false);
  const [watchedFull, setWatchedFull] = useState(false);
  const videoRef = useRef(null);
  const [popupopen, setPopupOpen] = useState(false);

  const playVideo = () => setPlay(true);
  const closeVideo = () => setPlay(false);

  const handleVideoEnd = () => {
   // console.log("User has watched the full video");
    isCompleted()
    // You can call an API or update state here
  };

  useEffect(() => {
    if (videoRef.current) {
      if (popupopen) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay failed:", err);
        });
      }
    }
  }, [popupopen]);
  
 
  return (
    <div className=" w-full max-w-md mx-auto ">
      <div className="px-7 z-50 flex justify-end py-2">
        <button onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} className="text-[#1EEF32] text-xl" />
        </button>
      </div>

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
                  <button onClick={playVideo} className="w-full mx-auto">
                    <FontAwesomeIcon
                      icon={faCirclePlay}
                      className="w-full mx-auto text-[#1EEF32] text-5xl mt-20"
                    />
                  </button>
                </div>
              </div>

              <div className="z-50">
                <p
                  style={{ textShadow: "2px 2px 2px #00000080" }}
                  className="mt-3 text-xl font-bold text-center font-poppins text-[#FCE932]"
                >
                  {t("ai_learning.video_day_label", { day: unlockedData?.day })}
                </p>
                <hr className="my-3 border border-white w-[75%] mx-auto" />
                <p className="text-center font-light text-xl tracking-widest uppercase">
                  {unlockedData?.topic_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {play && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#05091CD9] bg-opacity-60 z-50 flex justify-center items-center">
          <div className="w-[90%] max-w-5xl h-[90%] ">
            <div className="w-full h-full p-[1px] shadow-lg shadow-black/25 bg-gradient-to-b from-[#1AE348] to-[#0368C0] rounded-xl">
              <div className="w-full bg-[#0a0342] h-full rounded-xl">
                <div
                  className="w-full h-full rounded-xl p-2"
                  style={{
                    background:
                      "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.5) 30.97%, rgba(48, 62, 138, 0) 100%)",
                  }}
                >
                  <div className="w-full h-full relative rounded-xl">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-contain"
            autoPlay
            onEnded={handleVideoEnd}
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
            disablePictureInPicture
            disableRemotePlayback
                    >
                      <source src={unlockedData?.video_url} type="video/mp4" />
                      {t("ai_learning.browser_no_support")}
                    </video>

                    <button
                      onClick={() => setPopupOpen(!popupopen)}
                      className="absolute top-4 right-4 z-50 text-white text-xl"
                    >
                      <FontAwesomeIcon icon={faXmark} className="text-[#1EEF32]" />
                    </button>
                  </div>

                  {watchedFull && (
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-[#1AE348] text-black px-4 py-2 rounded-lg shadow-md">
                      {t("ai_learning.watched_full")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {popupopen && (
        <WarningpopupWeb closeVideo = {closeVideo} onClose={() => setPopupOpen(!popupopen)} />
      )}
    </div>
  );
};

export default AIvideoWeb;
