"use client";
import { getLeagueFlag } from "@/lib/flags";
import { cn } from "@/lib/utils"; 

export default function LeagueFlag({
  league,
  className,
  preferEngland = false,
}: {
  league: string;
  className?: string;
  preferEngland?: boolean;
}) {
  const meta = getLeagueFlag(league, { preferEngland });
  if (!meta) return null;
  return (
    <span
      className={cn("inline-flex items-center text-lg leading-none", className)}
      role="img"
      aria-label={meta.label}
      title={meta.label}
    >
      {meta.emoji}
    </span>
  );
}
