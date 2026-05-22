import { placementPoints } from "./points"

export function calculateGlobalRanking(
  players: any[],
  placements: any[]
) {
  const teamsMap = new Map()

  // PLAYERS
  players.forEach((player) => {
    const team = String(
      player.Time || ""
    ).trim()

    if (!team) return

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
      Number(player.Q1_Kills || 0) +
      Number(player.Q2_Kills || 0) +
      Number(player.Q3_Kills || 0)
  })

  // PLACEMENTS
  placements.forEach((placement) => {
    const team = String(
      placement.Time || ""
    ).trim()

    if (!team) return

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

    current.placement +=
      (placementPoints[
        Number(placement.Q1_Pos)
      ] || 0) +
      (placementPoints[
        Number(placement.Q2_Pos)
      ] || 0) +
      (placementPoints[
        Number(placement.Q3_Pos)
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
      team.matches > 0
        ? (
            team.total / team.matches
          ).toFixed(1)
        : "0.0"
  })

  return teams
    .filter(
      (team: any) =>
        team.team &&
        !Number.isNaN(team.total)
    )
    .sort(
      (a: any, b: any) =>
        b.total - a.total
    )
}