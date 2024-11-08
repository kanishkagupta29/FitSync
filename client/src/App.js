import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Home from './components/home';
import SignUp from './components/signup';
import LogIn from './components/login';
import Personalinfo from './components/personalinfo' ;
import Chatbot from './components/chatbot';
import AboutUs from './components/aboutUs';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} >
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/personalinfo" element={<Personalinfo/>} />
        <Route path='/chatbot' element={<Chatbot/>} />
        <Route path='/about-us' element={<AboutUs/>} />

      </Routes>
    </Router>
  );
}

export default App;
