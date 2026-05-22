import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.25),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 text-center">

        <div className="inline-flex items-center border border-red-800 bg-red-950/30 px-4 py-2 rounded-full text-sm mb-8">
          🔥 XTREINOS MOBILE OFICIAL
        </div>

        <h1 className="text-5xl md:text-8xl font-black leading-none">
          <span className="text-red-600 block">
            DEVILS
          </span>

          <span className="block">
            MOBILE
          </span>

          <span className="block">
            LEAGUE
          </span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mt-8">
          Campeonato competitivo mobile em formato Battle Royale Squad
          com as melhores equipes da comunidade.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

          <Link
            href="/inscricoes"
            className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto"
          >
            INSCREVER EQUIPE
          </Link>

          <Link
            href="/classificacao"
            className="border border-zinc-700 hover:border-red-700 transition px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto"
          >
            VER CLASSIFICAÇÃO
          </Link>

        </div>

      </div>
    </section>
  )
}
