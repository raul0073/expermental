"use client";
import PitchCanvas from "@/components/pitch/PitchComp";
import TeamSelect from "@/components/root/team-select/TeamSelect";
import { Separator } from "@/components/ui/separator";
import { fetchAllTeams } from "@/lib/features/TeamSlice";
import { setUserId } from "@/lib/features/UserConfigSliceSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import { userInitService } from "../services/user.init.service";
(() => {
	const bytesPerChar = 2;           // UTF-16 in most browsers
	let total = 0;
  
	console.table(
	  Object.keys(localStorage).map(key => {
		const size = (localStorage.getItem(key) || '').length * bytesPerChar;
		total += size;
		return {
		  key,
		  bytes: size,
		  '≈ KiB': (size / 1024).toFixed(2),
		};
	  })
	);
  
	console.log(
	  `%cTotal localStorage usage: ${(total / 1024).toFixed(2)} KiB`,
	);
  })();
export default function Home() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const uid = userInitService();
		dispatch(fetchAllTeams());
		dispatch(setUserId(uid));
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
