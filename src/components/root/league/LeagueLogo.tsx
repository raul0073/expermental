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
          ? "w-5 h-5"
          : size === "md"
          ? "w-8 h-8"
          : size === "lg"
          ? "w-10 h-10"
          : "w-8 h-8"
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
