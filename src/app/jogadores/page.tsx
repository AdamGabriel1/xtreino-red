"use client"

import { useEffect, useMemo, useState } from "react"

import { loadCSV } from "@/lib/csv"

import { calculateMVP } from "@/lib/mvp"
import { MVPCard } from "@/components/tables/mvp-card"

export default function JogadoresPage() {
  const [players, setPlayers] = useState<any[]>([])

  const [selectedDay, setSelectedDay] =
    useState("19")

  const [filter, setFilter] =
    useState("TOTAL")

  useEffect(() => {
    async function loadData() {
      const data = await loadCSV(
        "/data/jogadores.csv"
      )

      setPlayers(data)
      console.log(players)
    }

    loadData()
  }, [])

  const availableDays = useMemo(() => {
    return [
      ...new Set(players.map((p) => p.Dia)),
    ]
  }, [players])

    const ranking = useMemo(() => {
    return players
        .filter(
        (player) =>
            String(player.Dia) === String(selectedDay)
        )
        .map((player) => {
        let total = 0

        if (filter === "Q1") {
            total = player.Q1_Kills
        }

        else if (filter === "Q2") {
            total = player.Q2_Kills
        }

        else if (filter === "Q3") {
            total = player.Q3_Kills
        }

        else {
            total =
            player.Q1_Kills +
            player.Q2_Kills +
            player.Q3_Kills
        }

        return {
            ...player,
            total,
        }
        })
        .sort((a, b) => b.total - a.total)
    }, [players, selectedDay, filter])

    const mvp = useMemo(() => {
    return calculateMVP(ranking)
    }, [ranking])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="mb-10">

        <h1 className="text-4xl font-black">
          JOGADORES
        </h1>

        <p className="text-zinc-400 mt-2">
          Estatísticas individuais.
        </p>

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

      <MVPCard mvp={mvp} />

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <table className="w-full min-w-[400px]">

          <thead>
            <tr className="border-b border-zinc-800">

              <th className="text-left py-4">
                #
              </th>

              <th className="text-left">
                JOGADOR
              </th>

              <th className="text-left">
                TIME
              </th>

              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>

              <th>TOTAL</th>

            </tr>
          </thead>

          <tbody>

            {ranking.map((player, index) => (
              <tr
                key={player.Jogador}
                className="border-b border-zinc-900"
              >
                <td className="py-5 text-red-500 font-black">
                  #{index + 1}
                </td>

                <td className="font-bold">
                  {player.Jogador}
                </td>

                <td>
                  {player.Time}
                </td>

                <td className="text-center">
                  {player.Q1_Kills}
                </td>

                <td className="text-center">
                  {player.Q2_Kills}
                </td>

                <td className="text-center">
                  {player.Q3_Kills}
                </td>

                <td className="text-center text-red-500 font-black text-xl">
                  {player.total}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}