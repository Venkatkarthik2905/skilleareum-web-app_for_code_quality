import React, { createContext, useContext, useState, useEffect, } from 'react';
import bgm from "./CommonGameBGM_01.mp3";
import win from "./UserWin.mp3";
import lost from "./UserLost.mp3"

const SettingsContext = createContext();


export const useSettings = () => useContext(SettingsContext);
export const SettingsProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const savedMuted = localStorage.getItem('isMuted');
    return savedMuted ? JSON.parse(savedMuted) : false;
  });

  const [isBgm, setIsBgm] = useState(() => {
    const savedbgm = localStorage.getItem('isBgm');
    return savedbgm ? JSON.parse(savedbgm) : false;
  });

  useEffect(() => {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('bgm', JSON.stringify(isBgm));
  }, [isBgm]);

 
  const toggleSound = () => setIsMuted((prev) => !prev);
  const toggleBGM = () => setIsBgm((prev) => !prev);
  const [audioInstance, setAudioInstance] = useState(null);
  const audioPath = "../assets/EveryTap.mp3";
  
  const playSound = () => {
    if (!isMuted) {
      const audio = new Audio(audioPath);
      audio.play();
    }
  };

  const playBgmSound = () => {
    const audio2 = new Audio(bgm);
    if (isBgm) {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.currentTime = 0;
      }
      
      audio2.volume = 0.2; 
      audio2.loop = true;
      audio2.play();
      setAudioInstance(audio2); 
    }
  };

  const pauseAudio = () => {
    if (audioInstance) {
      audioInstance.pause();
      setAudioInstance(null); 
    }
  };

  const playWinSound = () => {
    const winaudio = new Audio(win);
    pauseAudio();
    winaudio.currentTime = 0;
    winaudio.volume = 0.3; 
    winaudio.play()
      .then(() => {
        winaudio.onended = () => {
            setTimeout(() => {
              playBgmSound(); 
            },1000)
        };
      })
      .catch((err) => console.error("Error playing win sound:", err));
  };


  const playLostSound = () => {
    const lostaudio = new Audio(lost);
    pauseAudio();
    lostaudio.currentTime = 0;
    lostaudio.volume = 0.3; 
    lostaudio.play()
      .then(() => {
        lostaudio.onended = () => {
            setTimeout(() => {
          playBgmSound(); 
        },1000)
        };
      })
      .catch((err) => console.error("Error playing lost sound:", err));
  };

  return (
    <SettingsContext.Provider value={{ 
      isMuted,
      toggleSound,
      playSound,
      toggleBGM,
      playBgmSound,
      isBgm,  
      pauseAudio,
      playWinSound,
      playLostSound
      }}>
      {children}
    </SettingsContext.Provider>
  );
};

