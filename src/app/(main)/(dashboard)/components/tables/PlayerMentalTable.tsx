"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Player } from "../../utils/types/player";
import { LEAGUES_NAME } from "@/lib/Types/LABELS";
import { getLeagueFlag } from "@/lib/flags";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  players: Player[];
};

type SortKey = "name" | "team" | "league" | "mental" | "preformance";
type SortDirection = "asc" | "desc";

// 🔑 Add your descriptions here
const TRAIT_DESCRIPTIONS: Record<string, string> = {
  Resilience: "Ability to bounce back from setbacks, keep performance high under pressure.",
  Composure: "How calm and effective a player is when under stress or facing adversity.",
  Creativity: "Vision, decision-making, and ability to create opportunities in tough situations.",
  Discipline: "Avoiding mistakes, fouls, and cards while staying focused.",
  Leadership: "Influencing and organizing teammates, maintaining focus and morale.",
};

export default function PlayerMentalTable({ players }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [activeLeague, setActiveLeague] = useState<"ALL" | string>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("mental");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

 

  const leagues = useMemo(() => {
    const set = new Set(players.map((p) => p.league ?? p.__meta__?.league));
    return Array.from(set).filter(Boolean) as string[];
  }, [players]);

  const filteredPlayers = useMemo(() => {
    const arr = activeLeague === "ALL"
      ? [...players]
      : players.filter((p) => (p.league ?? p.__meta__?.league) === activeLeague);

    arr.sort((a, b) => {// eslint-disable-next-line
      let aVal: any, bVal: any;

      switch (sortKey) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "team":
          aVal = a.team ?? a.__meta__?.team ?? "";
          bVal = b.team ?? b.__meta__?.team ?? "";
          break;
        case "league":
          aVal = a.league ?? a.__meta__?.league ?? "";
          bVal = b.league ?? b.__meta__?.league ?? "";
          break;
        case "preformance":
          aVal = a.ranking.performance ?? "N/A";
          bVal = b.ranking.performance ?? "N/A";
          break;
        case "mental":
        default:
          aVal = a.mental?.m ?? 0;
          bVal = b.mental?.m ?? 0;
          break;
      }

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return arr;
  }, [players, activeLeague, sortKey, sortDir]);

  const visiblePlayers = showAll ? filteredPlayers : filteredPlayers.slice(0, 10);
 if (!players?.length) return null;
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <Card className="h-fit border-none">
      <CardHeader>
        <CardTitle>Top Mental Players</CardTitle>
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
              <span>{getLeagueFlag(l)?.emoji}</span> {LEAGUES_NAME[l] ?? l}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="overflow-auto space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 cursor-pointer" onClick={() => handleSort("name")}>
                #
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                Player
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("team")}>
                Team
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("league")}>
                League
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort("mental")}>
                Mental / raw
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort("preformance")}>
                Preformance
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {visiblePlayers.map((player, idx) => {
              const leagueKey = player.league ?? player.__meta__?.league;
              const leagueName = LEAGUES_NAME[leagueKey] ?? leagueKey;
              const team = player.team ?? player.__meta__?.team;

              const breakdown = player.mental?.breakdown ?? {};
              let bestTrait = "";
              if (breakdown && Object.keys(breakdown).length > 0) {
                const entries = Object.entries(breakdown);
                bestTrait = entries.reduce((prev, curr) => (curr[1] > prev[1] ? curr : prev))[0];
              }

              return (
                <TableRow key={`${player.fbref_id ?? idx}-${idx}`}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="flex flex-col">
                    <Link
                      href={`/${encodeURIComponent(leagueKey)}/${encodeURIComponent(team)}/${encodeURIComponent(player.name)}`}
                      className="hover:underline"
                    >
                      {player.name} <span className="text-[.5dvw] text-muted-foreground">({player.role})</span>
                    </Link>
                    {bestTrait && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="link"
                            className="text-xs text-gray-500 p-0 h-auto font-normal"
                          >
                            Best Trait: {bestTrait} ({breakdown[bestTrait].toFixed(1)})
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-sm text-sm">
                          <p className="font-semibold">{bestTrait}</p>
                          <p>{TRAIT_DESCRIPTIONS[bestTrait] ?? "No description available."}</p>
                        </PopoverContent>
                      </Popover>
                    )}
                  </TableCell>
                  <TableCell>{team}</TableCell>
                  <TableCell>
                    <Link
                      href={`/${encodeURIComponent(leagueKey)}`}
                      className="flex items-center gap-2"
                    >
                      <span>{getLeagueFlag(leagueKey)?.emoji}</span>
                      <Badge variant={leagueKey.slice(0, 3) as "GER" | "ENG" | "ESP" | "ITA" | "FRA"}>
                        {leagueName}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {player.mental?.m ?? 0} / {player.mental?.m_raw ?? 0}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {player.ranking?.performance ?? 0}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredPlayers.length > 10 && (
          <div className="flex justify-center mt-2">
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
