"use client"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import Link from "next/link"

import { loadCSV } from "@/lib/csv"

import { calculateTeamRanking } from "@/lib/ranking"

import {
  getAvailableMonths,
  getAvailableDays,
} from "@/lib/filters"

import { TopThree } from "@/components/tables/top-three"

import { StatsCards } from "@/components/tables/stats-cards"

import { TeamLogo } from "@/components/ui/team-logo"

export default function ClassificacaoPage() {
  const [players, setPlayers] =
    useState<any[]>([])

  const [placements, setPlacements] =
    useState<any[]>([])

  const [selectedMonth, setSelectedMonth] =
    useState("Maio")

  const [selectedDay, setSelectedDay] =
    useState("19")

  const [filter, setFilter] =
    useState("TOTAL")

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

  const availableMonths = useMemo(() => {
    return getAvailableMonths(players)
  }, [players])

  const availableDays = useMemo(() => {
    return getAvailableDays(
      players,
      selectedMonth
    )
  }, [players, selectedMonth])

  useEffect(() => {
    if (availableDays.length > 0) {
      setSelectedDay(
        String(availableDays[0])
      )
    }
  }, [selectedMonth])

  const ranking = useMemo(() => {
    return calculateTeamRanking(
      players,
      placements,
      selectedMonth,
      selectedDay,
      filter
    )
  }, [
    players,
    placements,
    selectedMonth,
    selectedDay,
    filter,
  ])

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

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(
              e.target.value
            )
          }
          className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-4"
        >

          {availableMonths.map(
            (month) => (
              <option
                key={month}
                value={month}
              >
                {month}
              </option>
            )
          )}

        </select>

        <select
          value={selectedDay}
          onChange={(e) =>
            setSelectedDay(
              e.target.value
            )
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

        <div className="overflow-x-auto">

          <table className="w-full min-w-[460px]">

            <thead>

              <tr className="border-b border-zinc-800 text-left">

                <th className="py-4 px-4">
                  #
                </th>

                <th className="px-4">
                  TIME
                </th>

                <th className="px-4">
                  Q1
                </th>

                <th className="px-4">
                  Q2
                </th>

                <th className="px-4">
                  Q3
                </th>

                <th className="px-4">
                  KILLS
                </th>

                <th className="px-4">
                  POSIÇÃO
                </th>

                <th className="px-4">
                  TOTAL
                </th>

              </tr>

            </thead>

            <tbody>

              {ranking.map(
                (
                  team: any,
                  index
                ) => (
                  <tr
                    key={team.team}
                    className={`
                    border-b border-zinc-800
                    hover:bg-zinc-800/30
                    transition

                    ${
                      index === 0
                        ? "bg-yellow-500/10"
                        : ""
                    }

                    ${
                      index === 1
                        ? "bg-zinc-400/10"
                        : ""
                    }

                    ${
                      index === 2
                        ? "bg-orange-700/10"
                        : ""
                    }
                  `}
                  >

                    <td className="py-5 px-4 font-black text-red-500">

                      {index === 0 &&
                        "👑"}

                      {index === 1 &&
                        "🥈"}

                      {index === 2 &&
                        "🥉"}

                      {index > 2 &&
                        `#${index + 1}`}

                    </td>

                    <td className="px-4">

                      <Link
                        href={`/times/${encodeURIComponent(team.team)}`}
                        className="flex items-center gap-4 font-bold hover:text-red-500 transition"
                      >

                        <TeamLogo
                          team={team.team}
                        />

                        <span>
                          {team.team}
                        </span>

                      </Link>

                    </td>

                    <td className="px-4">
                      {team.q1Kills}
                    </td>

                    <td className="px-4">
                      {team.q2Kills}
                    </td>

                    <td className="px-4">
                      {team.q3Kills}
                    </td>

                    <td className="px-4 font-bold">
                      {
                        team.totalKills
                      }
                    </td>

                    <td className="px-4">
                      {
                        team.totalPlacement
                      }
                    </td>

                    <td className="px-4 text-red-500 font-black text-xl">
                      {
                        team.totalPoints
                      }
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