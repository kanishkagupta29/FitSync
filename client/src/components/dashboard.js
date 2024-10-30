import React, { useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Sidebar from "./sidebar";
import "../styles/dashboard.css";
import CalorieLog from "./calorieLog";
import DailyGoal from "./daily_goal";
import Workout from "./workout";
import MealPlan from "./meal_plan";
import ProgressTracker from "./progress_tracker";

function Dashboard() {
    const [activeFeature, setActiveFeature] = useState('daily-goals');

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
                return <DailyGoal />;
            case 'calorie-log':
                return <CalorieLog getEmailFromToken={getEmailFromToken}/>;
            case 'workout':
                return <Workout />;
            case 'meal-plans':
                return <MealPlan />;
            case 'progress-tracker':
                return <ProgressTracker />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="dashboard-header">
                <Sidebar setActiveFeature={setActiveFeature} />
                <div className='dash-logo'>FitSync</div>
                <a href="/dashboard"><i className="fa-solid fa-user profile-logo"></i></a>
            </div>
            <div className="dashboard-content">
                {renderFeatureContent()}
            </div>
        </div>
    );
}

export default Dashboard;
