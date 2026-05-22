export function generateMessage(teams: string[]) {
  const totalSlots = 15

  const formattedTeams = Array.from({
    length: totalSlots,
  }).map((_, index) => {
    const team = teams[index] || ""

    return `*📍 ${String(index + 1).padStart(2, "0")} — ${team}*`
  })

  return `_*DEVILS MOBILE LEAGUE 🚩*_

_PLATAFORMA:_ *_MOBILE_* 📱
_MODO:_ *_SQUAD_* 👥👥

🗓️ - _DATA:_ *20/05/26*

⏱️- _HORÁRIOS_

🇲🇽 5:00 PM
🇦🇷 8:00 PM
🇧🇷 8:00 PM
🇩🇴 7:00 PM
🇨🇴 6:00 PM
🇺🇸 7:00 PM
🇻🇪 7:00 PM
🇵🇪 6:00 PM

🪂| *3 QUEDAS*
🌴| *3 ILHAS DO MEDO*

- SLOTS | EQUIPES

${formattedTeams.join("\n")}

RESERVAS:

*⚠️ TODOS AUXÍLIOS BANIDOS*
*⚠️ PROIBIDO LANÇA CHAMAS*

Pedido para desistência *até às 19:30*

*_SCRIM:_*
https://chat.whatsapp.com/BGrWBFrLQVc3HrpCfdeqbw

*_DISCORD:_*
https://discord.gg/vYGkNex878
`
}
