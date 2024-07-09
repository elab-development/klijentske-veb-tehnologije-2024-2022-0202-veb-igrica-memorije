
import React from 'react';
import { LeaderboardEntryProps } from '../models/leaderboardEntryProps';


const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ username, winCount }) => {
  return (
    <div className="leaderboard-entry">
      <span>{username}</span>
      <span>{winCount}</span>
    </div>
  );
};

export default LeaderboardEntry;
