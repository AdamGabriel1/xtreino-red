interface Props {
  teams: any[]
}

export function TopTeams({ teams }: Props) {
  const top3 = teams.slice(0, 3)

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-10">

      {top3.map((team, index) => (
        <div
          key={team.team}
          className="bg-gradient-to-br from-red-950/30 to-black border border-red-900 rounded-3xl p-8"
        >
          <div className="text-5xl mb-4">
            {index === 0 && "🥇"}
            {index === 1 && "🥈"}
            {index === 2 && "🥉"}
          </div>

          <h2 className="text-3xl font-black">
            {team.team}
          </h2>

          <p className="text-zinc-400 mt-3">
            {team.totalPoints} pontos
          </p>

          <div className="mt-6 space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Kills</span>
              <span>{team.totalKills}</span>
            </div>

            <div className="flex justify-between">
              <span>Posição</span>
              <span>{team.placementPoints}</span>
            </div>

          </div>

        </div>
      ))}

    </div>
  )
}
