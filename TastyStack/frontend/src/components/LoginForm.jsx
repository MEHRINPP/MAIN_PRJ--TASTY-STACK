import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/login/',
      JSON.stringify({
        username: formData.username.trim(),
        password: formData.password.trim(),
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const token = response.data.token;
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', 'true');
    setResponse('✅ Login successful!');
    setTimeout(() => navigate('/'), 1000);
  } catch (err) {
    console.error('Login error:', err);
    setResponse('❌ Invalid username or password.');
  }
};



  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
        {response && <p className="response-message">{response}</p>}
      </div>
    </div>
  );
}

export default LoginForm;

