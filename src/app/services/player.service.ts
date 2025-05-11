import { PlayerRole } from "@/components/player/player.types";

type FetchPlayerStatsParams = {
    team: string;
    stats_type: string;
    player_name: string;
    player_role: PlayerRole
  };
  
  export async function fetchPlayerSeasonStats({ team, stats_type, player_name }: FetchPlayerStatsParams) {
    const query = new URLSearchParams({
      team,
      stats_type,
      player_name,
    });
  
    try {
      const res = await fetch(`/api/players?${query.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
  
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to fetch team season stats');
      }
  
      return await res.json();
      //eslint-disable-next-line
    } catch (error: any) {
      console.error('fetchTeamSeasonStats error:', error.message);
      throw error;
    }
  }
  