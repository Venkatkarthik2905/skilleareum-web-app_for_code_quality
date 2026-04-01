import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../config/axiosInstance";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../../../../config";
import { useTranslation } from "react-i18next";
import { playEveryTap } from "../../../../../../utils/audioUtils";

// Skeleton loader component
const Skeleton = ({ width, height }) => (
  <div
    className={`bg-gray-200 rounded-full animate-pulse mb-3`}
    style={{ width, height }}
  ></div>
);

const CountdownTimerWeb = ({
  handleCardClick,
  isFirstClick,
  startTime,
  selectedItem,
  fetchData,
  handleapp,
  toast,
  setShowConfetti,
}) => {
  const { t } = useTranslation('dashboard');
  const userId = useSelector((state) => state.user_email.id);
  const fourHoursInMs = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const endTime = new Date(
    new Date(startTime).getTime() + fourHoursInMs
  ).getTime();

  const [remainingTime, setRemainingTime] = useState(endTime - Date.now());
  const [isLoading, setIsLoading] = useState(true);
  // const [audio] = useState(new Audio("../assets/EveryTap.mp3"));

  // useEffect(() => {
  //   audio.load();
  // }, [audio]);

  const playSound = () => {
    playEveryTap();
  };

  useEffect(() => {
    // Simulate loading (you can replace this with actual fetching)
    const timer = setTimeout(() => {
      setIsLoading(false); // Data is now "loaded"
    }, 1000); // Simulate loading time (1 second)

    const interval = setInterval(() => {
      setRemainingTime(endTime - Date.now());
      if (endTime - Date.now() <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [endTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleCardClaim = async (cardId) => {
    playSound();
    try {
      const response = await axiosInstance.post(
        `/api/aispace/claim?userId=${userId}&cardId=${cardId}`
      );
      if (
        response.data.message ===
        "Reward claimed successfully! 50 points credited."
      ) {
        toast.success("Reward Claimed successfully");
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
        handleapp();
      }
      if (
        response.data.message ===
        "You have already claimed 300 points. Come tomorrow"
      ) {
        toast.error("You have already claimed 300 points.");
        handleapp();
      }
      handleCardClick(cardId);
      setTimeout(() => {
        fetchData();
      }, 1000);
    } catch (error) {
      console.error("Error fetching reward details: ", error);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Skeleton loading for Timer or Claim button */}
      {isLoading ? (
        <>
          {/* Skeleton for Claim button */}
          <Skeleton width="50px" height="20px" />
        </>
      ) : (
        <>
          {/* Timer or Claim button when data is ready */}
          {(!startTime || startTime === "") && (
            <div
              className=" rounded-xl w-20 h-8 relative cursor-pointer"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
              }}
            >
              <div className="h-full w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
              <div className="h-full w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
              <div className=" bg-[#070e3a4b] backdrop-blur-sm h-full rounded-xl w-full border-[0.5px] border-[#1AE348] "></div>
              <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                <p
                  className="uppercase  w-[85px] break-words font-medium text-center font-zendots text-[10px]"
                  style={{
                    color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage:
                      "linear-gradient(to right, #0285FF, #1EEF32)",
                  }}
                >
                  {" "}
                  {t('common.launch')}
                </p>
              </div>
            </div>
          )}

          {remainingTime > 0 && startTime !== "" && isFirstClick != 1 && (
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="text-[11px] font-semibold  bg-black/15 border border-[#1AE348]/50 rounded-xl py-1 px-3 backdrop-blur text-[#1EEF32]"
            >
              <p>{formatTime(remainingTime)}</p>
            </div>
          )}

          {((remainingTime <= 0 && (startTime == "" || startTime)) ||
            isFirstClick == 1) && (
            <div
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from propagating to the parent
                handleCardClaim(selectedItem.tool_id);
              }}
              className=" rounded-xl w-20 h-8 relative cursor-pointer"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #0C1E91 17%, #B9C2F8 27%, #505BA1 36%, #0D1547 49%, #060C31 92%, #CCD1F2 93%, #172683 96%)",
              }}
            >
              <div className="h-full w-full absolute top-0 rounded-xl mix-blend-overlay bg-gradient-to-b from-[#1EEF32] to-[#0285FF] opacity-40  "></div>
              <div className="h-full w-full rounded-xl absolute top-0 mix-blend-multiply bg-gradient-to-b from-[#1EEF32] to-[#0285FF]  "></div>
              <div className=" bg-[#070e3a4b] backdrop-blur-sm h-full rounded-xl w-full border-[0.5px] border-[#1AE348] "></div>
              <div className="w-full h-full absolute top-0 bottom-0 flex items-center justify-center">
                <p
                  className="uppercase font-medium text-center font-zendots text-[10px]"
                  style={{
                    color: "transparent",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundImage:
                      "linear-gradient(to right, #0285FF, #1EEF32)",
                  }}
                >
                  {" "}
                  {t('common.claim')}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CountdownTimerWeb;
