import { useEffect } from 'react';
import { useTorneio } from '../context/TorneioContext.jsx';

const TABS = [
  { id: 'home', icon: '🏠', label: 'Início' },
  { id: 'tabela', icon: '📊', label: 'Tabela do Dia' },
  { id: 'times', icon: '👥', label: 'Times & Elencos' },
  { id: 'estatisticas', icon: '📈', label: 'Estatísticas' },
];

export default function NavTabs() {
  const { abaAtiva, setAbaAtiva } = useTorneio();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIndex = TABS.findIndex(t => t.id === abaAtiva);
      if (e.key === 'ArrowRight' && currentIndex < TABS.length - 1) {
        setAbaAtiva(TABS[currentIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setAbaAtiva(TABS[currentIndex - 1].id);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [abaAtiva, setAbaAtiva]);

  return (
    <div className="nav-tabs">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${abaAtiva === tab.id ? 'active' : ''}`}
          onClick={() => setAbaAtiva(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
