import { Player } from "@/components/player/player.types";
import { FullZone } from "@/components/zones/zones.types";

export interface TeamTypeInit {
    name: string;
    league: string;
    season: string;
    slug: string;
    logo: string;
  }



export interface PlayerStat {
  label: string;
  val: string | number;
  rank: number;
}

export interface PlayerStatsGroup {
  [statType: string]: PlayerStat[];
}


export interface TeamStat {
  label: string;
  val: number | string;
  rank: number | null;
}

export interface TeamModel {
  name: string;
  slug: string;
  logo: string;
  league: string;
  season: string;
  stats: TeamStat[];
  stats_against: TeamStat[]
  players: Player[];
  best_11: Player[];
  formation: string;
  zones:  Record<string, FullZone>;
}
