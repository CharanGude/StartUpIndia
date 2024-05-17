import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";
import logo from '../../assets/logo.png';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const token = Cookie.get("jwt_token");
    if (token !== undefined) {
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://6872b76b-9d7f-49a9-a5c8-29e48320b1de-00-3rsc4zwtpt7fx.riker.replit.dev:3001/login",
        { email, password },
      );
      console.log("JWT token:", response.data.token);
      document.cookie = `jwt_token=${response.data.token}; path=/`;
      document.cookie = `username=${response.data.user.name}; path=/`;
      setLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error.response.data.message);
      setError(error.response.data.message);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  if (loggedIn) {
    navigate("/");
  }

  return (
    <div className="main">
      <img className="logo" src={logo} alt="logo" />
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onEmailChange}
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
              onChange={onPasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <p className="error">{error}</p>
          <p>Don't have an account:</p>
          <button type="button" onClick={goToRegister}>
            Register
          </button>{" "}
          {/* Changed button type to "button" */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
