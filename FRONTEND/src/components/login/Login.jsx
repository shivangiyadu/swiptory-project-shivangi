
import React, { useState } from 'react'
import "./login.module.css"
import eyeImage from "../../assets/categories/eyeVector .png"
import cross from "../../assets/categories/cross.jpg"

import axios from "axios";

export const Login = ({closeSignInModal}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const AuthLogin = async (username, password) => {
    try {
      const logLink = "http://localhost:4000/api/v1/login";
      const Response = await axios.post(logLink, { username, password });

      localStorage.setItem("token", Response.data.token);
      // Redirect or do something after successful login
    
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const lowerUsername=username.toLowerCase();
    await AuthLogin(lowerUsername, password);
    closeSignInModal();
  };

  return (
    <div className="login-form">

      <form onSubmit={handleLogin}>
      <img src={cross} alt="" className='close-icon' onClick={closeSignInModal}/>
        <span className='login-heading'>Login to Swiptory</span>
        <div className='login-info'>
         <div className='username-input'>
          <label htmlFor='username'> <span className='username-heading'>Username</span>
            <input type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter username'
              required
            />
          </label>
          </div>
          <br />

          <div className='password-input'>
            <label htmlFor='password'> <span className='password-heading'>Password </span> <input type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              required

            />

             <img src={eyeImage} alt='' className='eye-icon' />
            </label>
          </div>

          <br />

          <button type="submit" className='register-btn' onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
  )
}

