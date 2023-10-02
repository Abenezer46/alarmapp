import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import sleep from "../assets/moon.svg";
import chill from "../assets/chill.svg";
import book from "../assets/book.svg";
import code from "../assets/code.svg";
import bellSound from "../assets/bellsound.mp3";

const CountDown = () => {
  const location = useLocation();
  const [hour, setHour] = useState("0");
  const [minute, setMinute] = useState("0");
  const [second, setSecond] = useState("0");
  const [prevHour, setPrevHour] = useState("0");
  const [prevMinute, setPrevMinute] = useState("0");
  const [prevSecond, setPrevSecond] = useState("0");
  const [isRunning, setIsRunning] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [countdownFinished, setCountdownFinished] = useState(false)

  const audioRef = useRef();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  useEffect(() => {
    if (isRunning) {
      let totalSeconds =
        parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second);
      setCountdownInterval(
        setInterval(() => {
          if (totalSeconds > 0) {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            setHour(formatTime(hours));
            setMinute(formatTime(minutes));
            setSecond(formatTime(seconds));

            totalSeconds--;
          } else {
            setCountdownFinished(true);
            clearInterval(countdownInterval);
          }
        }, 1000)
      );
    } else if (shouldReset) {
      setHour(prevHour);
      setMinute(prevMinute);
      setSecond(prevSecond);
      setIsRunning(true);
      setShouldReset(false);

    } else {
      clearInterval(countdownInterval);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isRunning, shouldReset]);

  useEffect(() => {
    if (countdownFinished) {
      audioRef.current.play();
    }
  }, [countdownFinished]);

  const startCountdown = () => {
    const isValidInput =
      !Number.isNaN(parseInt(hour)) &&
      !Number.isNaN(parseInt(minute)) &&
      !Number.isNaN(parseInt(second));

    if (isValidInput && (hour !== "0" || minute !== "0" || second !== "0")) {
      setIsRunning(true);
      setPrevHour(hour);
      setPrevMinute(minute);
      setPrevSecond(second);
      console.log("true");
    } else {
      alert("please choose a valid input");
    }
  };

  const stopCountdown = () => {
    audioRef.current.pause(); // Pause the audio
    audioRef.current.currentTime = 0;
    setIsRunning(false);
    setHour("0");
    setMinute("0");
    setSecond("0");
    clearInterval(countdownInterval);
  };

  const resetCountdown = () => {
    setShouldReset(true);
    setIsRunning(false);
    audioRef.current.pause(); // Pause the audio
    audioRef.current.currentTime = 0;
  };

  const optionStart = (value) => {
    if (value === "sleep") {
      setMinute("20");
      setPrevMinute("20");
      setIsRunning(true);
    } else if (value === "chill") {
      setMinute("10");
      setPrevMinute("10");
      setIsRunning(true);
    } else if (value === "study") {
      setMinute("25");
      setPrevMinute("25");
      setIsRunning(true);
    } else if (value === "code") {
      setMinute("30");
      setPrevMinute("30");
      setIsRunning(true);
    }
  };
  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <>
      <div className="countdown-page">
      <audio ref={audioRef} src={bellSound} autoPlay= {false}/>
        {!isRunning ? (
          <>

            <div className="countdown-input">
              <input
                className="countdown-hour"
                type="number"
                max={12}
                min={0}
                placeholder="00"
                onChange={(e) => {
                  setHour(e.target.value);
                }}
              />
              <input
                className="countdown-minute"
                type="number"
                max={59}
                min={0}
                placeholder="00"
                onChange={(e) => {
                  setMinute(e.target.value);
                }}
              />
              <input
                className="countdown-second"
                type="number"
                max={59}
                min={0}
                placeholder="00"
                onChange={(e) => {
                  setSecond(e.target.value);
                }}
              />
            </div>

            <div className="countdown-options">
              <div className="option" onClick={() => optionStart("sleep")}>
                <img src={sleep} alt="sleep-icon" />
                <p>Sleep</p>
                <span>00:20:00</span>
              </div>

              <div className="option" onClick={() => optionStart("chill")}>
                <img src={chill} alt="sleep-icon" />
                <p>Chill</p>
                <span>00:10:00</span>
              </div>

              <div className="option" onClick={() => optionStart("study")}>
                <img src={book} alt="sleep-icon" />
                <p>Study</p>
                <span>00:25:00</span>
              </div>

              <div className="option" onClick={() => optionStart("code")}>
                <img src={code} alt="sleep-icon" />
                <p>Code</p>
                <span>00:30:00</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ color: "white" }}>CountDown</h1>
            <div className="countdown">
              <p>{hour !== "" ? formatTime(hour) : "00"}</p>
              <span>:</span>
              <p>{minute !== "" ? formatTime(minute) : "00"}</p>
              <span>:</span>
              <p>{second !== "" ? formatTime(second) : "00"}</p>
            </div>
          </>
        )}

        <div className="countdown-control">
          {!isRunning ? (
            <button className="start-countdown" onClick={startCountdown}>
              Start
            </button>
          ) : (
            <>
              <button className="stop-countdown" onClick={stopCountdown}>
                Stop
              </button>
              <button className="reset-countdown" onClick={resetCountdown}>
                Reset
              </button>
            </>
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

export default CountDown;
