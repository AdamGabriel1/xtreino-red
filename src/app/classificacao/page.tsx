"use client"

import { useEffect, useMemo, useState } from "react"

import { loadCSV } from "@/lib/csv"
import { calculateTeamRanking } from "@/lib/ranking"

import { TopThree } from "@/components/tables/top-three"
import { StatsCards } from "@/components/tables/stats-cards"

import Link from "next/link"

export default function ClassificacaoPage() {
  const [players, setPlayers] = useState<any[]>([])
  const [placements, setPlacements] = useState<any[]>([])

  const [selectedDay, setSelectedDay] =
    useState("19")

  const [filter, setFilter] =
    useState("TOTAL")

  useEffect(() => {
    async function loadData() {
      const playersData = await loadCSV(
        "/data/jogadores.csv"
      )

      const placementData = await loadCSV(
        "/data/colocacoes.csv"
      )

      setPlayers(playersData)
      setPlacements(placementData)
    }

    loadData()
  }, [])

  const availableDays = useMemo(() => {
    const uniqueDays = [
      ...new Set(players.map((p) => p.Dia)),
    ]

    return uniqueDays
  }, [players])

  const ranking = useMemo(() => {
    return calculateTeamRanking(
      players,
      placements,
      selectedDay,
      filter
    )
  }, [players, placements, selectedDay, filter])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

        <div>
          <h1 className="text-4xl font-black">
            CLASSIFICAÇÃO
          </h1>

          <p className="text-zinc-400 mt-2">
            Ranking oficial dos xtreinos.
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">

        <select
          value={selectedDay}
          onChange={(e) =>
            setSelectedDay(e.target.value)
          }
          className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-4"
        >
          {availableDays.map((day) => (
            <option
              key={day}
              value={day}
            >
              Dia {day}
            </option>
          ))}
        </select>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-4"
        >
          <option value="TOTAL">
            Total
          </option>

          <option value="Q1">
            Queda 1
          </option>

          <option value="Q2">
            Queda 2
          </option>

          <option value="Q3">
            Queda 3
          </option>
        </select>

      </div>

      <TopThree ranking={ranking} />

      <StatsCards ranking={ranking} />

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <table className="w-full min-w-[400px]">

          <thead>
            <tr className="border-b border-zinc-800 text-left">

              <th className="py-4">#</th>
              <th>TIME</th>

              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>

              <th>KILLS</th>
              <th>POSIÇÃO</th>
              <th>TOTAL</th>

            </tr>
          </thead>

          <tbody>

            {ranking.map((team: any, index) => (
              <tr
                key={team.team}
                className={`
                border-b border-zinc-900
                ${index === 0 ? "bg-yellow-500/10" : ""}
                ${index === 1 ? "bg-zinc-400/10" : ""}
                ${index === 2 ? "bg-orange-700/10" : ""}
                `}
              >
                <td className="py-5 font-black text-red-500">
                  {index === 0 && "👑"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  {index > 2 && `#${index + 1}`}
                </td>

                <td className="font-bold">

                  <Link
                    href={`/times/${encodeURIComponent(team.team)}`}
                    className="hover:text-red-500 transition"
                  >
                    {team.team}
                  </Link>

                </td>
                
                <td>{team.q1Kills}</td>
                <td>{team.q2Kills}</td>
                <td>{team.q3Kills}</td>

                <td className="font-bold">
                  {team.totalKills}
                </td>

                <td>
                  {team.totalPlacement}
                </td>

                <td className="text-red-500 font-black text-xl">
                  {team.totalPoints}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}