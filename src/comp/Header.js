import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };
  return (

    <div className="header">
      <Link to={"/"} className={`nav-item ${isActive("/")}`}>
        Alarm
      </Link>

      <Link to={"/stopwatch"} className={`nav-item ${isActive("/stopwatch")}`}>
        StopWatch
      </Link>

      <Link to={"/countdown"} className={`nav-item ${isActive("/countdown")}`}>
        CountDown
      </Link>
    </div>
  );
};

export default Header;