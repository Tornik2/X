import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";

import { ThemeProvider  } from "./context/ThemeContext";
import {  AuthProvider  } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YourBank",
  description: "YourBank is a modern bank for the digital age.",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <AuthProvider>
        <header className="light-header">
      <Navbar/>
      </header >
        {children}
        <Testimonials />
      <Footer />
      </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
