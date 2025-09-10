"use client";

import { Player, Player365Stats } from "@/app/(main)/(dashboard)/utils/types";
import { FC, useMemo } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar, RadarChart,
  ResponsiveContainer, Tooltip
} from "recharts";

type RadarDataItem = {
  stat: string;
  per90: number;
  percentile: number;
};

type Props = {
  player: Player;
  className?: string; // optional, default size
};

const PLAYER_STATS_KEYS = [
  "Non-Penalty Goals",
  "npxG: Non-Penalty xG",
  "Shots Total",
  "Assists",
  "xAG: Exp. Assisted Goals",
  "npxG + xAG",
  "Shot-Creating Actions",
  "Passes Attempted",
  "Pass Completion %",
  "Progressive Passes",
  "Progressive Carries",
  "Successful Take-Ons",
  "Touches (Att Pen)",
  "Progressive Passes Rec",
  "Tackles",
  "Interceptions",
  "Blocks",
  "Clearances",
  "Aerials Won",
];

export const Player365Radar: FC<Props> = ({ player }) => {
  const stats = player.player_365_stats;

 const radarData: RadarDataItem[] = useMemo(() => {
  if (!stats) return [];

  return PLAYER_STATS_KEYS.map((key) => {
    const k = key as keyof Player365Stats["per90"];
    return {
      stat: key,
      per90: stats.per90[k] ?? 0,
      percentile: stats.percentiles[k] ?? 0,
    };
  });
}, [stats]);

  return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" tick={{ fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip
            formatter={(value: number, name: string) => [`${value}`, name]}
          />
          <Radar
            name={player.name}
            dataKey="percentile"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
  );
};
