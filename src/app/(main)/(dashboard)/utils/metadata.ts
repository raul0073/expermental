export function generateMetadata( league: string ) {
  const leagueName = league.toUpperCase(); // e.g., EPL, LA LIGA
  return {
    title: `${leagueName} 24-25 Stats – Team & Player Visuals`,
    description: `Explore detailed statistics and interactive visualizations for ${leagueName} 24-25 season. Analyze players, teams, and match performance.`,
    openGraph: {
      title: `${leagueName} 24-25 Stats`,
      description: `Interactive visualizations for ${leagueName} 24-25 players and teams.`,
    },
  };
}