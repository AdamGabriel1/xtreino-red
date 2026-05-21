import { createClient } from '@supabase/supabase-js';
import { Time, Jogador } from '../types/index.ts';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Tabela de pontos por posição (Battle Royale padrão)
export const pontosPorPosicao: Record<number, number> = {
  1: 15, 2: 12, 3: 10, 4: 8, 5: 6, 6: 5, 7: 4, 8: 3, 9: 2, 10: 1,
  11: 1, 12: 1, 13: 1, 14: 1, 15: 1
};

export function calcularPontos(posicao: number | null): number {
  if (!posicao) return 0;
  return pontosPorPosicao[posicao] || 1;
}

export async function getTimes(): Promise<Time[]> {
  const { data, error } = await supabase
    .from('times')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function getJogadores(): Promise<Jogador[]> {
  const { data, error } = await supabase
    .from('jogadores')
    .select('*, times(nome)')
    .order('id', { ascending: true });
  
  if (error) throw error;
  return (data || []).map((j: any) => ({
    ...j,
    time_nome: j.times?.nome || 'Sem Time'
  }));
}

export async function inscreverTime(nome: string): Promise<Time> {
  const { data, error } = await supabase
    .from('times')
    .insert([{ nome }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}