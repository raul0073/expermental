import { LEAGUE_ICONS } from '@/lib/Types/LABELS';
import Image from 'next/image';

type LeagueLogoSize = "sm" | "md" | "lg";

type LeagueLogoProps = {
  league: string;
  size?: LeagueLogoSize;
};

function LeagueLogo({ league, size }: LeagueLogoProps) {
  return (
    <div
      className={`inline-block rounded-full ${
        size === "sm"
          ? "w-5 h-auto"
          : size === "md"
          ? "w-8 h-auto"
          : size === "lg"
          ? "w-10 h-auto"
          : "w-8 h-auto"
      }`}
    >
      <Image
        src={LEAGUE_ICONS[league].src}
        className="dark:mix-blend-lighten mix-blend-darken h-full w-full"
        alt={league}
        width={24}
        height={24}
      />
    </div>
  );
}

export default LeagueLogo;
