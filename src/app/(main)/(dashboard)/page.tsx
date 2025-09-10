import DashboardSkeleton from "@/components/root/skeletons/PageSkeleton";
import { Suspense } from "react";
import TeamsScatterDashboard from "./components/charts/dashboard/TeamsScatterDashboard";
import PageErrorComp from "./components/error/PageErrorComp";
import TeamsDashboardHeader from "./components/header/DashboardHeader";
import PlayerMentalTable from "./components/tables/players/PlayerTable";
import TeamMentalTable from "./components/tables/TeamMentalTable";
import { fetchAllMentalData } from "./utils/fetcher";
import { BestXIFormation } from "./components/best_eleven/BestElevenComp";

export default async function Page() {
  let data;
  try {
    data = await fetchAllMentalData();
  } catch (err) {
    console.error(err);
    return <PageErrorComp page="dashboard" />;
  }

  const { players, teams, best_eleven } = data;

  if (!players || !teams || !best_eleven) return <PageErrorComp page="dashboard" />;

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <section className="w-full px-4 pb-24">
        {/* Header */}
        <TeamsDashboardHeader />

        {/* Top section: equal-height cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-3">
          {/* Team table */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col h-full">
            <TeamMentalTable teams={teams.mental} className="flex-1" />
          </div>

          {/* Best Eleven */}
          <div className="col-span-1 md:col-span-1 flex flex-col h-full">
            <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col h-full">
              <BestXIFormation data={best_eleven} className="flex-1" />
            </div>
          </div>

          {/* Player table */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col h-full">
            <PlayerMentalTable players={players} className="flex-1" />
          </div>
        </div>

        {/* Remaining section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
          {/* Teams Scatter Dashboard */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <TeamsScatterDashboard teams={teams.mental} className="flex-1" />
          </div>
        </div>
      </section>
    </Suspense>
  );
}
