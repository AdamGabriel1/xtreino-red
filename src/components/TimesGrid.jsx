import { useState } from 'react';
import { useTorneio } from '../context/TorneioContext.jsx';
import { usePontuacao } from '../hooks/usePontuacao.js';
import { getTeamConfig, gerarAvatarTime } from '../data/teamConfig.js';

export default function TimesGrid() {
  const { dados, mesSelecionado, diaSelecionado } = useTorneio();
  const { listaFinal } = usePontuacao(dados, mesSelecionado, diaSelecionado);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTime, setFiltroTime] = useState('todos');

  const timesFiltrados = listaFinal.filter(time => {
    const matchTime = time.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPlayer = time.jogadores.some(j => j.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchTime || matchPlayer;
  });

  // Lista plana de jogadores com info do time
  const todosJogadores = timesFiltrados.flatMap(time => 
    time.jogadores.map(j => ({
      ...j,
      timeNome: time.nome,
      timeCor: getTeamConfig(time.nome).cor,
      timePosicao: listaFinal.findIndex(t => t.nome === time.nome) + 1,
      timePT: time.pt
    }))
  ).sort((a, b) => b.total_kills - a.total_kills);

  const jogadoresFiltrados = filtroTime === 'todos' 
    ? todosJogadores 
    : todosJogadores.filter(j => j.timeNome === filtroTime);

  return (
    <>
      <div className="section-title">
        <span>👥</span> Analise de Elencos
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

      {/* ===== TABELA 1: TIMES ===== */}
      <h3 style={{ margin: '20px 0 12px', fontFamily: "'Orbitron', sans-serif", fontSize: '1rem', color: 'var(--gold)' }}>
        🏆 Ranking de Times
      </h3>

      <div className="table-responsive">
        <table className="tabela-times">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>Pos</th>
              <th>Time</th>
              <th>Q1 Pos</th>
              <th>Q1 Kills</th>
              <th>Q2 Pos</th>
              <th>Q2 Kills</th>
              <th>Q3 Pos</th>
              <th>Q3 Kills</th>
              <th>Total PP</th>
              <th>Total PK</th>
              <th>🏆</th>
              <th>Pos Media</th>
              <th>PT</th>
            </tr>
          </thead>
          <tbody>
            {timesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={13} className="td-empty">
                  <div className="empty-state">
                    <div className="icon">📭</div>
                    <p>Nenhum time encontrado</p>
                  </div>
                </td>
              </tr>
            ) : (
              timesFiltrados.map((time, index) => {
                const posClass = index === 0 ? 'pos-1' : index === 1 ? 'pos-2' : index === 2 ? 'pos-3' : 'pos-other';
                const config = getTeamConfig(time.nome);
                const avatar = gerarAvatarTime(time.nome, config.cor);
                const topKill = [...time.jogadores].sort((a, b) => b.total_kills - a.total_kills)[0];

                return (
                  <tr key={time.nome}>
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
                          <strong>{time.nome}</strong>
                          <div style={{ fontSize: '0.7rem', color: 'var(--gray)' }}>
                            {time.jogadores.length} jogadores | MVP: {topKill?.nome?.split(' ')[0] || '-'}
                          </div>
                          {config.xtreino && (
                            <a 
                              href={config.xtreino} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ fontSize: '0.7rem', color: 'var(--info)', textDecoration: 'none' }}
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
                    <td>{time.posicao_media}</td>
                    <td><span className="destaque-total">{time.pt} pts</span></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ===== TABELA 2: JOGADORES ===== */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '30px 0 12px', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1rem', color: 'var(--info)', margin: 0 }}>
          ⚔️ Ranking de Jogadores
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>Filtrar por time:</label>
          <select 
            value={filtroTime} 
            onChange={(e) => setFiltroTime(e.target.value)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <option value="todos">Todos os times</option>
            {listaFinal.map(time => (
              <option key={time.nome} value={time.nome}>{time.nome}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="tabela-jogadores-grid">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>Pos</th>
              <th>Jogador</th>
              <th>Time</th>
              <th>Q1 Kills</th>
              <th>Q2 Kills</th>
              <th>Q3 Kills</th>
              <th style={{ color: 'var(--gold)' }}>Total Kills</th>
              <th>Dano</th>
              <th>MVP</th>
            </tr>
          </thead>
          <tbody>
            {jogadoresFiltrados.length === 0 ? (
              <tr>
                <td colSpan={9} className="td-empty">
                  <div className="empty-state">
                    <div className="icon">📭</div>
                    <p>Nenhum jogador encontrado</p>
                  </div>
                </td>
              </tr>
            ) : (
              jogadoresFiltrados.map((j, index) => {
                const posClass = index === 0 ? 'pos-1' : index === 1 ? 'pos-2' : index === 2 ? 'pos-3' : 'pos-other';
                const config = getTeamConfig(j.timeNome);

                return (
                  <tr key={`${j.timeNome}-${j.nome}`}>
                    <td><span className={`pos-badge ${posClass}`}>{index + 1}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.2rem' }}>
                          {index === 0 ? '⭐' : index === 1 ? '🥈' : index === 2 ? '🥉' : '👤'}
                        </span>
                        <span style={{ fontWeight: index < 3 ? 'bold' : 'normal' }}>{j.nome}</span>
                        {index === 0 && (
                          <span style={{ 
                            fontSize: '0.65rem', 
                            color: 'var(--gold)', 
                            background: 'rgba(255,215,0,0.15)', 
                            padding: '2px 6px', 
                            borderRadius: '4px' 
                          }}>
                            TOP FRAGGER
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div 
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            background: config.cor,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: '0.85rem' }}>{j.timeNome}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--gray)' }}>({j.timePosicao}º)</span>
                      </div>
                    </td>
                    <td>{j.q1_kills || 0}</td>
                    <td>{j.q2_kills || 0}</td>
                    <td>{j.q3_kills || 0}</td>
                    <td><strong style={{ color: 'var(--gold)', fontSize: '1.05rem' }}>{j.total_kills}</strong></td>
                    <td style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>{j.dano || 'N/A'}</td>
                    <td>
                      {j.mvp > 0 ? (
                        <span style={{ color: 'var(--info)', fontWeight: 'bold' }}>✅ MVP</span>
                      ) : (
                        <span style={{ color: 'var(--gray)' }}>-</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Resumo estatistico */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '12px', 
        marginTop: '24px',
        padding: '16px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '12px',
        border: '1px solid var(--border)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--gold)' }}>{timesFiltrados.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Times</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--info)' }}>{jogadoresFiltrados.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Jogadores</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--cor-accent)' }}>
            {jogadoresFiltrados.reduce((sum, j) => sum + j.total_kills, 0)}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Kills Totais</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>
            {jogadoresFiltrados.length > 0 ? (jogadoresFiltrados.reduce((sum, j) => sum + j.total_kills, 0) / jogadoresFiltrados.length).toFixed(1) : 0}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Kills/Jogador</div>
        </div>
      </div>
    </>
  );
}