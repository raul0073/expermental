"use client";
import { useTopLoader } from "nextjs-toploader";
import { useEffect, useState } from "react";
import { DashboardPayload, fetchAllMentalData } from "../utils/fetcher";
import { BestXIMentalFormation } from "./best_eleven/BestElevenComp";
import { BestXIPerformanceFormation } from "./best_eleven/BestElevenPerformance";
import TeamsScatterDashboard from "./charts/dashboard/TeamsScatterDashboard";
import PageErrorComp from "./error/PageErrorComp";
import TeamsDashboardHeader from "./header/DashboardHeader";
import TeamMentalTable from "./tables/TeamMentalTable";
import PlayerMentalTable from "./tables/players/PlayerTable";
import DashboardSkeleton from "@/components/root/skeletons/PageSkeleton";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); 
  const loader = useTopLoader();

  useEffect(() => {
    let isMounted = true;
    loader.start(); 

    const loadData = async () => {
      try {
        const result = await fetchAllMentalData(false);
        if (isMounted) setData(result);
      } catch (err) {
        console.error(err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false); 
        loader.done(); 
      }
    };

    loadData();

    return () => {
      isMounted = false;
      loader.done();
    };
  }, []);

  if (loading) {
    return <DashboardSkeleton />; 
  }

  if (error || !data) {
    return <PageErrorComp page="dashboard" />;
  }

  const { players, teams, best_eleven } = data;


  return (
    <section className="w-full px-4 pb-24">
      <TeamsDashboardHeader />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-7 gap-6">
        <TeamMentalTable teams={teams.mental} className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-4 h-full flex-1 " />
        <TeamsScatterDashboard teams={teams.mental} className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-3 h-full flex-1" />

        <BestXIMentalFormation data={best_eleven} className="col-span-1 xl:col-span-2 h-full flex-1" />
        <PlayerMentalTable players={players} className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-5 h-full flex-1 " />
        <TeamsScatterDashboard teams={teams.mental} className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-4 h-full flex-1" />
        <BestXIPerformanceFormation data={best_eleven} className="col-span-1 xl:col-span-2 h-full flex-1" />
      </div>

    </section>
  );
}
