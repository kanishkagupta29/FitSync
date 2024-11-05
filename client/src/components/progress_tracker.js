import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/progresstracker.css';

export default function Results() {
    // State to store the selected date from the calendar
    const [calDate, setCalDate] = useState(new Date());
    const [showDetails, setShowDetails] = useState(false); // State to manage visibility of the calorie details
    const [filteredResults, setFilteredResults] = useState([]); // State to store filtered results

    // Sample userResults (replace this with your actual data)
    const userResults = [
        { created_at: '2024-11-01T12:00:00', calories: 1500 },
        { created_at: '2024-11-02T08:30:00', calories: 1800 },
        // Add more results as needed
    ];

    // This function updates the calendar date and filters user results based on the selected date
    function onChange(selectedDate) {
        setCalDate(selectedDate);

        // Filter the user results to show only those that match the selected date
        const results = userResults.filter(result => {
            const resultDateFormatted = new Date(result.created_at).toLocaleDateString('en-US');
            const selectedDateFormatted = selectedDate.toLocaleDateString('en-US');
            return resultDateFormatted === selectedDateFormatted;
        });

        setFilteredResults(results); // Update the filtered results state
        setShowDetails(true); // Show the details page
    }

    // Function to close the calorie details page
    function closeDetails() {
        setShowDetails(false);
    }

    return (
        <div className="result-calendar">
            {/* Render the Calendar component with the English locale */}
            <Calendar locale="en-US" onChange={onChange} value={calDate} />

            {/* Conditional rendering for the calorie details page */}
            {showDetails && (
                <div className="calorie-details">
                    <button className="close-btn" onClick={closeDetails}>Close</button>
                    <h2>Calorie Details for {calDate.toLocaleDateString('en-US')}</h2>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((result, index) => (
                            <p key={index}>Calories: {result.calories}</p>
                        ))
                    ) : (
                        <p>No calorie data available for this date.</p>
                    )}
                </div>
            )}
        </div>
    );
}
