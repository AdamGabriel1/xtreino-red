export function Socials() {
  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-gradient-to-br from-red-950/30 to-black border border-red-900 rounded-3xl p-10 text-center">

          <h2 className="text-4xl font-black">
            ENTRE NA COMUNIDADE
          </h2>

          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Participe do grupo oficial do campeonato e do servidor Discord.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">

            <a
              href="https://chat.whatsapp.com/BGrWBFrLQVc3HrpCfdeqbw"
              target="_blank"
              className="bg-green-600 hover:bg-green-700 transition px-8 py-4 rounded-2xl font-bold w-full md:w-auto"
            >
              ENTRAR NO WHATSAPP
            </a>

            <a
              href="https://discord.gg/vYGkNex878"
              target="_blank"
              className="bg-indigo-600 hover:bg-indigo-700 transition px-8 py-4 rounded-2xl font-bold w-full md:w-auto"
            >
              ENTRAR NO DISCORD
            </a>

          </div>

        </div>

      </div>

    </section>
  )
}
