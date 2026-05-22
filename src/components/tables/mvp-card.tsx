interface Props {
  mvp: any
}

export function MVPCard({
  mvp,
}: Props) {
  if (!mvp) return null

  return (
    <div className="bg-gradient-to-br from-red-950/30 to-black border border-red-900 rounded-3xl p-8 mb-10">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

        <div>

          <div className="inline-flex bg-red-600 px-4 py-2 rounded-xl font-bold mb-4">
            MVP
          </div>

          <h2 className="text-5xl font-black">
            {mvp.Jogador}
          </h2>

          <p className="text-zinc-400 mt-3 text-xl">
            {mvp.Time}
          </p>

        </div>

        <div className="text-center">

          <div className="text-7xl font-black text-red-500">
            {mvp.totalKills}
          </div>

          <p className="text-zinc-400">
            KILLS
          </p>

        </div>

      </div>

    </div>
  )
}
