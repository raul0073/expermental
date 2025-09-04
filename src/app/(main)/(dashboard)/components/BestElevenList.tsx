"use client";

import { Player } from "../utils/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Coordinates are percentages relative to pitch container
const FORMATION_MAP: Record<string, { x: number; y: number }[]> = {
  GK: [{ x: 50, y: 95 }],
  CB: [{ x: 38, y: 75 }, { x: 62, y: 75 }],
  FB: [{ x: 10, y: 75 }, { x: 88, y: 75 }],
  DM: [{ x: 65, y: 50 }],
  CM: [{ x: 35, y: 50 }, { x: 65, y: 50 }],
  AM: [{ x: 50, y: 30 }],
  W: [{ x: 10, y: 30 }, { x: 90, y: 30 }],
  CF: [{ x: 50, y: 15 }],
};

type Props = {
  eleven: Player[];
};

export function BestElevenFormation({ eleven }: Props) {
  return (
    <Card className="h-fit border-none">
      <CardHeader>
        <CardTitle>Best XI (Mental) — Formation View</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center w-full py-4">
        {/* Pitch */}
        <div className="relative w-full aspect-[2/2] bg-green-700 rounded-2xl border-4 border-white">
          {/* Mid line */}
          <div className="absolute top-1/2 left-0 w-full border-t-2 border-white/20" />

          {eleven.map((player, i) => {
            const roleCoords = FORMATION_MAP[player.role];
            if (!roleCoords || !roleCoords[i % roleCoords.length]) return null;
            const { x, y } = roleCoords[i % roleCoords.length];
            return (
              <div
                key={player.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <PlayerCard player={player} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="flex flex-col items-center text-center ">
      <div className="text-xs flex items-center gap-1"><span className="font-bold text-xs leading-tight text-nowrap">{player.name}</span>  </div>
      <div className="text-gray-50/80 text-[10px]"><span className="text-[.6rem] text-gray-50/60"> ({player.role})</span> {player.team}  -  <span className="font-semibold text-primary">
        {Math.round(player.mental.m)}
        </span></div>
    </div>
  );
}
