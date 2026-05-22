export function calculatePlayerStats(
  allPlayers: any[],
  playerName: string
) {
  const matches = allPlayers.filter(
    (player) =>
      player.Jogador === playerName
  )

  const parsedMatches = matches.map(
    (match) => {
      const q1 = Number(
        match.Q1_Kills || 0
      )

      const q2 = Number(
        match.Q2_Kills || 0
      )

      const q3 = Number(
        match.Q3_Kills || 0
      )

      return {
        ...match,

        q1,
        q2,
        q3,

        totalKills: q1 + q2 + q3,
      }
    }
  )

  const totalKills = parsedMatches.reduce(
    (acc, match) =>
      acc + match.totalKills,
    0
  )

  const totalMatches =
    parsedMatches.length

  const averageKills =
    totalMatches > 0
      ? (
          totalKills / totalMatches
        ).toFixed(1)
      : "0.0"

  const bestMatch =
    Math.max(
      ...parsedMatches.map(
        (m) => m.totalKills
      ),
      0
    )

  const mvpCount =
    parsedMatches.filter(
      (m) => m.totalKills >= 20
    ).length

  const totalQ1 = parsedMatches.reduce(
    (acc, m) => acc + m.q1,
    0
  )

  const totalQ2 = parsedMatches.reduce(
    (acc, m) => acc + m.q2,
    0
  )

  const totalQ3 = parsedMatches.reduce(
    (acc, m) => acc + m.q3,
    0
  )

  return {
    matches: parsedMatches,

    totalKills,
    totalMatches,
    averageKills,

    bestMatch,

    mvpCount,

    totalQ1,
    totalQ2,
    totalQ3,

    latestTeam:
      parsedMatches[
        parsedMatches.length - 1
      ]?.Time || "-",
  }
}
