
"use client";

import { Button } from "@/components/ui/button";
import { getLeagueFlag } from "@/lib/flags";
import { LEAGUES_NAME } from "@/lib/Types/LABELS";
import { useMemo } from "react";
import { Player } from "../../../utils/types/player";

export const RoleTabs = ({
  players,
  activeRole,
  setActiveRole,
}: {
  players: Player[];
  activeRole: string;
  setActiveRole: (role: string) => void;
}) => {
  const roles = useMemo(() => {
    const set = new Set(players.map((p) => p.role).filter(Boolean));
    return Array.from(set) as string[];
  }, [players]);

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        size="sm"
        variant={activeRole === "ALL" ? "secondary" : "outline"}
        className="rounded-full text-xs px-1 py-1"
        onClick={() => setActiveRole("ALL")}
      >
        All
      </Button>
      {roles.map((role) => (
        <Button
          key={role}
          size="sm"

          className="rounded-full text-xs"
          variant={activeRole === role ? "secondary" : "outline"}
          onClick={() => setActiveRole(role)}
        >
          {role}
        </Button>
      ))}
    </div>
  );
};

// ------------------- League Tabs Component -------------------
export const LeagueTabs = ({
  players,
  activeLeague,
  setActiveLeague,
}: {
  players: Player[];
  activeLeague: string;
  setActiveLeague: (league: string) => void;
}) => {
  const leagues = useMemo(() => {
    const set = new Set(players.map((p) => p.league ?? p.__meta__?.league).filter(Boolean));
    return Array.from(set) as string[];
  }, [players]);

  return (
    <div className="flex gap-2 flex-wrap mt-2">
      <Button
        size="sm"
        variant={activeLeague === "ALL" ? "default" : "outline"}
        onClick={() => setActiveLeague("ALL")}
      >
        All
      </Button>
      {leagues.map((l) => (
        <Button
          key={l}
          size="sm"
          variant={activeLeague === l ? "default" : "outline"}
          onClick={() => setActiveLeague(l)}
        >
          <span>{getLeagueFlag(l)?.emoji}</span> {LEAGUES_NAME[l]}
        </Button>
      ))}
    </div>
  );
};