import React, { useState, useEffect } from "react";
import soundOnIcon from "../assets/ Bell_Ring.png";
import soundOffIcon from "../assets/ Bell_Off.png";
import LoadingScreen from "./LoadingScreen";
import { useParams } from "react-router-dom";

function EditOldlAarm() {
  const { id } = useParams();
  const [alarm, setAlarm] = useState(null);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [zone, setZone] = useState("");
  const [days, setDays] = useState([]);
  const [sound, setSound] = useState("false");

  useEffect(() => {
    console.log("hello");
    getAlarm();
  });

  let getAlarm = async () => {
    let response = await fetch(`http://localhost:8000/alarms/${id}`);
    let data = await response.json();
    console.log(data);
    setAlarm(data);
    setHour(data.time.substring(0, 2))
    setMinute(data.time.substring(data.time.length - 2))
    setSound(data.sound);
    setDays(data.date);
    setZone(data.amPm)
    console.log("it lodes");
  };

  const daysHandler = (value) => {
    console.log(value, days);
    if (days.includes(value)) {
      // Remove the value if it already exists
      console.log("remove date", value);
      const updatedDays = days.filter((day) => day !== value);
      setDays(updatedDays);
    } else {
      // Add the value if it does not exist
      const updatedDays = [...days, value];
      setDays(updatedDays);
      console.log(days);
    }
  };

  const addAlarm = async () => {
    console.log(hour, minute, zone, days);
    if (hour !== "" && minute !== "" && zone !== "" && days.length !== 0) {
      console.log(hour, minute, zone, days);

      const newAlarm = {
        time: `${hour}:${minute}`,
        amPm: zone,
        date: days,
        active: "active",
        sound: sound,
      };

      console.log(newAlarm);

      await fetch(`http://localhost:8000/alarms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAlarm),
      });

      window.location.href = "/";
    } else {
      alert("Please fill out all the fields.");
    }
  };

  const deleteAlarm = async (id) => {
    await fetch(`http://localhost:8000/alarms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    window.location.href = "/";
  }

  if (!alarm) {
    return <LoadingScreen />;
  }
  return (
    <>
      <div className="edit-page">
        <p className="edit-title">Edit Alarm: {id}</p>
        {console.log(alarm)}
        <div className="inputs">
          <select
            className="hour"
            onChange={(e) => {
              setHour(e.target.value);
            }}
          >
            <option
              disabled=""
              value={
                hour.length !== 0 ? hour : "hour"
              }
            >
              {hour.length !== 0 ? hour : "hour"}
            </option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select
            className="minute"
            onChange={(e) => {
              setMinute(e.target.value);
            }}
          >
            <option
              disabled=""
              value={
               minute.length !== 0
                  ? minute
                  : "minutes"
              }
            >
              {minute.length !== 0
                ? minute
                : "minutes"}
            </option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
            <option value="32">32</option>
            <option value="33">33</option>
            <option value="34">34</option>
            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
            <option value="46">46</option>
            <option value="47">47</option>
            <option value="48">48</option>
            <option value="49">49</option>
            <option value="50">50</option>
            <option value="51">51</option>
            <option value="52">52</option>
            <option value="53">53</option>
            <option value="54">54</option>
            <option value="55">55</option>
            <option value="56">56</option>
            <option value="57">57</option>
            <option value="58">58</option>
            <option value="59">59</option>
          </select>
          <select
            className="zone"
            onChange={(e) => {
              setZone(e.target.value);
            }}
          >
            <option
              disabled=""
              value={zone.length !== 0 ? zone : "AmPm"}
            >
              {zone.length !== 0 ? zone : "AmPm"}
            </option>
            <option value="AM">Am</option>
            <option value="PM">Pm</option>
          </select>
        </div>

        <div className="controls">
          <div className="date-choose">{days.join(", ") || "WeekDays"}</div>
          <ul className="date-controls">
            <li
              className={`date ${days.includes("Su") ? "active" : ""}`}
              value="Su"
              onClick={(e) => {
                daysHandler(e.target.getAttribute("value"));
              }}
            >
              S
            </li>
            <li
              className={`date ${days.includes("Mo") ? "active" : ""}`}
              value="Mo"
              onClick={(e) => {
                daysHandler(e.target.getAttribute("value"));
              }}
            >
              M
            </li>
            <li
              className={`date ${days.includes("Tu") ? "active" : ""}`}
              value="Tu"
              onClick={(e) => {
                daysHandler(e.target.getAttribute("value"));
              }}
            >
              T
            </li>
            <li
              className={`date ${days.includes("We") ? "active" : ""}`}
              value="We"
              onClick={(e) => {
                daysHandler(e.target.getAttribute("value"));
              }}
            >
              W
            </li>
            <li
              className={`date ${days.includes("Th") ? "active" : ""}`}
              value="Th"
              onClick={(e) => {
                daysHandler(e.target.getAttribute("value"));
              }}
            >
              T
            </li>
            <li
              className={`date ${days.includes("Fr") ? "active" : ""}`}
              value="Fr"
              onClick={(e) => {
                daysHandler(e.target.getAttribute("value"));
              }}
            >
              F
            </li>
            <li
              className={`date ${days.includes("Sa") ? "active" : ""}`}
              value="Sa"
              onClick={(e) => {
                daysHandler(e.target.getAttribute("value"));
              }}
            >
              S
            </li>
          </ul>

          <div className="alarm-sounds">
            <p>Alarm Sound</p>

            <button
              className={`alarm-sound ${sound === "true" ? `active` : ``}`}
            >
              <img
                src={sound === "true" ? `${soundOnIcon}` : `${soundOffIcon}`}
                onClick={() => {
                  sound === "true" ? setSound("false") : setSound("true");
                  console.log("hello");
                }}
                alt="sound-icon"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="header-edit">
        <div
          className="nav-items delete"
          onClick={() => {
           deleteAlarm(id)
          }}
        >
          Delete
        </div>

        <div
          className="nav-items active"
          onClick={() => {
            addAlarm();
          }}
        >
          Save
        </div>
      </div>
    </>
  );
}

export default EditOldlAarm;
