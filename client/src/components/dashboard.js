import React from "react";
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
        </div>
    );
}

export default Dashboard;
