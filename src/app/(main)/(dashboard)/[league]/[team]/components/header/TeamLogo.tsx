import Image from "next/image";
import { findBestLogo, LEAGUE_LOGO_MAP } from "../../utils/getTeamLogo";

type TeamLogoSize = "xs" | "sm" | "md" | "lg" | "xl";

type TeamLogoProps = {
  teamName: string;
  league: string;
  size?: TeamLogoSize;
};

const SIZE_MAP: Record<TeamLogoSize, number> = {
  xs: 16,  // 1rem
  sm: 24,  // 1.5rem
  md: 32,  // 2rem
  lg: 48,  // 3rem
  xl: 96,  // 6rem
};

const TeamLogo: React.FC<TeamLogoProps> = ({ teamName, league, size = "md" }) => {
  const leagueCountryCode = league.split("-")[0];
  const leagueData = LEAGUE_LOGO_MAP[leagueCountryCode];
  const logoFile = findBestLogo(teamName, leagueData.logos);

  const logoPath = logoFile
    ? `/images/teams/${leagueData.folder}/${encodeURIComponent(logoFile)}`
    : null;

  const dimension = SIZE_MAP[size];

  return (
    <div
      className="relative inline-flex items-center justify-center rounded-full overflow-hidden"
      style={{ width: dimension, height: dimension }}
    >
      {logoPath ? (
        <Image
          src={logoPath}
          alt={teamName}
          width={dimension}
          height={dimension}
          className="dark:mix-blend-lighten mix-blend-darken object-contain"
        />
      ) : (
        <span className="text-gray-400 text-[0.6rem] leading-none text-center">
          No logo
        </span>
      )}
    </div>
  );
};

export default TeamLogo;
