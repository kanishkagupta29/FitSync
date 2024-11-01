import React from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CalorieLog from "./calorieLog";
import Mealplan from "./mealplan";
function Dashboard(){
    const navigate = useNavigate();
    function getEmailFromToken() {
        const token = localStorage.getItem('token');
        if (!token) return null;
    
        try {
          const decodedToken = jwtDecode(token);
          return decodedToken.email; // Assuming the email is in the payload
        } catch (error) {
          console.error('Failed to decode token:', error);
          return null;
        }
      }
    return(
        <div>
            <Mealplan getEmailFromToken={getEmailFromToken}/>
        </div>
    );
}

export default Dashboard;