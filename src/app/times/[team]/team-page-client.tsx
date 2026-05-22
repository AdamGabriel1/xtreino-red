"use client"

import Link from "next/link"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import { loadCSV } from "@/lib/csv"

import { calculateTeamDetails } from "@/lib/team-details"

interface Props {
  teamName: string
}

export default function TeamPageClient({
  teamName,
}: Props) {
  const [players, setPlayers] =
    useState<any[]>([])

  const [selectedDay, setSelectedDay] =
    useState("19")

  useEffect(() => {
    async function loadData() {
      const data = await loadCSV(
        "/data/jogadores.csv"
      )

      setPlayers(data)
    }

    loadData()
  }, [])

  const availableDays = useMemo(() => {
    return [
      ...new Set(players.map((p) => p.Dia)),
    ]
  }, [players])

  const details = useMemo(() => {
    return calculateTeamDetails(
      players,
      teamName,
      selectedDay
    )
  }, [
    players,
    teamName,
    selectedDay,
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <Link
        href="/classificacao"
        className="inline-flex mb-8 text-zinc-400 hover:text-white transition"
      >
        ← Voltar
      </Link>

      <div className="bg-gradient-to-br from-red-950/20 to-black border border-zinc-800 rounded-3xl p-10 mb-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          <div>

            <div className="inline-flex bg-red-600 px-4 py-2 rounded-xl font-bold mb-6">
              EQUIPE
            </div>

            <h1 className="text-5xl md:text-6xl font-black break-words">
              {teamName}
            </h1>

            <p className="text-zinc-400 mt-4 text-lg md:text-xl">
              Perfil oficial da equipe
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-black/50 border border-zinc-800 rounded-2xl p-6 text-center min-w-[140px]">

              <h2 className="text-4xl font-black text-red-500">
                {details.totalKills}
              </h2>

              <p className="text-zinc-400 mt-2">
                KILLS
              </p>

            </div>

            <div className="bg-black/50 border border-zinc-800 rounded-2xl p-6 text-center min-w-[140px]">

              <h2 className="text-4xl font-black text-red-500">
                {details.averageKills}
              </h2>

              <p className="text-zinc-400 mt-2">
                MÉDIA
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="mb-8">

        <select
          value={selectedDay}
          onChange={(e) =>
            setSelectedDay(e.target.value)
          }
          className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-4 outline-none focus:border-red-600"
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

      </div>

      {details.mvp && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <div className="inline-flex bg-red-600 px-4 py-2 rounded-xl font-bold mb-4">
                MVP DO TIME
              </div>

              <h2 className="text-4xl font-black break-words">
                {details.mvp.Jogador}
              </h2>

              <p className="text-zinc-400 mt-3">
                Melhor jogador da equipe
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl font-black text-red-500">
                {details.mvp.totalKills}
              </div>

              <p className="text-zinc-400">
                KILLS
              </p>

            </div>

          </div>

        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[360px]">

            <thead>

              <tr className="border-b border-zinc-800 bg-black/20">

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

              {details.players.length > 0 ? (
                details.players.map(
                  (player: any) => (
                    <tr
                      key={player.Jogador}
                      className="border-b border-zinc-800 hover:bg-zinc-800/30 transition"
                    >

                      <td className="py-5 px-6 font-bold whitespace-nowrap">
                        {player.Jogador}
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
                        {player.totalKills}
                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-10 text-zinc-500"
                  >
                    Nenhum jogador encontrado.
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