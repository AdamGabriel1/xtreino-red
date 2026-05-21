export const TEAM_CONFIG = {
  "UGD": {
    logo: "",
    xtreino: "",
    cor: "#f43f5e"
  },
  "RED": {
    logo: "",
    xtreino: "",
    cor: "#ef4444"
  },
  "RED Lango": {
    logo: "",
    xtreino: "",
    cor: "#dc2626"
  },
  "LMF": {
    logo: "",
    xtreino: "",
    cor: "#3b82f6"
  },
  "KOV": {
    logo: "",
    xtreino: "",
    cor: "#8b5cf6"
  },
  "CMF": {
    logo: "",
    xtreino: "",
    cor: "#06b6d4"
  },
  "Time_E": {
    logo: "",
    xtreino: "",
    cor: "#f59e0b"
  }
};

export function getTeamConfig(nome) {
  return TEAM_CONFIG[nome] || { logo: "", xtreino: "", cor: "#f43f5e" };
}

export function gerarAvatarTime(nome, cor) {
  const iniciais = nome.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
  return {
    iniciais,
    style: {
      background: `linear-gradient(135deg, ${cor}40, ${cor}20)`,
      borderColor: `${cor}60`
    }
  };
}