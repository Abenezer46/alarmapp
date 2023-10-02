import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import alarmLogo from "../assets/alarm2.gif";
import stop from "../assets/ Stop.png";
import bell from "../assets/bellsound.mp3"

function Audio() {
  const [alarm, setAlarm] = useState([]);
  const { id } = useParams();
  const [today, setToday] = useState("");
  const [playSound, setPlaySound] = useState(false)
  useEffect(() => {
    getAlarm();

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setToday(weekdays[new Date().getDay()]);

    console.log(today);
  }, []);

  let getAlarm = async () => {
    let response = await fetch(`http://localhost:8000/alarms/${id}`);
    let data = await response.json();
    setAlarm(data);
  };

  const deActive = async (id) => {
    // Perform any logic related to deactivating based on the alarm id
    console.log(`Deactivating alarm with id: ${id}`);
    console.log(alarm.active);
    if (alarm.active === "active") {
      await fetch(`http://localhost:8000/alarms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...alarm, active: "notActive" }),
      });

      window.location.href = '/';
    } else if (alarm.active === "notActive") {
      await fetch(`http://localhost:8000/alarms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...alarm, active: "active" }),
      });

      window.location.href = '/';
      setPlaySound(false)
    }
  };

  return (
    <div className="active-alarm">
       {alarm.sound === "true" ? setPlaySound(true) : setPlaySound(false)}
      <audio src={bell} autoPlay={playSound ? true : false}></audio>
      <p className="today">{today}</p>
      <img src={alarmLogo} alt="my" className="alarm-logo" />


      <p className="alarm-time">
        {alarm.time} {alarm.amPm}
      </p>


      <button
        className="stop-icon"
        onClick={() => {
          deActive(alarm.id);
        }}
      ></button>
    </div>
  );
}

export default Audio;
