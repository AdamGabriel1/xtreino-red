export function calculateTeamDetails(
  players: any[],
  teamName: string,
  selectedDay: string
) {
  const filteredPlayers = players.filter(
    (player) =>
      player.Time === teamName &&
      String(player.Dia) === String(selectedDay)
  )

  const playersWithTotals = filteredPlayers.map(
    (player) => ({
      ...player,

      totalKills:
        player.Q1_Kills +
        player.Q2_Kills +
        player.Q3_Kills,
    })
  )

  const totalKills = playersWithTotals.reduce(
    (acc, player) =>
      acc + player.totalKills,
    0
  )

  const averageKills =
    playersWithTotals.length > 0
      ? (
          totalKills /
          playersWithTotals.length
        ).toFixed(1)
      : 0

  const mvp = [...playersWithTotals].sort(
    (a, b) =>
      b.totalKills - a.totalKills
  )[0]

  return {
    players: playersWithTotals,
    totalKills,
    averageKills,
    mvp,
  }
}
