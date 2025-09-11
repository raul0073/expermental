"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { LeagueTabs, RoleTabs } from "../tableTabs/RoleAndLeagueTabs";
import { PlayersTable, PlayerTableProps, PlayerTableSortKey, SortDirection } from "./PlayersTableComp";
export default function PlayerMentalTable({ players, leaguePage, className, teamName, leagueName }: PlayerTableProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeLeague, setActiveLeague] = useState<"ALL" | string>("ALL");
  const [activeRole, setActiveRole] = useState<"ALL" | string>("ALL");
  const [sortKey, setSortKey] = useState<PlayerTableSortKey>("mental");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  const filteredPlayers = useMemo(() => {
    let arr = [...players];
    if (!leaguePage && activeLeague !== "ALL") {
      arr = arr.filter((p) => (p.league ?? p.__meta__?.league) === activeLeague);
    }
    if (activeRole !== "ALL") {
      arr = arr.filter((p) => p.role === activeRole);
    }

    arr.sort((a, b) => {//eslint-disable-next-line
      let aVal: any, bVal: any;
      switch (sortKey) {
        case "name": aVal = a.name.toLowerCase(); bVal = b.name.toLowerCase(); break;
        case "team": aVal = a.team ?? a.__meta__?.team ?? ""; bVal = b.team ?? b.__meta__?.team ?? ""; break;
        case "league": aVal = a.league ?? a.__meta__?.league ?? ""; bVal = b.league ?? b.__meta__?.league ?? ""; break;
        case "performance":  aVal = parseFloat(String(a.ranking?.performance ?? "-Infinity")); bVal = parseFloat(String(b.ranking?.performance ?? "-Infinity")); break;
        case "mental":
        default: aVal = a.mental?.m ?? 0; bVal = b.mental?.m ?? 0; break;
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return arr;
  }, [players, activeLeague, activeRole, sortKey, sortDir, leaguePage]);

  const visiblePlayers = showAll ? filteredPlayers : filteredPlayers.slice(0, 10);

  const handleSort = (key: PlayerTableSortKey) => {
    if (sortKey === key) setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  if (!players?.length) return null;

  return (
    <Card className={cn("h-fit", className)}>
      <CardHeader className="p-1 md:p-6 min-h-[120px] flex flex-col">
       <div className="flex flex-col items-start gap-3">
         <CardTitle>Top Mental Players</CardTitle>
       </div>
        {!leaguePage && <LeagueTabs players={players} activeLeague={activeLeague} setActiveLeague={setActiveLeague} />}
         <RoleTabs players={players} activeRole={activeRole} setActiveRole={setActiveRole} />
       
      </CardHeader>
      <CardContent className="overflow-auto space-y-4">
        <PlayersTable
          players={visiblePlayers}
          leaguePage={leaguePage}
          sortKey={sortKey}
          sortDir={sortDir}
          handleSort={handleSort}
          teamName={teamName}
          leagueName={leagueName}
        />
        {filteredPlayers.length > 10 && (
          <div className="flex justify-center mt-2">
            <Button variant="ghost" size="sm" onClick={() => setShowAll((prev) => !prev)}>
              {showAll ? "Show Top 10" : "Show All"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}