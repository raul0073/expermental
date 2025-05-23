"use client";
import { ZoneState } from "@/lib/features/SelectedZoneSlice";
import { RootState } from "@/lib/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { FullZone } from "./zones.types";
import { ScrollArea } from "../ui/scroll-area";

export function ZoneSidebar({ selectedZone }: { selectedZone: ZoneState }) {
	const teamName = useSelector(
		(state: RootState) => state.userConfig?.team?.name
	);

	const zones = useSelector((state: RootState) => {
		if (!teamName) return {};
		const teamData = state.team[teamName];
		if (!teamData) return {};
		return teamData.zones ?? {};
	});
	const zone: FullZone | undefined = useMemo(() => {
		if (!selectedZone.selected?.id) return undefined;
		return zones[selectedZone.selected?.id];
	}, [zones, selectedZone.selected?.id]);

	if (!teamName || !selectedZone.selected?.id || !zone) {
		return (
			<h3 className="w-full text-center flex justify-center items-center h-full">
				Select Zone
			</h3>
		);
	}
	return (
		<div className="">
			{/* Header */}
			<div className="info mt-2 mb-4 text-sm space-y-1">
				<h2 className="text-xl font-bold mb-2 text-primary">{zone.label}</h2>
				<div className="flex gap-2 items-center justify-between">
					<label className="uppercase text-muted-foreground">Zone Rating</label>
					<p className="font-semibold ">{zone.rating}</p>
				</div>
			</div>
		<ScrollArea className="h-[80vh]">
		<div className="space-y-4 mt-4">
				{/* TEAM CONTRIBUTION */}
				<div className="space-y-4">
					{/* Arsenal Performance */}
					<div>
						<div className="flex w-full justify-between items-center">
							<h3 className="text-lg font-semibold text-primary mb-1">
								{teamName} Performance
							</h3>
							<p className="text-sm text-muted-foreground">
								Score:{" "}
								<strong className="text-primary">
									{zone.breakdown.team.score.toFixed(2)}
								</strong>
							</p>
						</div>
						<div className="grid grid-cols-1 gap-6 bg-muted py-2 px-1">
							<div>
								<h4 className="text-sm font-medium text-foreground/80 mb-1">
									Positives
								</h4>
								<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
									{zone.breakdown.team.pros.map((key) => (
										<li key={key}>{key}</li>
									))}
								</ul>
							</div>
							<div>
								<h4 className="text-sm font-medium text-foreground/80 mb-1">
									Negatives
								</h4>
								<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
									{zone.breakdown.team.cons.map((key) => (
										<li key={key}>{key}</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Opponent Behavior vs Arsenal */}
					<div>
						<div className="flex w-full justify-between items-center">
							<h3 className="text-lg font-semibold text-red-500">
								Opponents vs {teamName}
							</h3>
							<p className="text-sm text-muted-foreground">
								Score:{" "}
								<strong className="text-primary">
									{zone.breakdown.against.score.toFixed(2)}
								</strong>
							</p>
						</div>
						<div className="grid grid-cols-1 gap-6 bg-muted py-2 px-1">
							<div>
								<h4 className="text-sm font-medium text-foreground/80 mb-1">
									Threats
								</h4>
								<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
									{zone.breakdown.against.cons.map((key) => (
										<li key={key}>{key}</li>
									))}
								</ul>
							</div>
							<div>
								<h4 className="text-sm font-medium text-foreground/80 mb-1">
									Failures
								</h4>
								<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
									{zone.breakdown.against.pros.map((key) => (
										<li key={key}>{key}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* 👥 PLAYER CONTRIBUTIONS */}
				<div className="space-y-2">
					<div className="flex w-full justify-between items-center">
						<h3 className="text-lg font-semibold text-foreground/80">
							Player Impact
						</h3>
						<p className="text-sm text-muted-foreground">
							Score:{" "}
							<strong className="text-primary">
								{zone.breakdown.players.score.toFixed(2)}
							</strong>
						</p>
					</div>

					<div className="w-full overflow-x-auto">
						<table className="table-auto w-full text-sm text-left text-muted-foreground border-collapse">
							<thead className="border-b">
								<tr>
									<th className="px-2 py-1 font-medium text-foreground/80">
										Player
									</th>
									<th className="px-2 py-1 font-medium text-foreground/80">
										Weight
									</th>
									<th className="px-2 py-1 font-medium text-foreground/80">
										Minutes
									</th>
									<th className="px-2 py-1 font-medium text-foreground/80">
										Rating
									</th>
								</tr>
							</thead>
							<tbody>
								{zone.breakdown.players.contributions.map((p) => (
									<tr key={p.name} className="border-b last:border-none">
										<td className="px-2 py-1">{p.name}</td>
										<td className="px-2 py-1">
											{p.position_weight.toFixed(2)}
										</td>
										<td className="px-2 py-1">{Math.round(p.minutes)}</td>
										<td className="px-2 py-1">{p.rating.toFixed(2)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</ScrollArea>
		</div>
	);
}
