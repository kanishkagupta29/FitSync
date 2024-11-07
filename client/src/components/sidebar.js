import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({ setActiveFeature }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const handleFeatureChange = (feature) => {
        setActiveFeature(feature);
        closeSidebar();  // Close the sidebar after selecting a feature
    };

    useEffect(() => {
        setIsOpen(false); // Close sidebar when the route changes
    }, [location]);

    return (
        <div>
            {/* Hamburger icon */}
            <div className="hamburger" onClick={toggleSidebar}>☰</div>
            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={toggleSidebar}>×</button>
                <ul>
                    <li><a><h2>Hello buddy</h2></a></li>
                    <li onClick={() => handleFeatureChange('daily-goals')}>
                        Daily goals
                    </li>
                    <li onClick={() => handleFeatureChange('calorie-log')}>
                        Calorie Log
                    </li>
                    <li onClick={() => handleFeatureChange('workout')}>
                        Workout Hub
                    </li>
                    <li onClick={() => handleFeatureChange('meal-plans')}>
                        Meal Plans
                    </li>
                    <li onClick={() => handleFeatureChange('progress-tracker')}>
                        Progress Tracker
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
