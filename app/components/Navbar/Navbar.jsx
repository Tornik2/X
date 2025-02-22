"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import "./Navbar.css";
import Image from "next/image";
import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar max-width">
      
      <div className="logo">
        <Link href="/" className="logo-link">
        <Image src="/logo-main.png" width={20} height={20}alt="YourBank" />
        YourBanK</Link>
      </div>
      
      {/* BurgerMenu */}
      <div className="mobile-menu">
        <div className="toggle">
      <ThemeToggleBtn />
      </div>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="menu-icon">
          {menuOpen ? (
            <X size={30} color="black" strokeWidth={2.5} />
          ) : (
            <Menu size={30} color="black" strokeWidth={2.5} />
          )}
        </div>
      </button>
      </div>

      {/* Nav For Mobile*/}
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>

        <ul>
          <li className="active"><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/login" onClick={() => setMenuOpen(false)}>Careers</Link></li>
          <li><Link href="/register" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link href="/merchants" onClick={() => setMenuOpen(false)}>Merchants</Link></li>
        </ul>

        
        <div className="mobile-auth">
          <Link href="/register" className="signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          <Link href="/login" className="login-button" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      </div>

      {/* Nav for Desktop */}
      <ul className="nav-links">
        <li className="active"><Link href="/">Home</Link></li>
        <li><Link href="/login">Careers</Link></li>
        <li><Link href="/login">About</Link></li>
        <li><Link href="/merchants">Merchants</Link></li>
        <ThemeToggleBtn />
      </ul>

      <div className="auth-links">
        <Link href="/register" className="signup">Sign Up</Link>
        <Link href="/login" className="login-button">Login</Link>
      </div>
    </nav>
  );
}
