import React, { useRef, useState, useEffect } from "react";
import "../styles/workout.css";
import exerciseData from "../data/exercise.json";

function Workout() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timer, setTimer] = useState(45);

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