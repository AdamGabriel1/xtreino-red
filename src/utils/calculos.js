// Tabela de pontuação DEVILS MOBILE LEAGUE
const TABELA_PONTOS_DEVILS = { 
  1: 12, 2: 10, 3: 8, 4: 7, 5: 6, 6: 5, 7: 4, 8: 3, 9: 2, 10: 1 
};

export function calcularPontosPosicao(posicao) {
  return TABELA_PONTOS_DEVILS[posicao] || 0;
}

// ... (mantenha as funções existentes: ordenarTimes, encontrarMelhorTime, etc.)

export function processarDadosDoDia(dadosDoDia) {
  let resumoTimes = {};
  let totalKillsGeral = 0;
  let totalJogadores = 0;

  dadosDoDia.forEach(linha => {
    const time = linha.Time?.trim() || 'Sem Time';
    const q1_pos = parseInt(linha.Q1_Pos) || 0;
    const q1_k = parseInt(linha.Q1_Kills) || 0;
    const q2_pos = parseInt(linha.Q2_Pos) || 0;
    const q2_k = parseInt(linha.Q2_Kills) || 0;
    const q3_pos = parseInt(linha.Q3_Pos) || 0;
    const q3_k = parseInt(linha.Q3_Kills) || 0;
    const mvp = parseInt(linha.MVP_Vezes) || 0;
    const dano = parseFloat(linha.Dano_Medio) || 0;

    if (!resumoTimes[time]) {
      resumoTimes[time] = {
        nome: time,
        q1_pp: calcularPontosPosicao(q1_pos),
        q2_pp: calcularPontosPosicao(q2_pos),
        q3_pp: calcularPontosPosicao(q3_pos),
        q1_pos: q1_pos,
        q2_pos: q2_pos,
        q3_pos: q3_pos,
        total_pk: 0,
        jogadores: [],
        mvps_time: 0,
        dano_total: 0
      };
    }

    const killsJogador = q1_k + q2_k + q3_k;
    resumoTimes[time].total_pk += killsJogador;
    resumoTimes[time].mvps_time += mvp;
    resumoTimes[time].dano_total += dano;
    totalKillsGeral += killsJogador;
    totalJogadores++;

    resumoTimes[time].jogadores.push({
      nome: linha.Jogador || 'Desconhecido',
      total_kills: killsJogador,
      dano: dano.toFixed(0),
      mvp: mvp,
      q1_pos: q1_pos,
      q2_pos: q2_pos,
      q3_pos: q3_pos,
      q1_k: q1_k,
      q2_k: q2_k,
      q3_k: q3_k
    });
  });

  let listaFinal = Object.values(resumoTimes).map(time => {
    const total_pp = time.q1_pp + time.q2_pp + time.q3_pp;
    const pt = total_pp + time.total_pk;
    
    // Calcular booyahs (vitórias)
    let strikes = 0;
    if (time.q1_pos === 1) strikes++;
    if (time.q2_pos === 1) strikes++;
    if (time.q3_pos === 1) strikes++;
    
    // Calcular posição média
    const posicoesValidas = [time.q1_pos, time.q2_pos, time.q3_pos].filter(p => p > 0);
    const posicao_media = posicoesValidas.length > 0 
      ? (posicoesValidas.reduce((a, b) => a + b, 0) / posicoesValidas.length).toFixed(1)
      : "0.0";

    return { 
      ...time, 
      total_pp, 
      pt,
      strikes,
      posicao_media
    };
  });

  listaFinal = ordenarTimes(listaFinal);

  return {
    listaFinal,
    totalKillsGeral,
    totalJogadores,
    totalTimes: listaFinal.length
  };
}