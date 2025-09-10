import { LABELS_CONFIG } from "@/lib/Types/LABELS";
import { StatsOption } from "@/lib/Types/PlayerStats.Type";
import { StatsPayload } from "../../../utils/types";

// pick 5 metrics per stat group for radar
const DEFAULT_METRICS_COUNT = 5;

export type RadarCategory = {
  key: string; // original metric key
  label: string; // human readable label
};

/**
 * Get selected metrics for radar chart
 * @param statGroup - e.g., "defense", "shooting"
 * @param count - number of metrics to pick (default 5)
 */
export function getRadarMetrics(statGroup: StatsOption, count = DEFAULT_METRICS_COUNT): RadarCategory[] {
  const groupConfig = LABELS_CONFIG[statGroup];
  if (!groupConfig) return [];

  const keys = Object.keys(groupConfig);
  // pick first N metrics; you can customize selection logic here
  const selectedKeys = keys.slice(0, count);

  return selectedKeys.map((key) => ({
    key,
    label: groupConfig[key] || key,
  }));
}


export function buildRadarData(teams: StatsPayload) {
  //eslint-disable-next-line
  const radarData: Record<string, any>[] = [];

  // iterate over each stat type in the payload
  Object.entries(teams).forEach(([statType, teamArr]) => {
    teamArr.forEach((team) => {
      // find if this team already exists in radarData
      let data = radarData.find((t) => t.team === team.team);
      if (!data) {
        data = {
          team: team.team,
          league: team.league,
          season: team.season,
        };
        radarData.push(data);
      }

      data[statType] = {};
//eslint-disable-next-line
      Object.entries(team.metrics).forEach(([key, val]: [string, any]) => {
        if (val && typeof val === "object" && "value" in val) {
          data[statType][key] = val.value;
        } else if (typeof val === "number") {
          data[statType][key] = val;
        }
      });
    });
  });

  return radarData;
}

export type MentalRadarMetric = {
  key: string;        // stat key to extract
  statGroup: string;  // which group it lives in, e.g., "defense", "passing"
  lowerBetter?: boolean; // optional, if lower is better
};

export type MentalRadarMapping = Record<string, MentalRadarMetric[]>;

// team radar mapping
export const MENTAL_RADAR_MAPPING: MentalRadarMapping = {
  passing_quality: [
    { statGroup: "passing", key: "Total_Cmp%" },
    { statGroup: "passing_types", key: "Short_Cmp%" },
    { statGroup: "passing", key: "PrgP" },
    { statGroup: "passing", key: "PrgDist" },
  ],
  chance_creation: [
    { statGroup: "goal_shot_creation", key: "SCA_SCA90" },
    { statGroup: "goal_shot_creation", key: "GCA_GCA90" },
    { statGroup: "shooting", key: "Standard_Ast" },
  ],
  ball_recovery: [
    { statGroup: "defense", key: "Tkl+Int" },
    { statGroup: "defense", key: "Int" },
    { statGroup: "misc", key: "Performance_Recov" },
    { statGroup: "defense", key: "Challenges_Tkl%" },
        { statGroup: "defense", key: "Challenges_Lost", lowerBetter: true },
  ],
  chance_conversion: [
    { statGroup: "shooting", key: "Standard_G/Sh" },
    { statGroup: "shooting", key: "Standard_G/SoT" },
    { statGroup: "shooting", key: "Expected_npxG/Sh" },
    { statGroup: "standard", key: "Per 90 Minutes_G+A-PK" },
  ],
  pressure: [
    { statGroup: "defense", key: "Tackles_Att 3rd" },
    { statGroup: "defense", key: "Tackles_Mid 3rd" },
    { statGroup: "defense", key: "Challenges_Att" },
  ],
  discipline: [
    { statGroup: "defense", key: "Err", lowerBetter: true },
    { statGroup: "misc", key: "Performance_CrdR", lowerBetter: true },
    { statGroup: "misc", key: "Performance_2CrdY", lowerBetter: true },
    { statGroup: "misc", key: "Performance_Off", lowerBetter: true },
  ],
  aerial: [
    { statGroup: "misc", key: "Aerial Duels_Won%" },
    { statGroup: "misc", key: "Aerial Duels_Won" },
    { statGroup: "misc", key: "Aerial Duels_Lost", lowerBetter: true },
  ],
};
export function getMentalRadarDataForTeams(//eslint-disable-next-line
  teams: Record<string, any>[]
): Record<string, Record<string, number> & { league?: string }> {
  const rawResult: Record<string, Record<string, number> & { league?: string }> = {};

  teams.forEach((team) => {
    if (!team.team) return;

    const mapped: Record<string, number> & { league?: string } = { league: team.league };

    Object.entries(MENTAL_RADAR_MAPPING).forEach(([category, metrics]) => {
      let sum = 0;
      metrics.forEach(({ statGroup, key, lowerBetter }) => {
        const group = team[statGroup] || {};
        let val = group[key];
        if (val !== undefined) {
          if (typeof val === "object" && "value" in val) val = val.value;
          if (lowerBetter) val = val * -1;
          sum += val;
        }
      });
      mapped[category] = sum;
    });

    rawResult[team.team] = mapped;
  });

  // normalize per category
  const categories = Object.keys(MENTAL_RADAR_MAPPING);
  const normalizedResult: Record<string, Record<string, number> & { league?: string }> = {};

  categories.forEach((cat) => {
    let min = Infinity;
    let max = -Infinity;

    Object.values(rawResult).forEach((stats) => {
      const val = stats[cat];
      if (val !== undefined) {
        if (val < min) min = val;
        if (val > max) max = val;
      }
    });

    Object.entries(rawResult).forEach(([team, stats]) => {
      if (!normalizedResult[team]) normalizedResult[team] = {};
      const val = stats[cat];
      normalizedResult[team][cat] = min === max ? 50 : ((val - min) / (max - min)) * 100;
      // keep league for scatterData
      normalizedResult[team].league = stats.league;
    });
  });

  return normalizedResult;
}


export const DEFENSE_MAPPING_QUALITY: Record<string, string[]> = {
  Resilience: ["Tackles_Tkl%", "Tackles_TklW", "Tkl+Int"], // success & clean interventions
  Composure: ["Tackles_Tkl%", "Challenges_Tkl%"],           // % success under pressure
  Aggression: [],                                           // optional, no pure quality metric
  Discipline: ["Err", "Challenges_Lost"],                  // fewer errors
  Control: [],                                              // could add Clr% if available, else skip
};
/**
 * Extract mental-style defense radar data per team
 * @param teams - flattened team array from StatsPayload
 * @returns object keyed by team name with only mapped defense categories
 */
//eslint-disable-next-line
export function getDefenseDataForRadar(teams: Record<string, any>) {
  const result: Record<string, Record<string, number>> = {};
//eslint-disable-next-line
  Object.values(teams).forEach((team: any) => {
    if (!team.team || !team.defense) return;

    const defenseStats = team.defense;
    const mapped: Record<string, number> = {};

    Object.entries(DEFENSE_MAPPING_QUALITY).forEach(([category, keys]) => {
      let sum = 0;
      keys.forEach((key) => {
        const val = defenseStats[key];
        if (val !== undefined) {
          sum += typeof val === "object" && "value" in val ? val.value : val;
        }
      });
      mapped[category] = sum;
    });

    result[team.team] = mapped;
  });

  return result;
}

export type RadarCategoryScores = Record<string, number>;

/**
 * Convert snake_case to Capitalized Words for radar labels
 */
function prettifyCategory(name: string) {
  return name
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
const normalizeDiscipline = (val: number): number => {
  if (val == null || isNaN(val)) return 50;

  // 0 cards = 100, 5+ cards = 0
  return Math.max(0, Math.min(100, (1 - val / 5) * 100));
};
/**
 * Compute radar-friendly normalized scores (0-100) per mental category
 * @param teamStats StatsPayload for a single team
 * @param radarMapping MENTAL_RADAR_MAPPING
 * @returns RadarCategoryScores
 */
export function getTeamRadarStats(
  teamStats: StatsPayload,
  radarMapping = MENTAL_RADAR_MAPPING
): RadarCategoryScores {
  const result: RadarCategoryScores = {};

  for (const [category, keys] of Object.entries(radarMapping)) {
    const values: number[] = [];

    for (const k of keys) {//eslint-disable-next-line
      const group = teamStats[k.statGroup] as Record<string, any> | undefined;
      if (!group) continue;

      let val = group[k.key as string];
      if (val && typeof val === "object" && "value" in val) val = val.value;
      if (val == null || isNaN(val)) continue;

      // If discipline, apply manual punishment
      if (category === "discipline") {
        val = normalizeDiscipline(Number(val));
      } else if (k.lowerBetter) {
        // invert lowerBetter stats normally
        val = -Number(val);
      }

      values.push(Number(val));
    }

    if (values.length === 0) {
      result[prettifyCategory(category)] = 99;
      continue;
    }

    // Min-max normalization for the category
    const min = Math.min(...values);
    const max = Math.max(...values);
    const normValues = values.map((v) =>
      max === min ? 99 : ((v - min) / (max - min)) * 100
    );

    const avgScore =
      normValues.reduce((sum, v) => sum + v, 0) / normValues.length;

    result[prettifyCategory(category)] = Math.round(
      Math.min(Math.max(avgScore, 0), 100)
    );
  }

  return result;
}