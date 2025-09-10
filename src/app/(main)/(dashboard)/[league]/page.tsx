import { fetchLeagueMentalData } from "@/app/(main)/(dashboard)/utils/fetcher";
import { LeaguePageSkeleton } from "@/components/root/skeletons/LeagueSkeleton";
import { BestXIFormation } from "../components/best_eleven/BestElevenComp";
import TeamsRadarScatter from "../components/charts/dashboard/LeagueScatter";
import TeamsScatterDashboard from "../components/charts/dashboard/TeamsScatterDashboard";
import PlayerMentalTable from "../components/tables/players/PlayerTable";
import TeamMentalTable from "../components/tables/TeamMentalTable";
import { generateMetadata } from "../utils/metadata";
import LeagueHeader from "./components/LeagueHeader";

type PageProps = {
  params: Promise<{
    league: string;
  }>;
};


export default async function LeaguePage({ params }: PageProps) {
  const { league } = await params;
  generateMetadata(league)
    let data;
  try {
    data = await fetchLeagueMentalData(league);
  } catch (err) {
    console.error(err);
    return <LeaguePageSkeleton />;
  }

  const { players, teams, best_eleven, league_meta } = data;

  if (!players || !teams || !best_eleven) return <LeaguePageSkeleton />


  return (
    <section className={`league-page-${league} w-full px-2 md:px-4 pb-24`}>
      <LeagueHeader league_meta={league_meta} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col h-full">
          <TeamMentalTable teams={teams.mental} leaguePage className="flex-1" />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col h-full">
           <BestXIFormation data={best_eleven} className="flex-1" />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col h-full">
          <PlayerMentalTable players={players} leaguePage className="flex-1" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <TeamsScatterDashboard teams={teams.mental} className="flex-1" />
        </div>
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
          <TeamsRadarScatter teams={teams.stats} className="flex-1" />
        </div>
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
        </div>

      </div>
    </section>
  );
}