import { useTorneio } from '../context/TorneioContext.jsx';

export default function HomeDevils() {
  const { slots, config, slotsPreenchidos, progressoPercentual } = useTorneio();

  const timesConfirmados = slots.filter(s => s.status === 'confirmado');

  const colors = [
    'from-rose-600 to-rose-800',
    'from-sky-600 to-sky-800', 
    'from-amber-600 to-amber-800',
    'from-emerald-600 to-emerald-800',
    'from-violet-600 to-violet-800',
    'from-orange-600 to-orange-800',
    'from-pink-600 to-pink-800',
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-bg-glow-1"></div>
        <div className="hero-bg-glow-2"></div>
        
        <div className="hero-content">
          <div className="hero-tags">
            <span className="hero-tag hero-tag-primary">DEVILS MOBILE LEAGUE</span>
            <span className="hero-tag hero-tag-live">
              <i className="fa-solid fa-circle live-pulse"></i> Em Andamento
            </span>
          </div>
          
          <h1 className="hero-title">
            Arena <span className="hero-title-accent">Blood Strike</span>
          </h1>
          
          <p className="hero-description">
            Acompanhe as parciais, tabelas acumuladas de 3 quedas e rendimento individual. 
            Coordenação: <span className="text-rose-400 font-bold">{config.organizador}</span>
          </p>
          
          <div className="hero-badges">
            <div className="hero-badge">
              <i className="fa-solid fa-crosshairs"></i> BR Mode
            </div>
            <div className="hero-badge">
              <i className="fa-solid fa-stopwatch"></i> {config.quedas} Quedas
            </div>
            <div className="hero-badge">
              <i className="fa-solid fa-map"></i> {config.mapas}
            </div>
            <div className="hero-badge hero-badge-highlight">
              <i className="fa-solid fa-calendar"></i> {config.data}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-devils">
        <div className="stat-box-devils">
          <div className="stat-number">{slotsPreenchidos}</div>
          <div className="stat-label">Equipes</div>
        </div>
        <div className="stat-box-devils">
          <div className="stat-number text-rose-400">{config.maxSlots}</div>
          <div className="stat-label">Slots Totais</div>
        </div>
        <div className="stat-box-devils">
          <div className="stat-number text-amber-400">{config.quedas}</div>
          <div className="stat-label">Quedas</div>
        </div>
        <div className="stat-box-devils">
          <div className="stat-number text-sky-400">{config.fusosHorarios.length}</div>
          <div className="stat-label">Fusos Horários</div>
        </div>
      </div>

      {/* Time Zones */}
      <div className="section-devils">
        <h2 className="section-title-devils">
          <i className="fa-solid fa-globe"></i> Horários por Região
        </h2>
        <div className="tz-grid">
          {config.fusosHorarios.map((tz, i) => (
            <div className="tz-card-devils" key={i}>
              <span className="tz-flag">{tz.bandeira}</span>
              <div>
                <div className="tz-country">{tz.pais}</div>
                <div className="tz-time">{tz.horario}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules & Format */}
      <div className="rules-grid">
        <div className="rule-card-devils rule-card-danger">
          <h3>
            <i className="fa-solid fa-triangle-exclamation"></i> Regras Importantes
          </h3>
          <ul>
            {config.regras.map((regra, i) => (
              <li key={i}>
                <i className="fa-solid fa-ban"></i>
                <span>{regra}</span>
              </li>
            ))}
            <li>
              <i className="fa-solid fa-clock text-amber-500"></i>
              <span>Pedido de desistência até {config.desistenciaAte}</span>
            </li>
          </ul>
        </div>
        
        <div className="rule-card-devils rule-card-info">
          <h3>
            <i className="fa-solid fa-circle-info"></i> Formato do Torneio
          </h3>
          <ul>
            <li>
              <i className="fa-solid fa-parachute-box"></i>
              <span>{config.quedas} Quedas no modo Battle Royale</span>
            </li>
            <li>
              <i className="fa-solid fa-map-location-dot"></i>
              <span>{config.mapas}</span>
            </li>
            <li>
              <i className="fa-solid fa-users"></i>
              <span>{config.modo} (4 jogadores por equipe)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Links */}
      <div className="social-grid-devils">
        <a href={config.links.scrim} target="_blank" rel="noopener noreferrer" className="social-card-devils social-whatsapp">
          <div className="social-icon"><i className="fa-brands fa-whatsapp"></i></div>
          <div>
            <h3>Scrim WhatsApp</h3>
            <p>Grupo oficial</p>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </a>
        
        <a href={config.links.discord} target="_blank" rel="noopener noreferrer" className="social-card-devils social-discord">
          <div className="social-icon"><i className="fa-brands fa-discord"></i></div>
          <div>
            <h3>Discord Server</h3>
            <p>Comunicação oficial</p>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </a>
        
        <button 
          onClick={() => {
            navigator.clipboard.writeText(config.links.discord);
            // Você pode adicionar um toast aqui
          }}
          className="social-card-devils social-share"
        >
          <div className="social-icon"><i className="fa-solid fa-share-nodes"></i></div>
          <div>
            <h3>Compartilhar</h3>
            <p>Copiar link do evento</p>
          </div>
          <i className="fa-regular fa-copy"></i>
        </button>
      </div>

      {/* Teams Grid */}
      <div className="section-devils">
        <div className="teams-header">
          <h2 className="section-title-devils">
            <i className="fa-solid fa-shield-halved"></i>
            Equipes Confirmadas
            <span className="teams-count">
              {slotsPreenchidos}/{config.maxSlots}
            </span>
          </h2>
          <div className="slot-progress-devils">
            <div className="slot-progress-fill" style={{ width: `${progressoPercentual}%` }}></div>
          </div>
        </div>

        <div className="teams-grid-devils">
          {timesConfirmados.map((slot, index) => {
            const colorClass = colors[index % colors.length];
            return (
              <div 
                key={slot.id} 
                className="team-card-devils"
                onClick={() => {
                  // Navegar para aba de times com filtro
                }}
              >
                <div className={`team-avatar-devils bg-gradient-to-br ${colorClass}`}>
                  {slot.nome.substring(0, 2).toUpperCase()}
                </div>
                <div className="team-name-devils">{slot.nome}</div>
                <div className="team-slot-num">Slot {String(slot.id).padStart(2, '0')}</div>
              </div>
            );
          })}
          
          {/* Slots vazios */}
          {slots.filter(s => s.status === 'vazio').length > 0 && (
            <div 
              className="team-card-devils team-card-empty"
              onClick={() => {
                // Navegar para aba de inscrição
              }}
            >
              <div className="team-avatar-empty">
                <i className="fa-solid fa-plus"></i>
              </div>
              <div className="team-name-empty">
                +{slots.filter(s => s.status === 'vazio').length} vagas
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}