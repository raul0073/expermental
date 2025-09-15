"use client";

import { StatsPayload } from "@/app/(main)/(dashboard)/utils/types";
import { TeamPlottingResponse } from "@/app/(main)/(dashboard)/utils/types/team";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { ChartRadarTeamGrid } from "../team/TeamPerformanceRadar";
import { HeatmapComp } from "./wrappers/TeamHeatmap";
import { TeamDefaultRadarVsLeagueBest } from "./wrappers/TeamRadar";

type Props = {
  stats: StatsPayload; // team radar stats
  plot: TeamPlottingResponse;  // league comparison radar
  teamName: string;
  className?: string;
};

const TeamRadarDashboard: React.FC<Props> = ({ stats, plot, teamName, className }) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>{teamName} Performance Overview</CardTitle>
        <CardDescription>
          Team performance & comparison vs league best
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex flex-col md:flex-row gap-1">
        <ChartRadarTeamGrid
          teamStats={stats}
          className="w-full h-1/2"
          teamName={teamName}
        />
        <TeamDefaultRadarVsLeagueBest
          data={plot.default}
          className="w-full h-1/2 pt-1"
          teamName={teamName}
        />
      </CardContent>
      <CardContent className="p-0 flex flex-col md:flex-row gap-1">
          <HeatmapComp
        data={plot.heatmap}
        className="w-full h-1/2 pt-1"
        teamName={teamName}
        />
      </CardContent>
    </Card>
  );
};

export default TeamRadarDashboard;
