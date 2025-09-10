import { LeaguePageSkeleton } from "@/components/root/skeletons/LeagueSkeleton";
import { Suspense } from "react";
import { BestXIFormation } from "../../components/best_eleven/BestElevenComp";
import PageErrorComp from "../../components/error/PageErrorComp";
import PlayerMentalTable from "../../components/tables/players/PlayerTable";
import { fetchTeamMentalData } from "../../utils/fetcher";
import { TeamDefaultRadarVsLeagueBest } from "./components/charts/TeamRadar";
import TeamHeader from "./components/header/TeamHeader";
import { ChartRadarTeamGrid } from "./components/team/TeamPerformanceRadar";

type PageProps = {
  params: Promise<{
    league: string;
    team: string
  }>;
};

async function Page({ params }: PageProps) {
  const {league, team} = await params
  const decodedLeague = decodeURIComponent(league);
  const decodedTeam = decodeURIComponent(team);
      let data;
    try {
      data = await fetchTeamMentalData(decodedLeague, decodedTeam);
    } catch (err) {
      console.error(err);
      return <PageErrorComp page="team" />
    }
  
    const { players,stats, best_eleven, plot } = data;
  
    if (!players || !stats || !best_eleven) return <PageErrorComp page="team" />
  

  return (
     <Suspense fallback={<LeaguePageSkeleton />}>
       <section className={`team-page-${team} w-full px-4 pb-24`}>
     <TeamHeader teamName={decodedTeam} leagueName={decodedLeague} />
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col">
          <PlayerMentalTable players={players} teamName={decodedTeam} leagueName={decodedLeague} leaguePage className="flex-1" />
        </div>
               <div className="col-span-2 lg:col-span-1 flex flex-col h-full">
                 <BestXIFormation data={best_eleven} className="w-full sm:flex-1" />
              </div>
        <div className="flex-col sm:flex-row flex w-full gap-3 justify-center col-span-2 h-full">
 
           <ChartRadarTeamGrid teamStats={stats.stats} className="h-full" teamName={decodedTeam} />
          <TeamDefaultRadarVsLeagueBest data={plot.default} className="h-full" teamName={decodedTeam} />

        </div>
       
      </div>
    </section>
     </Suspense>
  )
}

export default Page
