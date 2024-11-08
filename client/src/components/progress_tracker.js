import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/progresstracker.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function Results({ getEmailFromToken }) {
  const goal=2300; // Assuming goal is passed as a prop
  const [calDate, setCalDate] = useState(new Date());
  const [showDetails, setShowDetails] = useState(true); // Default to true to show today's log
  const [filteredResults, setFilteredResults] = useState([]);
  const [todayLog, setTodayLog] = useState(null); // State for today's log data

  useEffect(() => {
    // Fetch data for today's log on component mount
    const today = new Date().toLocaleDateString('en-US');
    fetchCalorieLog(today, true);
  }, []);
  
  // Function to fetch calorie log data
  async function fetchCalorieLog(date, isToday = false) {
    const email = getEmailFromToken();
    console.log(email);
    if (!email) {
      alert('Email not found in token');
      return;
    }

    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      console.log("dateinhtml-->", formattedDate);
      const response = await axios.get(`http://localhost:5000/daily-log`, {
        params: { email, date: formattedDate },
      });

      if (isToday) {
        setTodayLog(response.data);
      } else {
        setFilteredResults(response.data);
        setShowDetails(true);
      }
    } catch (error) {
      console.error('Error fetching calorie log data:', error);
      alert('Error fetching data');
    }
  }

  function onChange(selectedDate) {
    setCalDate(selectedDate);
    const formattedDate = selectedDate.toLocaleDateString('en-US');
    fetchCalorieLog(formattedDate);
  }

  function closeDetails() {
    setShowDetails(false);
  }

  // Function to check if the user earned a coin for a specific date
  function checkIfEarnedCoin(calories) {
    return calories >= goal; // Compare calories to the goal
  }

  return (
    <div className='progress-tracker-div'>
    <div className="result-calendar">
      <Calendar locale="en-US" onChange={onChange} value={calDate} />

      {showDetails && (
        <div className="calorie-details">
          <button className="close-btn" onClick={closeDetails}>Close</button>
          <h2>Calorie Details for {calDate.toLocaleDateString('en-US')}</h2>
          {todayLog && (
            <>
              {/* Display Today's Log Only Once */}
              {/* <p>Calories: {todayLog.calories} | Water Glasses: {todayLog.water_glasses}</p> */}
              {checkIfEarnedCoin(todayLog.calories) && <p className='earned-coin-message' style={{ color: 'green' }}>You earned a coin!</p>}
            </>
          )}
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <div key={index}>
                {/* Display details for the selected date without duplicating today's log */}
                <p>Calories: {result.calories} | Water Glasses: {result.water_glasses}</p>
                {checkIfEarnedCoin(result.calories) && <p className='earned-coin-message' style={{ color: 'green' }}>You earned a coin!</p>}
              </div>
            ))
          ) : (
            <p>No calorie data available for this date.</p>
          )}
        </div>
      )}

      {/* Display Today's Log Only Once */}
      {todayLog && !showDetails && (
        <div className="today-log">
          <h3>Today's Calorie Log</h3>
          <p>Calories: {todayLog.calories} | Water Glasses: {todayLog.water_glasses}</p>
          {checkIfEarnedCoin(todayLog.calories) && <p className='earned-coin-message' style={{ color: 'green' }}>You earned a coin!</p>}
        </div>
      )}
    </div>
    </div>
  );
}
