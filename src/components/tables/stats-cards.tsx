interface Props {
  ranking: any[]
}

export function StatsCards({
  ranking,
}: Props) {
  const totalKills = ranking.reduce(
    (acc, team) => acc + team.totalKills,
    0
  )

  const totalTeams = ranking.length

  const bestTeam = ranking[0]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        <p className="text-zinc-500">
          Total de Kills
        </p>

        <h2 className="text-4xl font-black mt-4">
          {totalKills}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        <p className="text-zinc-500">
          Equipes
        </p>

        <h2 className="text-4xl font-black mt-4">
          {totalTeams}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        <p className="text-zinc-500">
          Líder
        </p>

        <h2 className="text-2xl font-black mt-4">
          {bestTeam?.team || "-"}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        <p className="text-zinc-500">
          Melhor Pontuação
        </p>

        <h2 className="text-4xl font-black mt-4 text-red-500">
          {bestTeam?.totalPoints || 0}
        </h2>
      </div>

    </div>
  )
}
