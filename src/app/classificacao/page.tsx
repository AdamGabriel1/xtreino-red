'use client';

import { useEffect, useState } from 'react';
import { getTimes, calcularPontos } from '@/lib/supabase';
import { Time, TimeComPontuacao } from '@/types';
import ClassificationTable from '@/components/ClassificationTable';
import { Trophy, Loader2 } from 'lucide-react';

export default function ClassificacaoPage() {
  const [times, setTimes] = useState<<TimeComPontuacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimes().then((data) => {
      const comPontuacao: TimeComPontuacao[] = data.map((t) => {
        const q1_pts = calcularPontos(t.q1_pos);
        const q2_pts = calcularPontos(t.q2_pos);
        const q3_pts = calcularPontos(t.q3_pos);
        const total_pts_posicao = q1_pts + q2_pts + q3_pts;
        const total_pts_geral = total_pts_posicao + t.total_kills;
        
        return {
          ...t,
          q1_pts,
          q2_pts,
          q3_pts,
          total_pts_posicao,
          total_pts_geral,
        };
      });
      setTimes(comPontuacao);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-black flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Tabela de Classificação
        </h1>
        <p className="text-neutral-400 mt-2">3 Quedas Battle Royale - Ilhas do Medo</p>
      </div>

      <div className="devil-card p-4 md:p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          </div>
        ) : times.length === 0 ? (
          <p className="text-center text-neutral-500 py-12">Nenhum time registrado ainda.</p>
        ) : (
          <ClassificationTable times={times} />
        )}
      </div>

      {/* Legenda */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-500/20 rounded"></span>
          Pontos Posição: 1º=15, 2º=12, 3º=10...
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500/20 rounded"></span>
          Kills = 1 ponto cada
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-950/40 rounded"></span>
          1º Lugar destacado
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-neutral-800 rounded"></span>
          Dados atualizados em tempo real
        </div>
      </div>
    </div>
  );
}