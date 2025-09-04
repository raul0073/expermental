
import { BestElevenFormation } from "./components/BestElevenList";
import TeamsScatterDashboard from "./components/charts/dashboard/TeamsScatterDashboard";
import TeamsDashboardHeader from "./components/header/DashboardHeader";
import PlayerMentalTable from "./components/tables/PlayerMentalTable";
import TeamMentalTable from "./components/tables/TeamMentalTable";
import { fetchAllMentalData } from "./utils/fetcher";

export default async function Page() {
  const { players, teams, best_eleven } = await fetchAllMentalData();
  return (
    <section className="w-full h-full px-1 md:px-4 pb-24 space-y-3 md:space-y-8">
      <TeamsDashboardHeader

      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-8">
  {/* Team table takes full width on small, 2/2 cols on md, 3/5 on lg */}
  <div className="col-span-1 md:col-span-2 lg:col-span-3">
    <TeamMentalTable teams={teams} />
  </div>

  {/* Player table: full width on small, 2/2 on md, 2/5 on lg */}
  <div className="col-span-1 md:col-span-2 lg:col-span-2">
     <BestElevenFormation eleven={best_eleven} /> 
  </div>

  {/* Best Eleven Formation: full width on small, half width on md, 2/5 on lg */}
  <div className="col-span-1 md:col-span-2 lg:col-span-2">
  <PlayerMentalTable players={players} />
  </div>

  {/* Teams Scatter: full width on small, 2/2 on md, 3/5 on lg */}
  <div className="col-span-1 md:col-span-2 lg:col-span-3">
    <TeamsScatterDashboard teams={teams} />
  </div>
</div>

    </section>

  );
}
