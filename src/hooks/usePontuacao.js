import { useMemo } from 'react';
import { processarDadosDoDia } from '../utils/calculos';

export function usePontuacao(dadosGlobais, mesSelecionado, diaSelecionado) {
  return useMemo(() => {
    if (!dadosGlobais.length || !mesSelecionado || !diaSelecionado) {
      return {
        listaFinal: [],
        totalKillsGeral: 0,
        totalJogadores: 0,
        totalTimes: 0
      };
    }

    const dadosDoDia = dadosGlobais.filter(
      item => item.Mes?.trim() === mesSelecionado && item.Dia?.trim() === diaSelecionado
    );

    if (dadosDoDia.length === 0) {
      return {
        listaFinal: [],
        totalKillsGeral: 0,
        totalJogadores: 0,
        totalTimes: 0
      };
    }

    return processarDadosDoDia(dadosDoDia);
  }, [dadosGlobais, mesSelecionado, diaSelecionado]);
}
