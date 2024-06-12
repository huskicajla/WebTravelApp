/* eslint-disable no-unused-vars */
import React from "react";
import Home from "./home/Home";
import Destinations from "./Destinations/Destinations";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {Routes, Route} from "react-router-dom";
import AdminDashboard from "./dashboards/admin.dashboard";
import ManageUsers from "./dashboards/ManageUsers";
import ManageTrips from "./dashboards/ManageTrips";
import ManageQuestions from "./dashboards/ManageQuestions";
import Destination from "./destination/Destination";
import UserDashboard from "./dashboards/user_dash/user.dashboard";
import TravelHistory from './dashboards/user_dash/travelHistory';
import TripSignup from './dashboards/user_dash/UserTripSignup';
const App = () => {
  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/destinations" element={<Destinations/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      <Route path="/admin-dashboard/manage-users" element={<ManageUsers/>}/>
      <Route path="/admin-dashboard/manage-trips" element={<ManageTrips/>}/>
      <Route path="/admin-dashboard/manage-questions" element={<ManageQuestions/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/destination/:desionation_id" element={<Destination/>}/>
      <Route path="/user-dashboard" element={<UserDashboard/>}/>
      <Route path="/user-dashboard/travel-history" element={<TravelHistory/>}/>
      <Route path="/user-dashboard/trip-signup" element={<TripSignup/>}/>
    </Routes>
    </div>
    </>

  );
};

export default App;