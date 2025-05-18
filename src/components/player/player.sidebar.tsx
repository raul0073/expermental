"use client";
import { RootState } from "@/lib/store";
import { StatsOption } from "@/lib/Types/PlayerStats.Type";
import { filterStatsForDisplay, getStatsByType } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../root/loading/Loading";
import { StatTypeSelector } from "../root/stats-type-select/StatsTypeBtns";
import { ScrollArea } from "../ui/scroll-area";
import { PlayerAISummary } from "./player.aiSummary";
import { Player } from "./player.types";
import { PlayerStatsTable } from "./playerDataTable";

export function PlayerSidebarSheet({
	playerSelected,
}: {
	playerSelected: Player;
}) {
	const [statsType, setStatsType] = useState<StatsOption>("standard");

	const activeTeam: string =
		useSelector((state: RootState) => state.userConfig.team?.name) || "Arsenal";
	const players =
		useSelector((state: RootState) => state.team[activeTeam]?.players) || [];
	const playerModel = players.find((p) => p.name === playerSelected.name);

	useEffect(() => {
		setStatsType("standard");
	}, [playerModel?.name]);

	// always define statsGroup so hooks are stable
	const statsGroup = useMemo(() => playerModel?.stats ?? {}, [playerModel]);

	// pick & filter stats
	const rawStats = useMemo(
		() => getStatsByType(statsGroup, statsType),
		[statsGroup, statsType]
	);
	const cleanStats = useMemo(() => filterStatsForDisplay(rawStats), [rawStats]);

	if (!playerModel) {
		return <LoadingSpinner />;
	}

	return (
		<div className="">
			{/* Header */}
			<div className="info mt-2 mb-4 text-sm space-y-1">
				<h2 className="text-2xl font-bold mb-2 text-primary">
					{playerModel.shirt_number}. {playerModel.name}
				</h2>
				<div className="flex gap-2 items-center justify-between">
					<label className="uppercase  text-muted-foreground">Role</label>
					<p className="font-semibold ">{playerModel.role}</p>
				</div>
				<div className="flex gap-2 items-center justify-between">
					<label className="uppercase  text-muted-foreground">Rating</label>
					<p className="font-semibold ">
						{playerModel.rating === 0 ? (
							<span className="text-muted-foreground italic">Unrated</span>
						) : (
							<span>{playerModel.rating.toFixed(1)}</span>
						)}
					</p>
				</div>
			</div>

			{/* Stat Type Selector */}
			<div className="mb-4">
				<StatTypeSelector
					selected={statsType}
					onChange={setStatsType}
					playerSelected={playerModel}
				/>
			</div>
			<ScrollArea className="h-[60vh] p-3">
				{/* Stats Table */}
				<PlayerStatsTable stats={cleanStats} loading={false} />

				{/* AI Analysis */}
				<PlayerAISummary
					stats={cleanStats}
					statsType={statsType}
					player={playerModel}
				/>
			</ScrollArea>
		</div>
	);
}
