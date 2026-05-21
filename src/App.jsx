import { useEffect } from 'react';
import { useTorneio } from './context/TorneioContext.jsx';
import { usePontuacao } from './hooks/usePontuacao.js';
import { encontrarMelhorTime, encontrarTopFragger, encontrarTopMVP } from './utils/calculos.js';
import Header from './components/Header.jsx';
import NavTabs from './components/NavTabs.jsx';
import QuickStats from './components/QuickStats.jsx';
import TabelaPontos from './components/TabelaPontos.jsx';
import TimesGrid from './components/TimesGrid.jsx';
import MiniLeaderboard from './components/MiniLeaderboard.jsx';

export default function App() {
  const { abaAtiva, dados, mesSelecionado, diaSelecionado, setMesSelecionado, setDiaSelecionado, meses, dias, loading, error } = useTorneio();
  const { listaFinal, totalKillsGeral, totalJogadores, totalTimes } = usePontuacao(dados, mesSelecionado, diaSelecionado);

  // Inicializa filtros quando dados carregam
  useEffect(() => {
    if (meses.length > 0 && !mesSelecionado) {
      setMesSelecionado(meses[0]);
    }
  }, [meses, mesSelecionado, setMesSelecionado]);

  useEffect(() => {
    if (dias.length > 0) {
      setDiaSelecionado(dias[0]);
    }
  }, [dias, setDiaSelecionado]);

  // Scroll to top button
  useEffect(() => {
    const btn = document.getElementById('scrollTop');
    const handleScroll = () => {
      if (window.scrollY > 300) {
        btn?.classList.add('visible');
      } else {
        btn?.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const melhorTime = encontrarMelhorTime(listaFinal);
  const topFragger = encontrarTopFragger(listaFinal);
  const topMVP = encontrarTopMVP(listaFinal);
  const maxKills = listaFinal.length > 0 ? Math.max(...listaFinal.map(t => t.total_pk)) : 1;

  return (
    <>
      <Header />
      <NavTabs />

      <div className="container">
        {/* ABA INÍCIO */}
        <div id="home" className={`tab-content ${abaAtiva === 'home' ? 'active' : ''}`}>
          <QuickStats
            totalTimes={totalTimes}
            totalJogadores={totalJogadores}
            totalKills={totalKillsGeral}
          />

          <div className="grid-home">
            <div className="card fade-in-up stagger-1">
              <h3><span className="icon">🎮</span>Informações do XTreino</h3>
              <div className="info-item">
                <span className="label">Formato:</span>
                <span className="value">Battle Royale (BR) - 3 Quedas</span>
              </div>
              <div className="info-item">
                <span className="label">Organizador:</span>
                <span className="value">Administração do Clã</span>
              </div>
              <div className="info-item">
                <span className="label">Capacidade:</span>
                <span className="value">Até 15 Equipes</span>
              </div>
              <div className="info-item">
                <span className="label">Status:</span>
                <span className="badge badge-success">Ativo / Em Andamento</span>
              </div>
              <div className="info-item">
                <span className="label">Sistema:</span>
                <span className="value">PP + Kills = PT</span>
              </div>
            </div>

            <div className="card fade-in-up stagger-2">
              <h3><span className="icon">🔗</span>Nossas Redes Sociais</h3>
              <p style={{ color: 'var(--cor-subtexto)', marginBottom: '15px', fontSize: '0.9rem' }}>
                Conecte-se com a comunidade!
              </p>
              <div className="social-links">
                <a href="#" target="_blank" rel="noopener noreferrer"><span className="icon">💬</span>Discord</a>
                <a href="#" target="_blank" rel="noopener noreferrer"><span className="icon">📺</span>YouTube</a>
                <a href="#" target="_blank" rel="noopener noreferrer"><span className="icon">🎵</span>TikTok</a>
                <a href="#" target="_blank" rel="noopener noreferrer"><span className="icon">📸</span>Instagram</a>
              </div>
            </div>
          </div>

          <div className="card fade-in-up stagger-3" style={{ marginTop: '20px' }}>
            <h3><span className="icon">🏆</span>Times Cadastrados no Banco</h3>
            <div style={{ marginTop: '15px' }}>
              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Carregando times...</p>
                </div>
              ) : error ? (
                <div className="error-state">
                  <div className="icon">⚠️</div>
                  <h3>Erro ao carregar dados</h3>
                  <p>Certifique-se de que o arquivo <strong>campeonato.csv</strong> está na pasta public/data/.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                  {listaFinal.map((t) => (
                    <div
                      key={t.nome}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '12px',
                        borderRadius: '8px',
                        borderLeft: '3px solid var(--cor-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 70, 85, 0.08)';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>🛡️</span>
                      <div>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{t.nome}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--cor-subtexto)' }}>{t.jogadores.length} jogadores</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card fade-in-up stagger-4" style={{ marginTop: '20px' }}>
            <h3><span className="icon">🥇</span>Top 3 do Dia</h3>
            <div style={{ marginTop: '15px' }}>
              <MiniLeaderboard top3={listaFinal.slice(0, 3)} />
            </div>
          </div>
        </div>

        {/* ABA TABELA */}
        <div id="tabela" className={`tab-content ${abaAtiva === 'tabela' ? 'active' : ''}`}>
          <TabelaPontos />
        </div>

        {/* ABA TIMES */}
        <div id="times" className={`tab-content ${abaAtiva === 'times' ? 'active' : ''}`}>
          <TimesGrid />
        </div>

        {/* ABA ESTATÍSTICAS */}
        <div id="estatisticas" className={`tab-content ${abaAtiva === 'estatisticas' ? 'active' : ''}`}>
          <div className="section-title">
            <span>📈</span> Estatísticas Gerais
            <span className="line"></span>
          </div>

          <div className="grid-home">
            <div className="card">
              <h3><span className="icon">🏆</span>Melhor Time do Dia</h3>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                {melhorTime ? (
                  <>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏆</div>
                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.3rem', color: 'var(--gold)', fontWeight: 900 }}>
                      {melhorTime.nome}
                    </div>
                    <div style={{ color: 'var(--cor-subtexto)', marginTop: '8px' }}>
                      {melhorTime.pt} pontos | {melhorTime.total_pk} kills
                    </div>
                  </>
                ) : (
                  <div className="loading-spinner" style={{ width: '30px', height: '30px', margin: '0 auto' }}></div>
                )}
              </div>
            </div>

            <div className="card">
              <h3><span className="icon">⚔️</span>Top Fragger</h3>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                {topFragger.nome ? (
                  <>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚔️</div>
                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.3rem', color: 'var(--cor-accent)', fontWeight: 900 }}>
                      {topFragger.nome}
                    </div>
                    <div style={{ color: 'var(--cor-subtexto)', marginTop: '8px' }}>
                      {topFragger.kills} kills | {topFragger.time}
                    </div>
                  </>
                ) : (
                  <div className="loading-spinner" style={{ width: '30px', height: '30px', margin: '0 auto' }}></div>
                )}
              </div>
            </div>

            <div className="card">
              <h3><span className="icon">📊</span>Distribuição de Kills</h3>
              <div style={{ padding: '15px' }}>
                {listaFinal.length > 0 ? (
                  listaFinal.slice(0, 5).map(time => {
                    const percent = (time.total_pk / maxKills) * 100;
                    return (
                      <div key={time.nome} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem' }}>
                          <span style={{ fontWeight: 600 }}>{time.nome}</span>
                          <span style={{ color: 'var(--info)' }}>{time.total_pk} kills</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="loading-spinner" style={{ width: '30px', height: '30px', margin: '0 auto' }}></div>
                )}
              </div>
            </div>

            <div className="card">
              <h3><span className="icon">🎯</span>MVP do Dia</h3>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                {topMVP.nome ? (
                  <>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎯</div>
                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.3rem', color: 'var(--success)', fontWeight: 900 }}>
                      {topMVP.nome}
                    </div>
                    <div style={{ color: 'var(--cor-subtexto)', marginTop: '8px' }}>
                      {topMVP.mvps} MVPs | {topMVP.time}
                    </div>
                  </>
                ) : (
                  <div className="loading-spinner" style={{ width: '30px', height: '30px', margin: '0 auto' }}></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="scroll-top" id="scrollTop" onClick={scrollToTop}>↑</button>
    </>
  );
}
