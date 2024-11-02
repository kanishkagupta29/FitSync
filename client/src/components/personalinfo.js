import React,{useState} from 'react';
// import './personalinfo.css'
import { useNavigate } from 'react-router-dom';
import '../styles/personalinfo.css'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
function PersonalInfo(){
    const [form,setForm] = useState({});
//   const [responseMessage, setResponseMessage] = useState('');
const navigate = useNavigate()
  function handleFormData(e){
    setForm({
      ...form,
      [e.target.name]:e.target.value
      
    })
    console.log(form);
  }
  function getEmailFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log("no token");
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
    console.log('email got-->',email);
      try{
        const result = await axios.post(`http://localhost:5000/api/personalinfo?email=${email}`, {
            ...form,
            email
        });
        alert(result.data.message);
        navigate('/dashboard');
      }
      catch(error){
        console.error('Error sending data:', error);
        alert('Account already exists');
      }
  }
    return(
        <div className='card-page'>
            <form onSubmit={submitHandler}>
            
            <div className='card'>
            <div className='form-header'>Enter your personal details</div>
            <div className='form-body'></div>
            <div>
            <span>Name : </span>
            <input type="name " name="pname" placeholder="Enter your name" onChange={handleFormData} required/>
            </div>
            <div>
            <span>Age : </span>
            <input type="number " name="age" onChange={handleFormData} required/>
            </div>
            <div>
            <span>Gender : </span>
            <label>
    <input type="radio" name="gender" value="male" onClick={handleFormData}/> Male  </label>{'       '}
  <label>
    <input type="radio" name="gender" value="female" onClick={handleFormData}/> Female</label><br/>
            </div>
            <div>
            <span>Height : </span>
            <input type="number " name="height" placeholder="(in cms)" onChange={handleFormData} required/>
            </div>
            <div>
            <span>Weight : </span>
            <input type="number " name="weight" placeholder="in kg" onChange={handleFormData} required/>
            </div>
            <div>
            <span>Your goal : </span>
                <select name="goal" onClick={handleFormData} >
                    <option value="lose weight"  >lose weight</option>
                    <option value="maintain weight" >Maintain weight</option>
                    <option value="gain weight" >gain weight</option>
                
                    
                </select>
            </div>
            <div>
            <button className="form-submit" >SUBMIT</button>
            </div>
            </div>
            </form>
        </div>
    )
}
export default PersonalInfo;
