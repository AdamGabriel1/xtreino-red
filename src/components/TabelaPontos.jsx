import { useState } from 'react';
import { useTorneio } from '../context/TorneioContext.jsx';
import { usePontuacao } from '../hooks/usePontuacao.js';
import { getTeamConfig, gerarAvatarTime } from '../data/teamConfig.js';

export default function TabelaPontos() {
  const { dados, mesSelecionado, setMesSelecionado, diaSelecionado, setDiaSelecionado, meses, dias, loading, error } = useTorneio();
  const { listaFinal } = usePontuacao(dados, mesSelecionado, diaSelecionado);
  const [timeExpandido, setTimeExpandido] = useState(null);

  const maxPT = listaFinal.length > 0 ? Math.max(...listaFinal.map(t => t.pt)) : 1;

  const toggleExpand = (nomeTime) => {
    setTimeExpandido(timeExpandido === nomeTime ? null : nomeTime);
  };

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
        <span>📊</span> Classificacao de Times
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
        <small className="info-text">* Dados do campeonato.csv</small>
      </div>

      <h2 style={{ marginBottom: '15px', fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem' }}>
        Classificacao - {diaSelecionado} de {mesSelecionado}
      </h2>

      {listaFinal.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📭</div>
          <p>Nenhum dado encontrado para {diaSelecionado} de {mesSelecionado}</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="tabela-pontos">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>Pos</th>
                <th>Time</th>
                <th className="tooltip" data-tooltip="Posicao Queda 1">Q1 Pos</th>
                <th className="tooltip" data-tooltip="Kills time Queda 1 (soma)">Q1 Kills</th>
                <th className="tooltip" data-tooltip="Posicao Queda 2">Q2 Pos</th>
                <th className="tooltip" data-tooltip="Kills time Queda 2 (soma)">Q2 Kills</th>
                <th className="tooltip" data-tooltip="Posicao Queda 3">Q3 Pos</th>
                <th className="tooltip" data-tooltip="Kills time Queda 3 (soma)">Q3 Kills</th>
                <th className="tooltip" data-tooltip="Total Pontos Posicao">Total PP</th>
                <th className="tooltip" data-tooltip="Total Kills Time">Total PK</th>
                <th className="tooltip" data-tooltip="Booyahs">🏆</th>
                <th className="tooltip" data-tooltip="Jogadores">👥</th>
                <th className="tooltip" data-tooltip="Pontuacao Final">PT</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {listaFinal.map((time, index) => {
                const posClass = index === 0 ? 'pos-1' : index === 1 ? 'pos-2' : index === 2 ? 'pos-3' : 'pos-other';
                const progressPercent = (time.pt / maxPT) * 100;
                const config = getTeamConfig(time.nome);
                const avatar = gerarAvatarTime(time.nome, config.cor);
                const expandido = timeExpandido === time.nome;

                const jogadoresOrdenados = [...time.jogadores].sort((a, b) => b.total_kills - a.total_kills);
                const mvpDoTime = jogadoresOrdenados[0];

                return (
                  <>
                    <tr 
                      key={time.nome}
                      className={`time-row ${expandido ? 'expandido' : ''}`}
                      onClick={() => toggleExpand(time.nome)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td><span className={`pos-badge ${posClass}`}>{index + 1}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div 
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              fontSize: '0.8rem',
                              color: '#fff',
                              background: `linear-gradient(135deg, ${config.cor}, ${config.cor}dd)`,
                              flexShrink: 0,
                            }}
                          >
                            {avatar.iniciais}
                          </div>
                          <div>
                            <strong style={{ fontSize: '0.95rem' }}>{time.nome}</strong>
                            <div style={{ fontSize: '0.7rem', color: 'var(--gray)' }}>
                              Pos Media: {time.posicao_media} | MVP: {mvpDoTime?.nome?.split(' ')[0] || '-'}
                            </div>
                            {config.xtreino && (
                              <a 
                                href={config.xtreino} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{ 
                                  fontSize: '0.7rem', 
                                  color: 'var(--info)',
                                  textDecoration: 'none'
                                }}
                              >
                                🔗 Xtreino
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td><strong>{time.q1_pos}º</strong></td>
                      <td><span style={{ color: 'var(--info)', fontWeight: '600' }}>{time.q1_kills_time}</span></td>
                      <td><strong>{time.q2_pos}º</strong></td>
                      <td><span style={{ color: 'var(--info)', fontWeight: '600' }}>{time.q2_kills_time}</span></td>
                      <td><strong>{time.q3_pos}º</strong></td>
                      <td><span style={{ color: 'var(--info)', fontWeight: '600' }}>{time.q3_kills_time}</span></td>
                      <td><strong style={{ color: 'var(--gold)' }}>{time.total_pp}</strong></td>
                      <td className="destaque-kill"><strong>{time.total_pk}</strong></td>
                      <td>
                        {time.strikes > 0 ? (
                          <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{time.strikes}x 🏆</span>
                        ) : (
                          <span style={{ color: 'var(--gray)' }}>-</span>
                        )}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{time.jogadores.length}</span>
                      </td>
                      <td>
                        <span className="destaque-total" style={{ fontSize: '1rem' }}>{time.pt} pts</span>
                        <div className="progress-bar" style={{ marginTop: '4px', height: '4px' }}>
                          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ 
                          display: 'inline-block',
                          transition: 'transform 0.2s',
                          transform: expandido ? 'rotate(180deg)' : 'rotate(0deg)',
                          fontSize: '1.2rem'
                        }}>
                          ▼
                        </span>
                      </td>
                    </tr>

                    {expandido && (
                      <tr className="detalhes-row">
                        <td colSpan={14} style={{ padding: 0, border: 'none' }}>
                          <div style={{
                            background: 'rgba(0,0,0,0.2)',
                            padding: '15px 20px',
                            borderLeft: `3px solid ${config.cor}`,
                          }}>
                            <div style={{ marginBottom: '12px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>
                                <strong>🏆 Top Killer:</strong> {mvpDoTime?.nome} ({mvpDoTime?.total_kills} kills)
                              </span>
                              <span style={{ fontSize: '0.85rem', color: 'var(--info)' }}>
                                <strong>📊 Posicao Media:</strong> {time.posicao_media}
                              </span>
                            </div>

                            <table style={{ width: '100%', fontSize: '0.85rem' }}>
                              <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                  <th style={{ textAlign: 'left', padding: '8px' }}>Jogador</th>
                                  <th style={{ textAlign: 'center', padding: '8px' }}>Q1 Kills</th>
                                  <th style={{ textAlign: 'center', padding: '8px' }}>Q2 Kills</th>
                                  <th style={{ textAlign: 'center', padding: '8px' }}>Q3 Kills</th>
                                  <th style={{ textAlign: 'center', padding: '8px', color: 'var(--gold)' }}>Total Kills</th>
                                  <th style={{ textAlign: 'center', padding: '8px' }}>Dano</th>
                                  <th style={{ textAlign: 'center', padding: '8px', color: 'var(--info)' }}>MVP</th>
                                </tr>
                              </thead>
                              <tbody>
                                {jogadoresOrdenados.map((j, idx) => (
                                  <tr 
                                    key={j.nome} 
                                    style={{ 
                                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                                      background: idx === 0 ? 'rgba(255,215,0,0.05)' : 'transparent'
                                    }}
                                  >
                                    <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span style={{ fontSize: '1rem' }}>
                                        {idx === 0 ? '⭐' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '👤'}
                                      </span>
                                      <span style={{ fontWeight: idx === 0 ? 'bold' : 'normal' }}>
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
                                      </span>
                                    </td>
                                    <td style={{ textAlign: 'center', padding: '8px' }}>{j.q1_kills || 0}</td>
                                    <td style={{ textAlign: 'center', padding: '8px' }}>{j.q2_kills || 0}</td>
                                    <td style={{ textAlign: 'center', padding: '8px' }}>{j.q3_kills || 0}</td>
                                    <td style={{ textAlign: 'center', padding: '8px', fontWeight: 'bold', color: 'var(--gold)' }}>{j.total_kills}</td>
                                    <td style={{ textAlign: 'center', padding: '8px' }}>{j.dano || '-'}</td>
                                    <td style={{ textAlign: 'center', padding: '8px', color: 'var(--info)', fontWeight: 'bold' }}>
                                      {j.mvp > 0 ? '✅' : '-'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}