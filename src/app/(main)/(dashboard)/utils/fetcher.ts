import { SETTINGS } from "@/lib/Types/settings";
import { BestElevenResponse, PlayerResponse, StatsPayload, TeamDefaultChartData, TeamMentalSummary } from "./types";
import { LeagueMetaData } from "./types/league";
import { Player } from "./types/player";

// -------- MAIN PAGE --------
export interface DashboardPaylod {
  players: Player[];
  teams: {
    mental: TeamMentalSummary[];
    //eslint-disable-next-line
    stats: StatsPayload
  }
  best_eleven: BestElevenResponse,
  // eslint-disable-next-line
  plots?: any[]; // placeholder for your 2 charts
}
// Load top 5 leagues best players, teams, best XI, plots
export async function fetchAllMentalData(): Promise<DashboardPaylod> {
  const res = await fetch(`${SETTINGS.NEXT_API}/mental/all`, {
    next: { revalidate: SETTINGS.REVALIDATE_SECONDS }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch global mental data: ${res.status}`);
  }
  const data = await res.json();
  return data;
}



type LeaguePagePayload = {
  league_meta: LeagueMetaData
  players: Player[];
  teams: {
    mental: TeamMentalSummary[];
    stats: StatsPayload
  }
   best_eleven: BestElevenResponse
}
// -------- LEAGUE PAGE --------
// Load all league stats: teams, players, best XI, plots
export async function fetchLeagueMentalData(
  league: string,
  season: number = 2425
): Promise<LeaguePagePayload> {
  const res = await fetch(`${SETTINGS.NEXT_API}/mental/${league}/${season}/all`, {
    next: { revalidate: SETTINGS.REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch mental data for league ${league}: ${res.status}`);
  }

const data =  await res.json();
return data
}

// -------- TEAM PAGE --------
// Load team stats + players + best XI + plots
export async function fetchTeamMentalData(
  league: string,
  team: string,
   season: number = 2425
): Promise<{
  players: Player[];
  stats: {
    mental: TeamMentalSummary[];
    stats: StatsPayload
  }
   best_eleven: BestElevenResponse,
  plot: {
    default: TeamDefaultChartData
  }
}> {

  const res = await fetch(`${SETTINGS.NEXT_API}/mental/${league}/${season}/${team}`, {
    next: { revalidate: SETTINGS.REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch mental data for team ${team}: ${res.status}`);
  }

const data =  await res.json();
return data
}

// -------- PLAYER PAGE --------
export async function fetchPlayerMentalData(
  league: string,
  season: number = 2425,
  options?: {
    name?: string;
    role?: string;
    top_k?: number;
  }
): Promise<PlayerResponse> {
  const query = new URLSearchParams();
  console.log(league, season, options)
  if (options?.name) query.set("name", options.name);
  if (options?.role) query.set("role", options.role);
  if (options?.top_k) query.set("top_k", String(options.top_k));

  const url = `${SETTINGS.NEXT_API}/mental/${league}/${season}/players?${query.toString()}`;
  console.log("FETCH FROM:", url)
  const res = await fetch(url, {
    next: { revalidate: SETTINGS.REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch mental data (league=${league}, season=${season}, opts=${JSON.stringify(
        options
      )}): ${res.status}`
    );
  }

  return res.json();
}




