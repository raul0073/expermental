"use client";

import { useDispatch } from "react-redux";
import { clearSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";
import { clearSelectedZone } from "@/lib/features/SelectedZoneSlice";
import PitchWithCanvas from "./PitchWithCanvas";
import { Tabs } from "../ui/tabs";

export default function PitchComp() {
	const dispatch = useDispatch();

	const tabs = [
		{
			title: "Team",
			value: "team",
			content: (
				<div className="w-full h-full overflow-hidden rounded-2xl p-6 bg-background">
					<PitchWithCanvas type="team" />
				</div>
			),
			onClick: () => {
				dispatch(clearSelectedPlayer());
				dispatch(clearSelectedZone());
			}
		},
		{
			title: "Players",
			value: "players",
			content: (
				<div className="w-full h-full overflow-hidden rounded-2xl p-6 bg-background">
					<PitchWithCanvas type="players" />
				</div>
			),
			onClick: () => {
				dispatch(clearSelectedPlayer());
				dispatch(clearSelectedZone());
			}
		},
	];

	return (
		<div className="w-full max-w-8xl h-[80vh]">
			<Tabs tabs={tabs} />
		</div>
	);
}
