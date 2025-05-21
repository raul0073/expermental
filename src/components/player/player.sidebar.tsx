"use client";
import { RootState } from "@/lib/store";
import { StatsOption } from "@/lib/Types/PlayerStats.Type";
import { filterStatsForDisplay, getStatsByType } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../root/loading/Loading";
import { StatTypeSelector } from "../root/stats-type-select/StatsTypeBtns";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PlayerAISummary } from "./player.aiSummary";
import { Player } from "./player.types";
import { PlayerStatsTable } from "./playerDataTable";
import { PlayerStatsChart } from "./playerChart";
import { PlayerStat } from "@/lib/Types/Team.Type";

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
	const cleanStats = useMemo(
		() => filterStatsForDisplay(rawStats as PlayerStat[]),
		[rawStats]
	  );

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
			<Tabs defaultValue="table">
				<TabsList className="overflow-x-auto w-full flex-nowrap whitespace-nowrap">
					<TabsTrigger key="table" value="table" className="capitalize w-full">
						Table
					</TabsTrigger>
					<TabsTrigger key="plot" value="plot" className="capitalize w-full">
						Visual
					</TabsTrigger>
					<TabsTrigger key="ai" value="ai" className="capitalize w-full">
						AI
					</TabsTrigger>
				</TabsList>
				<ScrollArea className="h-[50vh] py-2">
					<TabsContent value="table" asChild>
						<PlayerStatsTable stats={cleanStats} loading={false} />
					</TabsContent>
					<TabsContent value="plot" asChild>
						<PlayerStatsChart player={playerModel} />
					</TabsContent>
					<TabsContent value="ai" asChild>
						<PlayerAISummary
							stats={cleanStats}
							statsType={statsType}
							player={playerModel}
						/>
					</TabsContent>
				</ScrollArea>
			</Tabs>
		</div>
	);
}
