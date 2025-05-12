'use client'
import PitchCanvas from "@/components/pitch/PitchComp";
import TeamSelect from "@/components/team-select/TeamSelect";
import { fetchAllTeams } from "@/lib/features/TeamSlice";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
export default function Home() {
	const dispatch = useAppDispatch();
  
	useEffect(() => {
	  dispatch(fetchAllTeams());
	}, [dispatch]);
  
	return (
	  <section className="home p-1">
		<TeamSelect />
		<PitchCanvas />
	  </section>
	);
  }