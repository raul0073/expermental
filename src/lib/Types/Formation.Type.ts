import { PlayerRole } from "@/components/player/player.types";

export const FORMATION_MAP: Record<string, string[]> = {
	"4-3-3": [
		"GK",
		"LB", "LCB", "RCB", "RB",
		"LCM", "CDM", "RCM",
		"LW", "CF", "RW",
	],
	"4-2-3-1": [
		"GK",
		"LB", "LCB", "RCB", "RB",
		"CDM", "CDM",
		"LW", "CAM", "RW",
		"ST",
	],
	"5-3-2": [
		"GK",
		"LWB", "LCB", "CB", "RCB", "RWB",
		"LCM", "CM", "RCM",
		"STR", "STL",
	],
	"3-4-3": [
		"GK",
		"LCB", "CB", "RCB",
		"LM", "CM", "CM", "RM",
		"LW", "CF", "RW",
	],
	"4-4-2": [
		"GK",
		"LB", "LCB", "RCB", "RB",
		"LM", "LCM", "RCM", "RM",
		"ST", "ST",
	],
};
export const ROLE_POSITIONS: Record<PlayerRole, [number, number]> = {
    // Goalkeeper
    GK: [-45, 0],
  
    // Defense
    LB: [-32, -25],
    LCB: [-30, -12],
    CB: [-30, 0],
    RCB: [-30, 12],
    RB: [-32, 25],
  
    LWB: [-20, -25],
    RWB: [-20, 25],
  
    // Midfield
    CDM: [-15, 0],
    CM: [-10, 0],
    LCM: [-7, -10],
    RCM: [-7, 10],
    LM: [-10, -20],
    RM: [-10, 20],
    CAM: [10, 0], 
  
    // Attack
    LW: [10, -25],
    RW: [10, 25],
    SS: [15, -5],
    CF: [18, 0],
    ST: [22, 0],
    STR: [22, 5],
    STL: [22, -5],
    FW: [18, 0],
  };