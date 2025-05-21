import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StatItem } from "./Types/PlayerStats.Type";
import { FORMATION_MAP, POSITION_FALLBACK } from "./Types/Formation.Type";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const toOrdinal = (n: number): string => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
export type RawStat = {
  info: string;
  key: string; // e.g. "('Total', 'Cmp')"
  val: string | number;
};

export type SerializedStats = Record<string, string | number>;

export function toSnakeCase(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").replace(/%/g, "percent");
}
export function parseKeyTuple(keyStr: string): [string, string] {
  const match = keyStr.match(/\('([^']*)',\s*'([^']*)'\)/);
  if (!match) return [keyStr, ""]; 
  return [match[1], match[2]];
}
const excludedKeys = [
  "league", "season", "url", "born", "nation", "pos", "age", "player", "team", "90s"
]
const forbiddenPrefixes = ["time", "shot creation", "types"];
export function formatStatKey(rawKey: string): string | null {
  const spaced = rawKey.replace(/_/g, " ");
  const lower = spaced.toLowerCase().trim();

  // ⛔ Skip excluded keys (exact matches)
  if (excludedKeys.some((k) => lower === k)) {
    return null;
  }

  // ✂️ Remove unwanted prefixes
  const hit = forbiddenPrefixes.find((p) => lower.startsWith(p));
  const cleaned = hit ? spaced.slice(hit.length).trimStart() : spaced;

  return cleaned;
}
export function formatStatForChartKey(key: string) {
  const formatted = formatStatKey(key)
 if(formatted){
  const words = formatted.split(" ");
  if (words.length > 1) {
    return [words[0], ...words.slice(1).map(w => w.slice(0, 2))].join(" ");
  } else {
    return formatted
  }
 }

}


/**
 * Given the full stats object (e.g. { standard: Stat[], keeper: Stat[], … })
 * and a statsType (e.g. "standard", "keeper_adv" etc.), return exactly the
 * array of Stat you want to show:
 * 1) If stats[statsType] exists, return it.
 * 2) Otherwise, flatten everything and pick only those whose label
 *    starts with `${statsType}_`, stripping that prefix.
 */
export function getStatsByType(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allStats: Record<string, any[]>,
  statsType: string
): StatItem[] {
  if (allStats[statsType]) {
    return allStats[statsType];
  }

  const prefix = `${statsType}_`;
  const out: StatItem[] = [];
  for (const arr of Object.values(allStats)) {
    for (const s of arr) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (s.label.startsWith(prefix)) {
        out.push({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          label: s.label.slice(prefix.length),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          val: s.val,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          rank: s.rank,
        });
      }
    }
  }
  return out;
}



export function filterStatsForDisplay(stats: PlayerStat[]): PlayerStat[] {
  const excludedKeys = new Set([
    "league", "season", "url", "born", "nation", "pos", "age", "player", "team", "90s"
  ]);
  return stats.filter((s) => {
    if (s.rank == null || s.val === 0) return false;
    const label = s.label.toLowerCase().trim();
    return !excludedKeys.has(label);
  });
}


export function getAssignedPosition(
  formation: string,
  playerRole: string
): string | undefined {
  const roles = FORMATION_MAP[formation];
  if (roles.includes(playerRole)) {
    return playerRole;
  }

  // try each fallback in order
  const fallbacks = POSITION_FALLBACK[playerRole] || [];
  for (const fb of fallbacks) {
    if (roles.includes(fb)) {
      return fb;
    }
  }

  // no match found
  return undefined;
}

import { Player } from "@/components/player/player.types";
import {  ChartPayload, getChartLabel, STAT_KEYS_CONFIG } from "./Types/Plots.Type";
import { PlayerStat, PlayerStatsGroup } from "./Types/Team.Type";

// eslint-disable-next-line
function hasCategories(obj: any): obj is { categories: Record<string, string[]> } {
  return obj && typeof obj === "object" && "categories" in obj;
}
export function getChartStatKeys(
  chartType: "pizza" | "radar",
  role: "GK" | "DF" | "MF" | "FW",
  // eslint-disable-next-line
  statType?: string
): string[] {
  const roleConfig = STAT_KEYS_CONFIG[chartType]?.[role];
  if (!roleConfig) return [];

  if (chartType === "radar") {
    return Object.values(roleConfig.categories).flat();
  }

  if (chartType === "pizza" && hasCategories(roleConfig)) {
    return Object.values(roleConfig.categories).flat();
  }

  return [];
}
// Pull and flatten a PlayerStat[] from the selected statType
export function getPlotStatsByType(
  statsGroup: PlayerStatsGroup,
  statType: string
): PlayerStat[] {
  return statsGroup?.[statType] ?? [];
}
export function getChartPayload(
  player: Player,
): ChartPayload | null {
  const position = (player.position || "").split(",")[0].trim() as
    | "GK"
    | "DF"
    | "MF"
    | "FW";

  const pizzaConfig = STAT_KEYS_CONFIG.pizza?.[position];
  const radarConfig = STAT_KEYS_CONFIG.radar?.[position];

  if (!pizzaConfig && !radarConfig) {
    console.warn(`No chart config for position: ${position}`);
    return null;
  }

  // Flatten stats into lookup table
  const flatStats: Record<string, number> = {};
  Object.values(player.stats).forEach((group) => {
    group.forEach((item) => {
      if (item.label && item.val !== undefined) {
        flatStats[item.label] = parseFloat(item.val as string) || 0;
      }
    });
  });

  const buildMetrics = (categories: Record<string, string[]>) => {
    const allKeys: string[] = [];
    const categoryMap: Record<string, string> = {};

    Object.entries(categories).forEach(([category, keys]) => {
      keys.forEach((key) => {
        allKeys.push(key);
        categoryMap[key] = category;
      });
    });

    return allKeys.map((label) => ({
      key: getChartLabel(label),
      raw_key: label,
      value: flatStats[label] ?? 0,
      category: categoryMap[label] ?? null,
    }));
  };

  return {
    player_name: player.name,
    player_position: player.position,
    pizza_metrics: pizzaConfig ? buildMetrics(pizzaConfig.categories) : [],
    radar_metrics: radarConfig ? buildMetrics(radarConfig.categories) : [],
  };
}
