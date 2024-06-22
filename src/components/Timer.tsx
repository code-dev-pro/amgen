// import React from 'react';

// export const Timer = () => {
//   // 3 minutes
//   const duration = 3 * 60 * 1000;
//   const [timeLeft, setTimeLeft] = React.useState(duration);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft(timeLeft - 1000);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timeLeft]);

//   return <div>{timeLeft / 1000} seconds</div>;
// };

import { useState, useEffect } from 'react';

export const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds
  const totalDuration = 180; // Total duration in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const circleStyle = {
    background: `conic-gradient(#00004E ${(timeLeft / totalDuration) * 360}deg, transparent 0)`,
  };

  return (
    <div className="relative w-[85px] h-[85px] flex justify-center items-center">
      <div className="absolute w-full h-full rounded-full" style={circleStyle}></div>
      <div className="absolute text-white text-2xl font-bold font-almaq">
        {minutes}:{seconds}
      </div>
    </div>
  );
};
