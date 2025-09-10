import { Player } from "@/app/(main)/(dashboard)/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Player365Radar } from "./Player365StatsChart";
import { PlayerHeaderAreaChart } from "./PlayerHeaderAreaChart";
import PlayerInfoAndStats from "./PlayerInfoAndStats";
import PlayerLinkToFbref from "./PlayerLinkToFbref";

type PlayerHeaderProps = {
  player: Player;
  league?: string;
};

const PlayerHeader: React.FC<PlayerHeaderProps> = ({ player }) => {
  return (
    <>
      {/* Sticky header with avatar + name */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b">
        <CardHeader className="relative w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 py-4 text-center sm:text-left">
          <div className="flex items-center gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 shadow-lg ring-2 ring-primary dark:ring-primary/50">
              <AvatarImage src={player.profile_img as string} alt={player.name} />
              <AvatarFallback className="text-xl sm:text-2xl font-bold">
                {player.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <CardDescription className="text-xl sm:text-2xl lg:text-3xl font-extrabold">
                {player.name}
              </CardDescription>
              <PlayerLinkToFbref player={player} />
            </div>
          </div>
        </CardHeader>
      </div>

      {/* Player info and stats */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mt-4">
        <PlayerInfoAndStats player={player} />
      </div>

      {/* Area chart */}
      <div className="w-full mt-6 px-2 sm:px-4">
        <PlayerHeaderAreaChart player={player} className="flex-1" />
      </div>

      <Separator className="my-6 sm:my-8" />

      {/* Radar chart */}
      <CardContent className="p-0">
          <Player365Radar
            player={player}
            className="flex-1"
          />
      </CardContent>
    </>
  );
};

export default PlayerHeader;
