"use client";
import { HeatmapPlottingResponse } from "@/app/(main)/(dashboard)/utils/types/team";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

type TeamHeatmapProps = {
  data: HeatmapPlottingResponse
  teamName?: string;
  className?: string;
};

export function HeatmapComp({ data, teamName, className }: TeamHeatmapProps) {
  return (
   <Card className={cn("w-full border-none grid md:grid-cols-2 gap-6 md:gap-12", className)}>
   <div className="p-1 w-full">
     <CardDescription className="px-3">
      {teamName} <span className="text-primary">Chances</span> by Zone
    </CardDescription>
    <CardContent className="heatmaps w-full p-1">
       <Image
       unoptimized
          src={`data:image/png;base64,${data.attacking}`}
          alt={`${teamName}_heatmap`}
          width={350}
          height={250}
          className="w-full max-h-[600px]"
        />
    </CardContent>
   </div>
    <div className="p-1 w-full">
      <CardDescription className="px-3">
      {teamName} <span className="text-primary">Recoveries</span> by Zone
    </CardDescription>
    <CardContent className="heatmaps  w-full p-1">
     <Image
     unoptimized
          src={`data:image/png;base64,${data.defending}`}
          alt={`${teamName}_heatmap`}
          width={350}
          height={250}
          className="w-full max-h-[600px]"
        />
    </CardContent>
    </div>
   </Card>
  );
}
