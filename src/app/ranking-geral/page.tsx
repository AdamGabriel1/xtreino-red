"use client"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import Link from "next/link"

import { loadCSV } from "@/lib/csv"

import { calculateGlobalRanking } from "@/lib/global-ranking"

import { TeamLogo } from "@/components/ui/team-logo"

export default function RankingGeralPage() {
  const [players, setPlayers] =
    useState<any[]>([])

  const [placements, setPlacements] =
    useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const playersData = await loadCSV(
        "/data/jogadores.csv"
      )

      const placementData =
        await loadCSV(
          "/data/colocacoes.csv"
        )

      setPlayers(playersData)

      setPlacements(placementData)
    }

    loadData()
  }, [])

  const ranking = useMemo(() => {
    return calculateGlobalRanking(
      players,
      placements
    )
  }, [players, placements])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="mb-10">

        <h1 className="text-5xl font-black">
          RANKING GERAL
        </h1>

        <p className="text-zinc-400 mt-3">
          Ranking acumulado de todos os xtreinos.
        </p>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[360px]">

            <thead>

              <tr className="border-b border-zinc-800">

                <th className="text-left py-5 px-6">
                  #
                </th>

                <th className="text-left">
                  TIME
                </th>

                <th className="text-center">
                  KILLS
                </th>

                <th className="text-center">
                  POSIÇÃO
                </th>

                <th className="text-center">
                  TOTAL
                </th>

                <th className="text-center">
                  MÉDIA
                </th>

              </tr>

            </thead>

            <tbody>

              {ranking.map(
                (team: any, index) => (
                  <tr
                    key={team.team}
                    className="border-b border-zinc-800 hover:bg-zinc-800/30 transition"
                  >

                    <td className="py-5 px-6 text-red-500 font-black">
                      #{index + 1}
                    </td>

                    <td>

                      <Link
                        href={`/times/${encodeURIComponent(team.team)}`}
                        className="flex items-center gap-4 font-bold hover:text-red-500 transition"
                      >

                        <TeamLogo
                          team={team.team}
                        />

                        {team.team}

                      </Link>

                    </td>

                    <td className="text-center">
                      {team.kills}
                    </td>

                    <td className="text-center">
                      {team.placement}
                    </td>

                    <td className="text-center text-red-500 font-black text-xl">
                      {team.total}
                    </td>

                    <td className="text-center">
                      {team.average}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}
