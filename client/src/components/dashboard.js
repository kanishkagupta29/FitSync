import React from "react";
<<<<<<< HEAD
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
    return (
        <div>
            <div className="dashboard-header">
                <Sidebar />
                <div className='dash-logo'>FitSync</div>
                <a href="/dashboard"><i className="fa-solid fa-user profile-logo"></i></a>
            </div>
            <div className="dashboard-content">
                <Outlet/>
            </div>
=======
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CalorieLog from "./calorieLog";

function Dashboard(){
    const navigate = useNavigate();
    function getEmailFromToken() {
        const token = localStorage.getItem('token');
        if (!token) return null;
    
        try {
          const decodedToken = jwtDecode(token);
          return decodedToken.email; // Assuming the email is in the payload
        } catch (error) {
          console.error('Failed to decode token:', error);
          return null;
        }
      }
    return(
        <div>
            <CalorieLog getEmailFromToken={getEmailFromToken}/>
>>>>>>> 6788883a965946a13ffcbadcb826b2f400dd0748
        </div>
    );
}

export default Dashboard;
