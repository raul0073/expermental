import { ZonesConfig } from "./Zones.Types";

export type Category = "pros" | "cons" | "important";

export interface UserConfigModel {
    _id: string
    zones_config: ZonesConfig
    players_config: PlayersConfig
    created_at: string
    updated_at: string
}
export interface ScoreGroup {         
  [statType: string]: string[];       
}

export type RoleScoreConfig = Record<Category, ScoreGroup>;

export type ScoreConfig = {
    GK: RoleScoreConfig;
    DEF: RoleScoreConfig;
    MID: RoleScoreConfig;
    FWD: RoleScoreConfig;
  }

export interface ScoreWeights {
  pros: number;
  cons: number;
  important: number;
}

export interface PlayersConfig {
    score_config: ScoreConfig
    score_weights: ScoreWeights
}