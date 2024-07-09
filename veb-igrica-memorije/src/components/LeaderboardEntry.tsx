
import React from 'react';
import { LeaderboardEntryProps } from '../models/leaderboardEntryProps';


const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ rank,username, winCount }) => {
  return (
    <div className="leaderboard-entry">
        <span>{rank}</span>
      <span>{username}</span>
      <span>{winCount}</span>
      
    </div>
  );
};

export default LeaderboardEntry;
