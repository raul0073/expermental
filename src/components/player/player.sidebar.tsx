"use client";

import { fetchAIPlayerSummary } from "@/app/services/AI.service";
import { fetchPlayerSeasonStats } from "@/app/services/player.service";
import { RootState } from "@/lib/store";
import { APIRes, StatsOption } from "@/lib/Types/PlayerStats.Type";
import { formatStatKey, toOrdinal } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StatTypeSelector } from "../root/stats-type-select/StatsTypeBtns";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Player } from "./player.types";

export function PlayerSidebarSheet({
	playerSelected,
}: {
	playerSelected: Player;
}) {
	const userData = useSelector((state: RootState) => state.userConfig);
	const [statsType, setStatsType] = useState<StatsOption>("standard");
	const [playerStats, setPlayerStats] = useState<APIRes | null>(null);
	const [AiSummary, setAiSummary] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!playerSelected?.name || !statsType) return;

		const fetchStats = async () => {
			setLoading(true);
			console.log(playerSelected.name.split(" ")[1]);
			try {
				const data = await fetchPlayerSeasonStats({
					team: userData.team.name,
					stats_type: statsType,
					player_name: playerSelected.name.split(" ")[1],
					player_role: playerSelected.role,
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
	}, [
		playerSelected?.name,
		playerSelected?.role,
		statsType,
		userData.team.name,
	]);

	useEffect(() => {
		setStatsType("standard");
		setPlayerStats(null);
	}, [playerSelected?.name]);

	const handleAISummary = async () => {
		if (!playerStats?.data?.length) return;
		try {
			setLoading(true);
			const flatStats = playerStats.data.flat();
			const summary = await fetchAIPlayerSummary({
				stats: flatStats,
				stats_type: statsType,
				player_name: playerSelected.name.split(".")[1],
				player_role: playerSelected.role,
			});
			console.log(summary);
			setAiSummary(summary);
			//eslint-disable-next-line
		} catch (err: any) {
			console.error(err.message);
		} finally {
			setLoading(false);
		}
	};
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
								? "text-green-500"
								: item.rank === 2
								? "text-yellow-400"
								: item.rank === 3
								? "text-blue-500"
								: "text-muted-foreground"
						}`}>
						{toOrdinal(item.rank)}
					</td>
				</tr>
			));
	}, [playerStats]);

	if (!playerSelected) return null;

	return (
		<div className="mt-12">
			<div className="info mt-2 mb-4 text-sm space-y-1">
				<h2 className="text-2xl font-bold mb-2 text-primary">
					{playerSelected.shirt_number}. {playerSelected.name}
				</h2>
				<div className="flex gap-2 items-center">
					<label
						htmlFor="role"
						className="uppercase text-xs text-muted-foreground">
						role
					</label>
					<p className="font-semibold" id="role">
						{playerSelected.role}
					</p>
				</div>
				<div className="flex gap-2 items-center">
					<label
						htmlFor="rating"
						className="uppercase text-xs text-muted-foreground">
						rating
					</label>
					<p className="font-semibold" id="rating">
						{playerSelected.rating}
					</p>
				</div>
			</div>
			<div className="mb-4">
				<StatTypeSelector
					selected={statsType}
					onChange={setStatsType}
					playerSelected={playerSelected}
				/>
			</div>
			<ScrollArea className="h-[65vh] p-3">
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
				<div className="my-4">
					<Button
						onClick={handleAISummary}
						variant="default"
						disabled={loading}>
						{loading ? "Generating summary..." : "Analysis Report"}
					</Button>

					{AiSummary && (
						<div className="mt-3 p-3 border rounded bg-muted text-sm text-muted-foreground whitespace-pre-line">
							{AiSummary}
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
}
