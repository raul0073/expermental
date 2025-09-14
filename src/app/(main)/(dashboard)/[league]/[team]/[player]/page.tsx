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
import { generateMetadata } from "../../../utils/metadata";
import PlayerHeader from "./components/PlayerHeader";
import { PlayerHeaderAreaChart } from "./components/PlayerHeaderAreaChart";
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
  generateMetadata({ type: "player", league: league, player: player });
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
        <Card className="w-full max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <PlayerHeader player={playerData} league={decodedLeague} />
          <Separator />
          <PlayerHeaderAreaChart player={playerData} className="max-w-[100vw] sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg" />

          {/* Chart Section */}
          <CardContent className="p-0">
              <PlayerPizzaChart
                league={decodedLeague}
                season={2425}
                playerName={decodedPlayer}
                className="flex-1"
              />

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
