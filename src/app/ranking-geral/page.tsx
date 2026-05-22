"use client"

import Link from "next/link"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import { loadCSV } from "@/lib/csv"

import { calculateGlobalRanking } from "@/lib/global-ranking"

import { TeamLogo } from "@/components/ui/team-logo"

export default function RankingGeralPage() {
  const [players, setPlayers] =
    useState<any[]>([])

  const [placements, setPlacements] =
    useState<any[]>([])

  const [selectedMonth, setSelectedMonth] =
    useState("Todos")

  const [selectedDay, setSelectedDay] =
    useState("Todos")

  useEffect(() => {
    async function loadData() {
      const playersData = await loadCSV(
        "/data/jogadores.csv"
      )

      const placementsData =
        await loadCSV(
          "/data/colocacoes.csv"
        )

      setPlayers(playersData)

      setPlacements(placementsData)
    }

    loadData()
  }, [])

  // MESES DISPONÍVEIS
  const availableMonths =
    useMemo(() => {
      return [
        "Todos",

        ...new Set(
          players.map(
            (player) => player.Mes
          )
        ),
      ]
    }, [players])

  // DIAS DISPONÍVEIS
  const availableDays = useMemo(() => {
    let filtered = players

    if (selectedMonth !== "Todos") {
      filtered = filtered.filter(
        (player) =>
          player.Mes === selectedMonth
      )
    }

    return [
      "Todos",

      ...new Set(
        filtered.map(
          (player) => player.Dia
        )
      ),
    ]
  }, [players, selectedMonth])

  // FILTRAR PLAYERS
  const filteredPlayers =
    useMemo(() => {
      return players.filter((player) => {

        const monthMatch =
          selectedMonth === "Todos" ||
          player.Mes === selectedMonth

        const dayMatch =
          selectedDay === "Todos" ||
          String(player.Dia) ===
            String(selectedDay)

        return (
          monthMatch && dayMatch
        )
      })
    }, [
      players,
      selectedMonth,
      selectedDay,
    ])

  // FILTRAR POSIÇÕES
  const filteredPlacements =
    useMemo(() => {
      return placements.filter(
        (placement) => {

          const monthMatch =
            selectedMonth ===
              "Todos" ||
            placement.Mes ===
              selectedMonth

          const dayMatch =
            selectedDay === "Todos" ||
            String(
              placement.Dia
            ) ===
              String(selectedDay)

          return (
            monthMatch &&
            dayMatch
          )
        }
      )
    }, [
      placements,
      selectedMonth,
      selectedDay,
    ])

  // RANKING
  const ranking = useMemo(() => {
    return calculateGlobalRanking(
      filteredPlayers,
      filteredPlacements
    )
  }, [
    filteredPlayers,
    filteredPlacements,
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-5xl font-black">
            RANKING GERAL
          </h1>

          <p className="text-zinc-400 mt-3">
            Ranking acumulado dos
            xtreinos.
          </p>

        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap gap-4">

          {/* MÊS */}
          <select
            value={selectedMonth}
            onChange={(e) => {

              setSelectedMonth(
                e.target.value
              )

              setSelectedDay("Todos")
            }}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3"
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

          {/* DIA */}
          <select
            value={selectedDay}
            onChange={(e) =>
              setSelectedDay(
                e.target.value
              )
            }
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3"
          >

            {availableDays.map(
              (day) => (
                <option
                  key={day}
                  value={day}
                >
                  {day === "Todos"
                    ? "Todos os dias"
                    : `Dia ${day}`}
                </option>
              )
            )}

          </select>

        </div>

      </div>

      {/* TABELA */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

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
                (
                  team: any,
                  index
                ) => (
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
                      {
                        team.placement
                      }
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

              {ranking.length === 0 && (
                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-16 text-zinc-500"
                  >
                    Nenhum resultado
                    encontrado.
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}