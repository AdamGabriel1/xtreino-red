// Tabela de pontuação por posição (PP) do Battle Royale
const TABELA_PONTOS = { 1: 12, 2: 9, 3: 7, 4: 5, 5: 4, 6: 3, 7: 2 };

export function calcularPontosPosicao(posicao) {
  return TABELA_PONTOS[posicao] || 1;
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

export function encontrarTopMVP(lista) {
  let top = { nome: '', mvps: 0, time: '' };
  lista.forEach(time => {
    time.jogadores.forEach(j => {
      if (j.mvp > top.mvps) {
        top = { nome: j.nome, mvps: j.mvp, time: time.nome };
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
    const mvp = parseInt(linha.MVP_Vezes) || 0;
    const dano = parseFloat(linha.Dano_Medio) || 0;

    if (!resumoTimes[time]) {
      resumoTimes[time] = {
        nome: time,
        q1_pp: calcularPontosPosicao(q1_pos),
        q2_pp: calcularPontosPosicao(q2_pos),
        q3_pp: calcularPontosPosicao(q3_pos),
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
      q3_pos: q3_pos
    });
  });

  let listaFinal = Object.values(resumoTimes).map(time => {
    const total_pp = time.q1_pp + time.q2_pp + time.q3_pp;
    const pt = total_pp + time.total_pk;
    return { ...time, total_pp, pt };
  });

  listaFinal = ordenarTimes(listaFinal);

  return {
    listaFinal,
    totalKillsGeral,
    totalJogadores,
    totalTimes: listaFinal.length
  };
}
