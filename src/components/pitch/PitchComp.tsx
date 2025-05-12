"use client";

import { clearSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";
import { clearSelectedZone } from "@/lib/features/SelectedZoneSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PitchWithCanvas from "./PitchWithCanvas";
import { RootState } from "@/lib/store";

export default function PitchComp() {
	const dispatch = useDispatch();
	const activeTeam = useSelector((state: RootState) => state.userConfig?.team);
	useEffect(() => {
		dispatch(clearSelectedPlayer());
		dispatch(clearSelectedZone());
	}, [dispatch]);


	if(!activeTeam) return null

	return (
		<div className="w-full max-w-8xl h-[80vh]">
			<PitchWithCanvas activeTeam={activeTeam}/>
		</div>
	);
}
