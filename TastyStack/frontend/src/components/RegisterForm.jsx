import React,{useState,useEffect} from "react";
import axios from 'axios';
import {useFetcher, useNavigate} from 'react-router-dom';
import './RegisterForm.css';
import { Link } from "react-router-dom";

function RegisterForm(){
    const [formData,setFormData] = useState({username: '', email: '', password: ''});
    const [response,setResponse] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn){
        navigate('/',{replace:true});
      }
    })

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Submitting form:', formData); // DEBUG
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/register/', formData);
    console.log('Server response:', res.data); // DEBUG
    setResponse(`✅ Registration Successful!`);
    setTimeout(() =>{
        navigate('/login');
    }, 1500);
  } catch (err) {
    console.error('Error:', err.response || err.message); // DEBUG
    setResponse(err.response?.data?.error || '❌ Registration failed.');
  }
};


    return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} required />

          <button type="submit">Register</button>
        </form>

        {response && <p className="response-message">{response}</p>}

        <p className="login-link">
              Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;