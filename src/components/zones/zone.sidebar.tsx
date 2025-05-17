"use client";
import { ZoneState } from "@/lib/features/SelectedZoneSlice";
import { RootState } from "@/lib/store";
import { X } from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Player } from "../player/player.types";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useSidebar } from "../ui/sidebar";
import { FullZone } from "./zones.types";

export function ZoneSidebar({ selectedZone }: { selectedZone: ZoneState }) {
	const { toggleSidebar } = useSidebar();
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
		return null;
	}
	return (
		<div className="mt-12 px-2">
			{/* Header */}
			<div className="info mt-2 mb-4 text-sm space-y-1">
				<Button
					data-sidebar="trigger"
					variant="outline"
					size="icon"
					className={"text-white float-right"}
					onClick={() => toggleSidebar()}>
					<X className="text-foreground" />
				</Button>
				<h2 className="text-xl font-bold mb-2 text-primary">{zone.label}</h2>
				<div className="flex gap-2 items-center">
					<label className="uppercase text-xs text-muted-foreground">
						Zone Rating
					</label>
					<strong className="text-primary text-xl">{zone.rating}</strong>
				</div>
				<Separator />
			</div>
			<div className="space-y-4 mt-8">
				{/* TEAM CONTRIBUTION */}
				<div>
					<div className="flex w-full justify-between items-center">
						<h3 className="text-lg font-semibold text-foreground/80 mb-1">
							Team Contribution
						</h3>
						<p className="text-sm mb-2">
							{/* <strong className="text-primary text-xl">{zone.breakdown.team.score.toFixed(2)}</strong> */}
						</p>
					</div>
					<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
						{zone.breakdown.team.keys.map((key: string) => (
							<li key={key}>{key}</li>
						))}
					</ul>
				</div>

				{/* OPPONENT ACTIONS */}
				<div>
					<div className="flex w-full justify-between items-center">
						<h3 className="text-lg font-semibold text-foreground/80 mb-1">
							Opponent Threat
						</h3>
						<p className="text-sm mb-2 ">
							{/* <strong className="text-primary text-xl">{zone.breakdown.against.score.toFixed(2)}</strong> */}
						</p>
					</div>
					<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
						{zone.breakdown.against.keys.map((key: string) => (
							<li key={key}>{key}</li>
						))}
					</ul>
				</div>

				{/* 👥 PLAYER CONTRIBUTIONS */}
				<div>
					<div className="flex w-full justify-between items-center">
						<h3 className="text-lg font-semibold text-foreground/80 mb-1">
							Player Impact
						</h3>
						<p className="text-sm mb-2 ">
							{/* <strong className="text-primary text-xl">{zone.breakdown.players.score.toFixed(2)}</strong> */}
						</p>
					</div>
					<ul className="text-sm space-y-1">
						{zone.breakdown.players.players
							.filter((p) => p.rating > 0)
							.map((p: Player) => (
								<li key={p.name} className="text-foreground/60">
									<span className="font-medium">{p.name}</span>{" "}
									<span className="text-muted-foreground text-xs">
										({p.role})
									</span>{" "}
									- {p.rating.toFixed(2)}
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
}
