// Tabela de pontuacao DEVILS MOBILE LEAGUE
const TABELA_PONTOS_DEVILS = { 
  1: 12, 2: 10, 3: 8, 4: 7, 5: 6, 6: 5, 7: 4, 8: 3, 9: 2, 10: 1 
};

export function calcularPontosPosicao(posicao) {
  return TABELA_PONTOS_DEVILS[posicao] || 0;
}

export function ordenarTimes(lista) {
  return [...lista].sort((a, b) => b.pt - a.pt || b.total_pk - a.total_pk);
}

export function encontrarMelhorTime(lista) {
  if (!lista.length) return null;
  return lista[0];
}

export function encontrarTopFragger(lista) {
  let top = { nome: '', kills: 0, time: '' };
  lista.forEach(time => {
    time.jogadores.forEach(j => {
      if (j.total_kills > top.kills) {
        top = { nome: j.nome, kills: j.total_kills, time: time.nome };
      }
    });
  });
  return top;
}

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
    const dano = linha.Dano_Medio || "Sem Informacoes";

    if (!resumoTimes[time]) {
      resumoTimes[time] = {
        nome: time,
        q1_pos: q1_pos,
        q2_pos: q2_pos,
        q3_pos: q3_pos,
        q1_pp: calcularPontosPosicao(q1_pos),
        q2_pp: calcularPontosPosicao(q2_pos),
        q3_pp: calcularPontosPosicao(q3_pos),
        // Kills somadas POR QUEDA (todos os jogadores do time)
        q1_kills_time: 0,
        q2_kills_time: 0,
        q3_kills_time: 0,
        total_pk: 0,
        jogadores: [],
        mvps_time: 0
      };
    }

    const killsJogador = q1_k + q2_k + q3_k;

    // Somar kills do time por queda
    resumoTimes[time].q1_kills_time += q1_k;
    resumoTimes[time].q2_kills_time += q2_k;
    resumoTimes[time].q3_kills_time += q3_k;
    resumoTimes[time].total_pk += killsJogador;

    totalKillsGeral += killsJogador;
    totalJogadores++;

    resumoTimes[time].jogadores.push({
      nome: linha.Jogador || 'Desconhecido',
      total_kills: killsJogador,
      // Kills INDIVIDUAIS por queda
      q1_kills: q1_k,
      q2_kills: q2_k,
      q3_kills: q3_k,
      dano: dano,
      mvp: 0 // sera calculado depois
    });
  });

  // Calcular MVP de cada time = jogador com mais kills
  Object.values(resumoTimes).forEach(time => {
    let topKills = -1;
    let mvpJogador = null;

    time.jogadores.forEach(j => {
      if (j.total_kills > topKills) {
        topKills = j.total_kills;
        mvpJogador = j;
      }
    });

    if (mvpJogador) {
      mvpJogador.mvp = 1;
      time.mvp = { nome: mvpJogador.nome, kills: mvpJogador.total_kills };
      time.mvps_time = 1;
    }
  });

  let listaFinal = Object.values(resumoTimes).map(time => {
    const total_pp = time.q1_pp + time.q2_pp + time.q3_pp;
    const pt = total_pp + time.total_pk;

    // Booyahs (vitorias)
    let strikes = 0;
    if (time.q1_pos === 1) strikes++;
    if (time.q2_pos === 1) strikes++;
    if (time.q3_pos === 1) strikes++;

    // Posicao media
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