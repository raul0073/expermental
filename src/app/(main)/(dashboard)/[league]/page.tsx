import PlayerMentalTable from "@/app/(main)/(dashboard)/components/tables/PlayerMentalTable";
import { fetchLeagueMentalData } from "@/app/(main)/(dashboard)/utils/fetcher";
import { notFound } from "next/navigation";
import LeagueHeader from "./components/LeagueHeader";

type PageProps = {
  params: Promise<{
    league: string;
  }>;
};

export default async function LeaguePage({ params }: PageProps) {
  const league = (await params).league;

  const { players,league_meta } = await fetchLeagueMentalData(league);

  if (!players) return notFound();

  return (
    <section className="w-full px-4 pb-24 space-y-6">
       <LeagueHeader league_meta={league_meta} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-8">

        {/* Player table: full width on small, 2/2 on md, 2/5 on lg */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <PlayerMentalTable players={players} />
        </div>


      </div>

    </section>
  );
}
