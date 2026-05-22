"use client"

import Link from "next/link"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import { loadCSV } from "@/lib/csv"

import { TeamLogo } from "@/components/ui/team-logo"

interface Props {
  teamName: string
}

export default function TeamPageClient({
  teamName,
}: Props) {
  const [players, setPlayers] =
    useState<any[]>([])

  const [selectedMonth, setSelectedMonth] =
    useState("Todos")

  const [selectedDay, setSelectedDay] =
    useState("Todos")

  useEffect(() => {
    async function loadData() {
      const data = await loadCSV(
        "/data/jogadores.csv"
      )

      setPlayers(data)
    }

    loadData()
  }, [])

  // FILTRAR TIME
  const teamPlayers =
    useMemo(() => {
      return players.filter(
        (player) =>
          player.Time === teamName
      )
    }, [players, teamName])

  // MESES
  const availableMonths =
    useMemo(() => {
      return [
        "Todos",

        ...new Set(
          teamPlayers.map(
            (player) =>
              player.Mes
          )
        ),
      ]
    }, [teamPlayers])

  // DIAS
  const availableDays = useMemo(() => {
    let filtered =
      teamPlayers

    if (selectedMonth !== "Todos") {
      filtered = filtered.filter(
        (player) =>
          player.Mes ===
          selectedMonth
      )
    }

    return [
      "Todos",

      ...new Set(
        filtered.map(
          (player) =>
            player.Dia
        )
      ),
    ]
  }, [
    teamPlayers,
    selectedMonth,
  ])

  // FILTRADOS
  const filteredPlayers =
    useMemo(() => {
      return teamPlayers.filter(
        (player) => {

          const monthMatch =
            selectedMonth ===
              "Todos" ||
            player.Mes ===
              selectedMonth

          const dayMatch =
            selectedDay ===
              "Todos" ||
            String(
              player.Dia
            ) ===
              String(
                selectedDay
              )

          return (
            monthMatch &&
            dayMatch
          )
        }
      )
    }, [
      teamPlayers,
      selectedMonth,
      selectedDay,
    ])

  // STATS
  const stats = useMemo(() => {

    const uniquePlayers =
      new Set(
        filteredPlayers.map(
          (player) =>
            player.Jogador
        )
      ).size

    const totalKills =
      filteredPlayers.reduce(
        (
          acc,
          player
        ) =>
          acc +
          Number(
            player.Q1_Kills ||
              0
          ) +
          Number(
            player.Q2_Kills ||
              0
          ) +
          Number(
            player.Q3_Kills ||
              0
          ),
        0
      )

    const average =
      uniquePlayers > 0
        ? (
            totalKills /
            uniquePlayers
          ).toFixed(1)
        : "0.0"

    return {
      totalKills,
      average,
      uniquePlayers,
    }
  }, [filteredPlayers])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <Link
        href="/classificacao"
        className="inline-flex mb-8 text-zinc-400 hover:text-white transition"
      >
        ← Voltar
      </Link>

      {/* HEADER */}
      <div className="bg-gradient-to-br from-red-950/20 to-black border border-zinc-800 rounded-3xl p-10 mb-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          <div className="flex items-center gap-6">

            <TeamLogo
              team={teamName}
              size={100}
            />

            <div>

              <div className="inline-flex bg-red-600 px-4 py-2 rounded-xl font-bold mb-6">
                EQUIPE
              </div>

              <h1 className="text-5xl md:text-6xl font-black break-words">
                {teamName}
              </h1>

              <p className="text-zinc-400 mt-4">
                Perfil oficial da
                equipe
              </p>

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-5 text-center">

              <div className="text-4xl font-black text-red-500">
                {
                  stats.totalKills
                }
              </div>

              <p className="text-zinc-400 mt-2 text-sm">
                KILLS
              </p>

            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-5 text-center">

              <div className="text-4xl font-black text-red-500">
                {
                  stats.average
                }
              </div>

              <p className="text-zinc-400 mt-2 text-sm">
                MÉDIA
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* FILTROS */}
      <div className="flex flex-wrap gap-4 mb-8">

        {/* MÊS */}
        <select
          value={selectedMonth}
          onChange={(e) => {

            setSelectedMonth(
              e.target.value
            )

            setSelectedDay(
              "Todos"
            )
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

      {/* TABELA */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[640px]">

            <thead>

              <tr className="border-b border-zinc-800">

                <th className="text-left py-5 px-6">
                  JOGADOR
                </th>

                <th className="text-center">
                  Q1
                </th>

                <th className="text-center">
                  Q2
                </th>

                <th className="text-center">
                  Q3
                </th>

                <th className="text-center">
                  TOTAL
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredPlayers.map(
                (
                  player: any,
                  index
                ) => {

                  const total =
                    Number(
                      player.Q1_Kills ||
                        0
                    ) +
                    Number(
                      player.Q2_Kills ||
                        0
                    ) +
                    Number(
                      player.Q3_Kills ||
                        0
                    )

                  return (
                    <tr
                      key={
                        index
                      }
                      className="border-b border-zinc-800 hover:bg-zinc-800/30 transition"
                    >

                      <td className="py-5 px-6 font-bold">

                        <Link
                          href={`/jogadores/${encodeURIComponent(player.Jogador)}`}
                          className="hover:text-red-500 transition"
                        >
                          {
                            player.Jogador
                          }
                        </Link>

                      </td>

                      <td className="text-center">
                        {
                          player.Q1_Kills
                        }
                      </td>

                      <td className="text-center">
                        {
                          player.Q2_Kills
                        }
                      </td>

                      <td className="text-center">
                        {
                          player.Q3_Kills
                        }
                      </td>

                      <td className="text-center text-red-500 font-black">
                        {total}
                      </td>

                    </tr>
                  )
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}