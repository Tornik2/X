"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./leaderboard.css";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]); // Top 3 users
  const [otherUsers, setOtherUsers] = useState([]); // Remaining users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(true)
  console.log(topUsers)
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
          console.error("User not authenticated.");
          setLoggedIn(false)
          return;
        }
        setLoggedIn(true)
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
        const sortedUsers = data.sort((a, b) => parseFloat(b.total_earned_esg_coins) - parseFloat(a.total_earned_esg_coins));
        console.log(sortedUsers.slice(0, 3)[0])
        //Top 3 Users
        const topThree = sortedUsers.slice(0, 3).map((user, index) => ({
          initials: `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`,
          rank: index + 1,
          points: `${user.total_earned_esg_coins} ESGC`,
          crown: index === 0, // Crown for first place
        }));
        setTopUsers(topThree)
        //Rest of the Leaderboard
        const remainingUsers = sortedUsers.slice(3,8).map((user) => ({
          initials: `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`,
          name: `${user.first_name} ${user.last_name}`,
          points: `${user.total_earned_esg_coins} ESGC`,
        }));
        console.log(remainingUsers)
        setOtherUsers(remainingUsers);
      } catch (err) {
        console.error("Leaderboard fetch error:", err);
        setError("Failed to load leaderboard.");
        } finally {
          setLoading(false);
        }
    };
  
    fetchLeaderboard();
  }, []);
  
console.log(topUsers)
  return (
    <div className="max-width leaderboard-flex">
      <div className="right-side-leaderboard">
      <Image src="/leaderboard.png" alt="leaderboard" width={400} height={250} className="leaderboard-hero" />
      <div className="transactions-list">
          <h3 className="transactions-title">Monthly Rewards</h3>

          

          
              <div  className="transaction-item">
                <span className="transaction-date">1</span>
                <span className="transaction-amount">100</span>
                <span className="transaction-esg">ESGC</span>
              </div>
              <div  className="transaction-item">
                <span className="transaction-date">2</span>
                <span className="transaction-amount">80</span>
                <span className="transaction-esg">ESGC</span>
              </div>
              <div  className="transaction-item">
                <span className="transaction-date">3</span>
                <span className="transaction-amount">50</span>
                <span className="transaction-esg">ESGC</span>
              </div>
            
         
        </div>
        </div>
      <div className="leaderboard-container">
        {loading && <p className="loading-message">Loading leaderboard...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Keep your existing HTML structure unchanged */}
        <div className="topSection">
          {topUsers?.map((user, index) => (
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
          {otherUsers?.map((user, index) => (
            <div key={index} className="leaderboardItem">
              <div className="userBadge">{user.initials}</div>
              <span className="name">{user.name}</span>
              <span className="points">{user.points}</span>
            </div>
          ))}
        </div>
        <div style={{height: "20px"}}></div>
        {!loggedIn && <Link className="not-logged-in" href={"/login"}>Log In First</Link> }

      </div>
    </div>
  );
};

export default Leaderboard;
