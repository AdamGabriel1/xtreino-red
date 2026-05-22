import { Hero } from "@/components/home/hero"
import { Rules } from "@/components/home/rules"
import { Schedules } from "@/components/home/schedules"
import { Socials } from "@/components/home/socials"
import { TeamsSection } from "@/components/home/teams"
import { TournamentFormat } from "@/components/home/format"

export default function HomePage() {
  return (
    <div>

      <Hero />

      <Schedules />

      <Rules />

      <TournamentFormat />

      <TeamsSection />

      <Socials />

    </div>
  )
}