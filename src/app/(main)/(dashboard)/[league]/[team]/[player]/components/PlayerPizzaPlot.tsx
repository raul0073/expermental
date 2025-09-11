'use client'

import pizzaMaking from '@/../public/images/loaders/pizzaMaking.gif';
import { fetchPlayerPlot } from "@/app/(main)/(dashboard)/utils/fetcher";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React, { Suspense, useEffect, useState } from "react";
type PlayerPizzaChartProps = {
  league: string;
  season?: number;
  playerName: string;
  className?: string;
  playerImg?: StaticImageData | string;
};

const PlayerPizzaChart: React.FC<PlayerPizzaChartProps> = ({
  league,
  season = 2425,
  playerName,
  className,
}) => {
  const [plotBase64, setPlotBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = true
  const getChartData = async () => {
    try {
      setLoading(true)
      const res = await fetchPlayerPlot(league, season, playerName, client)
      if (res?.plot) {
        setPlotBase64(res.plot);
      }
    } catch (error) {
      console.error("[PlayerPizzaChart] fetch error:", error);
      setError("Failed to load chart");
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getChartData()
  }, [league, season, playerName]);

  if (error) return <p className={cn("text-red-500", className)}>{error}</p>;


  return (
    <Suspense fallback={<Skeleton className="w-full rounded h-full" />}>
      {plotBase64 && (
        <Card className={cn("h-fit gap-2 border-none p-0", className)}>
          <CardContent className="flex flex-col items-center p-0">
            <div className="relative w-full h-full">
              <img
                src={`data:image/png;base64,${plotBase64}`}
                alt={`${playerName} - pizza chart`}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      )}
      {loading && (

        <Skeleton className="w-full rounded h-[500px] flex justify-center flex-col items-center" >
          <Image
            src={pizzaMaking}
            width={250}
            height={250}
            alt="pizza_chart_making"
            className=""
          />
          <span>Making Pizza Chart...</span>
        </Skeleton>

      )}
    </Suspense>
  );
};

export default PlayerPizzaChart;
