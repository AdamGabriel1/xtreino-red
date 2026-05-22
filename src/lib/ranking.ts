import { placementPoints } from "./points"

export function calculateTeamRanking(
  players: any[],
  placements: any[]
) {
  const teamsMap: Record<string, any> = {}

  players.forEach((player) => {
    const team = player.Time

    if (!teamsMap[team]) {
      teamsMap[team] = {
        team,

        q1Kills: 0,
        q2Kills: 0,
        q3Kills: 0,

        totalKills: 0,

        placementPoints: 0,

        totalPoints: 0,
      }
    }

    teamsMap[team].q1Kills += player.Q1_Kills
    teamsMap[team].q2Kills += player.Q2_Kills
    teamsMap[team].q3Kills += player.Q3_Kills
  })

  placements.forEach((placement) => {
    const team = placement.Time

    if (!teamsMap[team]) return

    const q1 =
      placementPoints[placement.Q1_Pos] || 0

    const q2 =
      placementPoints[placement.Q2_Pos] || 0

    const q3 =
      placementPoints[placement.Q3_Pos] || 0

    teamsMap[team].placementPoints =
      q1 + q2 + q3
  })

  const teams = Object.values(teamsMap)

  teams.forEach((team: any) => {
    team.totalKills =
      team.q1Kills +
      team.q2Kills +
      team.q3Kills

    team.totalPoints =
      team.totalKills +
      team.placementPoints
  })

  teams.sort(
    (a: any, b: any) =>
      b.totalPoints - a.totalPoints
  )

  return teams
}
