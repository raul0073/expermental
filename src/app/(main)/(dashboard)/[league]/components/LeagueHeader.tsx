"use client";

import LeagueLogo from "@/components/root/league/LeagueLogo";
import { LEAGUES_NAME } from "@/lib/Types/LABELS";
import React from "react";
import { LeagueMetaData } from "../../utils/types/league";

type Props = {
    league_meta: LeagueMetaData
};

const LeagueHeader: React.FC<Props> = ({
    league_meta,
}) => {
    const { avg_m,
        league,
        players_count,
        season,
        spread_m,
        teams_count,
        top_player } = league_meta
        
        const seasonString = season.toString().slice(0,2).concat(" / ").concat(season.toString().slice(2))
    return (
       
        <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between p-1">
            {/* Title + Subtitle */}
             <div className="flex justify-between gap-3 items-center leading-tight tracking-tighter">
                     <div className="header flex items-center gap-2">
                         <span> {<LeagueLogo league={league} size="lg" />}</span>
                       <h1 className="text-xl md:text-4xl font-bold tracking-tight
                       bg-gradient-to-r from-stone-800 to-zinc-600 bg-clip-text text-transparent
                       dark:bg-gradient-to-r dark:from-stone-300 dark:to-zinc-400
                       ">
                    {LEAGUES_NAME[league]} Mental Ranking
                </h1>
                </div>

                </div>
            <div className="p-1  gap-6 md:flex-row md:items-center md:justify-between mb-6">
               
              <div className="flex flex-col items-start  md:flex-row gap-4 md:items-center">
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-6">
                        <StatCard label="League Avg Mental" value={avg_m.toFixed(1)} />
                    <StatCard label="Spread (variance)" value={spread_m.toFixed(1)} />
                    <StatCard label="Teams" value={teams_count} />
                    <StatCard label="Players Ranked" value={players_count} />
                    <StatCard label="Top Performer" value={top_player} highlight />
                    <StatCard label="Season" value={seasonString} />
                    </div>
                </div>
                
            </div>
        </header>
    );
};

function StatCard({
    label,
    value,
    highlight = false,
}: {
    label: string;
    value: string | number;
    highlight?: boolean;
}) {
    return (
        <div
            className={`flex flex-col items-start rounded-md border p-3 gap-2 shadow-sm ${highlight ? "bg-primary/10 border-primary text-primary" : "bg-white dark:bg-stone-800"
                }`}
        >
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {label}
            </span>
            <span className="text-medium md:text-lg font-bold">{value}</span>
        </div>
    );
}

export default LeagueHeader;
