import { schedules } from "@/lib/schedules"

export function Schedules() {
  return (
    <section className="py-16">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-black mb-10">
          HORÁRIOS POR REGIÃO
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {schedules.map((item) => (
            <div
              key={item.country}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-700 transition"
            >
              <div className="text-4xl">
                {item.flag}
              </div>

              <h3 className="font-bold text-lg mt-4">
                {item.country}
              </h3>

              <p className="text-red-500 font-black text-xl mt-2">
                {item.time}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  )
}