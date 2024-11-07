import React, { useEffect, useState } from "react";
import axios from "axios";
import WaterTracker from "./water_tracker";
import "../styles/daily_goal.css";

function DailyGoal({ getEmailFromToken }) {
    const [totalCalories, setTotalCalories] = useState(0);
    const [message, setMessage] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        fetchCalories();
    }, []);

    async function fetchCalories() {
        const email = getEmailFromToken();
        try {
            const result = await axios.get(`http://localhost:5000/total_calories?email=${email}`);
            if (result.status === 200) {
                console.log("Backend calories:", result.data);
                setTotalCalories(1200 - result.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleCompleteMeals() {
        let newMessage = '';
        if (totalCalories < 1100) {
            newMessage = "You're a bit below your target for today. A small, balanced snack could help ensure you’re getting the nutrients you need.";
        } else if (totalCalories >= 1100 && totalCalories < 1300) {
            newMessage = "Great job! You've hit your daily calorie goal. Keep up the balanced eating, and stay hydrated!";
        } else {
            newMessage = "You’ve slightly exceeded your calorie goal today. No worries! Consider lighter choices tomorrow to balance it out.";
        }
        if (newMessage !== '') {
            setMessage(newMessage);
            setButtonDisabled(true);
        }
    }

    return (
        <div className="daily-goal">
            <div className="water-trackers">
                <WaterTracker getEmailFromToken={getEmailFromToken} />
            </div>
            <div className="suggestion-box">
                <h3>Have you had all your meals today?</h3>
                <button
                    className="complete-meals"
                    onClick={handleCompleteMeals}
                    disabled={buttonDisabled}
                >
                    Yes, I have had!
                </button>
                <div className="message">{message}</div>
            </div>
            <div className="calories-card">
                <p>You have</p>
                <br></br>
                <span className="calorie-value">{Math.abs(totalCalories)} cal</span>
                <br></br>
                {totalCalories >= 0 ? (
                    <p>remaining calories</p>
                ) : (
                    <p>extra calories consumed</p>
                )}
            </div>

        </div>
    );
}

export default DailyGoal;
