// services/api.ts
export interface PlayerStat {
    val: string | number;
    label: string;
    rank: number
  }
  
  export type AISummaryDTO = {
    stats: PlayerStat[],
    stats_type: string,
    player_name: string
    player_role: string
  }
  export type AISummaryDTORes = {
   summary: string
  }
  export async function fetchAIPlayerSummary( playerData: AISummaryDTO): Promise<string> {
    const res = await fetch("/api/AI", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerData),
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Failed to fetch player summary.");
    }
  
    const data: AISummaryDTORes = await res.json();
    
    return data.summary;
  }
  