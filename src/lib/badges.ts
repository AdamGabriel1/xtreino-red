export function getPlayerBadges(
  player: any
) {
  const badges: string[] = []

  const total =
    player.Q1_Kills +
    player.Q2_Kills +
    player.Q3_Kills

  if (total >= 30) {
    badges.push("🔥")
  }

  if (total >= 20) {
    badges.push("⚡")
  }

  if (player.Q1_Kills >= 10) {
    badges.push("🎯")
  }

  return badges
}
