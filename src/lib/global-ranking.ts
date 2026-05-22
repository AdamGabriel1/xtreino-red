import { placementPoints } from "./points"

export function calculateGlobalRanking(
  players: any[],
  placements: any[]
) {
  const teamsMap = new Map()

  players.forEach((player) => {
    const team = player.Time

    if (!teamsMap.has(team)) {
      teamsMap.set(team, {
        team,

        kills: 0,
        placement: 0,
        total: 0,

        matches: 0,
      })
    }

    const current = teamsMap.get(team)

    current.kills +=
      player.Q1_Kills +
      player.Q2_Kills +
      player.Q3_Kills
  })

  placements.forEach((placement) => {
    const current = teamsMap.get(
      placement.Time
    )

    if (!current) return

    current.placement +=
      (placementPoints[
        placement.Q1_Pos
      ] || 0) +
      (placementPoints[
        placement.Q2_Pos
      ] || 0) +
      (placementPoints[
        placement.Q3_Pos
      ] || 0)

    current.matches += 1
  })

  const teams = Array.from(
    teamsMap.values()
  )

  teams.forEach((team: any) => {
    team.total =
      team.kills + team.placement

    team.average =
      (
        team.total /
        Math.max(team.matches, 1)
      ).toFixed(1)
  })

  return teams.sort(
    (a: any, b: any) =>
      b.total - a.total
  )
}
