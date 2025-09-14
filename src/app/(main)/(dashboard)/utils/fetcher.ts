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
export async function fetchAllMentalDataStreamed(
  onPlayerChunk?: (player: Player) => void
): Promise<{ teams: DashboardTeamsResponse; best_eleven: BestElevenResponse }> {
  const res = await fetch("/api/mental/all");
  if (!res.ok) throw new Error(`Status ${res.status}`);

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  // eslint-disable-next-line 
  let teams: any = null;
  // eslint-disable-next-line 
  let best_eleven: any = null;

  // Track players already sent to avoid duplicates
  const seenPlayers = new Set<string>();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop()!; // keep incomplete line in buffer

    for (const line of lines) {
      if (!line.trim()) continue;

      try {
        const obj = JSON.parse(line);

        if (obj.players) {
          // not used in NDJSON, skip
        } else if (obj.teams) {
          teams = obj.teams;
        } else if (obj.best_eleven) {
          best_eleven = obj.best_eleven;
        } else {
          // assume this is a single player object
          const id = obj.fbref_id ?? obj.name; // use a unique key
          if (!seenPlayers.has(id)) {
            seenPlayers.add(id);
            onPlayerChunk?.(obj);
          }
        }
      } catch (err) {
        console.error("Failed to parse line:", line, err);
      }
    }
  }

  return { teams, best_eleven };
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
