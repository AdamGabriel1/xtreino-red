import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useCSVData } from '../hooks/useCSVData.js';
import { TIMES_XTREINO, CONFIG_XTREINO } from '../data/timesFixos.js';

const TorneioContext = createContext(null);

export function TorneioProvider({ children }) {
  const { dados, loading, error } = useCSVData();
  const [abaAtiva, setAbaAtiva] = useState('home');
  const [mesSelecionado, setMesSelecionado] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState('');
  const [temaEscuro, setTemaEscuro] = useState(true);
  
  // Times fixos do XTreino
  const [slots, setSlots] = useState(TIMES_XTREINO);
  const config = CONFIG_XTREINO;

  const meses = useMemo(() => {
    return [...new Set(dados.map(item => item.Mes?.trim()).filter(Boolean))];
  }, [dados]);

  const dias = useMemo(() => {
    if (!mesSelecionado) return [];
    return [...new Set(
      dados
        .filter(item => item.Mes?.trim() === mesSelecionado)
        .map(item => item.Dia?.trim())
        .filter(Boolean)
    )];
  }, [dados, mesSelecionado]);

  // AUTO-INICIALIZAR filtros quando dados carregam
  useEffect(() => {
    if (meses.length > 0 && !mesSelecionado) {
      setMesSelecionado(meses[0]);
    }
  }, [meses, mesSelecionado]);

  useEffect(() => {
    if (dias.length > 0 && !diaSelecionado) {
      setDiaSelecionado(dias[dias.length - 1]); // Último dia por padrão (mais recente)
    }
  }, [dias, diaSelecionado]);

  // Resetar dia quando muda o mês
  useEffect(() => {
    if (mesSelecionado && dias.length > 0) {
      setDiaSelecionado(dias[dias.length - 1]);
    }
  }, [mesSelecionado, dias]);
  
  // Times fixos do XTreino - vem do arquivo de config
  const [slots, setSlots] = useState(TIMES_XTREINO);
  const config = CONFIG_XTREINO;

  const meses = useMemo(() => {
    return [...new Set(dados.map(item => item.Mes?.trim()).filter(Boolean))];
  }, [dados]);

  const dias = useMemo(() => {
    if (!mesSelecionado) return [];
    return [...new Set(
      dados
        .filter(item => item.Mes?.trim() === mesSelecionado)
        .map(item => item.Dia?.trim())
        .filter(Boolean)
    )];
  }, [dados, mesSelecionado]);

  // Helpers para manipular slots
  const atualizarSlot = (id, nome) => {
    setSlots(prev => prev.map(s => 
      s.id === id ? { ...s, nome: nome.trim(), status: nome.trim() ? 'confirmado' : 'vazio' } : s
    ));
  };

  const adicionarTime = (nome) => {
    const slotVazio = slots.find(s => s.status === 'vazio');
    if (!slotVazio) return false;
    atualizarSlot(slotVazio.id, nome);
    return true;
  };

  const removerTime = (id) => {
    atualizarSlot(id, '');
  };

  const slotsPreenchidos = slots.filter(s => s.status === 'confirmado').length;
  const progressoPercentual = (slotsPreenchidos / config.maxSlots) * 100;

  const value = {
    dados,
    loading,
    error,
    abaAtiva,
    setAbaAtiva,
    mesSelecionado,
    setMesSelecionado,
    diaSelecionado,
    setDiaSelecionado,
    meses,
    dias,
    temaEscuro,
    setTemaEscuro,
    slots,
    setSlots,
    config,
    atualizarSlot,
    adicionarTime,
    removerTime,
    slotsPreenchidos,
    progressoPercentual,
  };

  return (
    <TorneioContext.Provider value={value}>
      {children}
    </TorneioContext.Provider>
  );
}

export function useTorneio() {
  const context = useContext(TorneioContext);
  if (!context) {
    throw new Error('useTorneio deve ser usado dentro de TorneioProvider');
  }
  return context;
}