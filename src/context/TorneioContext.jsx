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
  
  const [slots, setSlots] = useState(TIMES_XTREINO);
  const config = CONFIG_XTREINO;

  // Extrair meses únicos dos dados
  const meses = useMemo(() => {
    const lista = [...new Set(dados.map(item => item.Mes?.trim()).filter(Boolean))];
    console.log('Meses encontrados:', lista);
    return lista.sort();
  }, [dados]);

  // Extrair dias do mês selecionado
  const dias = useMemo(() => {
    if (!mesSelecionado) return [];
    const lista = [...new Set(
      dados
        .filter(item => item.Mes?.trim() === mesSelecionado)
        .map(item => item.Dia?.trim())
        .filter(Boolean)
    )];
    console.log('Dias para', mesSelecionado, ':', lista);
    return lista.sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, '')) || 0;
      const numB = parseInt(b.replace(/\D/g, '')) || 0;
      return numA - numB;
    });
  }, [dados, mesSelecionado]);

  // Inicializar mês quando dados carregam
  useEffect(() => {
    if (loading) return;
    if (meses.length === 0) return;
    
    console.log('Inicializando mês. Atual:', mesSelecionado, 'Disponíveis:', meses);
    
    if (!mesSelecionado || !meses.includes(mesSelecionado)) {
      setMesSelecionado(meses[0]);
    }
  }, [loading, meses]);

  // Inicializar dia quando mês ou dias mudam
  useEffect(() => {
    if (!mesSelecionado || dias.length === 0) return;
    
    console.log('Inicializando dia. Atual:', diaSelecionado, 'Disponíveis:', dias);
    
    if (!diaSelecionado || !dias.includes(diaSelecionado)) {
      setDiaSelecionado(dias[dias.length - 1]);
    }
  }, [mesSelecionado, dias]);

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