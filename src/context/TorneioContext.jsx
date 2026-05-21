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

  // Meses únicos dos dados
  const meses = useMemo(() => {
    const lista = [...new Set(dados.map(item => item.Mes?.trim()).filter(Boolean))];
    const sorted = lista.sort();
    console.log('📅 Meses calculados:', sorted);
    return sorted;
  }, [dados]);

  // Dias do mês selecionado
  const dias = useMemo(() => {
    if (!mesSelecionado) {
      console.log('📅 Sem mês selecionado, dias vazio');
      return [];
    }
    const filtrados = dados.filter(item => item.Mes?.trim() === mesSelecionado);
    const lista = [...new Set(filtrados.map(item => item.Dia?.trim()).filter(Boolean))];
    const sorted = lista.sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, '')) || 0;
      const numB = parseInt(b.replace(/\D/g, '')) || 0;
      return numA - numB;
    });
    console.log(`📅 Dias para ${mesSelecionado}:`, sorted);
    return sorted;
  }, [dados, mesSelecionado]);

  // INICIALIZAR quando dados carregam
  useEffect(() => {
    console.log('🔄 Effect inicializar - loading:', loading, 'meses:', meses, 'mesSelecionado:', mesSelecionado);
    
    if (loading) {
      console.log('⏳ Ainda carregando...');
      return;
    }
    
    if (meses.length === 0) {
      console.log('⚠️ Sem meses disponíveis');
      return;
    }
    
    // Se não tem mês selecionado, seleciona o primeiro
    if (!mesSelecionado) {
      const primeiro = meses[0];
      console.log('✅ Selecionando primeiro mês:', primeiro);
      setMesSelecionado(primeiro);
      return;
    }
    
    // Se mês selecionado não existe na lista, corrige
    if (!meses.includes(mesSelecionado)) {
      const primeiro = meses[0];
      console.log('🔄 Mês inválido, corrigindo para:', primeiro);
      setMesSelecionado(primeiro);
      return;
    }
    
    // Mês válido, verificar dia
    if (dias.length > 0 && (!diaSelecionado || !dias.includes(diaSelecionado))) {
      const ultimo = dias[dias.length - 1];
      console.log('✅ Selecionando último dia:', ultimo);
      setDiaSelecionado(ultimo);
    }
    
  }, [loading, meses, mesSelecionado, dias, diaSelecionado]);

  // Resetar dia quando muda mês manualmente
  useEffect(() => {
    if (!mesSelecionado || dias.length === 0) return;
    
    if (!diaSelecionado || !dias.includes(diaSelecionado)) {
      const ultimo = dias[dias.length - 1];
      console.log('🔄 Mês mudou, novo dia:', ultimo);
      setDiaSelecionado(ultimo);
    }
  }, [mesSelecionado, dias, diaSelecionado]);

  // Helpers slots
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