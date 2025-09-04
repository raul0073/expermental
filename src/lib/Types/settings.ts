// src/lib/config/settings.ts

export const SETTINGS = {
  API_URL: process.env.API_URL,
  NEXT_API: process.env.NEXT_URL,
  // Mental scoring
  MENTAL_TOP_PLAYERS_LIMIT: 50,
  MENTAL_TOP_TEAMS_LIMIT: 30,

  // App UI
  DEFAULT_SEASON: 2425,
  DEFAULT_LEAGUE: "ENG-Premier League",

  // API options
  REVALIDATE_SECONDS: 3600,

  // Fallbacks
  FALLBACK_LEAGUE_NAME: "Unknown League",
};
