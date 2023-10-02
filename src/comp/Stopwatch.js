import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Stopwatch = () => {
  const location = useLocation();
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const startTimer = () => {
    setIsRunning(true);
    setTimerId(
      setInterval(() => {
        setSecond((prevSecond) => {
          const newSecond = prevSecond ? prevSecond + 1 : 1;
          if (newSecond === 60) {
            setSecond(0);
            setMinute((prevMinute) => (prevMinute ? prevMinute + 1 : 1));
          }
          return newSecond;
        });
      }, 1000)
    );
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerId);
    setTimerId(null);
  };

  const resetTimer = () => {
    clearInterval();
    setHour("");
    setMinute("");
    setSecond("");
  };

  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <>
      <div className="stopwatch-page">
        <div className="timer">
          <p>{formatTime(hour)}</p>
          <span>.</span>
          <p>{formatTime(minute)}</p>
          <span>.</span>
          <p>{formatTime(second)}</p>
        </div>

        <div className="stopwatch-controller">
          {isRunning ? (
            <>
              <button className="stop" onClick={stopTimer}>
                Stop
              </button>
              <button className="reset" onClick={resetTimer}>
                Reset
              </button>
            </>
          ) : (
            <button className="reset" onClick={startTimer}>
              Start
            </button>
          )}
        </div>
      </div>

      <div className="header">
        <Link to={"/"} className={`nav-item ${isActive("/")}`}>
          Alarm
        </Link>

        <Link
          to={"/stopwatch"}
          className={`nav-item ${isActive("/stopwatch")}`}
        >
          StopWatch
        </Link>

        <Link
          to={"/countdown"}
          className={`nav-item ${isActive("/countdown")}`}
        >
          CountDown
        </Link>
      </div>
    </>
  );
};

export default Stopwatch;