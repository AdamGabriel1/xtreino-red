'use client';

import { Jogador } from '@/types/index.ts';
import { Crown, Swords } from 'lucide-react';

interface Props {
  jogadores: Jogador[];
}

export default function PlayersTable({ jogadores }: Props) {
  const porTime = jogadores.reduce((acc, jogador) => {
    const time = jogador.time_nome || 'Sem Time';
    if (!acc[time]) acc[time] = [];
    acc[time].push(jogador);
    return acc;
  }, {} as Record<string, Jogador[]>);

  return (
    <div className="space-y-8">
      {Object.entries(porTime).map(([timeNome, lista]) => {
        const totalKillsTime = lista.reduce((s, j) => s + j.q1_kills + j.q2_kills + j.q3_kills, 0);
        
        return (
          <div key={timeNome} className="devil-card overflow-hidden">
            <div className="bg-gradient-to-r from-red-900/40 to-transparent px-6 py-4 border-b border-red-900/30 flex items-center justify-between">
              <h3 className="font-black text-xl tracking-wider text-white flex items-center gap-2">
                <Swords className="w-5 h-5 text-red-500" />
                {timeNome}
              </h3>
              <span className="text-sm font-bold text-red-400">
                {lista.length} jogadores | {totalKillsTime} kills
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 text-left">
                    <th className="py-3 px-4 text-gray-500 font-bold uppercase text-xs">Jogador</th>
                    <th className="py-3 px-4 text-center text-gray-500 font-bold uppercase text-xs">Q1 Kills</th>
                    <th className="py-3 px-4 text-center text-gray-500 font-bold uppercase text-xs">Q2 Kills</th>
                    <th className="py-3 px-4 text-center text-gray-500 font-bold uppercase text-xs">Q3 Kills</th>
                    <th className="py-3 px-4 text-center text-gray-500 font-bold uppercase text-xs">Total Kills</th>
                    <th className="py-3 px-4 text-center text-gray-500 font-bold uppercase text-xs">MVP</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((jogador) => {
                    const total = jogador.q1_kills + jogador.q2_kills + jogador.q3_kills;
                    const isMvp = jogador.mvp_vezes > 0;
                    
                    return (
                      <tr key={jogador.id} className="border-b border-neutral-800/50 hover:bg-white/5">
                        <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                          {isMvp && <Crown className="w-4 h-4 text-yellow-500" />}
                          {jogador.nome}
                        </td>
                        <td className="py-3 px-4 text-center text-gray-400">{jogador.q1_kills}</td>
                        <td className="py-3 px-4 text-center text-gray-400">{jogador.q2_kills}</td>
                        <td className="py-3 px-4 text-center text-gray-400">{jogador.q3_kills}</td>
                        <td className="py-3 px-4 text-center font-bold text-red-400">{total}</td>
                        <td className="py-3 px-4 text-center">
                          {jogador.mvp_vezes > 0 && (
                            <span className="inline-flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs font-bold">
                              <Crown className="w-3 h-3" />
                              {jogador.mvp_vezes}x
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}