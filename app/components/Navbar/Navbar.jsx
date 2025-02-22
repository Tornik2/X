"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import "./Navbar.css";
import Image from "next/image";
import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";
import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";



export default function Navbar() {
  const { user, refreshUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // current pathname


  const handleLogout = async () => {
    try {
      const res = await fetch("api/auth/logout", {
      });
      if (res.ok) {
        await refreshUser();
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  return (
    <nav className="navbar max-width">
      
      <div className="logo">
        <Link href="/" className="logo-link">
        <Image src="/logo-main.png" width={20} height={20}alt="YourBank" />
        YourBanK</Link>
      </div>
      
      {/* BurgerMenu */}
      <div className="mobile-menu">
        {user && <div><p className="esgc-count-mobile">ESGC: {user.available_esg_coins}</p> </div>}
        
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
          <li className={`${pathname === "/" ? "active" : ""}`}><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li className={`${pathname === "/leaderboard" ? "active" : ""}`}><Link href="/leaderboard" onClick={() => setMenuOpen(false)}>Leaderboard</Link></li>
          <li className={`${pathname === "/about" ? "active" : ""}`}><Link href="/register" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li className={`${pathname === "/merchants" ? "active" : ""}`}><Link href="/merchants" onClick={() => setMenuOpen(false)}>Merchants</Link></li>
        </ul>

        
        <div className="mobile-auth">
                {user ? (
          <button 
            className="login-button" 
            onClick={ () => {
               handleLogout();
              setMenuOpen(false);
            }}
          >
            Log Out
          </button>
        ) : (
          <>
            <Link 
              href="/register" 
              className="signup" 
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              className="login-button" 
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </>
        )}


          
        </div>
      </div>
      {/* Nav for Desktop */}
      <ul className="nav-links">
        <li className={`${pathname === "/" ? "active" : ""}`}><Link href="/">Home</Link></li>
        <li className={`${pathname === "/leaderboard" ? "active" : ""}`}><Link href="/leaderboard">Leaderboard</Link></li>
        <li className={`${pathname === "/about" ? "active" : ""}`}><Link href="/login">About</Link></li>
        <li className={`${pathname === "/merchants" ? "active" : ""}`}><Link href="/merchants">Merchants</Link></li>
        <ThemeToggleBtn />
      </ul>
        <div className="top-right">
        {user && <div><p className="esgc-count">ESGC: {user.available_esg_coins}</p> </div>}
        
      <div className="auth-links">
        {user ? (
          <button className="login-button" style={{marginLeft: "60px"}} onClick={ () =>  handleLogout()}>
            Log Out
          </button>
        ) : (
          <>
            <Link href="/register" className="signup">Sign Up</Link>
            <Link href="/login" className="login-button">Login</Link>
          </>
        )}
      </div>
      </div>
    </nav>
  );
}
