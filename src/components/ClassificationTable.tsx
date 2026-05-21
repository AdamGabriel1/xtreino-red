'use client';

import { TimeComPontuacao } from '@/types';
import { Trophy, Skull, Target } from 'lucide-react';

interface Props {
  times: TimeComPontuacao[];
}

export default function ClassificationTable({ times }: Props) {
  const sorted = [...times].sort((a, b) => b.total_pts_geral - a.total_pts_geral);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-red-600 text-left">
            <th className="pb-3 px-4 text-red-500 font-black uppercase">#</th>
            <th className="pb-3 px-4 text-red-500 font-black uppercase">Equipe</th>
            <th className="pb-3 px-4 text-center text-red-500 font-black uppercase">Q1 Pos</th>
            <th className="pb-3 px-4 text-center text-red-500 font-black uppercase">Q1 Kills</th>
            <th className="pb-3 px-4 text-center text-red-500 font-black uppercase">Q2 Pos</th>
            <th className="pb-3 px-4 text-center text-red-500 font-black uppercase">Q2 Kills</th>
            <th className="pb-3 px-4 text-center text-red-500 font-black uppercase">Q3 Pos</th>
            <th className="pb-3 px-4 text-center text-red-500 font-black uppercase">Q3 Kills</th>
            <th className="pb-3 px-4 text-center text-red-500 font-black uppercase">
              <Target className="w-4 h-4 inline mr-1" />
              Kills Total
            </th>
            <th className="pb-3 px-4 text-center text-red-500 font-black uppercase">
              <Trophy className="w-4 h-4 inline mr-1" />
              Pts Pos
            </th>
            <th className="pb-3 px-4 text-center text-red-500 font-black uppercase text-base">
              <Skull className="w-4 h-4 inline mr-1" />
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((time, idx) => (
            <tr
              key={time.id}
              className={`border-b border-neutral-800 hover:bg-red-950/10 transition-colors ${
                idx === 0 ? 'bg-red-950/20' : ''
              }`}
            >
              <td className="py-4 px-4 font-black text-lg">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
              </td>
              <td className="py-4 px-4 font-bold text-white">{time.nome}</td>
              <td className="py-4 px-4 text-center text-gray-400">{time.q1_pos ?? '-'}</td>
              <td className="py-4 px-4 text-center text-red-400 font-bold">{time.q1_kills}</td>
              <td className="py-4 px-4 text-center text-gray-400">{time.q2_pos ?? '-'}</td>
              <td className="py-4 px-4 text-center text-red-400 font-bold">{time.q2_kills}</td>
              <td className="py-4 px-4 text-center text-gray-400">{time.q3_pos ?? '-'}</td>
              <td className="py-4 px-4 text-center text-red-400 font-bold">{time.q3_kills}</td>
              <td className="py-4 px-4 text-center font-bold text-white">{time.total_kills}</td>
              <td className="py-4 px-4 text-center font-bold text-yellow-500">{time.total_pts_posicao}</td>
              <td className="py-4 px-4 text-center font-black text-lg text-red-500">{time.total_pts_geral}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}