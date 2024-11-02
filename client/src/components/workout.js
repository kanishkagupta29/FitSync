import React, { useState, useEffect } from "react";
import "../styles/workout.css";
import exerciseData from "../data/exercise.json";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
function Workout() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const [isComplete, setIsComplete] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);
  let maxRepeats = 3; // Set the maximum repeat limit
  const [goalweight,setgoalweight]=useState("");
    function getEmailFromToken() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("no token");
            return null;
        }
    
        try {
            console.log("token",token);
          const decodedToken = jwtDecode(token);
          return decodedToken.email;
        } catch (error) {
          console.error('Failed to decode token:', error);
          return null;
        }
    }
    useEffect(() => {
      async function fetchGoal() {
          const email = getEmailFromToken();
          if (!email) {
              console.log("Email not available");
              return;
          }
          try {
              const result = await axios.get(`http://localhost:5000/goal-weight?email=${email}`);
              if (result.status === 200) {
                  console.log(result.data);
                  setgoalweight(result.data);
              }
          } catch (error) {
              console.error('Error fetching goal weight:', error);
          }
      }

      fetchGoal();
  }, []); // 
  const goal = goalweight;
  console.log("---->",goal);
  let playtime=null;
  let breaktime=null;
  if (goal && goal[0].goal === "lose weight") {
    playtime = 45;
    breaktime=5;
    maxRepeats=3;
  } else if (goal && goal[0].goal === "maintain weight") {
    playtime = 30;
    breaktime=15;
    maxRepeats=2;
  } else if (goal && goal[0].goal === "gain weight") {
    playtime = 30;
    breaktime=20;
    maxRepeats=2;
  }
  const [timer, setTimer] = useState(playtime);
  useEffect(() => {
    if (isComplete) return;

    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      if (isPlaying) {
        setTimer(breaktime);
      } else {
        setTimer(playtime);
        setCurrentVideoIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % exerciseData.length;

          // Check if we have completed a full cycle of exercises
          if (newIndex === 0) {
            setRepeatCount((prevCount) => {
              const newCount = prevCount + 1;
              if (newCount >= maxRepeats) {
                setIsComplete(true);
              }
              return newCount;
            });
          }
          return newIndex;
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [timer, isPlaying, isComplete]);

  const handleRepeat = () => {
    setCurrentVideoIndex(1);
    setIsPlaying(true);
    setTimer(playtime);
    setRepeatCount(0);
    setIsComplete(false);
  };

  const currentExercise = exerciseData[currentVideoIndex];

  return (
    <div className="workout-container">
      <h1>Exercises</h1>
      <h3>You are stronger than you think. Keep going!</h3>
      {isPlaying ? (
        <div className="card">
          <img
            src={currentExercise.giphyURL !== "NULL" ? currentExercise.giphyURL : "path/to/placeholder.png"}
            alt={currentExercise.Excercises}
            className="exercise-animation"
          />
          <div className="card-body">
            <h5 className="card-title">{currentExercise.Excercises.toUpperCase()}</h5>
            <p className="card-text"><b>Calories Burned:</b> {currentExercise['calories burned']}</p>
            <p className="timer">Time: {timer}s</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="video-placeholder"></div>
          <div className="card-body">
            <h5 className="card-title">Please take a deep breath and relax.</h5>
            <p className="timer">Time: {timer}s</p>
          </div>
        </div>
      )}

      {isComplete && (
        <button onClick={handleRepeat} className="repeat-button">
          Repeat Exercises
        </button>
      )}
    </div>
  );
}

export default Workout;