'use client';

import { useEffect, useState } from 'react';
import { getJogadores } from '@/lib/supabase';
import { Jogador } from '@/types';
import PlayersTable from '@/components/PlayersTable';
import { Users, Loader2 } from 'lucide-react';

export default function ElencosPage() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJogadores().then((data) => {
      setJogadores(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-black flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-red-500" />
          Elencos dos Times
        </h1>
        <p className="text-neutral-400 mt-2">Estatísticas individuais por queda</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      ) : jogadores.length === 0 ? (
        <div className="devil-card p-8 text-center">
          <p className="text-neutral-500">Nenhum jogador cadastrado ainda.</p>
          <p className="text-sm text-neutral-600 mt-2">
            Adicione jogadores no painel do Supabase para visualizar os elencos.
          </p>
        </div>
      ) : (
        <PlayersTable jogadores={jogadores} />
      )}
    </div>
  );
}