import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("token", data.token);
      login(data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-bg">
      {/* SVG/Gradient background */}
      <svg
        className="login-bg-svg"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bg-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a18cd1" />
            <stop offset="100%" stopColor="#430089" />
          </linearGradient>
        </defs>
        <rect width="1440" height="600" fill="url(#bg-gradient)" />
        <g opacity="0.7">
          <path
            d="M0 500 Q 360 400 720 500 T 1440 500 V600 H0Z"
            fill="#2d145e"
          />
          <path
            d="M0 550 Q 360 450 720 550 T 1440 550 V600 H0Z"
            fill="#4e1e8c"
          />
        </g>
      </svg>
      <div className="login-center">
        <form
          className="login-glass"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2 className="login-title">Login</h2>
          <div className="login-input-group">
            <span className="login-icon">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="login-input-group">
            <span className="login-icon">
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="login-row">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>
            <a href="#" className="login-forgot">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {error && <div className="login-error">{error}</div>}
          <div className="login-register">
            Don&apos;t have an account? <a href="#">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
