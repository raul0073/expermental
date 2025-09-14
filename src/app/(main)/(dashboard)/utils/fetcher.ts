import { SETTINGS } from "@/lib/Types/settings";
import {
  BestElevenResponse,
  DashboardTeamsResponse,
  PlayerResponse,
  StatsPayload,
  TeamMentalSummary
} from "./types";
import { LeagueMetaData } from "./types/league";
import { Player } from "./types/player";
import { TeamPlottingResponse } from "./types/team";

// -------- MAIN PAGE --------
export interface DashboardPayload {
  players: Player[];
  teams: DashboardTeamsResponse;
  best_eleven: BestElevenResponse;
}

/**
 * Fetch /mental/all as a streaming response and progressively parse players.
 * Ensures players are only pushed once.
 */
export async function fetchAllMentalData(
): Promise<DashboardPayload | null> {
  const url = `/api/mental/all`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("[fetchAllMentalData] Failed:", err);
    return null; // fail gracefully
  }
}

export type LeaguePagePayload = {
  league_meta: LeagueMetaData;
  players: Player[];
  teams: {
    mental: TeamMentalSummary[];
    stats: StatsPayload;
  };
  best_eleven: BestElevenResponse;
};

// -------- LEAGUE PAGE --------
export async function fetchLeagueMentalData(
  league: string,
  season: number = 2425,
  client: boolean = true
): Promise<LeaguePagePayload | null> {
  try {
          const url = client
    ? `/api/mental/${league}/${season}/all`
    : `${SETTINGS.NEXT_API}/mental/${league}/${season}/all`
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`[fetchLeagueMentalData] Failed for ${league}:`, err);
    return null;
  }
}

// -------- TEAM PAGE --------
export async function fetchTeamMentalData(
  league: string,
  team: string,
  season: number = 2425,
  client: boolean = false
): Promise<{
  players: Player[];
  stats: { mental: TeamMentalSummary[]; stats: StatsPayload };
  best_eleven: BestElevenResponse;
  plot: TeamPlottingResponse
} | null> {
  try {
      const url = client
    ? `/api/mental/${league}/${season}/${team}`
    : `${SETTINGS.NEXT_API}/mental/${league}/${season}/${team}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`[fetchTeamMentalData] Failed for ${team}:`, err);
    return null;
  }
}

// -------- PLAYER DATA --------
export async function fetchPlayerMentalData(
  league: string,
  season: number = 2425,
  options?: { name?: string; role?: string; top_k?: number }
): Promise<PlayerResponse | null> {
  const query = new URLSearchParams();
  if (options?.name) query.set("name", options.name);
  if (options?.role) query.set("role", options.role);
  if (options?.top_k) query.set("top_k", String(options.top_k));

  const url = `${SETTINGS.NEXT_API}/mental/${league}/${season}/players?${query.toString()}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`[fetchPlayerMentalData] Failed for ${options?.name || "all"}:`, err);
    return null;
  }
}

// -------- PLAYER PLOT --------
export async function fetchPlayerPlot(
  league: string,
  season: number = 2425,
  playerName: string,
  client: boolean = false
): Promise<{ league: string; season: number; player: string; plot: string } | null> {
  const query = new URLSearchParams({ name: playerName });
  const url = client
    ? `/api/mental/${league}/${season}/players/plot?${query.toString()}`
    : `${SETTINGS.NEXT_API}/mental/${league}/${season}/players/plot?${query.toString()}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`[fetchPlayerPlot] Failed for ${playerName}:`, err);
    return null;
  }
}
