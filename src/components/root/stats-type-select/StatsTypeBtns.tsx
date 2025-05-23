"use client";

import { Player } from "@/components/player/player.types";
import { Button } from "@/components/ui/button";
import { STAT_OPTION_LABELS, StatsOption } from "@/lib/Types/PlayerStats.Type";

type StatTypeSelectorProps = {
	selected: StatsOption;
	onChange: (value: StatsOption) => void;
	playerSelected: Player;
};

export function StatTypeSelector({ selected, onChange, playerSelected }: StatTypeSelectorProps) {
	const keeperOptions: StatsOption[] = [
		"standard",
		"keeper",
		"playing",
		"misc",
	];
	const outfieldOptions: StatsOption[] = [
		"standard",
		"shooting",
		"passing",
		"goal",
		"defense",
		"possession",
		"playing",
		"misc",
	];

	
	const allowedOptions: StatsOption[] = playerSelected.role === "GK" ? keeperOptions : outfieldOptions;

	return (
		<div className="grid grid-cols-3 gap-2 text-pretty">
			{allowedOptions.map((type) => (
				<Button
					key={type}
					variant={selected === type ? "default" : "outline"}
					size="sm"
					className="text-wrap p-6"
					onClick={() => onChange(type)}
				>
					{STAT_OPTION_LABELS[type]}
				</Button>
			))}
		</div>
	);
}
