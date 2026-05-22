import Image from "next/image"

import { teamLogos } from "@/lib/team-logos"

interface Props {
  team: string
  size?: number
}

export function TeamLogo({
  team,
  size = 45,
}: Props) {
  const logo =
    teamLogos[team] ||
    "/teams/default.png"

  return (
    <Image
      src={logo}
      alt={team}
      width={size}
      height={size}
      className="rounded-full object-cover border border-zinc-700"
    />
  )
}
