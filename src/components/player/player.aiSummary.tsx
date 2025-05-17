"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchAIPlayerSummary } from "@/app/services/AI.service";
import { StatItem, StatsOption } from "@/lib/Types/PlayerStats.Type";
import { Player } from "./player.types";
import { PlayerStat } from "@/lib/Types/Team.Type";

interface PlayerAISummaryProps {
  stats: StatItem[];
  statsType: StatsOption;
  player: Player;
}

export function PlayerAISummary({
  stats,
  statsType,
  player,
}: PlayerAISummaryProps) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleClick = async () => {
    if (!stats.length) return;
    setLoading(true);
    try {

      // Convert StatItem[] → PlayerStat[] (no null ranks, vals are numbers)
      const aiStats: PlayerStat[] = stats
        .filter((s): s is StatItem & { rank: number; val: number } =>
          typeof s.val === "number" && typeof s.rank === "number"
        )
        .map((s) => ({
          label: s.label,
          val: s.val,
          rank: s.rank,
        }));
      const result = await fetchAIPlayerSummary({
        stats: aiStats,
        stats_type: statsType,
        player_name: player.name,
        player_role: player.role,
      });
      setSummary(result);
      //eslint-disable-next-line
    } catch (err: any) {
      console.error(err);
      setSummary("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      <Button onClick={handleClick} variant="default" disabled={loading}>
        {loading ? "Generating summary..." : "Get Analyst Report"}
      </Button>
      {summary && (
        <div className="mt-3 p-3 border rounded bg-muted text-sm text-muted-foreground whitespace-pre-line">
          {summary}
        </div>
      )}
    </div>
  );
}
