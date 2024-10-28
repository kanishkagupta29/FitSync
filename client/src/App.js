import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Home from './components/home';
import SignUp from './components/signup';
import LogIn from './components/login';
import Personalinfo from './components/personalinfo' ;
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/personalinfo" element={<Personalinfo/>} />
      </Routes>
    </Router>
  );
}

export default App;
