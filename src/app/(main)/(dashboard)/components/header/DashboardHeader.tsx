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
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0 p-1">
                <h1 className="text-4xl font-bold text-stone-800 dark:text-stone-300">{title}</h1>
                <p className="text-gray-600 mt-1">{subtitle}</p>
            </div>


        </header>
    );
};

export default TeamsDashboardHeader;
