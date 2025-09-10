import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";
import React from "react";

type PlayerChartProps = {
  plotBase64: string;
  className: string;
  playerName: string;
  playerImg?: StaticImageData | string;
};

const PlayerPizzaChart: React.FC<PlayerChartProps> = ({ plotBase64, className, playerName }) => {
  if (!plotBase64) return null
  return (
    <Card className={cn("h-fit gap-2 border-none p-0", className)}>
      <CardContent className="flex flex-col items-center p-0">
        {plotBase64 ? (
          <div className="relative w-full h-full">
            <img
              src={`data:image/png;base64,${plotBase64}`}
              alt={`${playerName} - "pizza chart"`}
              className="w-full"
            />
          </div>
        ) : (
          <p>No chart available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerPizzaChart;
