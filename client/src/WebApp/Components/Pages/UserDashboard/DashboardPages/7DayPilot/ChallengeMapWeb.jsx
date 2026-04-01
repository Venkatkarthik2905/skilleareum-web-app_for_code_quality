// import React, { useEffect, useState } from "react";
// import { faArrowLeftLong, faCheck } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { debounce } from "lodash";

// import axios from "axios";
// import { SERVER_URL } from "../../../../../../config";
// import IslandLoader from "./Loaders/IslandLoader";
// import DashboardLayout from "../../Layout/DashboardLayout";
// import TasksIntroWeb from "./TasksIntroWeb";

// const HexTile = ({ tile, isCompleted, onClick }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="w-[76px] h-[86px] bg-white p-[2px] flex items-center justify-center cursor-pointer"
//       role="button"
//       style={{
//         clipPath:
//           "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
//       }}
//       onClick={() => {
//         onClick(tile.id);
//         // console.log("tile id", tile.id);
//         if (isCompleted && !tile?.chest) return;
//         navigate(`/TaskWeb?id=${tile.id}&source=ChallengeMapWeb`);
//       }}
//       disabled={isCompleted}
//     >
//       <div
//         className={`w-full h-full flex items-center justify-center text-xl font-bold transition-all duration-300
//           ${
//             tile.chest
//               ? "bg-gradient-to-b from-[#0985F1] to-[#00FF9F]"
//               : "bg-gradient-to-b from-[#0985F1] to-[#00FF9F]"
//           } shadow-lg`}
//         style={{
//           clipPath:
//             "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
//         }}
//       >
//         {tile.chest ? (
//           <div>
//             {isCompleted ? (
//               <img
//                 src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/treasure-box5.png"
//                 alt="chest"
//                 className="w-12"
//               />
//             ) : (
//               <img
//                 src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/treasurebox.svg"
//                 alt="chest"
//                 className="w-12"
//               />
//             )}
//           </div>
//         ) : (
//           <div className="bg-gradient-to-b from-[#0985F1] to-[#00FF9F] border-2 border-white w-8 h-8 flex justify-center items-center rounded-full">
//             {isCompleted ? (
//               <FontAwesomeIcon icon={faCheck} />
//             ) : (
//               <span className="text-sm font-bold">{tile.id}</span>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const ChallengeMapWeb = () => {
//   const location = useLocation();
//   const authToken = useSelector((state) => state.token);

//   const queryParams = new URLSearchParams(location.search);
//   const queryDay = queryParams.get("day");
//   const [isLoading, setisLoading] = useState(true);
//   const navigate = useNavigate();
//   const [dailyProgress, setDailyProgress] = useState(null);
//   const userId = useSelector((state) => state.user_email.id);
//   const [completedTasks, setCompletedTasks] = useState([]);
//   // const { playSound } = useSettings();
//   const [taskintro, setTaskIntro] = useState(false);

//   const [day, setDay] = useState(() => queryDay || localStorage.getItem("day"));
//   // console.log("day", day);
//   useEffect(() => {
//     if (queryDay) {
//       setDay(queryDay);
//       localStorage.setItem("day", queryDay);
//     }
//   }, [queryDay]);
//   const [tiles, setTiles] = useState([
//     { id: 1, task: "videoAndQuestCompleted", chest: false, isCompleted: false },
//     { id: 2, task: "SPIN WHEEL BONUS", chest: true, isCompleted: false },
//     { id: 3, task: "FARMING BONUS", chest: true, isCompleted: false },
//     { id: 4, task: "blogClaimed", chest: false, isCompleted: false },
//     { id: 5, task: "DAILY ACTIVE BONUS", chest: true, isCompleted: false },
//     { id: 6, task: "aiFunFactVisited", chest: false, isCompleted: false },
//     { id: 7, task: "REFERRAL BONUS", chest: true, isCompleted: false },
//     { id: 8, task: "TaptoLearn", chest: false, isCompleted: false },
//     { id: 9, task: "RETWEET BONUS", chest: true, isCompleted: false },
//     { id: 10, task: "rewardClaimed", chest: false, isCompleted: false },
//     { id: 11, task: "emojiGameCompleted", chest: false, isCompleted: false },
//     { id: 12, task: "aiMissionClaimed", chest: false, isCompleted: false },
//     { id: 13, task: "aiMissionClaimed", chest: false, isCompleted: false },
//   ]);

//   useEffect(() => {
//     const hasSeenTaskIntro = localStorage.getItem("hasSeenTaskIntro");

//     if (!hasSeenTaskIntro) {
//       const timer = setTimeout(() => {
//         setTaskIntro(true);
//         localStorage.setItem("hasSeenTaskIntro", "true");
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, []);

//   const fetchDailyProgress = debounce(async () => {
//     setisLoading(true);
//     try {
//       const response = await axios.get(
//         `${SERVER_URL}/api/getUserDailyProgress`,
//         {
//           params: {
//             userId,
//             day: day,
//           },
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       // console.log("getUserDailyProgress : ", response.data);
//       const progressData = response.data.data;

//       // Update isCompleted for each tile based on the API response
//       const updatedTiles = tiles.map((tile) => ({
//         ...tile,
//         isCompleted: progressData[tile.task] === true,
//       }));

//       setTiles(updatedTiles);
//       setDailyProgress(progressData);
//     } catch (error) {
//       console.error("Error fetching daily progress:", error);
//     } finally {
//       setisLoading(false);
//     }
//   }, 1000);

//   useEffect(() => {
//     fetchDailyProgress();
//     return () => {
//       fetchDailyProgress.cancel();
//     };
//   }, []);

//   const handleTileClick = (id) => {
//     if (!completedTasks.includes(id)) {
//       setCompletedTasks((prev) => [...prev, id]);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className=" w-full mt-14 scale-90 translate-y-6 translate-x-1 relative text-white font-poppins">
//         {isLoading && (
//           <div className="absolute inset-0 z-50 flex items-center justify-center ">
//             <IslandLoader />
//           </div>
//         )}

//         <div className="w-full h-full max-w-lg mx-auto z-20 pt-10 md:pt-0 ">
//           <div className="w-full relative z-20">          
//               <button
//                 className=" absolute top-8 left-5 text-white text-xl"
//                 onClick={() => navigate("/ChallengeMap_7Days")}
//               >
//                 <FontAwesomeIcon icon={faArrowLeftLong} />
//               </button>
        
//             {/* <div>
//               <button onClick={() => navigate("/ChallengeMapScreen")}>
//                 <img
//                   src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/New/islandicon.svg"
//                   className=" w-10 "
//                 />
//               </button>
//             </div> */}
//           </div>

//           <div className=" relative  ">
//             <div className=" flex justify-center items-center ">
//               <img
//                 src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
//                 alt="robot"
//                 className="w-32 my-4 z-10 "
//               />
//             </div>
//             <div
//               className={` absolute left-0 right-0 rotate-90 h-0.5 w-20 mx-auto bg-gradient-to-r from-[#0285FF] to-[#1EEF32] `}
//             />
//           </div>

//           <div className="flex flex-col items-center relative z-10">
//             <div
//               onClick={() => {
//                 if (navigator.vibrate) {
//                   navigator.vibrate(100);
//                 }
//                 // playSound();
//               }}
//               className="flex justify-center translate-y-6"
//             >
//               <HexTile
//                 tile={tiles[0]}
//                 onClick={handleTileClick}
//                 isCompleted={tiles[0].isCompleted}
//               />
//             </div>

//             <div
//               onClick={() => {
//                 if (navigator.vibrate) {
//                   navigator.vibrate(100);
//                 }
//                 // playSound();
//               }}
//               className="flex justify-center"
//             >
//               <HexTile
//                 tile={tiles[1]}
//                 onClick={handleTileClick}
//                 isCompleted={tiles[0].isCompleted}
//               />
//               <HexTile
//                 tile={tiles[2]}
//                 onClick={handleTileClick}
//                 isCompleted={tiles[1].isCompleted}
//               />
//             </div>

//             <div
//               onClick={() => {
//                 if (navigator.vibrate) {
//                   navigator.vibrate(100);
//                 }
//                 // playSound();
//               }}
//               className="flex justify-center -translate-y-6"
//             >
//               {tiles.slice(3, 6).map((tile) => (
//                 <HexTile
//                   key={tile.id}
//                   tile={tile}
//                   onClick={handleTileClick}
//                   isCompleted={tile.isCompleted}
//                 />
//               ))}
//             </div>

//             <div
//               onClick={() => {
//                 if (navigator.vibrate) {
//                   navigator.vibrate(100);
//                 }
//                 // playSound();
//               }}
//               className="flex justify-center -translate-y-12"
//             >
//               {tiles.slice(6, 10).map((tile) => (
//                 <HexTile
//                   key={tile.id}
//                   tile={tile}
//                   onClick={handleTileClick}
//                   isCompleted={tile.isCompleted}
//                 />
//               ))}
//             </div>

//             <div
//               onClick={() => {
//                 if (navigator.vibrate) {
//                   navigator.vibrate(100);
//                 }
//                 // playSound();
//               }}
//               className="flex justify-center -translate-y-[70px]"
//             >
//               {tiles.slice(10, 13).map((tile) => (
//                 <HexTile
//                   key={tile.id}
//                   tile={tile}
//                   onClick={handleTileClick}
//                   isCompleted={tile.isCompleted}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="z-20 text-center font-zendots text-white font-medium -translate-y-12">
//             <p className="text-[#1EEF32] text-lg ">Welcome to Day {day} </p>
//             <p>🎮 Your adventure begins here.</p>
//           </div>
//         </div>
//       </div>

//        {taskintro && (
//             <div className=" z-50 transition-all ease-in-out duration-300">
//               <TasksIntroWeb day={day} onClose={() => setTaskIntro(false)} />
//             </div>
//           )} 
//     </DashboardLayout>
//   );
// };

// export default ChallengeMapWeb;






import React, { useEffect, useState } from "react";
import { faArrowLeftLong, faCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import toast from "react-hot-toast";

import axios from "axios";
import { SERVER_URL } from "../../../../../../config";
import IslandLoader from "./Loaders/IslandLoader";
import DashboardLayout from "../../Layout/DashboardLayout";
import TasksIntroWeb from "./TasksIntroWeb";
import axiosInstance from "../../../../../../config/axiosInstance";
import { useTranslation } from "react-i18next";

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


const codeToCompletionKey= {
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




const HexTile = ({ tile, isLocked, isCompleted, onTileClick }) => {
  const { t } = useTranslation("dashboard");

  const handleClick = () => {
    if (isLocked) return;
    
    if (isCompleted) {
      toast.error(t("toasters.taskAlreadyCompleted"));
      return;
    }

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    onTileClick();
  };

  return (
    <div
      className={`w-[76px] h-[86px] ${isLocked ? "opacity-60 cursor-not-allowed" : isCompleted ? "cursor-default" : "cursor-pointer"} p-[2px] flex items-center justify-center`}
      style={{
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
      onClick={handleClick}
    >
      <div
        className={`w-full h-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
          isLocked ? "bg-gray-600" : "bg-gradient-to-b from-[#0985F1] to-[#00FF9F]"
        } shadow-lg`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        <div
          className={`border-2 ${isLocked ? "border-gray-400" : "border-white"} w-8 h-8 flex justify-center items-center rounded-full bg-gradient-to-b from-[#0985F1] to-[#00FF9F]`}
        >
          {isLocked ? (
            <FontAwesomeIcon icon={faLock} className="text-2xl text-white" />
          ) : isCompleted ? (
            <FontAwesomeIcon icon={faCheck} className="text-2xl text-white" />
          ) : (
            <span className="text-sm font-bold text-white">{tile.position}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const ChallengeMapWeb = () => {
  const { t } = useTranslation("dashboard");
  const location = useLocation();
  const authToken = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user_email?.id);

  const queryParams = new URLSearchParams(location.search);
  const queryDay = queryParams.get("day");

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [dailyProgress, setDailyProgress] = useState(null);
  const [taskintro, setTaskIntro] = useState(false);

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

  useEffect(() => {
    const hasSeenTaskIntro = localStorage.getItem("hasSeenTaskIntro");
    if (!hasSeenTaskIntro) {
      const timer = setTimeout(() => {
        setTaskIntro(true);
        localStorage.setItem("hasSeenTaskIntro", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

const fetchDailyProgress = async () => {
  setIsLoading(true);
  try {
    const response = await axiosInstance.get(
      `${SERVER_URL}/api/getUserDailyProgress`,
      {
        // program_type: 'apprentice' = 7-day program
        params: { userId, day, program_type: 'apprentice' },
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
      console.log(`Code: ${code}, Task ID: ${taskId}, Completion Key: ${compKey}, Is Completed? ${isCompleted}`);
      return { position, code, taskId, isCompleted };
    });
    setTiles(newTiles);
  }, [seq, dailyProgress]);


  useEffect(() => {
  if (!tiles.length) return;

  // if (!isSequential) {
  //   setUnlockedUpTo(tiles.length);
  //   return;
  // }

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
      <div className="w-full mt-14 scale-90 translate-y-6 translate-x-1 relative text-white font-poppins">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <IslandLoader />
          </div>
        )}

        <div className="w-full h-full max-w-lg mx-auto z-20 pt-10 md:pt-0">
          <div className="w-full relative z-20">
            <button
              className="absolute top-8 left-5 text-white text-xl"
              onClick={() => navigate("/ChallengeMap_7Days")}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          </div>

          <div className="relative">
            <div className="flex justify-center items-center">
              <img
                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/SKL_MAscot_Wave_Landscape.gif"
                alt="robot"
                className="w-32 my-4 z-10"
              />
            </div>
            <div className="absolute left-0 right-0 rotate-90 h-0.5 w-20 mx-auto bg-gradient-to-r from-[#0285FF] to-[#1EEF32]" />
          </div>

          <div className="flex flex-col items-center relative z-10">
            {/* Row 1 - Position 1 */}
            {tiles[0] && (
              <div className="flex justify-center translate-y-6">
                <HexTile
                  tile={tiles[0]}
                  isLocked={tiles[0].position > unlockedUpTo}
                  isCompleted={tiles[0].isCompleted}
                  onTileClick={() => navigate(`/TaskWeb?id=${tiles[0].taskId}&source=ChallengeMapWeb`)}
                />
              </div>
            )}

            {/* Row 2 - Positions 2-3 */}
            {tiles.slice(1, 3).length > 0 && (
              <div className="flex justify-center">
                {tiles.slice(1, 3).map((tile) => (
                  <HexTile
                    key={tile.position}
                    tile={tile}
                    isLocked={tile.position > unlockedUpTo}
                    isCompleted={tile.isCompleted}
                    onTileClick={() => navigate(`/TaskWeb?id=${tile.taskId}&source=ChallengeMapWeb`)}
                  />
                ))}
              </div>
            )}

            {/* Row 3 - Positions 4-6 */}
            {tiles.slice(3, 6).length > 0 && (
              <div className="flex justify-center -translate-y-6">
                {tiles.slice(3, 6).map((tile) => (
                  <HexTile
                    key={tile.position}
                    tile={tile}
                    isLocked={tile.position > unlockedUpTo}
                    isCompleted={tile.isCompleted}
                    onTileClick={() => navigate(`/TaskWeb?id=${tile.taskId}&source=ChallengeMapWeb`)}
                  />
                ))}
              </div>
            )}

            {/* Row 4 - Positions 7-10 */}
            {tiles.slice(6, 10).length > 0 && (
              <div className="flex justify-center -translate-y-12">
                {tiles.slice(6, 10).map((tile) => (
                  <HexTile
                    key={tile.position}
                    tile={tile}
                    isLocked={tile.position > unlockedUpTo}
                    isCompleted={tile.isCompleted}
                    onTileClick={() => navigate(`/TaskWeb?id=${tile.taskId}&source=ChallengeMapWeb`)}
                  />
                ))}
              </div>
            )}

            {/* Row 5 - Positions 11-13 */}
            {tiles.slice(10, 13).length > 0 && (
              <div className="flex justify-center -translate-y-[70px]">
                {tiles.slice(10, 13).map((tile) => (
                  <HexTile
                    key={tile.position}
                    tile={tile}
                    isLocked={ tile.position > unlockedUpTo}
                    isCompleted={tile.isCompleted}
                    onTileClick={() => navigate(`/TaskWeb?id=${tile.taskId}&source=ChallengeMapWeb`)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="z-20 text-center font-zendots text-white font-medium -translate-y-12">
            {tiles.length > 0 && tiles.every((tile) => tile.isCompleted) ? (
              <div className="flex flex-col items-center justify-center space-y-3">
                <p className="text-[#1EEF32] text-sm" style={{ letterSpacing: "0.1em" }}>
                  {t("challengeMap.activitiesCompleted")}
                </p>
                <button
                  onClick={() => navigate("/ChallengeMap_7Days")}
                  className="px-6 py-2 bg-gradient-to-r from-[#1EEF32] to-[#0285FF] rounded-full text-white text-xs font-bold shadow-lg shadow-[#1EEF32]/50 hover:scale-105 transition-transform"
                >
                  {t("challengeMap.seeYouTomorrow")}
                </button>
              </div>
            ) : (
              <>
                <p className="text-[#1EEF32] text-lg">{t("challengeMap.welcomeDay", { day })}</p>
                <p>{t("challengeMap.adventureBegins")}</p>
              </>
            )}
          </div>
        </div>

        {taskintro && (
          <div className="z-50 transition-all ease-in-out duration-300">
            <TasksIntroWeb day={day} onClose={() => setTaskIntro(false)} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ChallengeMapWeb;


