import React, { useState, useEffect } from 'react';
import '../Taptoearn.css'; 
import { useTranslation } from "react-i18next"; 

const CountdownWeb = ({ onComplete, onNext }) => {
    const { t } = useTranslation("dashboard");
    const [count, setCount] = useState(3);

    useEffect(() => {
      if (count > 0) {
        const timer = setTimeout(() => {
          setCount(count - 1);
        }, 1000); 
        return () => clearTimeout(timer);
      }
      if (count === 0) {
        const tapTimer = setTimeout(() => {
          setCount('Tap'); 
        }, 100);
        return () => clearTimeout(tapTimer);
      }
      if (count === 'Tap') {
        const newScreenTimer = setTimeout(() => {
            onNext();      
        }, 1000); 
        return () => clearTimeout(newScreenTimer);
    }
    }, [count, onComplete]);

  return (
    <div>     
      
    <div className="countdown-container h-full absolute top-5 left-0 right-0 font-zendots font-semibold text-5xl">
  <>
    {count === 3 && <div className="countdown-number animate-countdown text-[#9fffa9]">3</div>}
    {count === 2 && <div className="countdown-number animate-countdown text-[#9fffa9]">2</div>}
    {count === 1 && <div className="countdown-number animate-countdown text-[#9fffa9]">1</div>}
    {count === 'Tap' && <div className="countdown-number animate-countdown text-[#9fffa9]">{t('aiGames.tap2Learn.common.tap')}</div>}
  </>          
  </div>
  </div>
  );
};

export default CountdownWeb;
