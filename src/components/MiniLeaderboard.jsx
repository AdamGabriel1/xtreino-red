export default function MiniLeaderboard({ top3 }) {
  if (top3.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">📊</div>
        <p>Selecione um dia na aba &quot;Tabela do Dia&quot; para ver o ranking</p>
      </div>
    );
  }

  const medalhas = ['🥇', '🥈', '🥉'];
  const cores = ['var(--gold)', 'var(--silver)', 'var(--bronze)'];

  return (
    <>
      {top3.map((time, i) => (
        <div className="leaderboard-item" key={time.nome}>
          <span className="leaderboard-rank" style={{ color: cores[i] }}>
            {medalhas[i]}
          </span>
          <span className="leaderboard-team">{time.nome}</span>
          <span className="leaderboard-points">{time.pt} pts</span>
        </div>
      ))}
    </>
  );
}
