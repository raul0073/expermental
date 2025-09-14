"use client";

import LeagueLogo from "@/components/root/league/LeagueLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LEAGUES_NAME } from "@/lib/Types/LABELS";
import { getLeagueFlag } from "@/lib/flags";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import TeamLogo from "../../[league]/[team]/components/header/TeamLogo";
import { SortKey, TeamMentalSummary } from "../../utils/types";
import SortableHeaderWithPopover from "./SortableHeaderWithPopover";
import { TEAM_TABLE_HEADERS } from "./constants/headers";

type Props = {
  teams: TeamMentalSummary[];
  leaguePage?:boolean
  className?:string
};



export default function TeamMentalTable({ teams, leaguePage, className }: Props) {

  const [sortKey, setSortKey] = useState<SortKey>("avg_m");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [activeLeague, setActiveLeague] = useState<"ALL" | string>("ALL");
  const [showAll, setShowAll] = useState(false);

  const leagues = useMemo(
    () => Array.from(new Set(teams.map((t) => t.league))),
    [teams]
  );

  const filteredTeams = useMemo(() => {
    if (activeLeague === "ALL") return teams;
    return teams.filter((t) => t.league === activeLeague);
  }, [teams, activeLeague]);

  const sortedTeams = useMemo(() => {
    const sorted = [...filteredTeams].sort((a, b) => {
      const aVal = sortKey === "leader" ? a.leader?.m || 0 : a[sortKey] || 0;
      const bVal = sortKey === "leader" ? b.leader?.m || 0 : b[sortKey] || 0;
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });
    return sorted;
  }, [filteredTeams, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const visibleTeams = showAll ? sortedTeams : sortedTeams.slice(0, 15);

  return (
    <Card className={cn("h-fit", className)}>
      <CardHeader className="p-2 md:p-6">
        <CardTitle>Top Mental Teams</CardTitle>
        {/* Tabs */}
        <div className="flex gap-2 mt-2 flex-wrap">
          <Button
            variant={activeLeague === "ALL" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveLeague("ALL")}
          >
            All
          </Button>
          {leagues.map((l) => (
            <Button
              key={l}
              variant={activeLeague === l ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveLeague(l)}
            >
              {getLeagueFlag(l)?.emoji} {LEAGUES_NAME[l] ?? l}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="overflow-auto space-y-4 p-0">
        <Table className="p-0">
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead>#</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className={cn("hidden md:flex md:items-center", leaguePage && "hidden md:hidden")}>League</TableHead> 
              {TEAM_TABLE_HEADERS.map((h) => (
                <SortableHeaderWithPopover
                  key={h.key}
                  label={h.label}
                  statKey={h.key}
                  sortKey={sortKey}
                  sortDir={sortDir}// eslint-disable-next-line
                  onSort={(key) => handleSort(key as any)}
                  description={h.desc}
                  numeric={h.key !== "leader"}
                />
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {visibleTeams.map((t, i) => (
              <TableRow
                key={`${t.league}-${t.team}`}
                className="hover:bg-muted/30"
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell  className={cn("font-medium text-nowrap")}>
                  <Link
                    href={`/${encodeURIComponent(t.league)}/${encodeURIComponent(
                      t.team
                    )}`}
                    className="flex items-center gap-1"
                  >
                   <TeamLogo teamName={t.team} size="xs" league={t.league} /> {t.team}
                  </Link>
                </TableCell>
                <TableCell className={cn("hidden md:flex md:items-center", leaguePage && "hidden md:hidden")}>
                  <Link
                    href={`/${encodeURIComponent(t.league)}`}
                    className="flex items-center gap-2"
                  >
                   {<LeagueLogo league={t.league} size="sm"/>}
                   
                    <Badge
                    className="text-xs text-nowrap"
                      variant={t.league.slice(0, 3) as
                        | "GER"
                        | "ENG"
                        | "ESP"
                        | "ITA"
                        | "FRA"}
                    >
                      {LEAGUES_NAME[t.league] ?? t.league}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="font-semibold">{Math.round(t.avg_m)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {Math.round(t.spread_m)}
                </TableCell>
                <TableCell className="text-muted-foreground ">
                 <span className="hidden md:inline-block"> {t.leader?.player} ({t.leader?.m})</span>
                 <span className="md:hidden"> {`${t.leader?.player.split(" ")[1]}`} ({t.leader?.m})</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sortedTeams.length > 10 && (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Top 10" : "Show All"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
