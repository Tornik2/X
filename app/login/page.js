import { Facebook, Apple } from "lucide-react"; // Lucide icons
import { FcGoogle } from "react-icons/fc"; // Google icon
import "./login.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <p className="login-subtitle">Welcome back! Please log in to access your account.</p>

      <div className="input-group">
        <input type="email" placeholder="Enter your Email" />
      </div>
      <div className="input-group">
        <input type="password" placeholder="Enter your Password" />
      </div>

      <a href="#" className="forgot-password">Forgot Password?</a>

      <button className="primary-button">Login</button>
      <button className="secondary-button">Sign Up</button>

      <p className="or-text">Or Continue with</p>

      <div className="social-buttons">
        <button className="social-icon"><FcGoogle size={24} /></button>
        <button className="social-icon"><Facebook size={24} color="#1877F2" /></button>
        <button className="social-icon"><Apple size={24} /></button>
      </div>
    </div>
  );
}
