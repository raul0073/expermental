"use client";

import { ArrowBigUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { getTeamRadarStats } from "@/app/(main)/(dashboard)/components/charts/utils/buildTeamRadar";
import { StatsPayload } from "@/app/(main)/(dashboard)/utils/types";
import { cn } from "@/lib/utils";

type Props = {
  teamStats: StatsPayload;
  teamName: string;
  className?: string
};

// optional: categories order
const CATEGORY_ORDER = [
  "Passing Quality",
  "Chance Creation",
  "Ball Recovery",
  "Chance Conversion",
  "Pressure",
  "Discipline",
  "Aerial",
];

export function ChartRadarTeamGrid({ teamStats, teamName, className }: Props) {
  // 1️⃣ compute radar scores
  const radarScores = getTeamRadarStats(teamStats);

  // 2️⃣ convert to array for recharts
  const chartData = CATEGORY_ORDER.map(category => ({
    category,
    value: radarScores[category] ?? 0,
  }));

  // 3️⃣ Chart config
  const chartConfig = {
    value: {
      label: "Score",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  const keyArea =
    chartData.length > 0
      ? chartData.reduce((max, curr) => (curr.value > max.value ? curr : max)).category
      : "-";
  return (
    <Card className={cn("h-fit gap-4 border-none shadow-none", className)}>
      <CardHeader className="gap-2 py-0">
        <CardDescription>
          {teamName} Performance Radar <br />
          <span className="flex gap-2 text-xs"> Key performance areas <ArrowBigUp className="h-4 w-4 fill-lime-600 text-lime-600/90" /> {keyArea}</span>
        </CardDescription>
      </CardHeader>

        <CardContent className="mx-auto">
        <ChartContainer
          config={chartConfig}
          className="max-w-[270px] aspect-square"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid
              className="fill-muted-foreground opacity-20"
              gridType="circle"
            />
            <PolarAngleAxis dataKey="category" />
            <Radar
              dataKey="value"
              fill="hsl(var(--chart-1))"
              stroke="hsl(var(--chart-1))"
              fillOpacity={0.5}
              dot={{ r: 4, fillOpacity: 1 }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
