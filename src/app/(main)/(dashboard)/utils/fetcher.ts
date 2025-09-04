import { SETTINGS } from "@/lib/Types/settings";
import { TeamMentalSummary } from "./types";
import { Player } from "./types/player";
import { LeagueMetaData } from "./types/league";

// -------- MAIN PAGE --------
// Load top 5 leagues best players, teams, best XI, plots
export async function fetchAllMentalData(): Promise<{
  players: Player[];
  // eslint-disable-next-line
  teams: any[];
  // eslint-disable-next-line
  best_eleven: any[];
  // eslint-disable-next-line
  plots?: any[]; // placeholder for your 2 charts
}> {
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

// -------- LEAGUE PAGE --------
// Load all league stats: teams, players, best XI, plots
export async function fetchLeagueMentalData(
  league: string,
  season: number = 2425
): Promise<{
  teams: TeamMentalSummary[];
  league_meta: LeagueMetaData
  players: Player[];
  // eslint-disable-next-line
  best_eleven: any[];
  // eslint-disable-next-line
  plots: any[];
}> {
  const res = await fetch(`${SETTINGS.NEXT_API}/mental/${league}/${season}/all`, {
    next: { revalidate: SETTINGS.REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch mental data for league ${league}: ${res.status}`);
  }

const data =  await res.json();
console.log(data)
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
