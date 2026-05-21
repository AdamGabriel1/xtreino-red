import { useTorneio } from '../context/TorneioContext.jsx';

export default function Header() {
  const { 
    temaEscuro, 
    setTemaEscuro,
    mesSelecionado,
    setMesSelecionado,
    diaSelecionado,
    setDiaSelecionado,
    meses,
    dias,
    loading,
    error
  } = useTorneio();

  const toggleTheme = () => {
    setTemaEscuro(!temaEscuro);
    if (!temaEscuro) {
      document.documentElement.style.setProperty('--bg-principal', '#0a0b0f');
      document.documentElement.style.setProperty('--bg-card', '#11131a');
      document.documentElement.style.setProperty('--cor-texto', '#e4e6eb');
      document.documentElement.style.setProperty('--cor-subtexto', '#8b95a5');
      document.documentElement.style.setProperty('--borda', '#1e2230');
      document.documentElement.style.setProperty('--borda-hover', '#2a3050');
      document.body.style.backgroundColor = '#0a0b0f';
    } else {
      document.documentElement.style.setProperty('--bg-principal', '#f0f2f5');
      document.documentElement.style.setProperty('--bg-card', '#ffffff');
      document.documentElement.style.setProperty('--cor-texto', '#1a1a2e');
      document.documentElement.style.setProperty('--cor-subtexto', '#6b7280');
      document.documentElement.style.setProperty('--borda', '#e5e7eb');
      document.documentElement.style.setProperty('--borda-hover', '#d1d5db');
      document.body.style.backgroundColor = '#f0f2f5';
    }
  };

  const temMeses = meses.length > 0;
  const temDias = dias.length > 0 && mesSelecionado !== '';

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme} title="Alternar tema">
        {temaEscuro ? '🌙' : '☀️'}
      </button>
      
      <header className="devils-header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-icon devils-logo">
              <i className="fa-solid fa-gamepad"></i>
            </div>
            <div>
              <h1>DEVILS MOBILE</h1>
              <span className="league-badge">LEAGUE</span>
            </div>
          </div>
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span>SISTEMA ATIVO</span>
          </div>
        </div>
      </header>

      <div className="filtro-bar-devils">
        <div className="container filtro-content">
          <div className="filtro-label">
            <i className="fa-solid fa-calendar-days"></i>
            <span>Histórico do Campeonato:</span>
          </div>

          <div className="filtro-selects">
            <div className="select-wrapper">
              <select
                id="select-mes"
                value={mesSelecionado}
                onChange={(e) => setMesSelecionado(e.target.value)}
                className="select-devils"
                disabled={loading || !temMeses}
              >
                {!temMeses && (
                  <option value="">
                    {loading ? 'Carregando...' : error ? 'Erro ao carregar' : 'Sem dados'}
                  </option>
                )}
                {meses.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down select-icon"></i>
            </div>

            <div className="select-wrapper">
              <select
                id="select-dia"
                value={diaSelecionado}
                onChange={(e) => setDiaSelecionado(e.target.value)}
                className="select-devils"
                disabled={loading || !temDias}
              >
                {!temDias && (
                  <option value="">
                    {loading ? '...' : !mesSelecionado ? 'Escolha mês' : 'Sem dias'}
                  </option>
                )}
                {dias.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down select-icon"></i>
            </div>
          </div>

          <div className={`data-selecionada-badge ${!diaSelecionado ? 'badge-disabled' : ''}`}>
            <i className="fa-solid fa-clock"></i>
            <span>
              {diaSelecionado && mesSelecionado 
                ? `${diaSelecionado} de ${mesSelecionado}` 
                : loading ? 'Carregando...' : 'Selecione'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}