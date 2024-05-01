import React, { useState } from "react";
import "./register.module.css";
import eyeImage from "../../assets/categories/eyeVector .png";
import cross from "../../assets/categories/cross.jpg";
import axios from "axios";

const Register = ({ closeRegisterModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(true); // Initialize modal state to open

  const handleCloseModal = () => {
    setIsRegisterModalOpen(false);
  };

  const AuthRegister = async (username, password) => {
    try {
      const logLink = "https://swipstory-iwwo.onrender.com/api/v1/signup";
      const Response = await axios.post(logLink, { username, password });
      localStorage.setItem("token", Response.data.jwtToken);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const lowerUsername = username.toLowerCase();
    await AuthRegister(lowerUsername, password);
    closeRegisterModal();
  };
  return (
    <div className="register-form">
      <form onSubmit={handleRegister}>
        <img
          onClick={closeRegisterModal}
          src={cross}
          alt=""
          className="close-register"
        />
        <span className="register-heading">Register to Swiptory</span>
        <div className="register-info">
          <div className="username-input">
            <label htmlFor="username">
              {" "}
              <span className="username-heading">Username</span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </label>
          </div>
          <br />

          <div className="password-input">
            <label htmlFor="password">
              {" "}
              <span className="password-heading">Password </span>{" "}
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <img src={eyeImage} alt="" className="eye-icon" />
            </label>
          </div>

          <br />

          <button
            type="submit"
            className="register-btn"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
