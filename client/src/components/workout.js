import React, { useState, useEffect } from "react";
import "../styles/workout.css";
import exerciseData from "../data/exercise.json";

function Workout() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timer, setTimer] = useState(45);
  const [isComplete, setIsComplete] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);
  const maxRepeats = 3; // Set the maximum repeat limit

  useEffect(() => {
    if (isComplete) return;

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
        if ((prevIndex + 1) % exerciseData.length === 0) {
          setRepeatCount((prevCount) => prevCount + 1);
          if (repeatCount + 1 >= maxRepeats) {
            setIsComplete(true);
            return;
          }
        }
      }
      setIsPlaying(!isPlaying);
    }
  }, [timer, isPlaying, currentVideoIndex, repeatCount, isComplete]);

  const handleRepeat = () => {
    setCurrentVideoIndex(1);
    setIsPlaying(true);
    setTimer(45);
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
