import { useTorneio } from '../context/TorneioContext.jsx';

export default function Header() {
  const { config, temaEscuro, setTemaEscuro } = useTorneio();

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
      
      {/* Tournament Info Bar */}
      <div className="tournament-info-bar">
        <div className="container info-bar-content">
          <div className="info-tags">
            <span className="tag tag-xtreino">
              <i className="fa-solid fa-fire"></i> X-Treino Oficial
            </span>
            <span className="tag tag-date">
              <i className="fa-solid fa-calendar-days"></i> {config.data}
            </span>
            <span className="tag tag-platform">
              <i className="fa-solid fa-mobile-screen"></i> {config.plataforma}
            </span>
            <span className="tag tag-mode">
              <i className="fa-solid fa-users"></i> {config.modo}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}