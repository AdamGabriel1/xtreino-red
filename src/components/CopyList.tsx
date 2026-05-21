'use client';

import { useState } from 'react';
import { Time } from '@/types';
import { Copy, Check } from 'lucide-react';

interface Props {
  times: Time[];
}

export default function CopyList({ times }: Props) {
  const [copied, setCopied] = useState(false);

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

  function gerarLista(): string {
    const slots = Array.from({ length: 15 }, (_, i) => {
      const time = times[i];
      return time ? `*📍 ${String(i + 1).padStart(2, '0')} — ${time.nome.toUpperCase()}*` : `*📍 ${String(i + 1).padStart(2, '0')} —*`;
    });

    const horariosTxt = horarios.map(h => `${h.flag} ${h.hora}`).join('\n');

    return `_*DEVILS MOBILE LEAGUE 🚩*_

_PLATAFORMA:_ *_MOBILE_* 📱
_MODO:_ *_SQUAD_* 👥👥

🗓️ - _DATA:_  *20/05/26*
⏱️- _HORÁRIOS_

${horariosTxt}

🪂| *3 QUEDAS*
🌴| *3 ILHAS DO MEDO*

- SLOTS | EQUIPES

${slots.join('\n')}

RESERVAS:

*⚠️ TODOS AUXÍLIOS BANIDOS*
*⚠️ PROIBIDO LANÇA CHAMAS*

Pedido para desistência *até às 19:30*

*_SCRIM:_*
https://chat.whatsapp.com/BGrWBFrLQVc3HrpCfdeqbw

*_DISCORD:_*
https://discord.gg/vYGkNex878`;
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(gerarLista());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="devil-btn w-full flex items-center justify-center gap-2"
    >
      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      {copied ? 'Copiado!' : 'Copiar Lista para WhatsApp/Discord'}
    </button>
  );
}