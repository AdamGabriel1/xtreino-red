"use client"

import Link from "next/link"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import { loadCSV } from "@/lib/csv"

import { calculatePlayerStats } from "@/lib/player-stats"

import { getPlayerBadges } from "@/lib/badges"

interface Props {
  playerName: string
}

export default function PlayerPageClient({
  playerName,
}: Props) {
  const [players, setPlayers] =
    useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const data = await loadCSV(
        "/data/jogadores.csv"
      )

      setPlayers(data)
    }

    loadData()
  }, [])

  const stats = useMemo(() => {
    return calculatePlayerStats(
      players,
      playerName
    )
  }, [players, playerName])

  const latestMatch =
    stats.matches[
      stats.matches.length - 1
    ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <Link
        href="/jogadores"
        className="inline-flex mb-8 text-zinc-400 hover:text-white transition"
      >
        ← Voltar
      </Link>

      <div className="bg-gradient-to-br from-red-950/20 to-black border border-zinc-800 rounded-3xl p-10 mb-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

          <div>

            <div className="inline-flex bg-red-600 px-4 py-2 rounded-xl font-bold mb-6">
              JOGADOR
            </div>

            <h1 className="text-5xl md:text-6xl font-black break-words">
              {playerName}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-5">

              <div className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-xl">
                {stats.latestTeam}
              </div>

              {latestMatch &&
                getPlayerBadges(
                  latestMatch
                ).map((badge) => (
                  <div
                    key={badge}
                    className="bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-xl text-xl"
                  >
                    {badge}
                  </div>
                ))}

            </div>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-5 text-center">

              <div className="text-4xl font-black text-red-500">
                {stats.totalKills}
              </div>

              <p className="text-zinc-400 mt-2 text-sm">
                TOTAL KILLS
              </p>

            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-5 text-center">

              <div className="text-4xl font-black text-red-500">
                {stats.averageKills}
              </div>

              <p className="text-zinc-400 mt-2 text-sm">
                MÉDIA
              </p>

            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-5 text-center">

              <div className="text-4xl font-black text-red-500">
                {stats.bestMatch}
              </div>

              <p className="text-zinc-400 mt-2 text-sm">
                RECORD
              </p>

            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-5 text-center">

              <div className="text-4xl font-black text-red-500">
                {stats.mvpCount}
              </div>

              <p className="text-zinc-400 mt-2 text-sm">
                MVPs
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-10">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-500">
            Kills na Q1
          </p>

          <h2 className="text-5xl font-black mt-4">
            {stats.totalQ1}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-500">
            Kills na Q2
          </p>

          <h2 className="text-5xl font-black mt-4">
            {stats.totalQ2}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-500">
            Kills na Q3
          </p>

          <h2 className="text-5xl font-black mt-4">
            {stats.totalQ3}
          </h2>

        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <div className="p-6 border-b border-zinc-800">

          <h2 className="text-2xl font-black">
            HISTÓRICO
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[360px]">

            <thead>

              <tr className="border-b border-zinc-800">

                <th className="text-left py-5 px-6">
                  DATA
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

              {stats.matches.map(
                (match: any, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-800 hover:bg-zinc-800/30 transition"
                  >

                    <td className="py-5 px-6">
                      {match.Mes} {match.Dia}
                    </td>

                    <td className="font-bold">
                      {match.Time}
                    </td>

                    <td className="text-center">
                      {match.q1}
                    </td>

                    <td className="text-center">
                      {match.q2}
                    </td>

                    <td className="text-center">
                      {match.q3}
                    </td>

                    <td className="text-center text-red-500 font-black">
                      {match.totalKills}
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
