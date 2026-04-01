import React, { useState, useEffect, useRef } from "react";
import "./flipgame.css";
import { useTranslation } from "react-i18next";

export default function FlipgameWeb({
  gridData,
  onSkip,
  onNext,
  setisWon,
  onRetry,
  gridType,
}) {
  const { t } = useTranslation("dashboard");
  //  console.log(gridData);
  const initialImages = [...gridData];

  const [images, setImages] = useState([...initialImages]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [points, setPoints] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [count, setCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [highlightImages, setHighlightImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(true);
  const [confirmpopup, setConifrmPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  // const { playWinSound, pauseBgm, playLostSound } = AudioManager();
  // const {
  //   playSound,
  //   playWinSound,
  //   playLostSound,
  //   playBgmSound,
  //   isBgm,
  //   pauseAudio } = useSettings();
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused; // Keep the ref updated with the latest state
  }, [isPaused]);

  useEffect(() => {
    // Set the initial timer duration based on selected level
    let initialTime;
    if (gridType === "3x4") {
      initialTime = 90;
    } else if (gridType === "4x4") {
      initialTime = 60;
    } else if (gridType === "5x4") {
      initialTime = 30;
    }

    setTimeLeft(initialTime);

    // Start countdown after 10 seconds
    const startCountdown = setTimeout(() => {
      const timerInterval = setInterval(() => {
        // console.log("isPaused:", isPausedRef.current); // Use the ref to check the current state
        if (isPausedRef.current) return; // Skip decrementing if paused
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerInterval);
            // Add logic here for when the timer reaches zero
            // if (isBgm) {
            //   playLostSound();
            //   pauseAudio();
            // }
            onSkip();
            return 0;
          }
        });
      }, 1000);

      // Clear the timer interval when the component unmounts
      return () => clearInterval(timerInterval);
    }, 10000); // 10 seconds delay

    // Cleanup the timeout if the component unmounts before the delay
    return () => clearTimeout(startCountdown);
  }, [gridType]);

  const handleRetry = () => {
    // playSound();
    setConifrmPopup(!confirmpopup);
  };

  const [rows, columns] = gridType.split("x").map(Number);

  const shuffleImages = () => {
    const numberOfImages = rows * columns;

    const shuffled = [...initialImages]
      .slice(0, numberOfImages)
      .sort(() => Math.random() - 0.5);

    setImages(shuffled);
    setFlipped([]);
    setMatched([]);
    setPoints(0);
    setShowAllImages(true);

    setTimeout(() => {
      const reshuffled = [...shuffled].sort(() => Math.random() - 0.5);
      setImages(reshuffled);
      setShowAllImages(false);
    }, 10000);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowAllImages(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (index) => {
    // playSound();
    if (
      flipped.length < 2 &&
      !flipped.includes(index) &&
      !matched.includes(index) &&
      !showAllImages
    ) {
      setFlipped([...flipped, index]);
    }
    // setTimeout(() => {
    //   console.log("game summary");
    //   setFadeOut(true);
    //   console.log("started");
    //   if (navigator.vibrate) {
    //     navigator.vibrate(100);
    //   }
    //   onNext();
    // }, 20000);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstIndex, secondIndex] = flipped;

      if (images[firstIndex].id === images[secondIndex].id) {
        setIsPaused(true);
        // console.log("Paused set to true");

        setHighlightImages([images[firstIndex].src, images[secondIndex].src]);
        setCount(count + 1);
        setTimeout(() => {
          setMatched([...matched, firstIndex, secondIndex]);
          setPoints(points + 1);
          setHighlightImages([]);
          setIsPaused(false);
          // console.log("Paused set to false");
        }, 3000);

        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 500);
      }
    }
    let pointsNeeded;
    if (gridType === "3x4") {
      pointsNeeded = 6;
    } else if (gridType === "4x4") {
      pointsNeeded = 8;
    } else if (gridType === "5x4") {
      pointsNeeded = 10;
    }
    // console.log(count, " === ", pointsNeeded);
    if (count === pointsNeeded) {
      setisWon(true);
      // if (isBgm) {
      //   playWinSound();
      //   pauseAudio();
      // }
      onNext();
    }
  }, [flipped]);

  useEffect(() => {
    shuffleImages();
  }, [gridType]);

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
                            className="bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-xl py-2 px-4 text-sm font-medium"
                          >
                            {t('aiGames.tap2Learn.common.yes')}
                          </button>
                          <button
                            onClick={handleRetry}
                            className="bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-xl py-2 px-4 text-sm font-medium"
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
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-full max-w-lg">
                <div
                  className={`w-[85%] mx-auto  animate__animated ${
                    fadeOut ? "animate__backOutLeft" : "animate__zoomIn"
                  }`}
                >
                  <div className="relative">
                    <div className="w-full z-10">
                      <div className="relative flex justify-center items-center">
                        <div className="w-32 h-16 mx-auto bg-[#1EEF3259] blur-2xl rounded-full z-0 absolute top-0"></div>
                        <div className="flex flex-col justify-center items-center z-10 -translate-y-2 pl-3">
                          <div className="bg-[#04071A] border border-[#0388F8BF] rounded-tr-md rounded-tl-md md p-1">
                            <p className="font-bold text-xs font-zendots ">
                              {t('aiGames.tap2Learn.common.timer')}
                            </p>
                          </div>
                          <div className="bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-xl p-[0.5px] ">
                            <div
                              className="rounded-xl backdrop-blur-md"
                              style={{
                                background:
                                  "radial-gradient(204.27% 281.68% at 51.94% -71.59%, rgba(30, 239, 50, 0.5) 5.14%, rgba(48, 62, 138, 0) 54.1%) ",
                              }}
                            >
                              <div className="bg-[#002003] rounded-xl p-2">
                                <div className="bg-gradient-to-b from-[#1DEC38BF] to-[#0388F8BF] rounded-md p-[0.9px] ">
                                  <div className="w-20 h-10 bg-black rounded-md  flex justify-center items-center">
                                    <p
                                      style={{
                                        textShadow: "2px 2px 4px #000000",
                                      }}
                                      className="font-semibold tracking-widest font-zendots"
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

                      <div className="bg-black rounded-xl w-full flex justify-between items-center mb-2 px-5 py-1 z-10">
                        <div className="flex items-center gap-1">
                          <button className="z-10">
                            {/* <img
                      src="../assets/undo.png"
                      alt="undo"
                      className="w-6 z-10"
                    /> */}
                          </button>
                          <button onClick={handleRetry}>
                            <img
                              src="../assets/restart.png"
                              alt="reply"
                              className="w-6"
                            />
                          </button>
                          {/* <button onClick={() => { playSound();}}>
                    <img src="../assets/hint.png" alt="hint" className="w-6" />
                  </button> */}
                        </div>
                        <h2 className="flex gap-1 items-center font-zendots">
                          <span>
                            <img
                              src="../assets/flipgamelogo.png"
                              className="w-7 h-7"
                            ></img>
                          </span>{" "}
                          = {points}
                        </h2>
                      </div>

                      <div className="w-full  border border-[#1AE348]/70 rounded-xl p-0.5 flex justify-center items-center relative">
                        <div className="w-24 h-24 mx-auto bg-[#1EEF3259] blur-2xl rounded-full z-0 absolute top-5 right-0"></div>
                        <div className=" bg-[#080a47] w-full rounded-xl flex justify-center items-center z-10">
                          <div
                            className="px-3 py-5 rounded-xl  "
                            style={{
                              background:
                                "radial-gradient(86.41% 179.3% at 49.83% 0%, rgba(30, 239, 50, 0.3) 0%, rgba(48, 62, 138, 0) 100%)",
                            }}
                          >
                            <div className="w-full bg-[#000A14]  rounded-xl p-3 ">
                              <div
                                className="grid gap-2 z-10"
                                style={{
                                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                                  gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                                }}
                              >
                                {images.map((image, index) => (
                                  <div
                                    key={index}
                                    className={`flip-card w-full h-full ${
                                      flipped.includes(index) ||
                                      matched.includes(index) ||
                                      showAllImages
                                        ? "flipped"
                                        : ""
                                    }`}
                                    onClick={() => handleClick(index)}
                                  >
                                    <div className={`flip-card-inner`}>
                                      <div className="flip-card-front w-full h-full flex justify-center items-center">
                                        <img
                                          src="../assets/flipgamelogo.png"
                                          alt="Front"
                                          className="w-full h-full"
                                        />
                                      </div>
                                      <div className="flip-card-back">
                                        <img
                                          src={image.src}
                                          alt="Back"
                                          className="border-2 w-[65px] border-[#00FF00] rounded-[10px]"
                                        />
                                        {matched.includes(index) && (
                                          <div className="Success fade-in absolute inset-0 bg-[#093B20] rounded-[10px] flex justify-center items-center">
                                            <img
                                              src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/Done.png"
                                              alt="Success"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        {highlightImages.length === 2 && (
                          <div className=" absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center z-20 overlay bg-black/80">
                            <div className="w-[80%] mx-auto flex justify-between items-center z-10">
                              {highlightImages.map((src, idx) => (
                                <img
                                  key={idx}
                                  src={src}
                                  alt={`Highlight ${idx + 1}`}
                                  className="w-[28%] h-auto border-2 border-[#00FF00] rounded-full "
                                />
                              ))}
                            </div>
                            <div className="flex justify-center items-center z-10 absolute top-0 bottom-0 left-0 right-0 ">
                              <div className=" h-0.5 w-9 bg-white "></div>
                              <img
                                src="https://skilleareumimages.s3.ap-south-1.amazonaws.com/checktick.png"
                                className="w-8"
                              />
                              <div className=" h-0.5 w-9 bg-white "></div>
                            </div>

                            <div className=" bg-[#1EEF3273] absolute w-72 h-40 rounded-full blur-lg z-0 "></div>
                          </div>
                        )}
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
  );
}
