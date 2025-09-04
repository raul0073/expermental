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
    return (
        <header className="flex flex-col">
            {/* Title + Subtitle */}
            <div className="p-1  gap-6 md:flex-row md:items-center md:justify-between mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-300">
                    <span> {<LeagueLogo league={league} size="lg" />}</span>  {LEAGUES_NAME[league]} Mental Ranking {season}
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm md:text-base pt-4">
                    <StatCard label="League Avg Mental" value={avg_m.toFixed(1)} />
                    <StatCard label="Spread (variance)" value={spread_m.toFixed(1)} />
                    <StatCard label="Teams" value={teams_count} />
                    <StatCard label="Players Ranked" value={players_count} />
                    <StatCard label="Top Performer" value={top_player} highlight />
                    <StatCard label="Season" value={season} />
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
            className={`flex flex-col items-start rounded-xl border p-3 shadow-sm ${highlight ? "bg-primary/10 border-primary text-primary" : "bg-white dark:bg-stone-800"
                }`}
        >
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {label}
            </span>
            <span className="text-lg font-bold">{value}</span>
        </div>
    );
}

export default LeagueHeader;
