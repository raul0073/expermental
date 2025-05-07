
export type StatsType =
  | "standard"
  | "keeper"
  | "keeper_adv"
  | "shooting"
  | "passing"
  | "passing_types"
  | "goal_shot_creation"
  | "defense"
  | "possession"
  | "playing_time"
  | "misc";

export interface FetchTeamSeasonStatsParams {
  team: string;
  stats_type: StatsType;
  against: boolean;
}

export async function GetTeamSeasonStatsService({
  team,
  stats_type,
  against,
}: FetchTeamSeasonStatsParams) {
  try {
    const res = await fetch(
      `/api/team?team=${encodeURIComponent(team)}&stats_type=${stats_type}&against=${against}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to fetch team stats");
    }

    return await res.json();
  } catch (err) {
    console.error("fetchTeamSeasonStats error:", err);
    throw err;
  }
}
