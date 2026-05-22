interface Props {
  ranking: any[]
}

export function TopThree({
  ranking,
}: Props) {
  const top3 = ranking.slice(0, 3)

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">

      {top3.map((team, index) => (
        <div
          key={team.team}
          className={`
            rounded-3xl p-8 border relative overflow-hidden
            ${
              index === 0
                ? "bg-yellow-500/10 border-yellow-500"
                : index === 1
                ? "bg-zinc-400/10 border-zinc-400"
                : "bg-orange-700/10 border-orange-700"
            }
          `}
        >

          <div className="absolute top-0 right-0 text-8xl font-black opacity-10">
            #{index + 1}
          </div>

          <div className="relative">

            <div className="text-5xl mb-4">
              {index === 0 && "👑"}
              {index === 1 && "🥈"}
              {index === 2 && "🥉"}
            </div>

            <h2 className="text-3xl font-black">
              {team.team}
            </h2>

            <div className="mt-6 space-y-2">

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Kills
                </span>

                <span className="font-bold">
                  {team.totalKills}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400">
                  Posição
                </span>

                <span className="font-bold">
                  {team.totalPlacement}
                </span>
              </div>

            </div>

            <div className="mt-8 text-5xl font-black text-red-500">
              {team.totalPoints}
            </div>

            <p className="text-zinc-400">
              PONTOS
            </p>

          </div>

        </div>
      ))}

    </div>
  )
}
