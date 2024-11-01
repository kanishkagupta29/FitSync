import React, { useRef, useState, useEffect } from "react";
import "../styles/workout.css";
import exerciseData from "../data/exercise.json";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
function Workout() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timer, setTimer] = useState(45);
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
    } else if (goal && goal[0].goal === "maintain weight") {
      playtime = 30;
      breaktime=15;
    } else if (goal && goal[0].goal === "gain weight") {
      playtime = 30;
      breaktime=20;
    }
    // console.log(playtime)
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      if (isPlaying) {
        setTimer(15);
      } else {
        setTimer(45);
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % exerciseData.length);
      }
      setIsPlaying(!isPlaying);
    }
  }, [timer, isPlaying]);

  const currentExercise = exerciseData[currentVideoIndex];

  return (
    <div className="workout-container">
      <h1>Exercises</h1>
      <h3>You are stronger than you think. Keep going!</h3>
      {isPlaying ? (
        <div className="card">
          <iframe
            width="420"
            height="315"
            src={`https://www.youtube.com/embed/${currentExercise.videos.split("v=")[1]}?autoplay=1`}
            title={currentExercise.Excercises}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
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
    </div>
  );
}

export default Workout;