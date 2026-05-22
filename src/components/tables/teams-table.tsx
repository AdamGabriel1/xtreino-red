interface Props {
  teams: any[]
}

export function TeamsTable({ teams }: Props) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[900px]">

        <thead>

          <tr className="border-b border-zinc-800 text-zinc-400">

            <th className="text-left py-4">#</th>

            <th className="text-left py-4">
              Time
            </th>

            <th className="text-center py-4">
              Q1
            </th>

            <th className="text-center py-4">
              Q2
            </th>

            <th className="text-center py-4">
              Q3
            </th>

            <th className="text-center py-4">
              Kills
            </th>

            <th className="text-center py-4">
              Posição
            </th>

            <th className="text-center py-4">
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          {teams.map((team, index) => (
            <tr
              key={team.team}
              className="border-b border-zinc-900"
            >

              <td className="py-5 font-black">
                {index + 1}
              </td>

              <td className="py-5 font-bold">
                {team.team}
              </td>

              <td className="text-center">
                {team.q1Kills}
              </td>

              <td className="text-center">
                {team.q2Kills}
              </td>

              <td className="text-center">
                {team.q3Kills}
              </td>

              <td className="text-center font-bold text-red-500">
                {team.totalKills}
              </td>

              <td className="text-center">
                {team.placementPoints}
              </td>

              <td className="text-center font-black text-xl">
                {team.totalPoints}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}
