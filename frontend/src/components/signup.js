import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SIGNUP_URL = "/signup";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const data = {
    username,
    password,
    firstName,
    lastName,
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(SIGNUP_URL, data);
      if (response?.data?.status === true) {
        toast.success("Signup Successful");
        navigate("/login");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="container form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group input">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group input">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter first name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <input
          onSubmit={handleSubmit}
          type="submit"
          className="btn btn-primary mb-3"
          name="submit"
        />
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
