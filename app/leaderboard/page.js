import "./leaderboard.css"
import Image from "next/image";
const Leaderboard = () => {
  const topUsers = [
    { initials: "TU", rank: 2, points: "35.00 ESGC" },
    { initials: "TU", rank: 1, points: "50.00 ESGC", crown: true },
    { initials: "MK", rank: 3, points: "0.00 ESGC" },
  ];

  const otherUsers = [
    { initials: "TS", name: "Tornike Sharvashidze", points: "0.00 ESGC" },
    { initials: "NN", name: "New New", points: "0.00 ESGC" },
    { initials: "TC", name: "Temur Chitashvili", points: "0.00 ESGC" },
  ];

  return (
    <div className="max-width leaderboard-flex">
      <Image src="/leaderboard.png" alt="leaderboard" width={400} height={250} className="leaderboard-hero" />
    <div className="leaderboard-container">
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