"use client";
import PitchCanvas from "@/components/pitch/PitchComp";
import TeamSelect from "@/components/root/team-select/TeamSelect";
import { Separator } from "@/components/ui/separator";
import { fetchAllTeams } from "@/lib/features/TeamSlice";
import { setUserId } from "@/lib/features/UserConfigSliceSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import { userInitService } from "../services/user.init.service";
import { setActive } from "@/lib/features/ZoneEditorSlice";
import {  setActive as setActivePlayerEditor} from "@/lib/features/PlayerConfigEditorSlice";
import { useSidebar } from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Home() {
	const dispatch = useAppDispatch();
	const {setOpen} = useSidebar()
	const teams = useSelector((s: RootState) => s.team)
	useEffect(() => {
		
		if(Object.keys(teams).length === 0){
			dispatch(fetchAllTeams());
		}	
		const uid = userInitService();
		
		dispatch(setUserId(uid));
		dispatch(setActive(false))
		setOpen(false)
		dispatch(setActivePlayerEditor(false))
	}, [dispatch]);

	return (
		<section className="home p-1 py-8">
			
			<TeamSelect />
			<PitchCanvas />
			<Separator />
			{/* <About /> */}
		</section>
	);
}
