import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Add } from "../assets/plus.svg";
import AlarmItem from "./AlarmItem";

const Alarm = () => {
  const location = useLocation();
  const [alarms, setAlarms] = useState([]);
  const [currentTime, setCurrentTime] = useState([]);


  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };


  useEffect(() => {
    const interval = setInterval(() => {
      getAlarm();
      const currentTime = new Date();
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      const ampm = hours >= 12 ? "Pm" : "Am";

      // Convert to 12-hour format
      hours = hours % 12 || 12;

      // Add leading zeros to minutes if necessary
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      hours = hours < 10 ? `0${hours}` : hours;
      const time = [{ hour: hours, minutes: minutes, zone: ampm }];
      setCurrentTime(time);
    }, 1000); // Run every second

    return () => clearInterval(interval);
  });

  let getAlarm = async () => {
    let response = await fetch("http://localhost:8000/alarms/");
    let data = await response.json();
    setAlarms(data);
    checkAlarm(data);
  };

  const checkAlarm = (data) => {
    // Call your function or perform the desired task here
    console.log("checkAlarm function", data);

    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const today = weekdays[new Date().getDay()];
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    const amp = hour >= 12 ? "Pm" : "Am";

    // Convert to 12-hour format
    hour = hour % 12 || 12;

    // Add leading zeros to minutes if necessary
    minute = minute < 10 ? `0${minute}` : minute;
    hour = hour < 10 ? `0${hour}` : hour;

    const time = { hour: hour, minutes: minute, zone: amp };

    console.log("currnt time", time);

    if (data.length > 0) {
      console.log(alarms);
      data.map((alarm,index) => {
        const days = alarm.date;
        console.log("map through alarms");
        const dateMatch = days.filter((day) => day.includes(today));

        if (dateMatch.length > 0 && alarm.active === "active") {
          console.log("match date", );
          const tim = `${time?.hour}:${time?.minutes}`;
          console.log(alarm.time, tim);
          if (alarm.amPm === time.zone) {
            console.log("check timezone", alarm.amPm);
            if (alarm.time === tim) {
              console.log("check if alarm time is equal");

               window.location.href = `/audio/${alarm.id}`;
            }
          }
        }
        return void 0;
      });
    } else {
      console.log("empty alarm");
    }

    // Clean up the interval when the component is unmounted
  };

  return (
    <>
      <div className="alarm-page">
        <Link to="/edit/new" className="add-btn">
          <Add />
        </Link>

        <div className="upcoming-alarm">
          <p>Current Time</p>
          <p className="time">
            {currentTime[0]?.hour} : {currentTime[0]?.minutes}{" "}
            {currentTime[0]?.zone}
          </p>
        </div>

        <div className="alarm-list">
          {alarms.map((alarm, index) => (
            <AlarmItem key={index} alarm={alarm} />
          ))}
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

export default Alarm;
