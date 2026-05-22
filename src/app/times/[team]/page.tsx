import TeamPageClient from "./team-page-client"

interface Props {
  params: Promise<{
    team: string
  }>
}

export default async function TeamPage({
  params,
}: Props) {
  const resolvedParams =
    await params

  return (
    <TeamPageClient
      teamName={decodeURIComponent(
        resolvedParams.team
      )}
    />
  )
}