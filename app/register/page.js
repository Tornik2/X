"use client"

import {useState} from "react"; // Import useState
import "./register.css"; // Import styles
import { FcGoogle } from "react-icons/fc"; // Google icon
import { Facebook, Apple } from "lucide-react"; // Facebook & Apple icons from Lucide
import { useRouter } from "next/navigation"; // Import Next.js router

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RegisterPage() {
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "password": "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registration failed");
        throw new Error(data.message || "Registration failed");
      }

      // IF RESPONSE OK ...............
      
      router.push("/");
    } catch (err) {
      setError(err.message);
      setFormData({
        "first_name": formData.first_name,
        "last_name": formData.last_name,
        "email": "",
        "password": "",
      })
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-container">
      <h2 className="register-title">Sign Up</h2>
      <p className="register-subtitle">
        Join our community today! Create an account to unlock exclusive features and personalized experiences.
      </p>

      <div className="input-row">
        {error ? <p className="error-message">{error}</p> : null}
        <div className="input-group">
          <input
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
        </div>
        <div className="input-group">
        <input
              type="text"
              name="last_name"
              placeholder="Enter Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
        <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
        </div>
        <div className="input-group">
        <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
        </div>
      </div>

      <button  className="primary-button">Sign Up</button>

      <p className="or-text">Or Continue with</p>

      <div className="social-buttons">
        <button className="social-icon"><FcGoogle size={24} /></button>
        <button className="social-icon"><Facebook size={24} color="#1877F2" /></button>
        <button className="social-icon"><Apple size={24} /></button>
      </div>
    </form>
  );
}
