'use client'

import pizzaMaking from '@/../public/images/loaders/slices.gif';
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
    <Card className={cn("h-fit gap-2 border-none w-full", className)}>
      <CardContent className="flex flex-col md:flex-row gap-4 p-0 w-full">
        {/* Explanation */}
        <div className="text-xs leading-relaxed space-y-3 max-w-xs text-gray-600 pt-6 px-4">
          <h3 className="font-bold text-sm">About this Radar</h3>
          <p>
            This chart visualizes a player’s performance across{" "}
            <span className="font-semibold">five key categories</span>. 
            Each slice is normalized so you can compare players directly.
          </p>

          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#1A78CF" }} />
              <span>
                <strong>Attacking</strong> – Goals, assists, expected goals (xG), 
                expected assisted goals (xAG), and shots per 90.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#FF9300" }} />
              <span>
                <strong>Creativity</strong> – Key passes, expected assists (xA), 
                shot-creating actions (SCA), and goal-creating actions (GCA).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#D70232" }} />
              <span>
                <strong>Progression</strong> – Progressive carries, progressive passes, 
                final third entries, and passes into the penalty area.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#27AE60" }} />
              <span>
                <strong>Defending</strong> – Tackles + interceptions, clearances, 
                interceptions, blocks, and tackle success rate.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#F2C94C" }} />
              <span>
                <strong>Possession</strong> – Pass completion %, total touches, 
                take-on success %, progressive receptions, and progressive carry distance.
              </span>
            </li>
          </ul>
        </div>

        {/* Radar image */}
<div className="flex justify-center items-start flex-col md:flex-row md:items-center w-full">
  <Image
  unoptimized
    src={`data:image/png;base64,${plotBase64}`}
    alt={`${playerName} - pizza chart`}
    className="object-cover min-w-[355px] w-[100vw] h-auto"
    width={360}
    height={470}
  />
</div>
      </CardContent>
    </Card>
  )}
      {loading && (
        <Skeleton className="w-full rounded max-h-[500px] h-fit flex justify-center flex-col items-center p-8" >
          <Image
            src={pizzaMaking}
            width={150}
            height={150}
            alt="pizza_chart_making"
            className="rounded"
          />
          <span>Baking Pizza...</span>
        </Skeleton>
      )}
    </Suspense>
  );
};

export default PlayerPizzaChart;
