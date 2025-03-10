"use client"

import { useState } from "react";
import { Facebook, Apple } from "lucide-react"; // Lucide icons
import { FcGoogle } from "react-icons/fc"; // Google icon
import "./login.css";
import { useRouter } from "next/navigation"; // 
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.error || "Login failed");
        throw new Error(data.message || "Login failed");
      }
  
      // Store token in localStorage
      localStorage.setItem("token", data.access);
  
      // Refresh user session
      await refreshUser();
  
      // Redirect to homepage or dashboard
      router.push("/");
    } catch (err) {
      console.log(err, err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
console.log(error)
  return (
    <form onSubmit={handleLogin} className="login-container">
      <h2 className="login-title">Login</h2>
      <p className="login-subtitle">Welcome back! Please log in to access your account.</p>
<div className="input-row">
          {error ? <p className="error-message">{error}</p> : null}

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
