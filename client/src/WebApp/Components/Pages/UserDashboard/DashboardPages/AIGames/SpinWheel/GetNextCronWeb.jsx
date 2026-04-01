import { useState, useEffect } from "react";

// Helper function to calculate the next cron time
const getNextCronTimeWeb = () => {
  const now = new Date();
  const hours = now.getHours();

  // Determine the next cron run time based on the current hour
  let nextCronHour;
  if (hours < 8) {
    nextCronHour = 8;
  } else if (hours < 16) {
    nextCronHour = 16;
  } else {
    nextCronHour = 24; // Next day at midnight
  }

  const nextCronTime = new Date();
  nextCronTime.setHours(nextCronHour, 0, 0, 0);

  if (hours >= 16) {
    // If it's past 16:00, set the next cron time to tomorrow at 00:00
    nextCronTime.setDate(nextCronTime.getDate() + 1);
    nextCronTime.setHours(0, 0, 0, 0);
  }

  return nextCronTime.getTime();
};

// Countdown component
const SpinCountdown = ({ spinsRemaining }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (spinsRemaining === 0) {
      const nextCronTime = getNextCronTime();

      const updateTimeLeft = () => {
        const now = new Date().getTime();
        const remaining = nextCronTime - now;
        setTimeLeft(remaining);
      };

      updateTimeLeft();
      const interval = setInterval(updateTimeLeft, 1000);

      return () => clearInterval(interval);
    }
  }, [spinsRemaining]);

  if (spinsRemaining > 0 || timeLeft <= 0) return null;

  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="text-center mt-4">
      <p className="text-lg font-semibold text-gray-400">
        Next Spin Available In:
      </p>
      <p className="text-2xl font-bold text-gray-300">
        {`${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
      </p>
    </div>
  );
};

export default SpinCountdownWeb;
