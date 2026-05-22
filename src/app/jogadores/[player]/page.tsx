import PlayerPageClient from "./player-page-client"

interface Props {
  params: Promise<{
    player: string
  }>
}

export default async function PlayerPage({
  params,
}: Props) {
  const resolvedParams = await params

  return (
    <PlayerPageClient
      playerName={decodeURIComponent(
        resolvedParams.player
      )}
    />
  )
}
