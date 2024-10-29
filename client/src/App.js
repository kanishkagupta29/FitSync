import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Home from './components/home';
import SignUp from './components/signup';
import LogIn from './components/login';
import DailyGoal from './components/daily_goal';
import MealPlan from './components/meal_plan';
import Workout from './components/workout';
import ProgressTracker from './components/progress_tracker';
import CalorieLog from './components/calorieLog';
import Personalinfo from './components/personalinfo' ;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} >
          {/* Nested routes */}
          <Route path="daily-goals" element={<DailyGoal />} />
          <Route path="meal-plans" element={<MealPlan />} />
          <Route path="calorie-log" element={<CalorieLog />} />
          <Route path="workout" element={<Workout />} />
          <Route path="progress-tracker" element={<ProgressTracker />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/personalinfo" element={<Personalinfo/>} />
      </Routes>
    </Router>
  );
}

export default App;
