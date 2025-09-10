import { findBestLogo, LEAGUE_LOGO_MAP } from "../../../[league]/[team]/utils/getTeamLogo";

export function getTeamLogoUrl(teamName: string, league: string) {
  const leagueCountryCode = league.split("-")[0];
  const leagueData = LEAGUE_LOGO_MAP[leagueCountryCode];
  if (!leagueData) return null;

  const logoFile = findBestLogo(teamName, leagueData.logos);

  return  `/images/teams/${leagueData.folder}/${encodeURIComponent(logoFile as string)}` || null;

}