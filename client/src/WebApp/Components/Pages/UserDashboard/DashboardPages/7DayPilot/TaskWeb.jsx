import {
  faArrowLeftLong,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "../../../../../../config";
import DashboardLayout from "../../Layout/DashboardLayout";

import toast from "react-hot-toast";

const TaskWeb = () => {
  const { t } = useTranslation("dashboard");
  const userId = useSelector((state) => state.user_email.id);
  const program = useSelector((state) => state.user_email.current_program);
  const location = useLocation();
  const [assessmentDays, setAssessmentDays] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("id");
  const queryDay = queryParams.get("day");
  const [day, setDay] = useState(() => queryDay || localStorage.getItem("day"));
  // console.log("day", day);
  const params = new URLSearchParams(location.search);
  const authToken = useSelector((state) => state.token);

  const Initalsource = params.get("source");
  const [source, setsource] = useState(
    () => Initalsource || localStorage.getItem("source")
  );
  // console.log("Source : ", source);

  const handleClose = (source) => {
    // console.log("handleClose : ", source);
    if (source === "TaskWeb") {
      navigate("/TaskWeb");
    } else {
      navigate("/ChallengeMapWeb");
    }
  };

  const navigate = useNavigate();
  const taskList = {
    1: {
      title: t("tasks.list.1.title"),
      desc: t("tasks.list.1.desc"),
      action: () => {
        return navigate(`/AILearningWeb?source=${source}`);
      },
    },
    2: {
      title: t("tasks.list.2.title"),
      desc: t("tasks.list.2.desc"),
      action: () => {
        localStorage.setItem("gameTriggered", "true");
        return navigate(`/AISkillQuestWeb?day=${day}&source=${source}`);
      },
    },
    3: {
      title: t("tasks.list.3.title"),
      desc: t("tasks.list.3.desc"),
      action: () => {
        localStorage.setItem("gameTriggered", "true");
        return navigate(`/games/Missingletters?source=${source}&day=${day}`);
      },
    },
    4: {
      title: t("tasks.list.4.title"),
      desc: t("tasks.list.4.desc"),
      action: () => {
        localStorage.setItem("gameTriggered", "true");
        return navigate(`/games/JumbledLetters?source=${source}&day=${day}`);
      },
    },
    5: {
      title: t("tasks.list.5.title"),
      desc: t("tasks.list.5.desc"),
      action: () => {
        localStorage.setItem("gameTriggered", "true");
        return navigate(`/games/PerfectMatch?source=${source}&day=${day}`);
      },
    },
    6: {
      title: t("tasks.list.6.title"),
      desc: t("tasks.list.6.desc"),
      action: () => {
        localStorage.setItem("gameTriggered", "true");
        return navigate(`/games/MemoryGame?source=${source}&day=${day}`);
      },
    },
    7: {
      title: t("tasks.list.7.title"),
      desc: t("tasks.list.7.desc"),
      action: () => {
        return navigate(`/AIFactVaultWeb?source=${source}`);
      },
    },
    8: {
      title: t("tasks.list.8.title"),
      desc: t("tasks.list.8.desc"),
      action: () => {
        return navigate(`/AIEmojiWeb?source=${source}`);
      },
    },
    9: {
      title: t("tasks.list.9.title"),
      desc: t("tasks.list.9.desc"),
      action: () => {
        return navigate(`/DailyBlogsWeb/${day}?source=${source}`);
      },
    },
    10: {
      title: t("tasks.list.10.title"),
      desc: t("tasks.list.10.desc"),
      action: () => {
        return navigate(`/AiSpaceWeb?source=${source}`);
      },
    },
    11: {
      title: t("tasks.list.11.title"),
      desc: t("tasks.list.11.desc"),
      action: () => {
        return navigate(`/ai-mythbreaker-rules?source=${source}`);
      },
    },
    12: {
      title: t("tasks.list.12.title"),
      desc: t("tasks.list.12.desc"),
      action: () => {
        return navigate(`/ai-failurefiles-rules?source=${source}`);
      },
    },
    13: {
      title: t("tasks.list.13.title"),
      desc: t("tasks.list.13.desc"),
      action: () => {
        return navigate(`/ai-toolarena-rules?source=${source}`);
      },
    },
  };

  const taskIdToCompletionKey = {
    1: "videoAndQuestCompleted",
    7: "aiFunFactVisited",
    9: "blogClaimed",
    11: "mythBreakerCompleted",
    12: "failureFilesCompleted",
    2: "rewardClaimed",
    3: "Missing Letter",
    4: "Jumble Word",
    5: "Perfect Match",
    6: "Memory Game",
    8: "emojiGameCompleted",
    10: "aiMissionClaimed",
    13: "toolArenaCompleted",
  };

  const [dailyProgress, setDailyProgress] = useState(null);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const fetchAssessment = async () => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/api/getAllAssessmentDaysController?email=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log(res);
      setAssessmentDays(res?.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchDailyProgress = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/getUserDailyProgress`,
        {
          // program_type: 'apprentice' = 7-day program
          params: { userId, day, program_type: 'apprentice' },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setDailyProgress(response.data.data);
    } catch (error) {
      console.error("Error fetching progress", error);
    }
  };

  useEffect(() => {
    if (queryDay) {
      setDay(queryDay);
      localStorage.setItem("day", queryDay);
    }
    if (Initalsource) {
      setsource(Initalsource);
      localStorage.setItem("source", Initalsource);
    }
    if (taskId == 10) {
      fetchAssessment();
    }
    fetchDailyProgress();
  }, [queryDay, taskId]);

  useEffect(() => {
    if (dailyProgress && taskId) {
      const compKey = taskIdToCompletionKey[taskId];
      setIsTaskCompleted(!!dailyProgress[compKey]);
    }
  }, [dailyProgress, taskId]);

  return (
    <DashboardLayout>
      <div className="relative text-white font-poppins z-20 pt-20 scale-90 translate-x-1 ">
        <div className="w-full  z-20 ">
          {/* <div>
                      <button
                              className="absolute top-0 left-5 text-white text-xl"
                              onClick={()=>handleClose(source)}
                            >
                              <FontAwesomeIcon icon={faArrowLeftLong} />
                            </button>
                            </div>                           */}

          <div className="flex flex-col items-center relative">
            <img
              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
              alt="robot"
              className="w-40 mx-auto mt-2"
            />
            <div className="w-0.5 h-20 bg-green-400 -translate-y-2 "></div>
          </div>
          <div className="z-30  max-w-md mx-auto -translate-y-2 bg-gradient-to-r from-[#0285FF] to-[#1EEF32] rounded-t-3xl pt-[0.9px]">
            <div className="z-30 relative bg-[#080B1C] rounded-t-3xl text-center py-7 px-4 shadow-lg ">
              <button
                onClick={() => 
                {
                  navigate(-1)
                  // handleClose(source);
                }}
                className="z-30 absolute top-3 right-4 text-[#1EEF32] text-lg font-bold"
              >
                <FontAwesomeIcon icon={faXmarkCircle} />
              </button>
              <div className=" mx-auto flex justify-center mb-3">
                {/* <div
                  className="  w-[76px] h-[84px] bg-white p-[2px] flex items-center justify-center cursor-pointer"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <div
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                    className="bg-gradient-to-b from-[#0985F1] to-[#00FF9F] rounded-xl p-4 w-[75px] h-20 flex items-center justify-center"
                  >
                    <div className="bg-gradient-to-b from-[#0985F1] to-[#00FF9F] border-2 border-white w-8 h-8 flex justify-center items-center rounded-full">
                      <span className="text-sm font-bold">{taskId}</span>
                    </div>
                  </div>
                </div> */}
                <div>
                    <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/LOGO_Icon_GIF.gif' className='w-12 h-12'/>
                  </div>
              </div>
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0285FF] to-[#1EEF32] mb-2">
                {taskList[taskId].title}
              </h2>
              <p className="text-sm text-gray-200 px-2">
                {taskList[taskId].desc}
              </p>

              <div
                onClick={() => {
                  if (isTaskCompleted) {
                    toast.error(t("toasters.taskAlreadyCompleted"));
                    return;
                  }
                  taskList[taskId].action();
                }}
                className={` ${isTaskCompleted ? "opacity-60 cursor-default" : "cursor-pointer"} mt-7 rounded-2xl w-[70%] mx-auto h-10 relative`}
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
                    className="uppercase font-medium text-center font-zendots"
                    style={{
                      color: "transparent",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      backgroundImage:
                        "linear-gradient(to right, #0285FF, #1EEF32)",
                    }}
                  >
                    {" "}
                    {isTaskCompleted ? "Completed" : t("tasks.letsGo")}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskWeb;
