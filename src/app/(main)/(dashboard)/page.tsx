import BestElevenPlot from "./components/best_eleven/BestElevenPlot";
import TeamsScatterDashboard from "./components/charts/dashboard/TeamsScatterDashboard";
import TeamsDashboardHeader from "./components/header/DashboardHeader";
import PlayerMentalTable from "./components/tables/PlayerMentalTable";
import TeamMentalTable from "./components/tables/TeamMentalTable";
import { fetchAllMentalData } from "./utils/fetcher";
import DashboardSkeleton from "@/components/root/skeletons/PageSkeleton";

export default async function Page() {
  let data;
  try {
    data = await fetchAllMentalData();
  } catch (err) {
    console.error(err);
    return <DashboardSkeleton />;
  }

  const { players, teams, best_eleven } = data;

  if (!players || !teams || !best_eleven) return <DashboardSkeleton />;

  return (
    <section className="w-full px-4 pb-24">
      {/* Header */}
      <TeamsDashboardHeader />

      {/* Top section: equal-height cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Team table */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col h-full">
          <TeamMentalTable teams={teams.mental} className="flex-1" />
        </div>

        {/* Best Eleven */}
        <div className="col-span-1 md:col-span-1 flex flex-col h-full">
          <BestElevenPlot
            plotImg={best_eleven.best_eleven_visual}
            className="flex-1"
            subs={best_eleven.subs}
          />
        </div>

        {/* Player table */}
        <div className="col-span-1 md:col-span-2 flex flex-col h-full">
          <PlayerMentalTable players={players} className="flex-1" />
        </div>
      </div>

      {/* Remaining section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
        {/* Teams Scatter Dashboard */}
        <div className="col-span-12 md:col-span-6 lg:col-span-7">
          <TeamsScatterDashboard teams={teams.mental} className="flex-1" />
        </div>
      </div>
    </section>
  );
}
