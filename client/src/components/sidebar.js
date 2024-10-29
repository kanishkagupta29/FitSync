import React, {useEffect, useState} from "react"
import { Link, useLocation} from "react-router-dom";
import "../styles/sidebar.css"

const Sidebar = ()=> {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () =>{
        setIsOpen(!isOpen);
    };

    useEffect(()=>{
        setIsOpen(false);
    }, [location]);

    return (
        <div>
            {/* Hamburger icon */}
            <div className="hamburger" onClick = {toggleSidebar}>☰</div>
            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <button className = "close-btn" onClick={toggleSidebar}>×</button>
                <ul>
                    <li><a><h2>Hello buddy</h2></a></li>
                    <li><Link to="daily-goals">Daily Goals</Link></li>
                    <li><Link to="calorie-log">Calorie Log</Link></li>
                    <li><Link to="workout">Workout</Link></li>
                    <li><Link to="meal-plans">Meal Plans</Link></li>
                    <li><Link to="progress-tracker">Progress Tracker</Link></li>   
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;
