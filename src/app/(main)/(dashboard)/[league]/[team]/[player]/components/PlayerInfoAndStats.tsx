import { Player } from '@/app/(main)/(dashboard)/utils/types';
import TeamLogo from '../../components/header/TeamLogo';

function PlayerInfoAndStats({ player }: { player: Player }) {
  const generalStats: Record<string, number | string> = {
    "Matches Played": player.stats?.["standard"]?.["Playing Time - MP"] ?? "N/A",
    "Starts": player.stats?.["standard"]?.["Playing Time - Starts"] ?? "N/A",
    "Minutes Played": player.stats?.["standard"]?.["Playing Time - Min"] ?? "N/A",
    "Goals": player.stats?.["standard"]?.["Performance - Gls"] ?? "N/A",
    "Assists": player.stats?.["standard"]?.["Performance - Ast"] ?? "N/A",
    "Expected Goals": player.stats?.["standard"]?.["Expected - xG"] ?? "N/A",
    "Expected Assists": player.stats?.["standard"]?.["Expected - xAG"] ?? "N/A",
  };

  return (
    <div className="w-full h-full bg-muted rounded-md p-4 sm:p-6 shadow-sm relative overflow-clip ">
      {/* Background team logo */}
      {player.__meta__?.team && (
        <div className="absolute right-0 md:right-20 -top-6 opacity-25 pointer-events-none border ">
          <div className="w-fit opacity-25 scale-125 overflow-clip sm:scale-150">
            <TeamLogo
              teamName={player.__meta__?.team}
              league={player.__meta__?.league}
              size="xl"
            />
          </div>
        </div>
      )}

      {/* Info grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {/* Left side: meta info */}
        <div className="flex flex-col items-start gap-1 text-sm sm:text-base">
          {player.age && <p>Age: {player.age}</p>}
          {player.foot && <p>Foot: {player.foot}</p>}
          {player.role && <p>Role: {player.role}</p>}
          <p className="text-primary/80">M raw: {player.mental.m_raw.toFixed(1)}</p>
          <p className="text-primary/80">M: {player.mental.m.toFixed(0)}</p>
        </div>

        {/* Right side: general stats */}
        <div className="flex flex-col items-start gap-1 text-sm sm:text-base">
          {Object.entries(generalStats).map(([label, value]) => (
            <p
              key={label}
              className="flex justify-between items-center w-full"
            >
              <span className="text-muted-foreground/60">{label}:</span>{" "}
              <span className="font-medium">{value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerInfoAndStats;
