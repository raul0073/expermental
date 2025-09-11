import { Metadata } from "next";

type PageType = "dashboard" | "league" | "team" | "player";

interface MetaParams {
  type: PageType;
  league?: string;
  team?: string;
  player?: string;
}

export function generateMetadata({ type, league, team, player }: MetaParams): Metadata {
  const leagueName = league ? league.toUpperCase() : "Football";
  const season = "24-25";

  switch (type) {
    case "dashboard":
      return {
        title: `Football Dashboard ${season} – Mental & Performance Analytics`,
        description: `Explore top players, best teams, and the ultimate Best XI squad across Europe’s top leagues for the ${season} season.`,
        openGraph: {
          title: `Football Dashboard ${season}`,
          description: `Cross-league mental and performance stats with interactive visuals.`,
        },
      };

    case "league":
      return {
        title: `${leagueName} ${season} Stats – Teams & Players`,
        description: `Dive into comprehensive ${leagueName} statistics for the ${season} season. Analyze clubs, player performance, and mental rankings.`,
        openGraph: {
          title: `${leagueName} ${season} Analytics`,
          description: `Explore ${leagueName} teams and players with interactive visual breakdowns.`,
        },
      };

    case "team":
      return {
        title: `${team} – ${leagueName} ${season} Stats`,
        description: `Full breakdown of ${team}’s ${season} performance in ${leagueName}. Player metrics, team stats, and mental score analysis.`,
        openGraph: {
          title: `${team} ${season} Stats`,
          description: `Analyze ${team}’s ${leagueName} journey with advanced stats.`,
        },
      };

    case "player":
      return {
        title: `${player} – ${leagueName} ${season} Player Stats`,
        description: `Detailed ${season} analytics for ${player} in ${leagueName}. Explore mental score, performance metrics, and visual insights.`,
        openGraph: {
          title: `${player} – ${season} Performance`,
          description: `${player}’s ${season} journey in ${leagueName} with advanced data visualizations.`,
        },
      };

    default:
      return {
        title: `Football Stats ${season}`,
        description: `Explore stats, rankings, and visualizations for the ${season} football season.`,
      };
  }
}
