"use client";
import { initializeTeamData } from "@/app/services/team.init.service";
import { setUserTeam } from "@/lib/features/UserConfigSliceSlice";
import { TeamModel, TeamTypeInit } from "@/lib/Types/Team.Type";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button"; // Assuming you're using shadcn/ui
import { Card, CardContent } from "../ui/card";
import { EPL_TEAMS } from "./teams-data";
import { setTeam } from "@/lib/features/TeamSlice";
import { setUserTeamService } from "@/app/services/config.service";

function TeamSelect() {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const handleSelect = async (team: TeamTypeInit) => {
		try {
			await setUserTeamService(team.slug)
			dispatch(setUserTeam(team));
			const res: TeamModel = await initializeTeamData(team);
			dispatch(setTeam(res));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="w-full bg-muted rounded-lg  px-4">
			<div className="flex justify-between items-center px-4 py-6">
				<h2 className="text-2xl font-semibold font-default">
					Select Your Team
				</h2>
				<Button onClick={() => setOpen(!open)} variant="outline">
					{open ? "Hide Teams" : "Select Team"}
				</Button>
			</div>

			<div
				className={`transition-all duration-300 ${
					open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
				} overflow-hidden`}>
				<div className="pb-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
					{EPL_TEAMS.map((team) => (
						<Card
							key={team.slug}
							onClick={() => handleSelect(team)}
							className="cursor-pointer hover:scale-105 transition-transform rounded-xl shadow-lg dark:bg-gradient-to-tr dark:from-gray-950 dark:to-stone-900 bg-gradient-to-tr from-gray-300 to-stone-200">
							<CardContent className="flex flex-col items-center justify-center p-4">
								<Image
									src={team.logo}
									alt={team.name}
									className="h-20 object-contain mb-3"
									width={80}
									height={80}
								/>
								<p className="font-semibold text-center">{team.name}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export default TeamSelect;
