"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SortKey, TeamMentalSummary } from "../../utils/types";
import SortableHeaderWithPopover from "./SortableHeaderWithPopover";
import Link from "next/link";
import { LEAGUES_NAME } from "@/lib/Types/LABELS";
import { getLeagueFlag } from "@/lib/flags";
import LeagueLogo from "@/components/root/league/LeagueLogo";

type Props = {
  teams: TeamMentalSummary[];
};

const HEADERS = [
  {
    key: "avg_m",
    label: "Avg M",
    desc: "Represents the team's overall mental strength — average M-Score across all players.",
  },
  {
    key: "spread_m",
    label: "Spread",
    desc: "Gap between top and bottom M-Score in the team.",
  },
  {
    key: "leader",
    label: "Leader",
    desc: "The player with the highest M-Score in the team.",
  },
];

export default function TeamMentalTable({ teams }: Props) {
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

  const visibleTeams = showAll ? sortedTeams : sortedTeams.slice(0, 10);

  return (
    <Card className="h-fit border-none">
      <CardHeader>
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
      <CardContent className="overflow-auto space-y-4">
        <Table className="rounded">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>League</TableHead>
              {HEADERS.map((h) => (
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
          <TableBody>
            {visibleTeams.map((t, i) => (
              <TableRow
                key={`${t.league}-${t.team}`}
                className="hover:bg-muted/30"
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell className="font-medium text-nowrap">
                  <Link
                    href={`/${encodeURIComponent(t.league)}/${encodeURIComponent(
                      t.team
                    )}`}
                  >
                    {t.team}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/${encodeURIComponent(t.league)}`}
                    className="flex items-center gap-2"
                  >
                   {<LeagueLogo league={t.league} size="sm"/>}
                   
                    <Badge
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
                <TableCell className="text-muted-foreground">
                  {t.leader?.player} ({t.leader?.m})
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
