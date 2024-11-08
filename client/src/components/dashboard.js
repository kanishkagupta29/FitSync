import React, { useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Sidebar from "./sidebar";
import "../styles/dashboard.css";
import CalorieLog from "./calorieLog";
import Mealplan from "./mealplan";
import { useNavigate } from "react-router-dom";
import DailyGoal from "./daily_goal";
import Workout from "./workout";
import Chatbot from "./chatbot";
import ProgressTracker from "./progress_tracker";

function Dashboard() {
    const [activeFeature, setActiveFeature] = useState('daily-goals');
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const navigate = useNavigate();
    
    function getEmailFromToken() {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.email;
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }

    // Function to render feature content based on activeFeature
    const renderFeatureContent = () => {
        switch (activeFeature) {
            case 'daily-goals':
                return <DailyGoal getEmailFromToken={getEmailFromToken} />;
            case 'calorie-log':
                return <CalorieLog getEmailFromToken={getEmailFromToken} />;
            case 'workout':
                return <Workout getEmailFromToken={getEmailFromToken} />;
            case 'meal-plans':
                return <Mealplan getEmailFromToken={getEmailFromToken} />;
            case 'progress-tracker':
                return <ProgressTracker getEmailFromToken={getEmailFromToken} />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <Sidebar setActiveFeature={setActiveFeature} />
                {/* Logo Section */}
                <div className="dash-logo-container">
                    <img src="https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/haalxf8hs7fk9m41uwnu" alt="FitSync Logo" className="fitsync-logo" />
                    <div className='dash-logo'>FitSync</div>
                </div>
                {/* Navigation Links */}
                <div className="nav-links">
                    <a href="/about-us" className="nav-link">About Us</a>
                    <a href="/contact" className="nav-link">Contact</a>
                    <a href="/help" className="nav-link">Help</a>
                    <a href="/settings" className="nav-link">Settings</a>
                </div>
                <a href="/dashboard"><i className="fa-solid fa-user profile-logo"></i></a>
            </div>
            <div style={{height:'15px',backgroundColor:'#40A578'} }></div>
            <div className="dashboard-content">
                {renderFeatureContent()}
            </div>
            {/* Chatbot icon to open the popup */}
            <div className="chatbot-icon" onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
                <i className="fa-solid fa-comment-dots"></i>
            </div>

            {/* Conditionally render the Chatbot popup */}
            {isChatbotOpen && (
                <div className="chatbot-popup">
                    <Chatbot />
                    <button onClick={() => setIsChatbotOpen(false)} className="close-chatbot">X</button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
