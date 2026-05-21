import React, { createContext, useContext, useState, useMemo } from 'react';
import { useCSVData } from '../hooks/useCSVData';

const TorneioContext = createContext(null);

export function TorneioProvider({ children }) {
  const { dados, loading, error } = useCSVData();
  const [abaAtiva, setAbaAtiva] = useState('home');
  const [mesSelecionado, setMesSelecionado] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState('');
  const [temaEscuro, setTemaEscuro] = useState(true);

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
