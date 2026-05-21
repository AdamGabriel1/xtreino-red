'use client';

import { useEffect, useState } from 'react';
import { getTimes } from '@/lib/supabase';
import { Time } from '@/types';
import TeamForm from '@/components/TeamForm';
import CopyList from '@/components/CopyList';
import { Clock, MapPin, Users, ShieldAlert, Flame, MessageCircle, Headphones } from 'lucide-react';

export default function HomePage() {
  const [times, setTimes] = useState<<Time[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimes().then((data) => {
      setTimes(data);
      setLoading(false);
    });
  }, []);

  const horarios = [
    { flag: '🇲🇽', pais: 'México', hora: '5:00 PM' },
    { flag: '🇦🇷', pais: 'Argentina', hora: '8:00 PM' },
    { flag: '🇧🇷', pais: 'Brasil', hora: '8:00 PM' },
    { flag: '🇩🇴', pais: 'Rep. Dom.', hora: '7:00 PM' },
    { flag: '🇨🇴', pais: 'Colômbia', hora: '6:00 PM' },
    { flag: '🇺🇸', pais: 'USA', hora: '7:00 PM' },
    { flag: '🇻🇪', pais: 'Venezuela', hora: '7:00 PM' },
    { flag: '🇵🇪', pais: 'Peru', hora: '6:00 PM' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
          DEVILS <span className="text-red-600">MOBILE</span> LEAGUE
        </h1>
        <p className="text-neutral-400 text-lg">Organização de Xtreinos Blood Strike Mobile</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="devil-card p-6 flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <Clock className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase font-bold">Data</p>
            <p className="font-bold text-white">20/05/26</p>
          </div>
        </div>
        <div className="devil-card p-6 flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <MapPin className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase font-bold">Mapa</p>
            <p className="font-bold text-white">3 Ilhas do Medo</p>
          </div>
        </div>
        <div className="devil-card p-6 flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <Users className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase font-bold">Formato</p>
            <p className="font-bold text-white">SQUAD - 3 Quedas BR</p>
          </div>
        </div>
      </div>

      {/* Horários */}
      <div className="devil-card p-6">
        <h2 className="text-xl font-black mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-red-500" />
          Horários por Região
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {horarios.map((h) => (
            <div key={h.pais} className="bg-neutral-900 rounded-lg p-3 text-center border border-neutral-800">
              <span className="text-2xl block mb-1">{h.flag}</span>
              <p className="text-xs text-neutral-500">{h.pais}</p>
              <p className="font-bold text-white">{h.hora}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Regras */}
      <div className="devil-card p-6 border-red-900/50">
        <h2 className="text-xl font-black mb-4 flex items-center gap-2 text-red-500">
          <ShieldAlert className="w-5 h-5" />
          Regras Importantes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-red-950/20 p-4 rounded-lg border border-red-900/30">
            <Flame className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">PROIBIDO LANÇA CHAMAS</p>
              <p className="text-sm text-neutral-400">Uso resulta em desclassificação imediata</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-red-950/20 p-4 rounded-lg border border-red-900/30">
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">TODOS AUXÍLIOS BANIDOS</p>
              <p className="text-sm text-neutral-400">Mouse, teclado, emuladores e scripts</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-yellow-950/20 p-4 rounded-lg border border-yellow-900/30">
            <Clock className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">DESISTÊNCIA ATÉ 19:30</p>
              <p className="text-sm text-neutral-400">Após o horário, ausência = W.O.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-neutral-900 p-4 rounded-lg border border-neutral-800">
            <Users className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">SQUAD 4 JOGADORES</p>
              <p className="text-sm text-neutral-400">Mínimo 4, máximo 4 por equipe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sistema de Inscrição */}
      <div className="devil-card p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-2">
            <Users className="w-5 h-5 text-red-500" />
            Inscrição de Equipes
          </h2>
          <span className="text-sm font-bold bg-red-500/10 text-red-500 px-3 py-1 rounded-full">
            {times.length}/15 slots
          </span>
        </div>

        <TeamForm onUpdate={setTimes} />

        {/* Lista Visual dos Slots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {Array.from({ length: 15 }, (_, i) => {
            const time = times[i];
            return (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  time
                    ? 'bg-red-950/20 border-red-900/30'
                    : 'bg-neutral-900 border-neutral-800 opacity-50'
                }`}
              >
                <span className="font-black text-red-500 w-8">#{i + 1}</span>
                <span className="font-bold text-sm truncate">
                  {time ? time.nome : 'Vazio'}
                </span>
              </div>
            );
          })}
        </div>

        <CopyList times={times} />
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="https://chat.whatsapp.com/BGrWBFrLQVc3HrpCfdeqbw"
          target="_blank"
          rel="noopener noreferrer"
          className="devil-card p-4 flex items-center gap-4 hover:bg-green-950/20 transition-colors border-green-900/30"
        >
          <MessageCircle className="w-8 h-8 text-green-500" />
          <div>
            <p className="font-bold text-white">Grupo WhatsApp</p>
            <p className="text-xs text-neutral-400">Entre no scrim oficial</p>
          </div>
        </a>
        <a
          href="https://discord.gg/vYGkNex878"
          target="_blank"
          rel="noopener noreferrer"
          className="devil-card p-4 flex items-center gap-4 hover:bg-indigo-950/20 transition-colors border-indigo-900/30"
        >
          <Headphones className="w-8 h-8 text-indigo-500" />
          <div>
            <p className="font-bold text-white">Servidor Discord</p>
            <p className="text-xs text-neutral-400">Comunicação oficial do xtreino</p>
          </div>
        </a>
      </div>
    </div>
  );
}