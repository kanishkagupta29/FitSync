import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../apiconfig";

function LogIn() {
  const navigate = useNavigate()
  const [form, setForm] = useState({});

  function handleFormData(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const result = await axios.post(`${API_BASE_URL}/api/login`,form);
      if(result.status === 200){
        localStorage.setItem('token', result.data.token);
        navigate('/dashboard');
      }
    }
    catch(error){
      console.error('error sending login data: ',error);
      alert('error found, pls try again.......');
    }
  }

  return (
    <div className="card-page">
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="form-header">
            Log In
          </div>
          <div className="form-body">
            <div>
            <span>Email: </span>
            <input
              type="email"
              name="email"
              onChange={handleFormData}
              value={form.email || ''}
            />
            </div>
            <div>
            <span>Password: </span>
            <input
              type="password"
              name="password"
              onChange={handleFormData}
              value={form.password || ''}
            />
            </div>
            <button className="form-submit">Log In</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
