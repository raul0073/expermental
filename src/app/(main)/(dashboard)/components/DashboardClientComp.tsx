"use client";
import DashboardSkeleton from "@/components/root/skeletons/PageSkeleton";
import { useTopLoader } from "nextjs-toploader";
import { useEffect, useState } from "react";
import { DashboardPaylod, fetchAllMentalData } from "../utils/fetcher";
import { BestXIFormation } from "./best_eleven/BestElevenComp";
import TeamsScatterDashboard from "./charts/dashboard/TeamsScatterDashboard";
import PageErrorComp from "./error/PageErrorComp";
import TeamsDashboardHeader from "./header/DashboardHeader";
import TeamMentalTable from "./tables/TeamMentalTable";
import PlayerMentalTable from "./tables/players/PlayerTable";


export default function DashboardPage() {
  const [data, setData] = useState<DashboardPaylod | null>(null);
  const [error, setError] = useState(false);
  const loader = useTopLoader()
  useEffect(() => {
    let isMounted = true;
    loader.start(); // show loader immediately

    const loadData = async () => {
      try {
        const result = await fetchAllMentalData(false);
        if (isMounted) setData(result);
      } catch (err) {
        console.error(err);
        if (isMounted) setError(true);
      } finally {
        loader.done(); // hide loader
      }
    };

    loadData();

    return () => {
      isMounted = false;
      loader.done();
    };
  }, []);

  if (error) return <PageErrorComp page="dashboard" />;
  if (!data) return <DashboardSkeleton />; 

  const { players, teams, best_eleven } = data;

  if (!players || !teams || !best_eleven) return <PageErrorComp page="dashboard" />;

  return (
    <section className="w-full px-4 pb-24">
      <TeamsDashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col h-full">
          <TeamMentalTable teams={teams.mental} className="flex-1" />
        </div>

        <div className="col-span-1 md:col-span-1 flex flex-col h-full">
          <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col h-full">
            <BestXIFormation data={best_eleven} className="flex-1" />
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col h-full">
          <PlayerMentalTable players={players} className="flex-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <TeamsScatterDashboard teams={teams.mental} className="flex-1" />
        </div>
      </div>
    </section>
  );
}
