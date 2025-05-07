"use client";

import { fetchPlayerSeasonStats } from "@/app/services/player.service";
import { APIRes, StatsOption } from "@/lib/Types/PlayerStats.Type";
import { formatStatKey, toOrdinal } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { StatTypeSelector } from "../root/stats-type-select/StatsTypeBtns";
import { ScrollArea } from "../ui/scroll-area";
import { Player } from "./player.types";


export function PlayerSidebarSheet({
	playerSelected,
}: {
	playerSelected: Player;
}) {
	const [statsType, setStatsType] = useState<StatsOption>("standard");
	const [playerStats, setPlayerStats] = useState<APIRes | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!playerSelected?.id || !statsType) return;

		const fetchStats = async () => {
			setLoading(true);
			try {
				const data = await fetchPlayerSeasonStats({
					team: "Arsenal",
					stats_type: statsType,
					player_name: playerSelected.name.split(".")[1],
				});
				setPlayerStats(data);
			} catch (err) {
				console.error("Failed to fetch player stats", err);
				setPlayerStats(null);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, [playerSelected?.name, statsType, playerSelected?.id]);

	useEffect(() => {
		setStatsType("standard");
		setPlayerStats(null);
	}, [playerSelected?.id]);


	const memoizedStats = useMemo(() => {
		if (!playerStats?.data?.length) return null;
		const flatStats = playerStats.data.flat(); // since your `data` is array of arrays
		return flatStats
			.sort((a, b) => a.rank - b.rank)
			.filter((item) => item.val !== 0 || !item.val === null)
			.map((item, index) => (
				<tr key={index} className="border-b border-muted last:border-b-0">
					<td className="text-muted-foreground pr-2 truncate">
						{formatStatKey(item.label)}
					</td>
					<td className="text-right font-medium px-1">{item.val}</td>
					<td 
					    className={`text-right font-medium px-1 ${
							item.rank === 1
							  ? 'text-green-500'
							  : item.rank === 2
							  ? 'text-yellow-400'
							  : item.rank === 3
							  ? 'text-blue-500'
							  : 'text-muted-foreground'
						  }`}
						>
						{toOrdinal(item.rank)}
					</td>
				</tr>
			));
	}, [playerStats]);

	if (!playerSelected) return null;

	return (
		<div className="mt-12 px-2">
			<div className="mt-2 mb-4 text-sm space-y-1">
				<h2 className="text-2xl font-bold mb-4 text-primary">
					{playerSelected.number}. {playerSelected.name}
				</h2>
			</div>

			<div className="mb-4">
				<StatTypeSelector selected={statsType} onChange={setStatsType} playerSelected={playerSelected} />
			</div>
			<ScrollArea className="h-[70vh]">
				{loading ? (
					<p className="text-muted-foreground">Loading stats...</p>
				) : memoizedStats ? (
					<table className="w-full text-sm border-t border-muted">
						<thead>
							<tr className="text-muted-foreground">
								<th className="text-left py-1 pr-2 w-1/2 font-semibold">
									Stat
								</th>
								<th className="text-right py-1 px-1 font-semibold">Value</th>
								<th className="text-right py-1 pl-1 font-semibold">
									Team Rank
								</th>
							</tr>
						</thead>
						<tbody>{memoizedStats}</tbody>
					</table>
				) : (
					<p className="text-sm text-destructive">No data found.</p>
				)}
			</ScrollArea>
		</div>
	);
}
