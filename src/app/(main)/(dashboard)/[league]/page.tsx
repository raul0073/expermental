import { generateMetadata } from "../utils/metadata";
import LeagueClientPage from "./components/LeagueClientPage";

type PageProps = {
  params: Promise<{
    league: string;
  }>;
};


export default async function LeaguePage({ params }: PageProps) {
  const { league } = await params;
  const decodedLeague = decodeURIComponent(league);
  generateMetadata({ type: "league", league: decodedLeague });
  


  return <LeagueClientPage league={decodedLeague} />
    
}