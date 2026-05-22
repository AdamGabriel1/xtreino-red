"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-zinc-800 bg-black/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link
          href="/"
          className="font-black text-red-600 text-xl"
        >
          DEVILS MOBILE LEAGUE
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/inscricoes">Inscrições</Link>
          <Link href="/classificacao">Classificação</Link>
          <Link href="/ranking-geral">Ranking Geral</Link>
          <Link href="/jogadores">Jogadores</Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          <Menu />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-black">
          <div className="flex flex-col p-4 gap-4">
            <Link href="/">Home</Link>
            <Link href="/inscricoes">Inscrições</Link>
            <Link href="/classificacao">Classificação</Link>
            <Link href="/ranking-geral">Ranking Geral</Link>
            <Link href="/jogadores">Jogadores</Link>
          </div>
        </div>
      )}
    </header>
  )
}
