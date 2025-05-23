export type MetricGroup = Record<string, string[]>;

export interface ZoneMetricBranches {
  team: MetricGroup;
  against: MetricGroup;
}

export interface ZoneConfig {
  label: string;
  positions: Record<string, number>;
  pros: ZoneMetricBranches;
  cons: ZoneMetricBranches;
}


// zones config
export interface ZonesConfig {
  zone_config: Record<string, ZoneConfig>;
  zone_scalers: Record<string, Record<string, number>>;
  zone_players: Record<string, string[]>;
}

export interface ZonesConfigPayload {
  zones_config: ZonesConfig;
}
