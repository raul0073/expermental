import { fetchLeagueMentalData } from "@/app/(main)/(dashboard)/utils/fetcher";
import { BestXIMentalFormation } from "../components/best_eleven/BestElevenComp";
import TeamsRadarScatter from "../components/charts/dashboard/LeagueScatter";
import TeamsScatterDashboard from "../components/charts/dashboard/TeamsScatterDashboard";
import PageErrorComp from "../components/error/PageErrorComp";
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
    return <PageErrorComp page="league" />;
  }
    
     if (!data) return <PageErrorComp page="league" />;
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