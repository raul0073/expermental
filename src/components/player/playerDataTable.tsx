// components/player/PlayerStatsTable.tsx
"use client";

import { PlayerStat } from "@/lib/Types/Team.Type";
import { formatStatKey, toOrdinal } from "@/lib/utils";

interface PlayerStatsTableProps {
	stats: PlayerStat[];
	loading: boolean;
}

export function PlayerStatsTable({ stats, loading }: PlayerStatsTableProps) {
	if (loading) {
		return <p className="text-muted-foreground">Loading stats...</p>;
	}

	if (!stats.length) {
		return <p className="text-sm text-destructive">No data found.</p>;
	}

	const sorted = [...stats].sort(
		(a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity)
	);

	return (
		<table className="w-full text-sm border-muted">
			<thead>
				<tr className="text-muted-foreground border-b-2">
					<th className="text-left py-1 pr-2 w-1/2 font-semibold">Stat</th>
					<th className="text-right py-1 px-1 font-semibold">Value</th>
					<th className="text-right py-1 pl-1 font-semibold">Team Rank</th>
				</tr>
			</thead>
			<tbody>
				{sorted.map((item, i) => (
					<tr key={i} className="border-b border-muted last:border-b-0">
						<td className="text-muted-foreground pr-2 truncate">
							{formatStatKey(item.label)}
						</td>
						<td className="text-right font-medium px-1">{item.val}</td>
						<td
							className={`text-right font-medium px-1 ${
								item.rank === 1
									? "text-green-500"
									: item.rank === 2
									? "text-yellow-400"
									: item.rank === 3
									? "text-blue-500"
									: "text-muted-foreground"
							}`}>
							{toOrdinal(item.rank!)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
