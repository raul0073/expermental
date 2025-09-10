export interface StatItem {
    label: string; 
    val: number;  
    rank: number | null;  
  }
  
  // Interface for the API response
  export interface APIRes {
    team: string;       
    player: string;     
    stats_type: string; 
    data: StatItem[];   
  }

// Type to use in the frontend logic
export type StatsOption =
| "standard"
| "keeper"
| "shooting"
| "passing"
| "goal"
| "defense"
| "possession"
| "misc"
|"goal_shot_creation"
|"passing_types"
|"playing_time"

// Label mapping to show in UI
export const STAT_OPTION_LABELS: Record<StatsOption, string> = {
	standard: "Overall",
	keeper: "Goalkeeping",
	shooting: "Shooting & Finishing",
  goal_shot_creation: "Creating",
  passing_types: "Types of Passing",
	passing: "Passing",
	goal: "Creative Playmaking",
	defense: "Defensive Actions",
	possession: "Possession",
	playing_time: "Playing Time",
	misc: "Other Stats",
};

// Optional: ordered list for rendering buttons/dropdowns
export const STAT_OPTIONS: StatsOption[] = [
"standard",
"shooting",
"passing",
"goal",
"defense",
"possession",
"keeper",
"playing_time",
"misc",
];
