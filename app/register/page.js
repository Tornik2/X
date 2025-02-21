import "./register.css"; // Import styles
import { FcGoogle } from "react-icons/fc"; // Google icon
import { Facebook, Apple } from "lucide-react"; // Facebook & Apple icons from Lucide

export default function RegisterPage() {
  return (
    <div className="register-container">
      <h2 className="register-title">Sign Up</h2>
      <p className="register-subtitle">
        Join our community today! Create an account to unlock exclusive features and personalized experiences.
      </p>

      <div className="input-row">
        <div className="input-group">
          <input type="text" placeholder="Enter First Name" />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Enter Last Name" />
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <input type="email" placeholder="Enter your Email" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Enter your Password" />
        </div>
      </div>

      <button className="primary-button">Sign Up</button>

      <p className="or-text">Or Continue with</p>

      <div className="social-buttons">
        <button className="social-icon"><FcGoogle size={24} /></button>
        <button className="social-icon"><Facebook size={24} color="#1877F2" /></button>
        <button className="social-icon"><Apple size={24} /></button>
      </div>
    </div>
  );
}
