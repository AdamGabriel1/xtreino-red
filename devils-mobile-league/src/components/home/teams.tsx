import { fixedTeams } from "@/lib/teams"

export function TeamsSection() {
  return (
    <section className="py-16">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-black">
            EQUIPES CONFIRMADAS
          </h2>

          <div className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold">
            {fixedTeams.length}/15
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {Array.from({ length: 15 }).map((_, index) => {
            const team = fixedTeams[index]

            return (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">

                  <div className="bg-red-600 w-10 h-10 rounded-xl flex items-center justify-center font-black">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {team || "SLOT DISPONÍVEL"}
                    </h3>

                    <p className="text-zinc-500 text-sm">
                      {team ? "Confirmado" : "Disponível"}
                    </p>
                  </div>

                </div>

                {team ? (
                  <span className="text-green-500 font-bold">
                    ✓
                  </span>
                ) : (
                  <span className="text-zinc-500">
                    —
                  </span>
                )}
              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}