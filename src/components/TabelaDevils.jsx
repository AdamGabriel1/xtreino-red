import { useState } from 'react';
import { useTorneio } from '../context/TorneioContext.jsx';
import { usePontuacao } from '../hooks/usePontuacao.js';
import { getTeamConfig, gerarAvatarTime } from '../data/teamConfig.js';

const TABS = [
  { id: 'geral', label: 'Pontuação Geral', icon: 'fa-ranking-star' },
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
    const scoreA = (a[`${abaAtiva}_pp`] || 0) + (a[`${abaAtiva}_pos`] || 0);
    const scoreB = (b[`${abaAtiva}_pp`] || 0) + (b[`${abaAtiva}_pos`] || 0);
    return scoreB - scoreA;
  });

  const isGeral = abaAtiva === 'geral';

  return (
    <div className="animate-fade-in">
      <div className="tabela-header-devils">
        <div>
          <h2 className="tabela-title-devils">
            <i className="fa-solid fa-table"></i> Tabela Parcial Diária
          </h2>
          <p className="tabela-subtitle-devils">
            Pontuação Base: 1º=12pt, 2º=10pt, 3º=8pt, 4º=7pt... + 1 ponto por Eliminação (Kill).
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
                {isGeral && (
                  <>
                    <th className="th-queda col-queda">Q1 (Pos/K)</th>
                    <th className="th-queda col-queda">Q2 (Pos/K)</th>
                    <th className="th-queda col-queda">Q3 (Pos/K)</th>
                    <th className="th-total">Total PP</th>
                    <th className="th-total">Total PK</th>
                    <th className="th-total">🏆</th>
                  </>
                )}
                {!isGeral && (
                  <>
                    <th className="th-queda">Posição</th>
                    <th className="th-queda">PP</th>
                    <th className="th-queda">Kills</th>
                  </>
                )}
                <th className="th-pt">PT (Total)</th>
              </tr>
            </thead>
            <tbody>
              {equipesOrdenadas.length === 0 ? (
                <tr>
                  <td colSpan={isGeral ? 9 : 6} className="td-empty">
                    <div className="empty-state-devils">
                      <i className="fa-solid fa-table-cells text-2xl text-gray-600"></i>
                      <p>Nenhum dado disponível para esta data</p>
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
          <td className="td-queda col-queda">
            <span className="pos-value">{equipe.q1_pos}º</span>
            <span className="sep">/</span>
            <span className="pk-value">{equipe.total_pk > 0 ? Math.round((equipe.q1_k / equipe.total_pk) * equipe.total_pk) : 0}k</span>
          </td>
          <td className="td-queda col-queda">
            <span className="pos-value">{equipe.q2_pos}º</span>
            <span className="sep">/</span>
            <span className="pk-value">{equipe.q2_k || 0}k</span>
          </td>
          <td className="td-queda col-queda">
            <span className="pos-value">{equipe.q3_pos}º</span>
            <span className="sep">/</span>
            <span className="pk-value">{equipe.q3_k || 0}k</span>
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
          <td className="td-queda pk-value">{equipe[`${modo}_k`]} Kills</td>
        </>
      )}

      <td className="td-pt">{equipe.pt}</td>
    </tr>
  );
}