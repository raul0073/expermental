"use client";
import { useEffect, useState } from "react";
import { LeaguePageSkeleton } from "@/components/root/skeletons/LeagueSkeleton";
import { useLocalStorage } from "@/hooks/use-localStorage";
import { fetchLeagueMentalData, LeaguePagePayload } from "../../utils/fetcher";
import PageErrorComp from "../../components/error/PageErrorComp";
import LeagueHeader from "./LeagueHeader";
import TeamMentalTable from "../../components/tables/TeamMentalTable";
import { BestXIMentalFormation } from "../../components/best_eleven/BestElevenComp";
import TeamsScatterDashboard from "../../components/charts/dashboard/TeamsScatterDashboard";
import PlayerMentalTable from "../../components/tables/players/PlayerTable";
import TeamsRadarScatter from "../../components/charts/dashboard/LeagueScatter";


export default function LeagueClientPage({ league }: { league: string }) {
    const [data, setData] = useLocalStorage<LeaguePagePayload | null>(
        `leauge-${league}_data`,
        null
    );
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            try {
                const result = await fetchLeagueMentalData(league);
                if (isMounted) setData(result);
            } catch (err) {
                console.error(err);
                if (isMounted) setError(true);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (!data) {
            loadData();
        } else {
            setLoading(false);
            loadData();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading && !data) {
        return <LeaguePageSkeleton />;
    }

    if (error || !data) {
        return <PageErrorComp page="league" />;
    }

    const { players, teams, best_eleven, league_meta } = data;

    return (
        <section className={`league-page-${league} w-full px-2 md:px-4 pb-24`}>
            <LeagueHeader league_meta={league_meta} />
            <div className="grid grid-cols-1 md:grid-cols-1 xxl:grid-cols-5 gap-3">
                <TeamMentalTable teams={teams.mental} leaguePage className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-2 h-full flex-1 " />
                <BestXIMentalFormation data={best_eleven} className="col-span-1 h-full flex-1" />
                <TeamsScatterDashboard teams={teams.mental} className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-2 h-full flex-1" />
                <PlayerMentalTable players={players} leaguePage className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-2 h-full flex-1" />
                <TeamsRadarScatter teams={teams.stats} className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-3 h-full flex-1" />

            </div>
        </section>
    );
}