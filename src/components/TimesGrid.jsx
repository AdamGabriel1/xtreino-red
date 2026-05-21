import { useState } from 'react';
import { useTorneio } from '../context/TorneioContext.jsx';
import { usePontuacao } from '../hooks/usePontuacao.js';
import { getTeamConfig, gerarAvatarTime } from '../data/teamConfig.js';

export default function TimesGrid() {
  const { dados, mesSelecionado, diaSelecionado } = useTorneio();
  const { listaFinal } = usePontuacao(dados, mesSelecionado, diaSelecionado);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeExpandido, setTimeExpandido] = useState(null);

  const timesFiltrados = listaFinal.filter(time => {
    const matchTime = time.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPlayer = time.jogadores.some(j => j.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchTime || matchPlayer;
  });

  const toggleExpand = (nomeTime) => {
    setTimeExpandido(timeExpandido === nomeTime ? null : nomeTime);
  };

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
            const expandido = timeExpandido === time.nome;

            // Ordenar jogadores por kills (destacar top kill)
            const jogadoresOrdenados = [...time.jogadores].sort((a, b) => b.total_kills - a.total_kills);
            const mvpDoTime = jogadoresOrdenados[0];

            return (
              <div className="card" key={time.nome} data-team-name={time.nome.toLowerCase()}>
                <div className="team-card-header" onClick={() => toggleExpand(time.nome)} style={{ cursor: 'pointer' }}>
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
                  <span style={{ 
                    marginLeft: 'auto',
                    transition: 'transform 0.2s',
                    transform: expandido ? 'rotate(180deg)' : 'rotate(0deg)',
                    fontSize: '1.2rem'
                  }}>
                    ▼
                  </span>
                </div>
                
                <div style={{ marginBottom: '12px', display: 'flex', gap: '15px', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--gold)' }}><strong>PP:</strong> {time.total_pp}</span>
                  <span style={{ color: 'var(--info)' }}><strong>PK:</strong> {time.total_pk}</span>
                  <span style={{ color: 'var(--cor-accent)' }}><strong>MVP:</strong> {mvpDoTime?.nome?.split(' ')[0] || '-'}</span>
                  <span style={{ color: 'var(--success)' }}><strong>🏆:</strong> {time.strikes || 0}x</span>
                  <span style={{ color: 'var(--gray)' }}><strong>Pos Média:</strong> {time.posicao_media}</span>
                </div>

                {/* Quedas summary */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '8px', 
                  marginBottom: '12px',
                  fontSize: '0.75rem'
                }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ color: 'var(--gray)', marginBottom: '2px' }}>Q1</div>
                    <div><strong>{time.q1_pos}º</strong> | {time.q1_k || 0}k</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ color: 'var(--gray)', marginBottom: '2px' }}>Q2</div>
                    <div><strong>{time.q2_pos}º</strong> | {time.q2_k || 0}k</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ color: 'var(--gray)', marginBottom: '2px' }}>Q3</div>
                    <div><strong>{time.q3_pos}º</strong> | {time.q3_k || 0}k</div>
                  </div>
                </div>

                {/* Xtreino link */}
                {config.xtreino && (
                  <div style={{ marginBottom: '12px' }}>
                    <a 
                      href={config.xtreino} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        fontSize: '0.8rem', 
                        color: 'var(--info)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'rgba(25, 130, 196, 0.1)',
                        padding: '4px 10px',
                        borderRadius: '6px'
                      }}
                    >
                      🔗 Xtreino
                    </a>
                  </div>
                )}

                <div>
                  {jogadoresOrdenados.map((j, idx) => (
                    <div 
                      className="player-row" 
                      key={j.nome}
                      style={idx === 0 ? { 
                        background: 'rgba(255,215,0,0.08)', 
                        borderLeft: '3px solid var(--gold)',
                        borderRadius: '0 6px 6px 0'
                      } : undefined}
                    >
                      <div className="player-name">
                        <div className="player-avatar">
                          {idx === 0 ? '⭐' : '👤'}
                        </div>
                        {j.nome}
                        {idx === 0 && (
                          <span style={{ 
                            fontSize: '0.65rem', 
                            marginLeft: '6px', 
                            color: 'var(--gold)', 
                            background: 'rgba(255,215,0,0.15)', 
                            padding: '2px 6px', 
                            borderRadius: '4px' 
                          }}>
                            TOP KILL
                          </span>
                        )}
                      </div>
                      <div className="player-stats" style={{ fontSize: '0.8rem' }}>
                        <span>⚔️ {j.total_kills} Kills</span>
                        <span>💥 {j.dano || 'N/A'}</span>
                        <span>🏅 {j.mvp > 0 ? '✅ MVP' : '-'}</span>
                      </div>
                      
                      {/* Expanded player queda details */}
                      {expandido && (
                        <div style={{ 
                          display: 'flex', 
                          gap: '12px', 
                          marginTop: '6px', 
                          paddingLeft: '32px',
                          fontSize: '0.7rem',
                          color: 'var(--gray)'
                        }}>
                          <span>Q1: {j.q1_k || 0}k</span>
                          <span>Q2: {j.q2_k || 0}k</span>
                          <span>Q3: {j.q3_k || 0}k</span>
                        </div>
                      )}
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