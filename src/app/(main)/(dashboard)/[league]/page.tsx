import PlayerMentalTable from "@/app/(main)/(dashboard)/components/tables/PlayerMentalTable";
import { fetchLeagueMentalData } from "@/app/(main)/(dashboard)/utils/fetcher";
import { LeaguePageSkeleton } from "@/components/root/skeletons/LeagueSkeleton";
import BestElevenPlot from "../components/best_eleven/BestElevenPlot";
import TeamsScatterDashboard from "../components/charts/dashboard/TeamsScatterDashboard";
import TeamMentalTable from "../components/tables/TeamMentalTable";
import LeagueHeader from "./components/LeagueHeader";
import { generateMetadata } from "../utils/metadata";

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
    <section className="w-full px-4 pb-24">
      <LeagueHeader league_meta={league_meta} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col h-full">
          <TeamMentalTable teams={teams.mental} leaguePage className="flex-1" />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col h-full">
          <BestElevenPlot plotImg={best_eleven.best_eleven_visual} className="flex-1" subs={best_eleven.subs} />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col h-full">
          <PlayerMentalTable players={players} leaguePage className="flex-1" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-7">
          <TeamsScatterDashboard teams={teams.mental} className="flex-1" />
        </div>
      </div>
    </section>
  );
}