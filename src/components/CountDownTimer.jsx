import { useState, useEffect, useRef } from "react";

const CountDownTimer = () => {
  // initial Timer Values
  let [timeLeft, setTimeLeft] = useState(60); // initial value of timer
  let timerRef = useRef(null); // used for holding the Interval Ids

  // function to start the Timer
  const startTimer = () => {
    if (timerRef.current) return; //these avoids causing the multiple intervals
    timerRef.current = setInterval(() => {
      setTimeLeft((prevtime) => {
        if (prevtime <= 1) {
          //checking weather Timer is Reached 1 and below to remove it from ui
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prevtime - 1;
      });
    }, 1000); //timer updates every sec
  };
  // function to stop the Timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };
  // function to Reset the Timer
  const resetTimer = () => {
    stopTimer();
    setTimeLeft(60);
  };

  // useEffect To clear the Timer from the Compoenent -unmounting
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="container flex flex-col justify-center items-center mx-auto tracking-wider p-5 h-screen">
      <span className="text-white text-6xl font-bold tracking-widest border-b-2 border-blue-700  p-2">
        Timer
      </span>

      <div className=" p-20 flex flex-col gap-8 items-center">
        <div className="font-bold text-4xl text-center space-x-5">
          <span className="text-orange-500">{timeLeft}</span>
          <span className="text-3xl text-white">Seconds.</span>
        </div>
        <div className="flex gap-4 my-10">
          <button
            className="text-xl font-bold bg-green-700 text-white py-2 px-6 rounded-md cursor-pointer"
            onClick={startTimer}
          >
            Start
          </button>
          <button
            className="text-xl font-bold bg-red-700 text-white py-2 px-6 rounded-md cursor-pointer"
            onClick={stopTimer}
          >
            Stop
          </button>
          <button
            className="text-xl font-bold bg-white text-black py-2 px-6 rounded-md cursor-pointer"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;
