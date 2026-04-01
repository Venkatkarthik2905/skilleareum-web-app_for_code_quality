import { faArrowLeft, faCheck, faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";

const CompletedLearningsWeb = ({ onClose, completedTopics }) => {
  const { t } = useTranslation("games");
  // const { playSound } = useSettings();

  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="w-[95%] max-w-md mx-auto relative text-white flex flex-col justify-center items-center ">
        <button
          className="text-white absolute top-0 right-3 "
          onClick={() => {
            // playSound();
            onClose();
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faXmark} className="text-lg font-bold" />{" "}
        </button>

        <div className="px-5 w-full mx-auto">
        <div className="w-[100%] mx-auto  ">
          <p className=" w-full text-center text-lg font-medium font-zendots ">
            {t("ai_learning.ai_learning_history")}
          </p>
          <p className=" w-full text-sm text-center"></p>
        </div>
     
      <div className="mt-5  w-full max-w-md mx-auto ">

        <div className="mt-3 flex flex-col gap-3 overflow-hidden overflow-y-auto">
          {completedTopics.length > 0 ? (
             completedTopics.map((data, index) => (
            <div
              key={index}
              onClick={() => {
                toggleExpand(index);
              }}
              className="  w-full rounded-xl px-3 py-2 "
              style={{
                background:
                  "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
              }}
            >
              <div className="flex justify-between items-center">
                <div
                  className={` flex justify-start items-center gap-4 text-white${
                    data.status === "done" ? "text-gray-500" : "text-white"
                  } `}
                >
                  <p className="text-sm font-medium">{data.day}</p>
                  <div className="h-9 w-0.5 rounded-full bg-[#868686]"></div>
                  <p className=" text-sm font-medium">{data.topic_name}</p>
                </div>

                <div className=" relative ">
                  <img
                    src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/music.svg"
                    className=" w-7 h-7 "
                  />
                  <div className=" w-4 h-4 bg-[#1FEA32] opacity-25 blur-sm absolute top-1 left-1.5 "></div>
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="sm"
                    className="text-[#1FEA32] absolute top-1.5 left-2 "
                  />
                </div>
              </div>
              <div
                className={`duration-300 ease-in-out overflow-hidden ${
                  expandedIndex === index
                    ? "py-3 max-h-[300px] rounded-b-md"
                    : "max-h-0"
                }`}
              >
                <p
                  className={`${
                    data.status === "done" ? "text-gray-500" : "text-white"
                  } text-sm  duration-500 text-white/90`}
                >
                  {data.description}
                </p>
              </div>
            </div>
          ))
          ) : (
            <div className="  w-full rounded-xl px-3 py-4 mt-5 "
              style={{
                background:
                  "radial-gradient(109.2% 298.95% at 106.87% 5.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0.5) 54.1%)",
              }}>
                <p className="text-center text-white font-poppins ">
                  {t("ai_learning.no_data_found")}
                </p>
              </div>
          )}
          
        </div>
      </div>
      </div>
    </div>
  );
};

export default CompletedLearningsWeb;
