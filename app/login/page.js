"use client"

import { useState } from "react";
import { Facebook, Apple } from "lucide-react"; // Lucide icons
import { FcGoogle } from "react-icons/fc"; // Google icon
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      alert("Login successful!");
      // IF RESPONSE OK ...............
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-container">
      <h2 className="login-title">Login</h2>
      <p className="login-subtitle">Welcome back! Please log in to access your account.</p>
<div className="input-row">
      <div className="input-group">
      <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
      </div>
      <div className="input-group">
      <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
      </div>
      </div>

      <a href="#" className="forgot-password">Forgot Password?</a>

      <button className="primary-button" disabled={loading}>Login</button>

      <p className="or-text">Or Continue with</p>

      <div className="social-buttons">
        <button className="social-icon"><FcGoogle size={24} /></button>
        <button className="social-icon"><Facebook size={24} color="#1877F2" /></button>
        <button className="social-icon"><Apple size={24} /></button>
      </div>
    </form>
  );
}
