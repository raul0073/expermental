import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


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
  if (!match) return [keyStr, ""]; // fallback
  return [match[1], match[2]];
}

export function formatStatKey(rawKey: string): string {
  return rawKey.replace(/_/g, " ");
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



