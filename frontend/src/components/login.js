import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const LOGIN_URL = "/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(LOGIN_URL, {
        username,
        password,
      });
      if (data?.status === true) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success("Login Successful");
        navigate("/join-room");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };
  return (
    <div className="container form">
      <h1>Log in</h1>
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
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          onSubmit={handleSubmit}
          type="submit"
          className="btn btn-primary mt-3"
          name="submit"
        />
      </form>

      <p style={{ marginTop: "20px" }}>
        Not a member? <a href="/signup">Register</a>
      </p>
    </div>
  );
};

export default Login;
