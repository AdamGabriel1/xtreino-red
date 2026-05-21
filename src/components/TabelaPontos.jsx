import { useTorneio } from '../context/TorneioContext.jsx';
import { usePontuacao } from '../hooks/usePontuacao.js';

export default function TabelaPontos() {
  const { dados, mesSelecionado, setMesSelecionado, diaSelecionado, setDiaSelecionado, meses, dias, loading, error } = useTorneio();
  const { listaFinal } = usePontuacao(dados, mesSelecionado, diaSelecionado);

  const maxPT = listaFinal.length > 0 ? Math.max(...listaFinal.map(t => t.pt)) : 1;

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="icon">⚠️</div>
        <h3>Erro ao carregar dados</h3>
        <p>Certifique-se de que o arquivo <strong>campeonato.csv</strong> está na pasta public/data/.</p>
      </div>
    );
  }

  return (
    <>
      <div className="section-title">
        <span>📊</span> Classificação
        <span className="line"></span>
      </div>

      <div className="filtro-box">
        <div>
          <label htmlFor="select-mes">📅 Mês:</label>
          <select
            id="select-mes"
            value={mesSelecionado}
            onChange={(e) => setMesSelecionado(e.target.value)}
          >
            {meses.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="select-dia">📆 Dia:</label>
          <select
            id="select-dia"
            value={diaSelecionado}
            onChange={(e) => setDiaSelecionado(e.target.value)}
          >
            {dias.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <small className="info-text">* Dados puxados automaticamente do banco dados.csv</small>
      </div>

      <h2 style={{ marginBottom: '15px', fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem' }}>
        Classificação - {diaSelecionado} de {mesSelecionado}
      </h2>

      {listaFinal.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📭</div>
          <p>Nenhum dado encontrado para {diaSelecionado} de {mesSelecionado}</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="tooltip" data-tooltip="Posição no ranking">Pos</th>
                <th>Time</th>
                <th className="tooltip" data-tooltip="Pontos de Posição Queda 1">Q1 PP</th>
                <th className="tooltip" data-tooltip="Pontos de Posição Queda 2">Q2 PP</th>
                <th className="tooltip" data-tooltip="Pontos de Posição Queda 3">Q3 PP</th>
                <th className="tooltip" data-tooltip="Total de Pontos de Posição">Total PP</th>
                <th className="tooltip" data-tooltip="Total de Kills">Total PK</th>
                <th className="tooltip" data-tooltip="Pontuação Final (PP + Kills)">PT</th>
              </tr>
            </thead>
            <tbody>
              {listaFinal.map((time, index) => {
                const posClass = index === 0 ? 'pos-1' : index === 1 ? 'pos-2' : index === 2 ? 'pos-3' : 'pos-other';
                const progressPercent = (time.pt / maxPT) * 100;
                return (
                  <tr key={time.nome}>
                    <td><span className={`pos-badge ${posClass}`}>{index + 1}</span></td>
                    <td><strong>{time.nome}</strong></td>
                    <td>{time.q1_pp}</td>
                    <td>{time.q2_pp}</td>
                    <td>{time.q3_pp}</td>
                    <td><strong>{time.total_pp}</strong></td>
                    <td className="destaque-kill">{time.total_pk}</td>
                    <td>
                      <span className="destaque-total">{time.pt} pts</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
