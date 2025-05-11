export interface StatItem {
    label: string; 
    val: number;  
    rank: number;  
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
| "keeper_adv"
| "shooting"
| "passing"
| "passing_types"
| "goal_shot_creation"
| "defense"
| "possession"
| "playing_time"
| "misc";

// Label mapping to show in UI
export const STAT_OPTION_LABELS: Record<StatsOption, string> = {
	standard: "Overall",
	keeper: "Goalkeeping",
	keeper_adv: "Ad. Goalkeeping",
	shooting: "Shooting & Finishing",
	passing: "Passing",
	passing_types: "Passing Types",
	goal_shot_creation: "Creative Playmaking",
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
"passing_types",
"goal_shot_creation",
"defense",
"possession",
"keeper",
"keeper_adv",
"playing_time",
"misc",
];
