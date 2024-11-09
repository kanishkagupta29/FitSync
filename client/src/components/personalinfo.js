import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/personalinfo.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import API_BASE_URL from '../apiconfig';

function PersonalInfo() {
  const [form, setForm] = useState({
    goal: 'lose weight', // Initialize the goal field with the default value
  });

  const navigate = useNavigate();
  
  function handleFormData(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  }

  function getEmailFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token');
      return null;
    }

    try {
      console.log(token);
      const decodedToken = jwtDecode(token);
      return decodedToken.email;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    const email = getEmailFromToken();
    console.log('Email got -->', email);
    try {
      const result = await axios.post(`${API_BASE_URL}/api/personalinfo?email=${email}`, {
        ...form,
        email,
      });
      alert(result.data.message);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Account already exists');
    }
  }

  return (
    <div className='card-page'>
      <form onSubmit={submitHandler}>
        <div className='card'>
          <div className='form-header'>Enter your personal details</div>
          <div className='form-body'></div>
          <div>
            <span>Name: </span>
            <input type='text' name='pname' placeholder='Enter your name' onChange={handleFormData} required />
          </div>
          <div>
            <span>Age: </span>
            <input type='number' name='age' onChange={handleFormData} required />
          </div>
          <div>
            <span>Gender: </span>
            <label>
              <input type='radio' name='gender' value='male' onClick={handleFormData} /> Male
            </label>{' '}
            <label>
              <input type='radio' name='gender' value='female' onClick={handleFormData} /> Female
            </label>
            <br />
          </div>
          <div>
            <span>Height: </span>
            <input type='number' name='height' placeholder='(in cms)' onChange={handleFormData} required />
          </div>
          <div>
            <span>Weight: </span>
            <input type='number' name='weight' placeholder='in kg' onChange={handleFormData} required />
          </div>
          <div>
            <span>Your goal: </span>
            <select name='goal' value={form.goal} onChange={handleFormData}>
              {/* Use value attribute and onChange event */}
              <option value='lose weight'>Lose weight</option>
              <option value='maintain weight'>Maintain weight</option>
              <option value='gain weight'>Gain weight</option>
            </select>
          </div>
          <div>
            <button className='form-submit'>SUBMIT</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
