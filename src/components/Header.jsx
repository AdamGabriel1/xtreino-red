import { useTorneio } from '../context/TorneioContext.jsx';

export default function Header() {
  const { temaEscuro, setTemaEscuro } = useTorneio();

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
      <header>
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-icon">⚔️</div>
            <div>
              <h1>XTREINO BLOOD STRIKE</h1>
              <p>Painel de Controle e Estatísticas Interativas</p>
            </div>
          </div>
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span>SISTEMA ATIVO</span>
          </div>
        </div>
      </header>
    </>
  );
}
