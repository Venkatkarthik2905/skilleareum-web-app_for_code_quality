import React, { useState, useEffect } from "react";
import ChooselevelWeb from "./ChooselevelWeb";
import SelectGameWeb from "./SelectGameWeb";
import ContentModalWeb from "./MissingLetterGame/ContentModalWeb";
import ClueModalWeb from "./MissingLetterGame/ClueModalWeb";
import LettersgameWeb from "./MissingLetterGame/LettersgameWeb";
import AnswerpopupWeb from "./MissingLetterGame/AnswerpopupWeb";
import SkillPointsWeb from "./SkillpointsWeb";
import ChooseGridWeb from "./MemoryGame/ChooseGridWeb";
import GameinfoWeb from "./MemoryGame/GameinfoWeb";
import FlipgameWeb from "./MemoryGame/FlipgameWeb";
import GameSummaryWeb from "./MemoryGame/GameSummaryWeb";
import RulesModalWeb from "./RulesModalWeb";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const TaptoLearnWeb = () => {

  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const navigate = useNavigate();
  const { gameType } = useParams();
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedGridType, setSelectedGridType] = useState(null);
  const [selectLetterCount, setSelectLetterCount] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [gameData, setGameData] = useState(null);
  const [gridData, setGridData] = useState(null);
  const [gameAnswer, setGameAnswer] = useState();
  const [isWon, setisWon] = useState(false);
  const authToken = useSelector((state) => state.token);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryDay = queryParams.get("day");
  const querySource = queryParams.get("source");
  const [day, setDay] = useState(() => queryDay || localStorage.getItem("day"));
  const [source, setsource] = useState(() => querySource || localStorage.getItem("source"));
 
useEffect(() => {
    if (gameType) {
      setSelectedGame(gameType);
      setCurrentPopupIndex(0);
    }
  }, [gameType]);

  const handleGridSelection = (gridType) => {
    // console.log('Selected grid:', gridType);
    setSelectedGridType(gridType);
  };

  const getPopupSequence = () => {
    switch (selectedGame) {
      case "Missingletters":
        return [
          RulesModalWeb,
          ChooselevelWeb,
          ContentModalWeb,
          ClueModalWeb,
          // Countdown,
          LettersgameWeb,
          AnswerpopupWeb,
          SkillPointsWeb,
        ];
      case "JumbledLetters":
        return [
          RulesModalWeb,
          ChooselevelWeb,
          ContentModalWeb,
          ClueModalWeb,
          // Countdown,
          LettersgameWeb,
          AnswerpopupWeb,
          SkillPointsWeb,
        ];
      case "PerfectMatch":
        return [
          RulesModalWeb,
          ChooselevelWeb,
          ContentModalWeb,
          ClueModalWeb,
          //  Countdown,
          LettersgameWeb,
          AnswerpopupWeb,
          SkillPointsWeb,
        ];
      case "MemoryGame":
        return [
          RulesModalWeb,
          ChooseGridWeb,
          GameinfoWeb,
          FlipgameWeb,
          GameSummaryWeb,
          SkillPointsWeb,
        ];
      default:
        return [];
    }
  };

  const handleskip = () => {
    if (selectedGame === "MemoryGame") {
      setCurrentPopupIndex(5);
    } else setCurrentPopupIndex(6);
  };

  const popups = getPopupSequence();

  const nextPopup = () => {
    setCurrentPopupIndex((prevIndex) =>
      Math.min(prevIndex + 1, popups.length - 1)
    );
  };

  const prevPopup = () => {
    setCurrentPopupIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const Retry = () => {
    setCurrentPopupIndex(1);
  };

  const previousRoute = localStorage.getItem("previousRoute");

  const handleExit = () => {
    if (currentPopupIndex === 0) {
      if (previousRoute) {
        navigate(previousRoute || "/ChallengeMapWeb");
      } else {
        navigate("/ChallengeMapWeb");
      }
      setSelectedGame(null);
      setCurrentPopupIndex(-1);
      setSelectedGridType(null);
      setSelectLetterCount(null);
      setSelectedLevel("");
      setGameData(null);
      setGameAnswer(null);
    } else {
      setCurrentPopupIndex(0);
    }
  };

  // const handleGameModal = () => {
    // playSound();
    // if (isBgm) {
    //   playBgmSound();
    // }
    // if (firstVideoRef.current) {
    //   firstVideoRef?.current?.pause();
   
      
      // setTimeout(() => {
      //   console.log("Game modal opened");
      //   setCurrentPopupIndex(0); 
      // }, 7000);
    // }
  // };

  
  // const handleSelectGame = (game) => {
  //   setSelectedGame(game);
  // }


  useEffect(() => {
    const gameTriggered = localStorage.getItem("gameTriggered");
    if (gameTriggered === "true") {
      // playSound();
      // if (isBgm) {
        // playBgmSound();
      // }
      setCurrentPopupIndex(0);
      localStorage.removeItem("gameTriggered");
    }
  }, []);

  return (
    <div>
          {currentPopupIndex >= 0 &&
        popups[currentPopupIndex] &&
        React.createElement(popups[currentPopupIndex], {
          onNext: nextPopup,
          onPrev: prevPopup,
          onExit: handleExit,
          onRetry: Retry,
          onSkip: handleskip,
          selectedGame: selectedGame,
          toast,
          ...(popups[currentPopupIndex] === ChooseGridWeb && {
            authToken,
            day,
            onGridSelect: handleGridSelection,
            setGridData,
            toast,
            setisWon,
          }),
          ...(popups[currentPopupIndex] === GameSummaryWeb && {
            gridData: gridData,
            setisWon,
            authToken,
          }),
          ...(popups[currentPopupIndex] === FlipgameWeb && {
            gridType: selectedGridType,
            gridData: gridData?.initialImages,
            setisWon,
          }),
          ...(popups[currentPopupIndex] === ChooselevelWeb && {
            setisWon,
            day,
            selectedGame,
            setSelectedLevel,
            setGameData: setGameData,
            toast,
          }),
          ...(popups[currentPopupIndex] === LettersgameWeb && {
            selectedLevel,
            gameData: gameData,
            setGameAnswer,
            toast,
          }),
          ...(popups[currentPopupIndex] === ContentModalWeb && {
            gameData: gameData,
          }),
          ...(popups[currentPopupIndex] === ClueModalWeb && {
            gameData: gameData,
          }),
          ...(popups[currentPopupIndex] === AnswerpopupWeb && {
            selectedLevel,
            selectedGame,
            authToken,
            navigate,
            gameData: gameData,
            gameAnswer,
            setisWon,
            source,
          }),
          ...(popups[currentPopupIndex] === SkillPointsWeb && {
            isWon,
            questionId: gameData?.id,
            memoryId: gridData?.id,
            selectedGame,
          }),
        })}
    </div>
  );
};

export default TaptoLearnWeb;
