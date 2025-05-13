'use client'
import PitchCanvas from "@/components/pitch/PitchComp";
import TeamSelect from "@/components/root/team-select/TeamSelect";
import { Separator } from "@/components/ui/separator";
import { fetchAllTeams } from "@/lib/features/TeamSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
export default function Home() {
	const dispatch = useAppDispatch();
  
	useEffect(() => {
	  dispatch(fetchAllTeams());
	}, [dispatch]);
  
	return (
	  <section className="home p-1">
		<TeamSelect />
		<PitchCanvas />
		<Separator />
		{/* <About /> */}
	  </section>
	);
  }