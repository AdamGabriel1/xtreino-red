// Configuracao de times com cores e links Xtreino
export const TIMES_CONFIG = {
  'UGD': {
    cor: '#FF6B35',
    xtreino: 'https://xtreino.gg/time/ugd',
    logo: null,
  },
  'RED': {
    cor: '#E63946',
    xtreino: 'https://xtreino.gg/time/red',
    logo: null,
  },
  'RED Lango': {
    cor: '#D62828',
    xtreino: 'https://xtreino.gg/time/red-lango',
    logo: null,
  },
  'LMF': {
    cor: '#F77F00',
    xtreino: 'https://xtreino.gg/time/lmf',
    logo: null,
  },
  'KOV': {
    cor: '#6A4C93',
    xtreino: 'https://xtreino.gg/time/kov',
    logo: null,
  },
  'CMF': {
    cor: '#1982C4',
    xtreino: 'https://xtreino.gg/time/cmf',
    logo: null,
  },
  'Time_E': {
    cor: '#8AC926',
    xtreino: 'https://xtreino.gg/time/time-e',
    logo: null,
  },
  // Fallback para times nao cadastrados
  'default': {
    cor: '#6C757D',
    xtreino: null,
    logo: null,
  }
};

// Funcao para obter configuracao do time (com fallback)
export function getTeamConfig(nomeTime) {
  if (!nomeTime) return TIMES_CONFIG.default;

  // Procura correspondencia exata
  if (TIMES_CONFIG[nomeTime]) {
    return TIMES_CONFIG[nomeTime];
  }

  // Procura correspondencia parcial (case-insensitive)
  const nomeLower = nomeTime.toLowerCase();
  const chaveEncontrada = Object.keys(TIMES_CONFIG).find(
    key => key !== 'default' && key.toLowerCase() === nomeLower
  );

  if (chaveEncontrada) {
    return TIMES_CONFIG[chaveEncontrada];
  }

  return TIMES_CONFIG.default;
}

// Funcao para gerar avatar com iniciais do time
export function gerarAvatarTime(nomeTime, cor) {
  if (!nomeTime) {
    return {
      iniciais: '?',
      style: {
        background: 'linear-gradient(135deg, ' + cor + ', ' + cor + 'dd)',
      }
    };
  }

  // Pega as primeiras letras de cada palavra (maximo 2 caracteres)
  const palavras = nomeTime.trim().split(/\s+/);
  let iniciais;

  if (palavras.length === 1) {
    // Se for uma palavra so, pega as 2 primeiras letras
    iniciais = palavras[0].substring(0, 2).toUpperCase();
  } else {
    // Se tiver multiplas palavras, pega a primeira letra das 2 primeiras
    iniciais = (palavras[0][0] + (palavras[1] ? palavras[1][0] : '')).toUpperCase();
  }

  return {
    iniciais,
    style: {
      background: 'linear-gradient(135deg, ' + cor + ', ' + cor + 'dd)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    }
  };
}

// Funcao para gerar cor baseada no nome (hash consistente)
export function gerarCorTime(nomeTime) {
  if (!nomeTime) return '#6C757D';

  let hash = 0;
  for (let i = 0; i < nomeTime.length; i++) {
    hash = nomeTime.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);
  return 'hsl(' + hue + ', 70%, 45%)';
}