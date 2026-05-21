import { useState } from 'react';
import { useTorneio } from '../context/TorneioContext.jsx';
import { usePontuacao } from '../hooks/usePontuacao.js';
import { getTeamConfig, gerarAvatarTime } from '../data/teamConfig.js';

export default function TimesGrid() {
  const { dados, mesSelecionado, diaSelecionado } = useTorneio();
  const { listaFinal } = usePontuacao(dados, mesSelecionado, diaSelecionado);
  const [searchTerm, setSearchTerm] = useState('');

  const timesFiltrados = listaFinal.filter(time => {
    const matchTime = time.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPlayer = time.jogadores.some(j => j.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchTime || matchPlayer;
  });

  return (
    <>
      <div className="section-title">
        <span>👥</span> Análise de Elencos
        <span className="line"></span>
      </div>

      <div className="search-wrapper search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar time ou jogador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid-times">
        {timesFiltrados.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <p>Nenhum time ou jogador encontrado</p>
          </div>
        ) : (
          timesFiltrados.map((time, index) => {
            const posicao = index + 1;
            const posBadge = posicao <= 3 ? ['🥇', '🥈', '🥉'][posicao - 1] : `#${posicao}`;
            const config = getTeamConfig(time.nome);
            const avatar = gerarAvatarTime(time.nome, config.cor);

            // Ordenar jogadores por kills (destacar top kill)
            const jogadoresOrdenados = [...time.jogadores].sort((a, b) => b.total_kills - a.total_kills);
            const mvpDoTime = jogadoresOrdenados[0];

            return (
              <div className="card" key={time.nome} data-team-name={time.nome.toLowerCase()}>
                <div className="team-card-header">
                  <div 
                    className="team-logo"
                    style={{
                      background: `linear-gradient(135deg, ${config.cor}, ${config.cor}dd)`,
                    }}
                  >
                    {avatar.iniciais}
                  </div>
                  <div className="team-info">
                    <h4>{time.nome} <span style={{ fontSize: '0.9rem' }}>{posBadge}</span></h4>
                    <div className="team-meta">
                      {time.jogadores.length} jogadores | {time.total_pk} kills | {time.pt} pts
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: '12px', display: 'flex', gap: '15px', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--gold)' }}><strong>PP:</strong> {time.total_pp}</span>
                  <span style={{ color: 'var(--info)' }}><strong>PK:</strong> {time.total_pk}</span>
                  <span style={{ color: 'var(--cor-accent)' }}><strong>MVP:</strong> {time.mvps_time}</span>
                </div>
                <div>
                  {jogadoresOrdenados.map((j, idx) => (
                    <div 
                      className="player-row" 
                      key={j.nome}
                      style={idx === 0 ? { background: 'rgba(255,215,0,0.08)', borderLeft: '3px solid var(--gold)' } : undefined}
                    >
                      <div className="player-name">
                        <div className="player-avatar">
                          {idx === 0 ? '⭐' : '👤'}
                        </div>
                        {j.nome}
                        {idx === 0 && <span style={{ fontSize: '0.7rem', marginLeft: '6px', color: 'var(--gold)' }}>TOP KILL</span>}
                      </div>
                      <div className="player-stats">
                        <span>⚔️ {j.total_kills} Kills</span>
                        <span>💥 {j.dano} Dano</span>
                        <span>🏅 {j.mvp} MVP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}