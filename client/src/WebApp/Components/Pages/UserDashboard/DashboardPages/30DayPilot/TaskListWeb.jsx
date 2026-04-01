import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faLock, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "../../../../../../config";
import axiosInstance from "../../../../../../config/axiosInstance";
import IslandLoader from "../7DayPilot/Loaders/IslandLoader";
import DashboardLayout from "../../Layout/DashboardLayout";

const sequences = {
  "SEQ-A": ["A1", "A2", "A3", "A4", "A5", "A9", "A7", "A8", "A6", "A11", "A10", "A12", "A13"],
  "SEQ-B": ["A1", "A9", "A7", "A8", "A10", "A11", "A12", "A6", "A4", "A2", "A3", "A5", "A13"],
  "SEQ-C": ["A3", "A2", "A5", "A4", "A1", "A9", "A11", "A6", "A7", "A8", "A12", "A13", "A10"],
  "SEQ-D": ["A7", "A8", "A11", "A6", "A10", "A13", "A1", "A9", "A12", "A4", "A2", "A3", "A5"],
};

const codeToTaskId = {
  A1: 1,
  A2: 7,
  A3: 9,
  A4: 11,
  A5: 12,
  A6: 2,
  A7: 3,
  A8: 4,
  A9: 5,
  A10: 6,
  A11: 8,
  A12: 10,
  A13: 13,
};

const codeToCompletionKey = {
  A1: "videoAndQuestCompleted",   // FlashLearn + Quest
  A2: "aiFunFactVisited",         // Insight Vault
  A3: "blogClaimed",              // StoryLens
  A4: "mythBreakerCompleted",     // ← We will use this key (add to backend later if needed)
  A5: "failureFilesCompleted",    // ← We will use this key
  A6: "rewardClaimed",            // RapidFire Quest reward
  A7: "Missing Letter",           // Word Forge
  A8: "Jumble Word",              // Term Scramble
  A9: "Perfect Match",            // Concept Match
  A10: "Memory Game",             // Memory Grid
  A11: "emojiGameCompleted",      // Symbol Decode
  A12: "aiMissionClaimed",        // Tool Missions
  A13: "toolArenaCompleted",     
};

const TaskListWeb = () => {
  const { t } = useTranslation("dashboard");
  const location = useLocation();
  const authToken = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user_email?.id);

  const queryParams = new URLSearchParams(location.search);
  const queryDay = queryParams.get("day");

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [dailyProgress, setDailyProgress] = useState(null);

  const [day, setDay] = useState(() => queryDay || localStorage.getItem("day"));
  const [seq, setSeq] = useState("SEQ-A"); // default fallback
  const [isSequential, setIsSequential] = useState(true); // default locked
  const [tiles, setTiles] = useState([]);
  const [unlockedUpTo, setUnlockedUpTo] = useState(1); // 14 = all unlocked

  useEffect(() => {
    if (queryDay) {
      setDay(queryDay);
      localStorage.setItem("day", queryDay);
    }
  }, [queryDay]);

  const fetchDailyProgress = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${SERVER_URL}/api/getUserDailyProgress`,
        {
          // program_type: 'genesis' = 30-day program
          params: { userId, day, program_type: 'genesis' },
        }
      );
      setDailyProgress(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSequence = async () => {
    try {
      const response = await axiosInstance.get(`${SERVER_URL}/api/ai-assessment/get-UserAIPath`);
      setSeq(response.data.seq || "SEQ-A");
      setIsSequential(response.data.flow === "sequential");
    } catch (error) {
      console.error("Error fetching sequence:", error);
      setSeq("SEQ-A");
      setIsSequential(true);
    }
  };

  useEffect(() => {
    fetchDailyProgress();
    fetchSequence();
  }, [day]);

  useEffect(() => {
    if (!seq || !dailyProgress) return;

    const orderedCodes = sequences[seq] || sequences["SEQ-A"];
    const newTiles = orderedCodes.map((code, idx) => {
      const position = idx + 1;
      const taskId = codeToTaskId[code];
      const compKey = codeToCompletionKey[code];
      const isCompleted = compKey != null ? !!dailyProgress[compKey] : false;
      return { position, code, taskId, isCompleted };
    });
    setTiles(newTiles);
  }, [seq, dailyProgress]);

  useEffect(() => {
    if (!tiles.length) return;

    let upTo = 1;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].isCompleted) {
        upTo = i + 2;
      } else {
        break;
      }
    }
    setUnlockedUpTo(upTo);
  }, [tiles]);

  return (
    <DashboardLayout>
      <div>
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center ">
            <IslandLoader />
          </div>
        )}
        <div className="relative text-white font-poppins mt-24 ">
          <div className="w-full z-10 relative max-w-lg mx-auto ">
            <div className="w-full relative z-20">
              <button
                className="absolute top-2 left-5 text-white text-xl transition-transform hover:scale-110 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </button>
            </div>
            <div className="mt-10 pt-10 ">
              <div className="grid grid-cols-3 md:gap-5 gap-8 px-5">
                {tiles.map((tile) => {
                  const isLocked = tile.position > unlockedUpTo;

                  return (
                    <div
                      key={tile.position}
                      className="flex flex-col items-center space-y-2 relative"
                    >
                      <div
                        onClick={() => {
                          if (isLocked) return;
                          if (tile.isCompleted) {
                            toast.error(t("toasters.taskAlreadyCompleted"));
                            return;
                          }
                          if (navigator.vibrate) {
                            navigator.vibrate(100);
                          }
                          navigate(`/TaskWeb?id=${tile.taskId}&source=TaskListWeb`);
                        }}
                        style={{
                          backgroundImage:
                            "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/newuserbg.svg)",
                          textShadow: "none",
                          opacity: isLocked ? 0.6 : 1,
                          cursor: isLocked ? "not-allowed" : tile.isCompleted ? "default" : "pointer"
                        }}
                        className="relative md:w-14 md:h-14 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold bg-cover bg-no-repeat bg-center shadow-xl text-[#1EEF32]"
                      >
                        {isLocked ? (
                          <FontAwesomeIcon icon={faLock} />
                        ) : tile.isCompleted ? (
                          <FontAwesomeIcon icon={faCircleCheck} />
                        ) : (
                          <span className="text-xl" style={{ textShadow: "2px 2px 2px #000000" }}>{tile.position}</span>
                        )}
                      </div>
                      <div>
                        <img
                          src="../assets/New/tile2.svg"
                          className="w-52 md:w-20 "
                          alt="Tile Base"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskListWeb;
