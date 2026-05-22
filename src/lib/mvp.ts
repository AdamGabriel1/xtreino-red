export function calculateMVP(players: any[]) {
  return players
    .map((player) => ({
      ...player,

      totalKills:
        player.Q1_Kills +
        player.Q2_Kills +
        player.Q3_Kills,
    }))
    .sort((a, b) => b.totalKills - a.totalKills)[0]
}
