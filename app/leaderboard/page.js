"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./leaderboard.css";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]); // Top 3 users
  const [otherUsers, setOtherUsers] = useState([]); // Remaining users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(topUsers)
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
          console.error("User not authenticated.");
          return;
        }
  
        const response = await fetch(`${API_URL}/leaderboard`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
  
        const data = await response.json();
        console.log("Leaderboard Data:", data);
      } catch (err) {
        console.error("Leaderboard fetch error:", err);
      }
    };
  
    fetchLeaderboard();
  }, []);
  

  return (
    <div className="max-width leaderboard-flex">
      <Image src="/leaderboard.png" alt="leaderboard" width={400} height={250} className="leaderboard-hero" />
      
      <div className="leaderboard-container">
        {loading && <p className="loading-message">Loading leaderboard...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Keep your existing HTML structure unchanged */}
        <div className="topSection">
          {topUsers.map((user, index) => (
            <div key={index} className={`${user.crown ? "topUser userCircle" : "userCircle"}`}>
              {user.crown && <span className="crown">👑</span>}
              <div className="initials">{user.initials}</div>
              <span className="rank">{user.rank}</span>
              <span className="points">{user.points}</span>
            </div>
          ))}
        </div>

        <div className="leaderboardSection">
          <h3>Leaderboard</h3>
          {otherUsers.map((user, index) => (
            <div key={index} className="leaderboardItem">
              <div className="userBadge">{user.initials}</div>
              <span className="name">{user.name}</span>
              <span className="points">{user.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
