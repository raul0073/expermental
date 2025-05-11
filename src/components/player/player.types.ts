import { PlayerStatsGroup } from "@/lib/Types/Team.Type";

export type Player = {
    name: string;
    age: string;
    foot: string;
    nationality: string;
    position: FbrefPosition;
    rating: number;
    role: PlayerRole;
    shirt_number: number;
    stats: PlayerStatsGroup;
};


export type FbrefPosition = "GK" | "DF" | "MF" | "FW" 
export type PlayerRole =| "GK"| "LB" | "LCB" | "CB" | "RCB" | "RB"| "LWB" | "RWB"| "CDM" | "CM" | "LCM" | "RCM" | "RM" | "LM" | "CAM"| "LW" | "RW" | "SS" | "CF" | "ST" |"STR" |"STL"| "FW";
