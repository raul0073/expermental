import { LeaguePageSkeleton } from "@/components/root/skeletons/LeagueSkeleton";
import { Suspense } from "react";
import { BestXIMentalFormation } from "../../components/best_eleven/BestElevenComp";
import PageErrorComp from "../../components/error/PageErrorComp";
import PlayerMentalTable from "../../components/tables/players/PlayerTable";
import { fetchTeamMentalData } from "../../utils/fetcher";
import { generateMetadata } from "../../utils/metadata";
import TeamHeatmap from "./components/charts/TeamContributionByRole";
import TeamRadarDashboard from "./components/charts/TeamPageChartsComp";
import TeamHeader from "./components/header/TeamHeader";

type PageProps = {
  params: Promise<{
    league: string;
    team: string
  }>;
};

async function Page({ params }: PageProps) {
  const { league, team } = await params
  const decodedLeague = decodeURIComponent(league);
  const decodedTeam = decodeURIComponent(team);
  generateMetadata({ type: "team", league: league, team: team });
  let data;
  try {
    data = await fetchTeamMentalData(decodedLeague, decodedTeam);
  } catch (err) {
    console.error(err);
    return <PageErrorComp page="team" />
  }

  
  if (!data) return <PageErrorComp page="team" />
  const { players, stats, best_eleven, plot } = data;


  return (
    <Suspense fallback={<LeaguePageSkeleton />}>
      <section className={`team-page-${team} w-full px-4 pb-24`}>
        <TeamHeader teamName={decodedTeam} leagueName={decodedLeague} />

        <div className="grid grid-cols-1 md:grid-cols-3 xxl:grid-cols-5 gap-3 h-full">
          <PlayerMentalTable players={players} teamName={decodedTeam} leagueName={decodedLeague} leaguePage className="md:col-span-2 xxl:col-span-2 flex-1 h-full" />

          <BestXIMentalFormation data={best_eleven} className="md:col-span-1 xxl:col-span-1 flex-1 h-full" />
          <TeamRadarDashboard stats={stats.stats} plot={plot.default} className="cols-span-1 md:col-span-3 xxl:col-span-2" teamName={decodedTeam} />
          <TeamHeatmap players={players} className="cols-span-1 md:col-span-3 xxl:col-span-5" teamName={decodedTeam} />



        </div>
      </section>
    </Suspense>
  )
}

export default Page
