import { SETTINGS } from "@/lib/Types/settings";
import { StatsPayload, TeamMentalSummary } from "./types";
import { LeagueMetaData } from "./types/league";
import { Player } from "./types/player";

// -------- MAIN PAGE --------
export interface DashboardPaylod {
  players: Player[];
  teams: {
    mental: TeamMentalSummary[];
    //eslint-disable-next-line
    stats: any[]
  }
   best_eleven: {
    best_eleven: Player[];
    best_eleven_visual: string 
    subs: Player[]

  }
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
  console.log(data)
  return data;
}



type LeaguePagePayload = {
  league_meta: LeagueMetaData
  players: Player[];
  teams: {
    mental: TeamMentalSummary[];
    stats: StatsPayload
  }
   best_eleven: {
    best_eleven: Player[];
    best_eleven_visual: string 
    subs: Player[]

  }
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
  season: number,
  team: string
): Promise<{
  team: TeamMentalSummary;
  players: Player[];
  // eslint-disable-next-line
  best_eleven: any[];
  // eslint-disable-next-line
  plots: any[];
}> {
  const res = await fetch(`${SETTINGS.NEXT_API}/mental/${league}/${season}/${team}`, {
    next: { revalidate: SETTINGS.REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch mental data for team ${team}: ${res.status}`);
  }

  return res.json();
}

// -------- PLAYER PAGE --------
// Load single player data + pizza chart
export async function fetchPlayerMentalData(
  playerId: string
): Promise<{
  player: Player;
  // eslint-disable-next-line
  plots: any[]; // pizza chart (later structured type)
}> {
  const res = await fetch(`${SETTINGS.NEXT_API}/mental/player/${playerId}`, {
    next: { revalidate: SETTINGS.REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch mental data for player ${playerId}: ${res.status}`);
  }

  return res.json();
}




