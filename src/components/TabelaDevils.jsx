import { useState } from 'react';
import { useTorneio } from '../context/TorneioContext.jsx';
import { usePontuacao } from '../hooks/usePontuacao.js';
import { getTeamConfig, gerarAvatarTime } from '../data/teamConfig.js';

const TABS = [
  { id: 'geral', label: 'Pontuacao Geral', icon: 'fa-ranking-star' },
  { id: 'q1', label: '1ª Ilha', icon: 'fa-1' },
  { id: 'q2', label: '2ª Ilha', icon: 'fa-2' },
  { id: 'q3', label: '3ª Ilha', icon: 'fa-3' },
];

export default function TabelaDevils() {
  const { dados, mesSelecionado, diaSelecionado } = useTorneio();
  const { listaFinal } = usePontuacao(dados, mesSelecionado, diaSelecionado);
  const [abaAtiva, setAbaAtiva] = useState('geral');

  const equipesOrdenadas = [...listaFinal].sort((a, b) => {
    if (abaAtiva === 'geral') {
      return b.pt - a.pt || b.total_pk - a.total_pk;
    }
    // Ordenar por posicao na queda (menor posicao = melhor)
    return (a[`${abaAtiva}_pos`] || 99) - (b[`${abaAtiva}_pos`] || 99);
  });

  const isGeral = abaAtiva === 'geral';

  return (
    <div className="animate-fade-in">
      <div className="tabela-header-devils">
        <div>
          <h2 className="tabela-title-devils">
            <i className="fa-solid fa-table"></i> Tabela Parcial Diaria
          </h2>
          <p className="tabela-subtitle-devils">
            Pontuacao Base: 1º=12pt, 2º=10pt, 3º=8pt, 4º=7pt... + 1 ponto por Eliminacao (Kill).
          </p>
        </div>
        <div className="tabela-count-devils">
          <i className="fa-solid fa-trophy text-amber-400"></i>
          <span className="text-xs text-gray-400 font-semibold">
            Total de Equipes: <span className="text-white font-bold">{equipesOrdenadas.length}</span>
          </span>
        </div>
      </div>

      <div className="tab-bar-devils">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setAbaAtiva(tab.id)}
            className={`tab-btn-devils ${abaAtiva === tab.id ? 'active' : ''}`}
          >
            <i className={`fa-solid ${tab.icon}`}></i> {tab.label}
          </button>
        ))}
      </div>

      <div className="tabela-container-devils">
        <div className="table-responsive">
          <table className="tabela-devils">
            <thead>
              <tr>
                <th className="th-pos">Pos</th>
                <th className="th-equipe">Equipe</th>
                {isGeral ? (
                  <>
                    <th className="th-queda">Q1 Pos</th>
                    <th className="th-queda">Q1 Kills</th>
                    <th className="th-queda">Q2 Pos</th>
                    <th className="th-queda">Q2 Kills</th>
                    <th className="th-queda">Q3 Pos</th>
                    <th className="th-queda">Q3 Kills</th>
                    <th className="th-total">Total PP</th>
                    <th className="th-total">Total PK</th>
                    <th className="th-total">🏆</th>
                  </>
                ) : (
                  <>
                    <th className="th-queda">Posicao</th>
                    <th className="th-queda">PP</th>
                    <th className="th-queda">Kills Time</th>
                  </>
                )}
                <th className="th-pt">PT (Total)</th>
              </tr>
            </thead>
            <tbody>
              {equipesOrdenadas.length === 0 ? (
                <tr>
                  <td colSpan={isGeral ? 12 : 6} className="td-empty">
                    <div className="empty-state-devils">
                      <i className="fa-solid fa-table-cells text-2xl text-gray-600"></i>
                      <p>Nenhum dado disponivel para esta data</p>
                    </div>
                  </td>
                </tr>
              ) : (
                equipesOrdenadas.map((eq, index) => (
                  <TabelaRow
                    key={eq.nome}
                    equipe={eq}
                    index={index}
                    modo={abaAtiva}
                    isGeral={isGeral}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabelaRow({ equipe, index, modo, isGeral }) {
  const config = getTeamConfig(equipe.nome);
  const avatar = gerarAvatarTime(equipe.nome, config.cor);

  let posBadge = `${index + 1}º`;
  if (index === 0) {
    posBadge = <span className="medal-devils medal-gold">1º</span>;
  } else if (index === 1) {
    posBadge = <span className="medal-devils medal-silver">2º</span>;
  } else if (index === 2) {
    posBadge = <span className="medal-devils medal-bronze">3º</span>;
  }

  return (
    <tr className="tr-devils">
      <td className="td-pos">{posBadge}</td>

      <td className="td-equipe">
        <div className="equipe-cell">
          <div 
            className="avatar-fallback-tabela"
            style={avatar.style}
          >
            {avatar.iniciais}
          </div>
          <div>
            <div className="equipe-nome">{equipe.nome}</div>
            {config.xtreino && (
              <a 
                href={config.xtreino} 
                target="_blank" 
                rel="noopener noreferrer"
                className="xtreino-link-tabela"
              >
                <i className="fa-solid fa-external-link-alt text-[8px]"></i> Xtreino
              </a>
            )}
          </div>
        </div>
      </td>

      {isGeral ? (
        <>
          <td className="td-queda">{equipe.q1_pos}º</td>
          <td className="td-queda">
            <span className="pk-value">{equipe.q1_kills_time}</span>
          </td>
          <td className="td-queda">{equipe.q2_pos}º</td>
          <td className="td-queda">
            <span className="pk-value">{equipe.q2_kills_time}</span>
          </td>
          <td className="td-queda">{equipe.q3_pos}º</td>
          <td className="td-queda">
            <span className="pk-value">{equipe.q3_kills_time}</span>
          </td>
          <td className="td-total">{equipe.total_pp}</td>
          <td className="td-total pk-total">{equipe.total_pk}</td>
          <td className="td-total">
            {equipe.strikes > 0 && (
              <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>
                {equipe.strikes}x 🏆
              </span>
            )}
          </td>
        </>
      ) : (
        <>
          <td className="td-queda">{equipe[`${modo}_pos`]}º</td>
          <td className="td-queda">{equipe[`${modo}_pp`]} PP</td>
          <td className="td-queda pk-value">{equipe[`${modo}_kills_time`]} Kills</td>
        </>
      )}

      <td className="td-pt">{equipe.pt}</td>
    </tr>
  );
}