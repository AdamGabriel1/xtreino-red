import React from 'react';

export default function QuickStats({ totalTimes, totalJogadores, totalKills }) {
  const stats = [
    { number: totalTimes, label: 'Times' },
    { number: totalJogadores, label: 'Jogadores' },
    { number: 3, label: 'Quedas' },
    { number: totalKills, label: 'Kills Total' },
  ];

  return (
    <div className="quick-stats">
      {stats.map((stat, i) => (
        <div className="stat-box" key={i}>
          <span className="number">{stat.number}</span>
          <span className="label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
