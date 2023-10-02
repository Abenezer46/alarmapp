import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alarm from "./comp/Alarm"
import Stopwatch from "./comp/Stopwatch"
import CountDown from "./comp/CountDown"
import Edit from "./comp/Edit";
import Audio from "./comp/Audio";


function App() {
  return(
    <Router>
    <div className="container">
      <Routes>
        <Route path="/" exact Component={Alarm} />
        <Route path="/stopwatch" exact Component={Stopwatch} />
        <Route path="/countdown" exact Component={CountDown} />
        <Route path="/edit/:id" exact Component={Edit} />
        <Route path="/audio/:id" exact Component={Audio} />
      </Routes>
    </div>
  </Router>
  )
}

export default App;
