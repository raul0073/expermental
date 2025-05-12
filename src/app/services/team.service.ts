
type FetchTeamStatsParams = {
    team: string;
    stats_type: string;
    against: boolean;
  };
  
  export async function fetchTeamSeasonStats({ team, stats_type, against }: FetchTeamStatsParams) {
    const query = new URLSearchParams({
      team,
      stats_type,
      against: String(against),
    });
  
    try {
      const res = await fetch(`/api/team?${query.toString()}`, {
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
  export async function fetchAllTeamsFromDB() {
  
    try {
      const res = await fetch(`/api/team/all`, {
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
  