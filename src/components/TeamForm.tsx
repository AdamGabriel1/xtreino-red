'use client';

import { useState } from 'react';
import { inscreverTime, getTimes } from '@/lib/supabase';
import { Time } from '@/types';
import { Plus, Loader2 } from 'lucide-react';

interface Props {
  onUpdate: (times: Time[]) => void;
}

export default function TeamForm({ onUpdate }: Props) {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;

    setLoading(true);
    try {
      await inscreverTime(nome.trim());
      const updated = await getTimes();
      onUpdate(updated);
      setNome('');
    } catch (err) {
      alert('Erro ao inscrever time. Verifique se o nome já não existe.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Nome da nova equipe..."
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="devil-input flex-1"
        maxLength={30}
      />
      <button
        type="submit"
        disabled={loading}
        className="devil-btn flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        Inscrever
      </button>
    </form>
  );
}