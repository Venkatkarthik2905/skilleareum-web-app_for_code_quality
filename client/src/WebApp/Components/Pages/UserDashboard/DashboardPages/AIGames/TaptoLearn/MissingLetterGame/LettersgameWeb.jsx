import React, { useState, useEffect, useRef } from "react";
import "../Taptoearn.css";
import { useTranslation } from "react-i18next";

// mirrors server/utils/alphabet.js
function getAlphabet(language) {
  const lang = (language || "english").toLowerCase();
  switch (lang) {
    case "spanish":
    case "es":
      return "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ";
    case "german":
    case "de":
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß";
    case "french":
    case "fr":
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÆÇÈÉÊËÎÏÔŒÙÛÜŸ";
    default:
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
}

const LettersgameWeb = ({
  onNext,
  onSkip,
  onRetry,
  gameData,
  setGameAnswer,
  selectedGame,
  selectedLevel,
  toast,
}) => {
  const { t } = useTranslation("dashboard");
  const [cluemodalopen, setClueModalOpen] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [text, settext] = useState([]);


  const adjustLetterPool = (currentText, currentBoxes, currentIdx) => {
    const rawAnswer = (gameData?.answer || "").toUpperCase();
    if (!rawAnswer || !currentText.length) return currentText;

    const upBoxes = currentBoxes.map((b) => b.toUpperCase());
    const unusedTilesIndices = currentText.reduce((acc, t, idx) => {
      if (!t.used) acc.push(idx);
      return acc;
    }, []);

    if (unusedTilesIndices.length === 0) return currentText;

    // 1. Identify letters still needed
    const totalNeeded = {};
    [...rawAnswer].forEach((char) => {
      if (char !== "_" && char !== " ") {
        totalNeeded[char] = (totalNeeded[char] || 0) + 1;
      }
    });

    const alreadyFilled = {};
    upBoxes.forEach((char) => {
      if (char !== " " && char !== "_") {
        alreadyFilled[char] = (alreadyFilled[char] || 0) + 1;
      }
    });

    let highPriorityLetters = [];
    if (selectedGame === "Missingletters") {
      const firstBlank = upBoxes.indexOf(" ");
      if (firstBlank !== -1) {
        if (rawAnswer[firstBlank]) highPriorityLetters.push(rawAnswer[firstBlank]);
      }
    } else if (selectedGame === "PerfectMatch") {
      if (currentIdx < rawAnswer.length) {
        highPriorityLetters.push(rawAnswer[currentIdx]);
      }
    } else {
      // Jumbled or others: priority is any letter that hasn't been fully satisfied yet
      Object.keys(totalNeeded).forEach((char) => {
        if ((alreadyFilled[char] || 0) < totalNeeded[char]) {
          highPriorityLetters.push(char);
        }
      });
    }

    if (highPriorityLetters.length === 0) return currentText;

    const newText = [...currentText];
    const alphabet = getAlphabet(gameData?.language);

    // 2. Identify Obsolete Letters (filled more than needed in answer)
    const obsoleteIndices = unusedTilesIndices.filter((idx) => {
      const char = newText[idx].char.toUpperCase();
      const neededCount = totalNeeded[char] || 0;
      const filledCount = alreadyFilled[char] || 0;
      return neededCount > 0 && filledCount >= neededCount;
    });

    // 3. Ensure priority letters are present (target ~40% of pool for smoothness)
    let currentPriorityCount = unusedTilesIndices.filter((idx) =>
      highPriorityLetters.includes(newText[idx].char.toUpperCase())
    ).length;

    const targetPriorityCount = Math.max(
      1,
      Math.floor(unusedTilesIndices.length * 0.4)
    );

    // Transformation phase
    let availableForChange = [...obsoleteIndices];
    if (currentPriorityCount < targetPriorityCount) {
      const noiseIndices = unusedTilesIndices.filter(
        (idx) =>
          !obsoleteIndices.includes(idx) &&
          !highPriorityLetters.includes(newText[idx].char.toUpperCase())
      );
      availableForChange = [...availableForChange, ...noiseIndices];
    }

    // Shuffle for variety
    availableForChange.sort(() => Math.random() - 0.5);

    availableForChange.forEach((idx) => {
      if (currentPriorityCount < targetPriorityCount) {
        newText[idx] = {
          ...newText[idx],
          char: highPriorityLetters[
            Math.floor(Math.random() * highPriorityLetters.length)
          ],
        };
        currentPriorityCount++;
      } else if (obsoleteIndices.includes(idx)) {
        // Obsolete letter, turn into random noise
        newText[idx] = {
          ...newText[idx],
          char: alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
        };
      }
    });

    return newText;
  };

  useEffect(() => {
    if (gameData?.lettersArray) {
      const currentAns =
        selectedGame === "Missingletters"
          ? gameData?.modifiedAnswer
          : gameData?.answer || "";

      let initialBoxes;
      if (selectedGame === "Missingletters") {
        initialBoxes = Array.from(currentAns || "").map((char) =>
          char === "_" ? " " : char
        );
      } else {
        initialBoxes = Array((currentAns || "").length).fill(" ");
      }

      const initialLetters = gameData.lettersArray.map((char, index) => ({
        id: index,
        char: char,
        used: false,
      }));

      // Apply initial balancing
      const balancedLetters = adjustLetterPool(
        initialLetters,
        initialBoxes,
        0
      );
      settext(balancedLetters);
    }
  }, [gameData, selectedGame]);

  const [fadeOut, setFadeOut] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [confirmpopup, setConifrmPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showsettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const errorShownRef = useRef(false);
  // const {
  //   playSound,
  //   playWinSound,
  //   playLostSound,
  //   playBgmSound,
  //   isBgm,
  //   pauseAudio,
  // } = useSettings();

  const handlesettings = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    // playSound();
    setShowSettings(!showsettings);
  };

  useEffect(() => {
   // console.log("selectedLevel : ", selectedLevel);
    // Set the initial timer duration based on selected level
    let initialTime;
    if (selectedLevel === "easy") {
      initialTime = 90;
    } else if (selectedLevel === "medium") {
      initialTime = 60;
    } else if (selectedLevel === "hard") {
      initialTime = 30;
    }
    setTimeLeft(initialTime);

    // Countdown logic
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerInterval);
          // Add any logic here for when the timer reaches zero

          //console.log("Time's up!");
          // if (isBgm) {
          //   playLostSound();
          //   pauseAudio();
          // }
          onSkip();
          return 0;
        }
      });
    }, 1000);
    // if(isBgm) {
    //   console.log("lettersgame", isBgm);
    //   playBgmSound();
    // }
    // Clear the timer on component unmount
    return () => clearInterval(timerInterval);
  }, [selectedLevel]);

  // const toggleMute = () => {
  //   if (isMuted) {
  //     playBgmSound();
  //   } else {
  //     pauseAudio();
  //   }
  //   setIsMuted(!isMuted);
  // };

  const handleRetry = () => {
    // playSound();
    setConifrmPopup(!confirmpopup);
  };

  const answersList = {
    Missingletters: {
      easy: "L_TT_R",
      medium: "CA_AB_E",
      hard: "CA_AB_E",
    },
    JumbledLetters: {
      easy: "LETTER",
      medium: "CAPABLE",
      hard: "CAPABLE",
    },
    PerfectMatch: {
      easy: "LETTER",
      medium: "CAPABLE",
      hard: "CAPABLE",
    },
  };

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    initializeGame();
  }, [selectedGame, selectedLevel]);

  // const initializeGame = () => {
  //   let initialBoxes;
  //   const currentAnswer = answersList[selectedGame] || '';
  //   setAnswer(currentAnswer);

  // if (selectedGame === "Missingletters") {
  //   initialBoxes = Array.from(currentAnswer).map(char => (char === '_' ? ' ' : char));
  // } else {
  //   initialBoxes = Array(currentAnswer.length).fill(' ');
  // }
  //   setBoxes(initialBoxes);
  //   setHistory([initialBoxes]);
  //   setCurrentIndex(0);
  // };

  const initializeGame = () => {
    let initialBoxes;

    //console.log("Selected Game:", selectedGame);
    //console.log("Selected Level (onLetterSelect):", selectedLevel);

    const currentAnswer = (
      selectedGame === "Missingletters"
        ? gameData?.modifiedAnswer
        : gameData?.answer || answersList[selectedGame]?.[selectedLevel] || ""
    ).toUpperCase();
    setAnswer(currentAnswer);
   // console.log("Current Answer:", currentAnswer);

    if (!currentAnswer) {
      console.warn(
        "No matching answer found in answersList for",
        selectedGame,
        selectedLevel
      );
    }

    if (selectedGame === "Missingletters") {
      initialBoxes = Array.from(currentAnswer).map((char) =>
        char === "_" ? " " : char
      );
    } else {
      // All slots start as ' ' (space). PerfectMatch space auto-skip is handled
      // purely by advancing currentIndex past space positions — no sentinel change needed.
      initialBoxes = Array(currentAnswer.length).fill(" ");
    }

    // For PerfectMatch, start the cursor past any leading spaces (edge case)
    let initialIndex = 0;
    if (selectedGame === "PerfectMatch") {
      while (initialIndex < currentAnswer.length && currentAnswer[initialIndex] === " ") {
        initialIndex++;
      }
    }

    setBoxes(initialBoxes);
    setHistory([initialBoxes]);
    setCurrentIndex(initialIndex);
  };

  // //console.log(gameData?.lettersArray)

  const handleLetterClick = (tile) => {
    // Prevent clicking already used tiles
    if (tile.used) return;
    
    const letter = tile.char;
    // playSound();
    //console.log("Letter clicked:", letter);
    //console.log("Array data :", gameData?.lettersArray);
    //console.log("New Array data :", text.length);

    const allowedLetters = Array.from(new Set(answer.toUpperCase().split("")));

    if (selectedGame === "JumbledLetters" && !allowedLetters.includes(letter.toUpperCase()))
      return;

  if (selectedGame === "Missingletters") {
  const blankIndex = boxes.indexOf(" ");
  if (blankIndex === -1) return;

  const correctAnswer = (gameData?.answer || "").toUpperCase();
  const expectedLetter = correctAnswer[blankIndex];

  // 🚫 BLOCK WRONG LETTERS
  if (letter.toUpperCase() !== expectedLetter) {
    // optional UX feedback
    // toast?.error?.("Wrong letter");
    return;
  }

  // ✅ correct letter — proceed
  const newBoxes = [...boxes];
  newBoxes[blankIndex] = letter;

  setBoxes(newBoxes);
  setHistory(prev => [...prev, newBoxes]);

  // mark tile used and adjust pool
  settext(prev => {
    const updated = prev.map(t =>
      t.id === tile.id ? { ...t, used: true } : t
    );
    return adjustLetterPool(updated, newBoxes, 0);
  });

  const lettersStr = newBoxes.join("").toUpperCase();

  setGameAnswer(lettersStr);

  // ✅ check completion
  if (lettersStr === correctAnswer) {
    errorShownRef.current = false;
    onNext();
  }
}else if (selectedGame === "JumbledLetters") {
      const letterIndices = [...answer.toUpperCase()].reduce(
        (indices, currentLetter, idx) => {
          if (currentLetter === letter.toUpperCase()) indices.push(idx);
          return indices;
        },
        []
      );

      const targetIndex = letterIndices.find((idx) => boxes[idx] === " ");
      if (targetIndex !== undefined) {
        const newBoxes = [...boxes];
        newBoxes[targetIndex] = letter;
        setBoxes(newBoxes);
        setHistory((prevHistory) => [...prevHistory, newBoxes]);
        // Mark tile as used
        settext(prevText => {
          const updated = prevText.map(t => t.id === tile.id ? { ...t, used: true } : t);
          return adjustLetterPool(updated, newBoxes, 0);
        });
        let lettersStr = newBoxes.join("").toUpperCase();
        setGameAnswer(lettersStr);
        if (lettersStr === answer.toUpperCase()) {
          setGameAnswer(answer.toUpperCase());
          handleNext();
        }
      }
    } 
    else if (selectedGame === "PerfectMatch") {
      if (currentIndex >= answer.length) return;

      const expectedLetter = answer[currentIndex].toUpperCase();

      // ❗ ignore wrong letters silently (better UX)
      if (letter.toUpperCase() !== expectedLetter) {
        return;
      }

      const newBoxes = [...boxes];
      newBoxes[currentIndex] = letter;

      // Auto-fill any consecutive spaces after the placed letter
      let newIndexForPool = currentIndex + 1;
      while (newIndexForPool < answer.length && answer[newIndexForPool] === " ") {
        newBoxes[newIndexForPool] = " ";
        newIndexForPool++;
      }

      setBoxes(newBoxes);
      setHistory(prev => [...prev, newBoxes]);

      // mark tile used safely
      settext(prev => {
        const updated = prev.map(t =>
          t.id === tile.id ? { ...t, used: true } : t
        );
        return adjustLetterPool(updated, newBoxes, newIndexForPool);
      });

      setCurrentIndex(newIndexForPool);

      const enteredAnswer = newBoxes.join("");

      if (enteredAnswer.toUpperCase() === answer.toUpperCase()) {
        setGameAnswer(enteredAnswer.toUpperCase());
        handleNext();
      }
    }
  };

  const handleUndo = () => {
    // playSound();
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const previousState = newHistory[newHistory.length - 1];
      
      // Determine what was removed to unmark its 'used' state
      const currentState = history[history.length - 1];
      let removedLetter = null;
      for (let i = 0; i < currentState.length; i++) {
        if (currentState[i] !== " " && previousState[i] === " ") {
          removedLetter = currentState[i];
          break;
        }
      }

      setHistory(newHistory);
      setBoxes(previousState);
      
      let newIdxForPool = currentIndex;
      if (selectedGame === "PerfectMatch") {
        // Step back, then skip back past any space characters
        newIdxForPool = Math.max(0, currentIndex - 1);
        while (newIdxForPool > 0 && answer[newIdxForPool] === " ") {
          newIdxForPool--;
        }
        setCurrentIndex(newIdxForPool);
      }

      // If we found a removed letter, unmark the most recently used matching tile
      if (removedLetter) {
        settext(prevText => {
           const newText = [...prevText];
           // Find the last used tile that matches the removed letter 
           for (let i = newText.length - 1; i >= 0; i--) {
             if (newText[i].used && newText[i].char === removedLetter) {
               newText[i].used = false;
               break;
             }
           }
           // Adjust pool after undo
           return adjustLetterPool(newText, previousState, newIdxForPool);
        });
      }
    }
  };

  const handlecluemodal = () => {
    // playSound();
    setFadeOut(!true);
    setClueModalOpen(!cluemodalopen);
  };

  const handleNext = () => {
    // playSound();
    setFadeOut(true);
    //console.log("started")
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setTimeout(() => {
      onNext();
    }, 500);
  };

  return (
    <div className="w-full fixed inset-0 z-50 font-zendots ">
      <div className="bg-[#080B1C]  relative bg-cover h-screen overflow-hidden overflow-y-auto text-white font-poppins">
        <div
          className=" bg-cover bg-center h-screen overflow-hidden overflow-y-auto  "
          style={{
            backgroundImage:
              "url(https://skilleareumimages.s3.ap-south-1.amazonaws.com/subscribebg.png)",
          }}
        >
          <div
            className=" h-screen w-full overflow-hidden overflow-y-auto flex justify-center items-center "
            style={{
              background:
                "radial-gradient(378.88% 129.46% at 50% -1.69%, rgba(19, 36, 128, 0) 5.86%, rgba(10, 18, 64, 0.626421) 11.28%, #04071A 24.38%, rgba(4, 8, 29, 0.974934) 60.44%, rgba(4, 7, 26, 0.85) 68.06%, rgba(10, 18, 64, 0.626421) 80.94%, rgba(19, 36, 128, 0) 89.04%)",
            }}
          >
            <div className="relative w-full max-w-lg h-[72%]">
              {confirmpopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="relative w-full max-w-lg">
                    <div
                      className={`w-[65%] mx-auto  animate__animated ${
                        fadeOut ? "animate__backOutLeft" : "animate__zoomIn"
                      }`}
                    >
                      <div className="bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-lg p-0.5">
                        <div className="bg-black rounded-lg p-5 flex flex-col justify-center items-center">
                          <p className="w-full text-center font-semibold">
                            {t('aiGames.tap2Learn.common.areYouSure')}
                          </p>
                          <div className=" flex items-center gap-5 mt-5">
                            <button
                              onClick={() => {
                                // playSound();
                                onRetry();
                              }}
                              className="bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-md py-2 px-4 text-sm font-medium"
                            >
                              {t('aiGames.tap2Learn.common.yes')}
                            </button>
                            <button
                              onClick={handleRetry}
                              className="bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-md py-2 px-4 text-sm font-medium"
                            >
                              {t('aiGames.tap2Learn.common.no')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {cluemodalopen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                  <div className="relative w-full max-w-lg">
                    <div className="relative w-[80%] mx-auto">
                      <div
                        className={`border border-[#1AE348]/70 rounded-2xl animate__animated ${
                          fadeOut ? "animate__backOutLeft" : "animate__zoomIn"
                        }`}
                      >
                        <div className="w-full bg-[#080a47]  rounded-2xl ">
                          <div
                            className="px-3 pt-5 pb-10 rounded-xl  "
                            style={{
                              background:
                                "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)",
                            }}
                          >
                            <div className="w-full bg-[#000A14]  rounded-2xl px-3 pt-5 ">
                              <div className="bg-[#001528] w-[85%] mx-auto rounded-md">
                                <p className="text-center py-1 font-zendots text-[#1CE740] uppercase">
                                  {t('aiGames.tap2Learn.common.wordHint')}
                                </p>
                              </div>
                              <div className="py-5">
                                {/* <div className='w-[60%] border border-[#1EEF32] rounded-lg'>
              <img src='https://skilleareumimages.s3.ap-south-1.amazonaws.com/pythoncodeclue.jpeg' className='' />
            </div> */}
                                <div className="flex justify-center items-center">
                                  <div className="w-[80%] border border-[#1EEF32] rounded-lg ">
                                    <img
                                      src={gameData?.hint_img}
                                      className=" rounded-lg"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="absolute bottom-10 left-[25%] w-24 h-24 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0"></div>
                              <div className="absolute -bottom-5 left-0 right-0 flex justify-center items-center">
                                <div
                                  onClick={handlecluemodal}
                                  className=" rounded-2xl w-[80%] mx-auto h-10 relative"
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
                                      {t('aiGames.tap2Learn.common.resume')}{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <div className="fixed inset-0 z-40 flex items-center justify-center"> */}
              {/* <div className="relative w-full max-w-lg"> */}

              <div className="w-full z-10 absolute top-0 px-1 pt-3 h-full  flex flex-col justify-between font-zendots">
                <div className="w-full relative flex justify-center items-center mt-14">
                  {/* <div className='absolute top-5 w-24 h-24 mx-auto bg-[#1EEF3259] blur-2xl rounded-full z-0'></div> */}
                  <div className="mt-5">
                    <button onClick={handlesettings}>
                      <img
                        src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/gear.png"
                        className="w-7"
                      />
                    </button>
                  </div>
                  <div className="w-[80%] pr-7 flex flex-col justify-center items-center z-10">
                    <div className="bg-[#04071A] border border-[#0388F8BF] rounded-tr-md rounded-tl-md p-1">
                      <p className="font-bold text-sm">
                        {t('aiGames.tap2Learn.common.timer')}
                      </p>
                    </div>
                    <div className="bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-xl p-[0.9px] ">
                      <div
                        className="rounded-xl backdrop-blur-md"
                        style={{
                          background:
                            "radial-gradient(204.27% 281.68% at 51.94% -71.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%) ",
                        }}
                      >
                        <div className="bg-[#002003] rounded-xl p-2">
                          <div className="bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-md p-[0.9px] ">
                            <div className="w-20 h-10 bg-black rounded-md flex justify-center items-center">
                              <p
                                style={{ textShadow: "2px 2px 4px #000000" }}
                                className="font-semibold text-center tracking-widest font-zendots"
                              >
                                {timeLeft}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" w-full h-[13.5rem] m-auto flex flex-col justify-center items-center">
                  <div className="h-full w-full flex flex-col justify-center items-center overflow-hidden">
                    <div className="relative flex justify-center items-center flex-wrap h-full">
                      {text?.map((tile) => (
                        <div
                          key={tile.id}
                          className={`circle w-7 h-7 rounded-lg border flex justify-center items-center cursor-pointer transition-all duration-300
                            ${tile.used 
                              ? 'border-[#1EEF32] bg-[#1EEF32]/20 text-[#1EEF32] opacity-50 cursor-not-allowed scale-90' 
                              : 'hover:border-[#1EEF32] hover:text-[#1EEF32] border-[#1EEF3259]'
                            }
                          `}
                          onClick={() => handleLetterClick(tile)}
                        >
                          {tile.char}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="relative flex justify-center items-center">
                    {/* <div className='w-40 h-20 mx-auto bg-[#1EEF3259] blur-xl rounded-full z-0'></div> */}
                    <div className="absolute bottom-0 flex flex-col justify-center items-center z-10">
                      <div className="bg-[#04071A] border border-[#0388F8BF] rounded-tr-md rounded-tl-md p-1">
                        <div className="flex items-center gap-2">
                          <button className="z-10" onClick={handleUndo}>
                            <img
                              src="../assets/undo.png"
                              alt="undo"
                              className="w-6 z-10"
                            />
                          </button>
                          <button onClick={handleRetry}>
                            <img
                              src="../assets/restart.png"
                              alt="reply"
                              className="w-6"
                            />
                          </button>
                          <button onClick={handlecluemodal}>
                            <img
                              src="../assets/hint.png"
                              alt="hint"
                              className="w-6"
                            />
                          </button>
                        </div>
                      </div>

                      <div className="min-w-36 bg-[#002003] rounded-xl ">
                        <div
                          className="min-w-36 border border-[#1dec39]/40 backdrop-blur-md rounded-xl p-2 flex-wrap flex justify-center items-center gap-2"
                          style={{
                            background:
                              "radial-gradient(204.27% 281.68% at 51.94% -71.59%, rgba(30, 239, 50, 0.3) 5.14%, rgba(48, 62, 138, 0) 54.1%) ",
                          }}
                        >
                          {boxes &&
                            boxes.map((letter, index) => (
                              <div
                                key={index}
                                className=" w-7 h-7 bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-md p-[1px] "
                              >
                                <div className="bg-[#001703] w-full h-full rounded-md font-semibold flex justify-center items-center">
                                  {letter}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showsettings && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="relative w-full max-w-lg">
                    <div
                      className={`w-[65%] mx-auto  animate__animated ${
                        fadeOut ? "animate__backOutLeft" : "animate__zoomIn"
                      }`}
                    >
                      <div className=" border border-[#1AE348]/70 rounded-xl bg-[#080a47]  ">
                        <div
                          className="px-3 py-3 rounded-xl  "
                          style={{
                            background:
                              "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)",
                          }}
                        >
                          <div className="w-full bg-[#000A14]  rounded-xl py-5 px-2 font-krona relative">
                            <div
                               onClick={handlesettings}
                              className="cursor-pointer absolute -top-5 -right-5 "
                            >
                              <img src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/close.png" />
                            </div>

                            <div className=" flex justify-center items-center gap-3 ">
                              <div
                                onClick={() => {
                                  // playSound();
                                  // toggleMute();
                                }}
                                className={`${
                                  isMuted ? "brightness-50" : "brightness-100"
                                } cursor-pointer flex flex-col items-center gap-3`}
                              >
                                <img
                                  src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/assets/Sound.png"
                                  alt="Music"
                                  className="w-12 h-12"
                                />
                                <p className="font-semibold text-sm ">
                                  {t('aiGames.tap2Learn.common.music')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LettersgameWeb;
