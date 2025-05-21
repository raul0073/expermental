import { PlayerRole } from "@/components/player/player.types";

export const FORMATION_MAP: Record<string, string[]> = {
	"1-4-3-3": [
		"GK",
		"LB", "LCB", "RCB", "RB",
		"LCM", "CDM", "RCM",
		"LW", "ST", "RW",
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
	"1-4-5-1": [
		"GK",
		"LB", "LCB", "RCB", "RB",
		"LW", "LCM", "CAM", "RCM", "RW",
		"STR", "STL",
	],
	"1-3-3-4": [
		"GK",
		"LB","CB", "RB",
		"LDM", "CM", "RDM",
		"LW", "CAM", "ST", "RW",
	],
	"1-5-2-3": [
		"GK",
		"LWB", "LCB", "CB", "RCB", "RWB",
		"LCM", "RCM",
		"LW", "ST", "RW",
	],
	"1-4-2-4": [
		"GK",
		"LB", "LCB", "RCB", "RB",
		"LCM", "RCM",
		"LW", "CAM", "ST", "RW",

	]
};
export const ROLE_POSITIONS: Record<PlayerRole, [number, number]> = {
    // Goalkeeper
    GK: [-50, 0],
  
    // Defense
    LB: [-28, -25],
    LCB: [-30, -10],
    CB: [-30, 0],
    RCB: [-30, 10],
    RB: [-28, 25],
  
    LWB: [-20, -25],
    RWB: [-20, 25],
  
    // Midfield
    CDM: [-15, 0],
    LDM: [-15, -12],
    RDM: [-15, 12],
    CM: [-5, 0],
    LCM: [-1, -12],
    RCM: [-1, 12],
    LM: [-10, -25],
    RM: [-10, 25],
    CAM: [12, 0], 
  
    // Attack
    LW: [18, -25],
    RW: [18, 25],
    SS: [15, -5],
    CF: [22, 0],
    ST: [30, 0],
    STR: [25, 5],
    STL: [25, -5],
    FW: [18, 0],
  };


  export const POSITION_FALLBACK: Record<string, string[]> = {
	GK:     ["GK", "SK"],
	LB:     ["LWB"],
	RB:     ["RWB"],
	CB:     ["LCB", "RCB"],
	LCB:    ["CB", "RCB"],
	RCB:    ["CB", "LCB"],
	LWB:    ["LB", "LM"],
	RWB:    ["RB", "RM"],

	CDM:    ["CM", "LCM", "RCM"],
	CM:     ["LCM", "RCM", "CDM"],
	LCM:    ["CM", "RCM"],
	RCM:    ["CM", "LCM"],
	
	RM:     ["RW", "RCM"],
	LM:     ["LW", "LCM"],
	CAM:    ["LCM", "RCM", "CM"],
	LW:     ["LM", "STL"],
	RW:     ["RM", "STR"],
	CF:     ["ST", "CAM"],
	ST:     ["CF"]

  };