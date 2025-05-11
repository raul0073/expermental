"use client";

import { useDispatch } from "react-redux";
import { clearSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";
import { clearSelectedZone } from "@/lib/features/SelectedZoneSlice";
import PitchWithCanvas from "./PitchWithCanvas";
import { useEffect } from "react";

export default function PitchComp() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearSelectedPlayer());
		dispatch(clearSelectedZone());
	}, [dispatch]);

	return (
		<div className="w-full max-w-8xl h-[80vh]">
			<PitchWithCanvas />
		</div>
	);
}
