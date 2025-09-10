import { ENG_PREMIER_LOGOS, ESP_LALIGA_LOGOS, FRA_LIGUE1_LOGOS, GER_BUNDESLIGA_LOGOS, ITA_SERIEA_LOGOS } from "../../../../../../../public/images/teams/logosIndex";

export const LEAGUE_LOGO_MAP: Record<string, { logos: string[]; folder: string }> = {
  "ENG": { logos: ENG_PREMIER_LOGOS, folder: "ENG-Premier League" },
  "FRA": { logos: FRA_LIGUE1_LOGOS, folder: "FRA-Ligue 1" },
  "GER": { logos: GER_BUNDESLIGA_LOGOS, folder: "GER-Bundesliga" },
  "ITA": { logos: ITA_SERIEA_LOGOS, folder: "ITA-Serie A" },
  "ESP": { logos: ESP_LALIGA_LOGOS, folder: "ESP-La Liga" },
};
function normalize(str: string) {
  return str.toLowerCase().replace(/[^\w\s]/g, '').trim();
}

function wordScore(teamWord: string, logoWord: string): number {
  if (logoWord.startsWith(teamWord)) return 10;
  if (logoWord.includes(teamWord)) return 5;
  return 0;
}

export function findBestLogo(teamName: string, logos: string[]): string | null {
  if (!teamName || !logos?.length) return null;

  const teamWords = normalize(teamName).split(/\s+/);

  let bestLogo: string | null = null;
  let bestScore = -1;

  logos.forEach(logo => {
    const logoBase = logo.replace(/\.(png|jpg|jpeg|svg)$/i, '');
    const logoWords = normalize(logoBase).split(/\s+/);

    // sum max score per team word
    let score = teamWords.reduce((acc, tWord) => {
      const maxWordScore = Math.max(...logoWords.map(lWord => wordScore(tWord, lWord)));
      return acc + maxWordScore;
    }, 0);

    // optional bonus for full-name substring match
    if (normalize(logoBase).includes(normalize(teamName))) score += 50;

    if (score > bestScore) {
      bestScore = score;
      bestLogo = logo;
    }
  });

  return bestLogo;
}
