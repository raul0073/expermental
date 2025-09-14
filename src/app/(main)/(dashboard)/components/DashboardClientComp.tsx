"use client";
import DashboardSkeleton from "@/components/root/skeletons/PageSkeleton";
import { useEffect, useState } from "react";
import { fetchAllMentalDataStreamed } from "../utils/fetcher";
import { BestElevenResponse, DashboardTeamsResponse } from "../utils/types";
import { Player } from "../utils/types/player";
import { BestXIMentalFormation } from "./best_eleven/BestElevenComp";
import { BestXIPerformanceFormation } from "./best_eleven/BestElevenPerformance";
import TeamsScatterDashboard from "./charts/dashboard/TeamsScatterDashboard";
import PageErrorComp from "./error/PageErrorComp";
import TeamsDashboardHeader from "./header/DashboardHeader";
import TeamMentalTable from "./tables/TeamMentalTable";
import PlayerMentalTable from "./tables/players/PlayerTable";


export default function DashboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<DashboardTeamsResponse>();
  const [bestXI, setBestXI] = useState<BestElevenResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


 useEffect(() => {
  fetchAllMentalDataStreamed((player) => {
    setPlayers((prev) => {
      const id = player.fbref_id ?? player.name;
      // check if already exists
      if (prev.some((p) => (p.fbref_id ?? p.name) === id)) {
        return prev; // skip duplicate
      }
      return [...prev, player];
    });
  }).then((data) => {
    setTeams(data.teams);
    setBestXI(data.best_eleven);
    setLoading(false);
  }).catch(err => {
    console.error(err);
     setError(true);
    setLoading(false);
  })
}, []);

  if (loading && players.length === 0) return <DashboardSkeleton />;
  if (error ) return <PageErrorComp page="dashboard" />;
  return (
    <section className="w-full px-4 pb-24">
      <TeamsDashboardHeader />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-7 gap-6">
       {teams?.mental && (
         <TeamMentalTable
          teams={teams.mental}
          className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-3 h-full flex-1 "
        />
       )}
        <TeamsScatterDashboard
          teams={teams?.mental}
          className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-4 h-full flex-1"
        />

        <BestXIMentalFormation
          data={bestXI}
          className="col-span-1 xl:col-span-2 h-full flex-1"
        />
        <PlayerMentalTable
          players={players}
          className="col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-3 h-full flex-1 "
        />
        <BestXIPerformanceFormation
          data={bestXI}
          className="col-span-1 xl:col-span-2 h-full flex-1"
        />
      </div>
    </section>
  );
}
