"use client"

import Link from "next/link"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import { loadCSV } from "@/lib/csv"

import { getPlayerBadges } from "@/lib/badges"

export default function PlayersPageClient() {

  const [players, setPlayers] =
    useState<any[]>([])

  const [selectedMonth, setSelectedMonth] =
    useState("Todos")

  const [selectedDay, setSelectedDay] =
    useState("Todos")

  const [filter, setFilter] =
    useState("TOTAL")

  // LOAD CSV
  useEffect(() => {

    async function loadData() {

      const data = await loadCSV(
        "/data/jogadores.csv"
      )

      setPlayers(data)
    }

    loadData()

  }, [])

  // MESES
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

  // DIAS
  const availableDays =
    useMemo(() => {

      let filtered = players

      if (
        selectedMonth !== "Todos"
      ) {
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
            (player) => player.Dia
          )
        ),
      ]

    }, [
      players,
      selectedMonth,
    ])

  // FILTRAR
  const filteredPlayers =
    useMemo(() => {

      return players.filter(
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
      players,
      selectedMonth,
      selectedDay,
    ])

  // RANKING
  const ranking = useMemo(() => {

    const playersMap =
      new Map()

    filteredPlayers.forEach(
      (player) => {

        const playerName =
          player.Jogador

        if (
          !playersMap.has(
            playerName
          )
        ) {

          playersMap.set(
            playerName,
            {
              Jogador:
                player.Jogador,

              Time:
                player.Time,

              q1: Number(
                player.Q1_Kills ||
                  0
              ),

              q2: Number(
                player.Q2_Kills ||
                  0
              ),

              q3: Number(
                player.Q3_Kills ||
                  0
              ),

              total: 0,
            }
          )

        } else {

          const current =
            playersMap.get(
              playerName
            )

          current.q1 += Number(
            player.Q1_Kills ||
              0
          )

          current.q2 += Number(
            player.Q2_Kills ||
              0
          )

          current.q3 += Number(
            player.Q3_Kills ||
              0
          )
        }
      }
    )

    const result = Array.from(
      playersMap.values()
    )

    result.forEach(
      (player: any) => {

        player.total =
          player.q1 +
          player.q2 +
          player.q3

        if (filter === "Q1") {
          player.total =
            player.q1
        }

        if (filter === "Q2") {
          player.total =
            player.q2
        }

        if (filter === "Q3") {
          player.total =
            player.q3
        }
      }
    )

    return result.sort(
      (a: any, b: any) =>
        b.total - a.total
    )

  }, [
    filteredPlayers,
    filter,
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-5xl font-black">
            JOGADORES
          </h1>

          <p className="text-zinc-400 mt-3">
            Ranking individual
            dos jogadores.
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

          {/* FILTRO */}
          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
            className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3"
          >

            <option value="TOTAL">
              TOTAL
            </option>

            <option value="Q1">
              Q1
            </option>

            <option value="Q2">
              Q2
            </option>

            <option value="Q3">
              Q3
            </option>

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
                  JOGADOR
                </th>

                <th className="text-left">
                  TIME
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

              {ranking.map(
                (
                  player: any,
                  index
                ) => (
                  <tr
                    key={
                      player.Jogador
                    }
                    className="border-b border-zinc-800 hover:bg-zinc-800/30 transition"
                  >

                    <td className="py-5 px-6 text-red-500 font-black">
                      #{index + 1}
                    </td>

                    <td className="font-bold">

                      <div className="flex items-center gap-3">

                        <Link
                          href={`/jogadores/${encodeURIComponent(player.Jogador)}`}
                          className="hover:text-red-500 transition"
                        >
                          {
                            player.Jogador
                          }
                        </Link>

                        <div className="flex gap-1">

                          {getPlayerBadges(
                            player
                          ).map(
                            (
                              badge
                            ) => (
                              <span
                                key={
                                  badge
                                }
                              >
                                {
                                  badge
                                }
                              </span>
                            )
                          )}

                        </div>

                      </div>

                    </td>

                    <td>
                      {player.Time}
                    </td>

                    <td className="text-center">
                      {player.q1}
                    </td>

                    <td className="text-center">
                      {player.q2}
                    </td>

                    <td className="text-center">
                      {player.q3}
                    </td>

                    <td className="text-center text-red-500 font-black">
                      {player.total}
                    </td>

                  </tr>
                )
              )}

              {ranking.length ===
                0 && (
                <tr>

                  <td
                    colSpan={7}
                    className="text-center py-16 text-zinc-500"
                  >
                    Nenhum jogador
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