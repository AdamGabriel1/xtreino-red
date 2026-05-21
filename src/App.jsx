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
import HomeDevils from './components/HomeDevils.jsx'; // NOVO COMPONENTE
import InscricaoPage from './components/InscricaoPage.jsx'; // NOVO COMPONENTE
import TabelaDevils from './components/TabelaDevils.jsx';

export default function App() {
  const { abaAtiva, dados, mesSelecionado, diaSelecionado, setMesSelecionado, setDiaSelecionado, meses, dias, loading, error, slots, config } = useTorneio();
  const { listaFinal, totalKillsGeral, totalJogadores, totalTimes } = usePontuacao(dados, mesSelecionado, diaSelecionado);

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
        {/* ABA INÍCIO - DEVILS MOBILE LEAGUE */}
        <div id="home" className={`tab-content ${abaAtiva === 'home' ? 'active' : ''}`}>
          <HomeDevils />
        </div>

        {/* ABA TABELA */}
        <div id="tabela" className={`tab-content ${abaAtiva === 'tabela' ? 'active' : ''}`}>
          <TabelaDevils />
        </div>

        {/* ABA TIMES */}
        <div id="times" className={`tab-content ${abaAtiva === 'times' ? 'active' : ''}`}>
          <TimesGrid />
        </div>

        {/* ABA ESTATÍSTICAS */}
        <div id="estatisticas" className={`tab-content ${abaAtiva === 'estatisticas' ? 'active' : ''}`}>
          {/* ... mantenha o conteúdo de estatísticas que já tinha ... */}
          <div className="section-title">
            <span>📈</span> Estatísticas Gerais
            <span className="line"></span>
          </div>
          <div className="grid-home">
            {/* ... cards de melhor time, top fragger, etc ... */}
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

        {/* ABA INSCRIÇÃO - NOVA */}
        <div id="inscricao" className={`tab-content ${abaAtiva === 'inscricao' ? 'active' : ''}`}>
          <InscricaoPage />
        </div>
      </div>

      <button className="scroll-top" id="scrollTop" onClick={scrollToTop}>↑</button>
    </>
  );
}