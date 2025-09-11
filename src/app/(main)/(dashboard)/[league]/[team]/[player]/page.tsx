import { fetchPlayerMentalData } from "@/app/(main)/(dashboard)/utils/fetcher";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import DashboardSkeleton from "@/components/root/skeletons/PageSkeleton";
import { Suspense } from "react";
import PageErrorComp from "../../../components/error/PageErrorComp";
import PlayerHeader from "./components/PlayerHeader";
import PlayerPizzaChart from "./components/PlayerPizzaPlot";
import PlayerStatsTable from "./components/PlayerStatsTable";

type PageProps = {
  params: Promise<{
    league: string;
    player: string;
  }>;
};

async function Page({ params }: PageProps) {
  const { league, player } = await params;
  const decodedLeague = decodeURIComponent(league);
  const decodedPlayer = decodeURIComponent(player);
  let data;
  try {
    data = await fetchPlayerMentalData(decodedLeague, 2425, {
      name: decodedPlayer,
    });
  } catch (err) {
    console.error(err);
    return <PageErrorComp page="player" />;
  }
  if (!data) return <PageErrorComp page="player" />;
  const playerData = data.players[0];

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <section
        className={`player-page-${decodedPlayer} w-full px-2 sm:px-4 lg:px-6 pb-16 sm:pb-20 lg:pb-24`}
      >
        <Card className="w-full max-w-5xl mx-auto">
          {/* Header */}
          <PlayerHeader player={playerData} league={decodedLeague} />

          <Separator />

          {/* Chart Section */}
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-10">
              <PlayerPizzaChart
                league={decodedLeague}
                season={2425}
                playerName={decodedPlayer}
                className="flex-1"
              />

            </div>
          </CardContent>

          {/* Stats Section */}
          <CardFooter className="p-0 flex flex-col gap-6 mt-6 sm:mt-8 lg:mt-10">
            <PlayerStatsTable playerData={playerData} className="flex-1" />
          </CardFooter>
        </Card>
      </section>
    </Suspense>
  );
}

export default Page;
