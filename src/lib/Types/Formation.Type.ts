import { PlayerRole } from "@/components/player/player.types";

export const FORMATION_MAP: Record<string, string[]> = {
	"1-4-3-3": [
		"GK",
		"LB", "LCB", "RCB", "RB",
		"LCM", "CDM", "RCM",
		"LW", "CF", "RW",
	],
	"1-4-2-3-1": [
		"GK",
		"LB", "LCB", "RCB", "RB",
		"LCM", "RCM",
		"LW", "CAM", "RW",
		"ST",
	],
	"1-5-3-2": [
		"GK",
		"LWB", "LCB", "CB", "RCB", "RWB",
		"LCM", "CM", "RCM",
		"STR", "STL",
	],
	"1-3-4-3": [
		"GK",
		"LCB", "CB", "RCB",
		"LM", "LCM", "RCM", "RM",
		"LW", "ST", "RW",
	],
	"1-4-4-2": [
		"GK",
		"LB", "LCB", "RCB", "RB",
		"LM", "LCM", "RCM", "RM",
		"STR", "STL",
	],
	"1-3-5-2": [
		"GK",
		"LCB","CB", "RCB",
		"LM", "LCM","CAM", "RCM", "RM",
		"STR", "STL",
	],
};
export const ROLE_POSITIONS: Record<PlayerRole, [number, number]> = {
    // Goalkeeper
    GK: [-50, 0],
  
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
    LM: [-10, -25],
    RM: [-10, 25],
    CAM: [10, 0], 
  
    // Attack
    LW: [10, -25],
    RW: [10, 25],
    SS: [15, -5],
    CF: [22, 0],
    ST: [25, 0],
    STR: [25, 5],
    STL: [25, -5],
    FW: [18, 0],
  };