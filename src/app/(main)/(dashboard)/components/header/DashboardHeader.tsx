"use client";

import React from "react";

type Props = {
    title?: string;
    subtitle?: string;

};

const TeamsDashboardHeader: React.FC<Props> = ({
    title = "Top 5 Leagues Metnal Ranking",
    subtitle = "Visualize a team mental strength, balance and key performers across leagues.",
}) => {
    return (
        <header className="px-2 md:px-3 flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
               <h1 className="text-xl md:text-4xl font-bold tracking-tight
                       bg-gradient-to-r from-stone-800 to-zinc-600 bg-clip-text text-transparent
                       dark:bg-gradient-to-r dark:from-stone-300 dark:to-zinc-400
                       ">{title}</h1>
                <p className="text-gray-600 dark:text-gray-500 mt-1">{subtitle}</p>
            </div>


        </header>
    );
};

export default TeamsDashboardHeader;
