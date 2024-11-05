import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/water_tracker.css";

const WaterTracker = ({ getEmailFromToken }) => {
    const totalGlasses = 8;
    const [glassesDrunk, setGlassesDrunk] = useState(0);

    useEffect(() => {
        updateDrankWater();
    }, []);

    const handleDrinkWater = async () => {
        if (glassesDrunk < totalGlasses) {
            const email = getEmailFromToken();
            const newGlassCount = glassesDrunk + 1;

            try {
                const result = await axios.post(
                    `http://localhost:5000/water_intake`,
                    {
                        email: email,
                        glasses: newGlassCount,
                    }
                );

                if (result.status === 200) {
                    console.log(result.data);
                    setGlassesDrunk(newGlassCount);
                }
            } catch (error) {
                console.log("Error updating water intake:", error);
            }
        }
    };

    const updateDrankWater = async () => {
        const email = getEmailFromToken();

        try {
            const result = await axios.get(
                `http://localhost:5000/water_intake?email=${email}`
            );

            if (result.status === 200) {
                console.log(result.data);
                setGlassesDrunk(result.data);
            }
        } catch (error) {
            console.log("Error updating water intake:", error);
        }
    };

    return (
        <div className="water-tracker">
            <h2>Daily Water Goal</h2>
            <div className="glass-container">
                {[...Array(totalGlasses)].map((_, index) => (
                    <div
                        key={index}
                        className={`glass ${index < glassesDrunk ? "filled" : ""}`}
                    ></div>
                ))}
            </div>
            <button onClick={handleDrinkWater}>
                Drank 1 Glass
            </button>
            {glassesDrunk === totalGlasses && <p className="goal-achieved">Goal achieved! 🎉</p>}
        </div>
    );
};

export default WaterTracker;
