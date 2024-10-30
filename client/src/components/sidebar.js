import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({ setActiveFeature }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setIsOpen(false);
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
                    <li onClick={() => setActiveFeature('daily-goals')}>
                        Daily goals
                    </li>
                    <li onClick={() => setActiveFeature('calorie-log')}>
                        Calorie Log
                    </li>
                    <li onClick={() => setActiveFeature('workout')}>
                        Workout Hub
                    </li>
                    <li onClick={() => setActiveFeature('meal-plans')}>
                        Meal Plans
                    </li>
                    <li onClick={() => setActiveFeature('progress-tracker')}>
                        Progress Tracker
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
