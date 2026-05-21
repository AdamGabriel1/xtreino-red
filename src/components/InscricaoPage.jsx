import { useState } from 'react';
import { useTorneio } from '../context/TorneioContext.jsx';

export default function InscricaoPage() {
  const { slots, config, atualizarSlot, removerTime, adicionarTime, slotsPreenchidos, progressoPercentual } = useTorneio();
  const [novoTime, setNovoTime] = useState('');

  const handleAdicionar = () => {
    if (!novoTime.trim()) return;
    const sucesso = adicionarTime(novoTime);
    if (sucesso) {
      setNovoTime('');
      // Toast de sucesso
    } else {
      // Toast de erro - slots cheios
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAdicionar();
  };

  const handleLimparTodos = () => {
    if (!confirm('Tem certeza que deseja limpar todos os slots?')) return;
    slots.forEach(s => {
      if (s.status === 'confirmado') {
        atualizarSlot(s.id, '');
      }
    });
  };

  const handleEmbaralhar = () => {
    const nomes = slots.filter(s => s.status === 'confirmado').map(s => s.nome);
    const shuffled = [...nomes].sort(() => Math.random() - 0.5);
    
    // Limpar todos primeiro
    slots.forEach(s => atualizarSlot(s.id, ''));
    
    // Preencher com ordem aleatória
    shuffled.forEach((nome, idx) => {
      atualizarSlot(idx + 1, nome);
    });
  };

  const handleGerarTabela = () => {
    const teams = slots.filter(s => s.status === 'confirmado').map(s => s.nome);
    if (teams.length < 2) {
      // Toast erro
      return;
    }
    // Gerar dados e navegar para tabela
  };

  const handleExportar = () => {
    const confirmados = slots.filter(s => s.status === 'confirmado')
      .map(s => `📍 ${String(s.id).padStart(2, '0')} — ${s.nome}`).join('\n');
    const vazios = slots.filter(s => s.status === 'vazio')
      .map(s => `📍 ${String(s.id).padStart(2, '0')} —`).join('\n');
    
    const texto = `*${config.nome} 🚩*\n\n` +
      `_PLATAFORMA:_ *_${config.plataforma}_* 📱\n` +
      `_MODO:_ *_${config.modo}_* 👥👥\n\n` +
      `🗓️ - _DATA:_ *${config.data}*\n` +
      `⏱️- _HORÁRIOS_\n\n` +
      config.fusosHorarios.map(tz => `${tz.bandeira} ${tz.horario}`).join('\n') +
      `\n\n🪂| *${config.quedas} QUEDAS*\n` +
      `🌴| *${config.mapas}*\n\n` +
      `- SLOTS | EQUIPES\n\n` +
      confirmados + '\n' + vazios + '\n\n' +
      `RESERVAS:\n\n` +
      `*⚠️ ${config.regras.join('*\n*⚠️ ')}*\n\n` +
      `Pedido para desistência *até às ${config.desistenciaAte}*\n\n` +
      `*_SCRIM:_*\n${config.links.scrim}\n\n` +
      `*_DISCORD:_*\n${config.links.discord}`;

    navigator.clipboard.writeText(texto);
    // Toast sucesso
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <h2 className="section-title-devils">
          <i className="fa-solid fa-user-plus"></i> Inscrição de Times
        </h2>
        <p className="text-gray-500 text-sm ml-4 mt-2">
          Adicione os nomes das equipes para gerar a tabela automaticamente.
        </p>
      </div>

      {/* Quick Add */}
      <div className="glass-card rounded-xl p-4 sm:p-6 mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <i className="fa-solid fa-bolt text-amber-400"></i> Adicionar Equipe Rápido
        </h3>
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={novoTime}
            onChange={(e) => setNovoTime(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nome da equipe..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500 transition"
          />
          <button
            onClick={handleAdicionar}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 sm:px-6 py-3 rounded-xl font-bold text-sm transition flex items-center gap-2 btn-touch whitespace-nowrap"
          >
            <i className="fa-solid fa-plus"></i> <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>

      {/* Team Slots Manager */}
      <div className="glass-card rounded-xl p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-list-ol text-sky-400"></i> Slots do Torneio
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleLimparTodos}
              className="text-xs text-gray-500 hover:text-red-400 transition flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-500/10"
            >
              <i className="fa-solid fa-trash"></i> Limpar
            </button>
            <button
              onClick={handleEmbaralhar}
              className="text-xs text-gray-500 hover:text-amber-400 transition flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-amber-500/10"
            >
              <i className="fa-solid fa-shuffle"></i> Sortear
            </button>
          </div>
        </div>

        <div className="slot-progress-devils mb-4">
          <div className="slot-progress-fill" style={{ width: `${progressoPercentual}%` }}></div>
        </div>
        <div className="text-xs text-gray-500 mb-4 text-right">
          {slotsPreenchidos} de {config.maxSlots} slots preenchidos
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {slots.map(slot => (
            <div
              key={slot.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                slot.status === 'confirmado' 
                  ? 'bg-gradient-to-r from-rose-500/5 to-slate-900/80 border-rose-500/30' 
                  : 'bg-slate-900/30 border-dashed border-slate-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black border flex-shrink-0 ${
                slot.status === 'confirmado' 
                  ? 'bg-slate-900 text-rose-400 border-slate-800' 
                  : 'bg-slate-900/50 text-gray-600 border-slate-800'
              }`}>
                {String(slot.id).padStart(2, '0')}
              </div>
              <input
                type="text"
                value={slot.nome}
                onChange={(e) => atualizarSlot(slot.id, e.target.value)}
                placeholder="Slot vazio..."
                className={`flex-1 bg-transparent border-none text-sm font-semibold focus:outline-none focus:text-white placeholder-gray-600 ${
                  slot.status === 'confirmado' ? 'text-white' : 'text-gray-500'
                }`}
              />
              {slot.status === 'confirmado' && (
                <button
                  onClick={() => removerTime(slot.id)}
                  className="text-gray-600 hover:text-red-400 transition p-1 btn-touch"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleGerarTabela}
          className="flex-1 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 btn-touch shadow-lg shadow-rose-600/20"
        >
          <i className="fa-solid fa-table"></i> Gerar Tabela de Classificação
        </button>
        <button
          onClick={handleExportar}
          className="flex-1 bg-slate-950 border border-slate-800 hover:border-sky-500/50 text-gray-400 hover:text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 btn-touch"
        >
          <i className="fa-solid fa-file-export"></i> Exportar Lista
        </button>
      </div>
    </div>
  );
}