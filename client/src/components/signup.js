import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const navigate = useNavigate();

  const [form,setForm] = useState({});
  const [responseMessage, setResponseMessage] = useState('');

  function handleFormData(e){
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
  }

  return (
    <div className="card-page">
      <form onSubmit={handleFormSubmit}>
        <div className='card'>
          <div className="form-header">
            Sign Up
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
            <button className="form-submit">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
