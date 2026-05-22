"use client"

import { useEffect, useMemo, useState } from "react"

import { defaultTeams } from "@/lib/defaultTeams"
import { generateMessage } from "@/lib/generateMessage"

export default function InscricoesPage() {
  const [teams, setTeams] = useState<string[]>([])
  const [newTeam, setNewTeam] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("devils-teams")

    if (saved) {
      setTeams(JSON.parse(saved))
    } else {
      setTeams(defaultTeams)
    }
  }, [])

  useEffect(() => {
    if (teams.length > 0) {
      localStorage.setItem(
        "devils-teams",
        JSON.stringify(teams)
      )
    }
  }, [teams])

  const remainingSlots = 15 - teams.length

  const message = useMemo(() => {
    return generateMessage(teams)
  }, [teams])

  function addTeam() {
    if (!newTeam.trim()) return

    if (teams.length >= 15) return

    setTeams([...teams, newTeam.toUpperCase()])

    setNewTeam("")
  }

  function removeTeam(index: number) {
    const updated = [...teams]

    updated.splice(index, 1)

    setTeams(updated)
  }

  async function copyMessage() {
    await navigator.clipboard.writeText(message)

    alert("Lista copiada com sucesso!")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

        <div>
          <h1 className="text-4xl font-black">
            INSCRIÇÕES
          </h1>

          <p className="text-zinc-400 mt-2">
            Gerencie as equipes do xtreino.
          </p>
        </div>

        <div className="bg-red-600 px-6 py-3 rounded-2xl font-black text-xl">
          {teams.length}/15
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-black mb-6">
              ADICIONAR EQUIPE
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                value={newTeam}
                onChange={(e) => setNewTeam(e.target.value)}
                placeholder="Nome da equipe"
                className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-4 outline-none focus:border-red-600"
              />

              <button
                onClick={addTeam}
                className="w-full bg-red-600 hover:bg-red-700 transition rounded-2xl py-4 font-black"
              >
                ADICIONAR EQUIPE
              </button>

            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-black">
                EQUIPES
              </h2>

              <span className="text-zinc-400">
                {remainingSlots} vagas restantes
              </span>

            </div>

            <div className="space-y-3">

              {Array.from({ length: 15 }).map((_, index) => {
                const team = teams[index]

                return (
                  <div
                    key={index}
                    className="bg-black border border-zinc-800 rounded-2xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">

                      <div className="bg-red-600 w-10 h-10 rounded-xl flex items-center justify-center font-black">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <h3 className="font-bold">
                          {team || "SLOT DISPONÍVEL"}
                        </h3>

                        <p className="text-zinc-500 text-sm">
                          {team ? "Confirmado" : "Disponível"}
                        </p>
                      </div>

                    </div>

                    {team && (
                      <button
                        onClick={() => removeTeam(index)}
                        className="bg-red-950 hover:bg-red-900 transition text-red-500 px-4 py-2 rounded-xl"
                      >
                        Remover
                      </button>
                    )}

                  </div>
                )
              })}

            </div>

          </div>

        </div>

        <div>

          <div className="sticky top-24 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-black">
                PREVIEW
              </h2>

              <button
                onClick={copyMessage}
                className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl font-bold"
              >
                COPIAR
              </button>

            </div>

            <pre className="whitespace-pre-wrap text-sm text-zinc-300 overflow-auto max-h-[700px]">
              {message}
            </pre>

          </div>

        </div>

      </div>

    </div>
  )
}
