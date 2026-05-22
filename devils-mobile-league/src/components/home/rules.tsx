export function Rules() {
  return (
    <section className="py-16">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-black mb-10">
          REGRAS IMPORTANTES
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-red-950/20 border border-red-900 rounded-2xl p-6">
            <h3 className="text-red-500 font-black text-xl">
              ⚠ AUXÍLIOS BANIDOS
            </h3>

            <p className="text-zinc-400 mt-3">
              Todos os tipos de auxílio estão proibidos.
            </p>
          </div>

          <div className="bg-red-950/20 border border-red-900 rounded-2xl p-6">
            <h3 className="text-red-500 font-black text-xl">
              🔥 LANÇA CHAMAS PROIBIDO
            </h3>

            <p className="text-zinc-400 mt-3">
              O uso de lança chamas não será permitido.
            </p>
          </div>

          <div className="bg-red-950/20 border border-red-900 rounded-2xl p-6">
            <h3 className="text-red-500 font-black text-xl">
              ⏰ DESISTÊNCIA
            </h3>

            <p className="text-zinc-400 mt-3">
              Pedido de desistência até 19:30.
            </p>
          </div>

        </div>

      </div>

    </section>
  )
}