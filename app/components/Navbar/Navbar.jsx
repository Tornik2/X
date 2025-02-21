"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar max-width">
      <div className="logo">
        <Link href="/">YourBanK</Link>
      </div>

      {/* BurgerMenu */}
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="menu-icon">
          {menuOpen ? (
            <X size={30} color="black" strokeWidth={2.5} />
          ) : (
            <Menu size={30} color="black" strokeWidth={2.5} />
          )}
        </div>
      </button>

      {/* Nav For Mobile*/}
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>

        <ul>
          <li className="active"><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/careers" onClick={() => setMenuOpen(false)}>Careers</Link></li>
          <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link href="/security" onClick={() => setMenuOpen(false)}>Security</Link></li>
        </ul>

        
        <div className="mobile-auth">
          <Link href="/register" className="signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          <Link href="/login" className="login-button" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      </div>

      {/* Nav for Desktop */}
      <ul className="nav-links">
        <li className="active"><Link href="/">Home</Link></li>
        <li><Link href="/careers">Careers</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/security">Security</Link></li>
      </ul>

      <div className="auth-links">
        <Link href="/register" className="signup">Sign Up</Link>
        <Link href="/login" className="login-button">Login</Link>
      </div>
    </nav>
  );
}
