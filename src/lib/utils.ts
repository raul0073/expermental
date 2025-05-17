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

export function formatStatKey(rawKey: string): string {
  const spaced = rawKey.replace(/_/g, " ");

  const forbiddenPrefixes = ["time", "shot creation", "types"];

  const lower = spaced.toLowerCase();
  const hit = forbiddenPrefixes.find((p) => lower.startsWith(p));

  return hit ? spaced.slice(hit.length).trimStart() : spaced;
}
export function serializeServerStats(data: RawStat[]): SerializedStats {
  const excludedKeys = ["nation", "pos", "age", "born", "90s"];

  const stats: SerializedStats = {};

  for (const item of data) {
    const rawKey = item.key
      .replace(/[()']/g, "")
      .replace(/,\s*/, "_")
      .toLowerCase()
      .trim();

    // Skip any key that starts with an excluded word
    if (excludedKeys.some(prefix => rawKey.startsWith(prefix))) continue;

    // Optional: only include keys with underscore (multi-part stat names)
    if (!rawKey.includes("_")) continue;

    stats[rawKey] = item.val;
  }

  return stats;
}



const SKIP_LABELS = new Set([
  "league", "season", "url", "born", "nation", "pos", "age", "player", "team"
]);

/**
 * Given the full stats object (e.g. { standard: Stat[], keeper: Stat[], … })
 * and a statsType (e.g. "standard", "keeper_adv" etc.), return exactly the
 * array of Stat you want to show:
 * 1) If stats[statsType] exists, return it.
 * 2) Otherwise, flatten everything and pick only those whose label
 *    starts with `${statsType}_`, stripping that prefix.
 */
export function getStatsByType(
  //eslint-disable-next-line
  allStats: Record<string, any[]>,
  statsType: string
): StatItem[] {
  // 1) direct hit
  if (allStats[statsType]) {
    return allStats[statsType];
  }

  // 2) fallback by prefix
  const prefix = `${statsType}_`;
  const out: StatItem[] = [];
  for (const arr of Object.values(allStats)) {
    for (const s of arr) {
      if (s.label.startsWith(prefix)) {
        out.push({
          label: s.label.slice(prefix.length),
          val: s.val,
          rank: s.rank,
        });
      }
    }
  }
  return out;
}


export function filterStatsForDisplay(stats: StatItem[]): StatItem[] {
  return stats.filter((s) => {
    // drop anything with a null rank (often the meta‐rows)
    if (s.rank == null || s.val === 0) return false;
    // drop by label
    return !SKIP_LABELS.has(s.label.toLowerCase());
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