

type FlagMeta = { emoji: string; label: string; iso2?: string };

const FLAG_BY_PREFIX: Record<string, FlagMeta> = {
  ENG: { emoji: "🇬🇧", label: "England / United Kingdom", iso2: "gb" }, // fallback is UK
  ESP: { emoji: "🇪🇸", label: "Spain", iso2: "es" },
  ITA: { emoji: "🇮🇹", label: "Italy", iso2: "it" },
  GER: { emoji: "🇩🇪", label: "Germany", iso2: "de" },
  FRA: { emoji: "🇫🇷", label: "France", iso2: "fr" },
};

export function getLeaguePrefix(league: string): string {
  // "ENG-Premier League" -> "ENG"
  return league.split("-")[0]?.trim() ?? "";
}

/**
 * Returns the best flag for a league name.
 * preferEngland: try the true England flag (🏴); falls back to 🇬🇧 if unsupported.
 */
export function getLeagueFlag(
  league: string,
  opts: { preferEngland?: boolean } = {}
): FlagMeta | null {
  const prefix = getLeaguePrefix(league);
  const meta = FLAG_BY_PREFIX[prefix];
  if (!meta) return null;

  if (prefix === "ENG" && opts.preferEngland) {
    // some platforms render 🏴 poorly; caller can opt-in
    return { emoji: "🏴", label: "England (St George’s Cross)", iso2: "gb" };
  }
  return meta;
}
