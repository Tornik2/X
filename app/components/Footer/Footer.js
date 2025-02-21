import "./Footer.css";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer ">
        <div className="max-width">
      <div className="footer-top">
        <div className="footer-left">
        <div className="logo">
        <Link href="/" className="logo-link">
        <Image src="/logo-main.png" width={20} height={20}alt="YourBank" />
        YourBanK</Link>
      </div>
          <div className="social-icons">
            <a href="#"><Facebook size={24} /></a>
            <a href="#"><Twitter size={24} /></a>
            <a href="#"><Linkedin size={24} /></a>
          </div>
        </div>


        <div className="footer-contact">
          <p>📧 hello@skillbridge.com</p>
          <p>📞 +91 98123 23 2309</p>
          <p>📍 Somewhere in the World</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 YourBank. All Rights Reserved</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
      </div>
    </footer>
  );
}
