export interface Time {
  id: number;
  nome: string;
  q1_pos: number | null;
  q1_kills: number;
  q2_pos: number | null;
  q2_kills: number;
  q3_pos: number | null;
  q3_kills: number;
  total_kills: number;
  updated_at: string;
}

export interface Jogador {
  id: number;
  nome: string;
  time_id: number;
  time_nome?: string;
  q1_kills: number;
  q2_kills: number;
  q3_kills: number;
  dano_medio: string;
  mvp_vezes: number;
}

export interface TimeComPontuacao extends Time {
  q1_pts: number;
  q2_pts: number;
  q3_pts: number;
  total_pts_posicao: number;
  total_pts_geral: number;
}