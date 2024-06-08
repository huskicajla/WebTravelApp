/* eslint-disable no-unused-vars */
import React from "react";
import Home from "./home/Home";
import Destinations from "./Destinations/Destinations";
import Signup from "./components/Signup";
import {Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/destinations" element={<Destinations/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </div>
    </>

  );
};

export default App;