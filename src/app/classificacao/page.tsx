"use client"

import { useEffect, useState } from "react"

import { loadCSV } from "@/lib/csv"
import { calculateTeamRanking } from "@/lib/ranking"

import { TeamsTable } from "@/components/tables/teams-table"
import { TopTeams } from "@/components/tables/top-teams"

export default function ClassificacaoPage() {
  const [teams, setTeams] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const players = await loadCSV("/data/jogadores.csv")

      const placements = await loadCSV(
        "/data/colocacoes.csv"
      )

      const ranking = calculateTeamRanking(
        players,
        placements
      )

      setTeams(ranking)
    }

    loadData()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="mb-10">

        <h1 className="text-4xl md:text-5xl font-black">
          CLASSIFICAÇÃO
        </h1>

        <p className="text-zinc-400 mt-3">
          Ranking oficial do campeonato.
        </p>

      </div>

      <TopTeams teams={teams} />

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

        <TeamsTable teams={teams} />

      </div>

    </div>
  )
}
