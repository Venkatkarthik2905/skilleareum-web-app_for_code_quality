import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CountdownTimerWeb = ({ endTime }) => {
  const { t } = useTranslation('dashboard');
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // Update the countdown every second
    const intervalId = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, [endTime]);

  const updateCountdown = () => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const distance = end - now;

    if (distance < 0) {
      setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft({
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    });
  };

  return (
    <div className="mt-5">
      <p className=" text-center font-zendots">{t('farming.harvestIn')}</p>
      <div className="flex justify-center items-center gap-2  mt-5">
        <div className="flex items-start gap-2">
          <div>
            <div translate="no" className="flex  justify-center items-center gap-1">
              <div className=" bg-gradient-to-b from-[#0285FF99] to-[#1EEF3299] rounded-md border p-2">
                <p className="text-4xl App-Section">{timeLeft.hours[0]}</p>
              </div>
              <div className=" bg-gradient-to-b from-[#0285FF99] to-[#1EEF3299] rounded-md border p-2">
                <p className="text-4xl App-Section">{timeLeft.hours[1]}</p>
              </div>
            </div>
            <p className="text-center text-xs mt-2 font-zendots">{t('farming.hrs')}</p>
          </div>
          <p className="font-bold text-4xl mt-3">:</p>
        </div>
        <div className="flex items-start gap-2">
          <div>
            <div translate="no" className="flex  justify-center items-center gap-1">
              <div className=" bg-gradient-to-b from-[#0285FF99] to-[#1EEF3299] rounded-md border p-2">
                <p className="text-4xl App-Section">{timeLeft.minutes[0]}</p>
              </div>
              <div className=" bg-gradient-to-b from-[#0285FF99] to-[#1EEF3299] rounded-md border p-2">
                <p className="text-4xl App-Section">{timeLeft.minutes[1]}</p>
              </div>
            </div>
            <p className="text-center text-xs mt-2 font-zendots">{t('farming.mins')}</p>
          </div>
          <p className="font-bold text-4xl mt-3">:</p>
        </div>
        <div className="flex items-start gap-2">
          <div>
            <div translate="no" className="flex  justify-center items-center gap-1">
              <div className=" bg-gradient-to-b from-[#0285FF99] to-[#1EEF3299] rounded-md border p-2">
                <p className="text-4xl App-Section">{timeLeft.seconds[0]}</p>
              </div>
              <div className=" bg-gradient-to-b from-[#0285FF99] to-[#1EEF3299] rounded-md border p-2">
                <p className="text-4xl App-Section">{timeLeft.seconds[1]}</p>
              </div>
            </div>
            <p className="text-center text-xs mt-2 font-zendots">{t('farming.secs')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimerWeb;
