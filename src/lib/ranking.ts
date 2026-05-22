import { placementPoints } from "./points"

export function calculateTeamRanking(
  players: any[],
  placements: any[],
  selectedDay: string,
  filter: string
) {
  const filteredPlayers = players.filter(
    (player) => player.Dia === selectedDay
  )

  const filteredPlacements = placements.filter(
    (placement) => placement.Dia === selectedDay
  )

  const teamsMap = new Map()

  filteredPlayers.forEach((player) => {
    const team = player.Time

    if (!teamsMap.has(team)) {
      teamsMap.set(team, {
        team,

        q1Kills: 0,
        q2Kills: 0,
        q3Kills: 0,

        q1Placement: 0,
        q2Placement: 0,
        q3Placement: 0,

        totalKills: 0,
        totalPlacement: 0,
        totalPoints: 0,
      })
    }

    const current = teamsMap.get(team)

    current.q1Kills += player.Q1_Kills
    current.q2Kills += player.Q2_Kills
    current.q3Kills += player.Q3_Kills
  })

  filteredPlacements.forEach((placement) => {
    const current = teamsMap.get(placement.Time)

    if (!current) return

    current.q1Placement =
      placementPoints[placement.Q1_Pos] || 0

    current.q2Placement =
      placementPoints[placement.Q2_Pos] || 0

    current.q3Placement =
      placementPoints[placement.Q3_Pos] || 0
  })

  const teams = Array.from(teamsMap.values())

  teams.forEach((team: any) => {
    team.totalKills =
      team.q1Kills +
      team.q2Kills +
      team.q3Kills

    team.totalPlacement =
      team.q1Placement +
      team.q2Placement +
      team.q3Placement

    team.totalPoints =
      team.totalKills +
      team.totalPlacement

    if (filter === "Q1") {
      team.totalPoints =
        team.q1Kills + team.q1Placement
    }

    if (filter === "Q2") {
      team.totalPoints =
        team.q2Kills + team.q2Placement
    }

    if (filter === "Q3") {
      team.totalPoints =
        team.q3Kills + team.q3Placement
    }
  })

  return teams.sort(
    (a: any, b: any) =>
      b.totalPoints - a.totalPoints
  )
}