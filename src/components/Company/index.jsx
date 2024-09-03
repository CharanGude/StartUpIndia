import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import './index.css';
import { Link } from 'react-router-dom';

function App() {
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    category: '',
    products_or_services: '',
    description: '',
    best_sellers:'',
    location: '',
    contact: '',
    platforms: '',
    logo: ''
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://startupindia.onrender.com/form',
        { formData });
        console.log('Registration response:', response.data.message);
        setSuccess('Registration successful');
        setFormData({
                     name: '',
                     tagline: '',
                     category: '',
                     products_or_services: '',
                     description: '',
                     best_sellers:'',
                     location: '',
                     contact: '',
                     platforms: '',
                     logo: ''
                   })
    } catch (error) {
      console.error("Login error:", error.response.data.message);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="container">
      <img className="logo" src={logo} alt="logo" />
      <Link to="/" className="link"><button>Home</button></Link>
      <h1>Submit Company Details:</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            required
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Tagline:</label>
          <input 
            required
            type="text" 
            name="tagline" 
            value={formData.tagline} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input 
            required
            type="text" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Products or Services:</label>
          <input 
            required
            type="text" 
            name="products_or_services" 
            value={formData.products_or_services} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            required
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Best Sellers:</label>
          <input 
            required
            type="text" 
            name="best_sellers" 
            value={formData.best_sellers} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Office Location:</label>
          <input 
            required
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input 
            required
            type="text" 
            name="contact" 
            value={formData.contact} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Platforms:</label>
          <input 
            required
            type="text" 
            name="platforms" 
            value={formData.platforms} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Logo URL:</label>
          <input 
            required
            type="text" 
            name="logo" 
            value={formData.logo} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>{success}</p>
    </div>
  );
}

export default App;