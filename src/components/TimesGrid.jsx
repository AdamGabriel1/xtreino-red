import React, { useState } from 'react';
import { useTorneio } from '../context/TorneioContext';
import { usePontuacao } from '../hooks/usePontuacao';

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
            return (
              <div className="card" key={time.nome} data-team-name={time.nome.toLowerCase()}>
                <div className="team-card-header">
                  <div className="team-logo">{time.nome.substring(0, 2).toUpperCase()}</div>
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
                  {time.jogadores.map(j => (
                    <div className="player-row" key={j.nome}>
                      <div className="player-name">
                        <div className="player-avatar">👤</div>
                        {j.nome}
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
