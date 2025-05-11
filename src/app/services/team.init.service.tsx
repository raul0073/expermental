import { TeamModel, TeamTypeInit } from "@/lib/Types/Team.Type";

  
  export async function initializeTeamData(team : TeamTypeInit) {  
    try {
      const res = await fetch(`/api/team/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(team)
      });
  
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to initialize team');
      }
  
      const data: TeamModel =  await res.json();
      console.log(data);
      return data
      //eslint-disable-next-line
    } catch (error: any) {
      console.error('Team initialization error:', error.message);
      throw error;
    }
  }
  