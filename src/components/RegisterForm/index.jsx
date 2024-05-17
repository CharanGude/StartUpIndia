import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './index.css';
import logo from '../../assets/logo.png';

function App() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://6872b76b-9d7f-49a9-a5c8-29e48320b1de-00-3rsc4zwtpt7fx.riker.replit.dev:3001/register', { name, email, password });
            console.log('Registration response:', response.data.message);
            setSuccess('Registration successful');
            setError('');
        } catch (error) {
            console.error('Registration error:', error.response.data.message);
            setError(error.response.data.message);
        }
    };

    const goToLogin = () => {
        navigate('/login');
    }

  return (
    <div className="main">
    <img className="logo" src={logo} alt="logo" />
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Full Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <p className="error">{error}</p>
        <p className="success">{success}</p>
        <p>Already Registered?</p>
        <button onClick={goToLogin}>Login</button>
      </form>
    </div>
    </div>
  );
}

export default App;



