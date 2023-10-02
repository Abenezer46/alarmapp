import React from "react";


const AlarmItem = ({ alarm }) => {
  const isChecked = () => {
    return alarm.active === "active" ? "checked" : "";
  };

  const isActive = (date) => {
    const days = alarm.date;
    const dateMatch = days.filter((day) => day.includes(date));
    return dateMatch.length > 0 ? "active" : "";
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

      window.location.reload();
    } else if (alarm.active === "notActive") {
      await fetch(`http://localhost:8000/alarms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...alarm, active: "active" }),
      });

      window.location.reload();
    }
  };

  return (
    <div className="alarm" onClick={() => (window.location.href = `/edit/${alarm.id}`)}>
      <p>{alarm.time}</p>
      <div className="type">
        <ul>
          <li className={isActive("Su")}>S</li>
          <li className={isActive("Mo")}>M</li>
          <li className={isActive("Tu")}>T</li>
          <li className={isActive("We")}>W</li>
          <li className={isActive("Th")}>T</li>
          <li className={isActive("Fr")}>F</li>
          <li className={isActive("Sa")}>S</li>
        </ul>
        <div>
          <input
            type="checkbox"
            id={alarm.id}
            checked={isChecked()}
            onChange={() => {
              deActive(alarm.id);
            }}
            className="toggle"
          />
          <label htmlFor={alarm.id}></label>
        </div>
      </div>
    </div>
  );
};

export default AlarmItem;
