"use client";
import { setUserTeam } from "@/lib/features/UserConfigSliceSlice";
import { RootState } from "@/lib/store";
import { TeamTypeInit } from "@/lib/Types/Team.Type";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../ui/button"; // Assuming you're using shadcn/ui
import { Card, CardContent } from "../../ui/card";
import { LoadingSpinner } from "../loading/Loading";
import { EPL_TEAMS } from "./teams-data";

function TeamSelect() {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const teams = useSelector((state: RootState) => state.team);
	useEffect(()=>{
		setOpen(true)
	},[])
	const handleSelect = async (team: TeamTypeInit) => {
		setLoading(true)
		try {
			dispatch(setUserTeam(team));
			// const res: TeamModel = await initializeTeamData(team);
			// dispatch(setTeam(res));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false)
		}
	};

	if (Object.keys(teams).length === 0 || loading) return <LoadingSpinner message="loading teams data..." />;
	return (
		<section className="w-full bg-transparent rounded-lg py-1">
			<div className="flex justify-center items-center px-4 py-1">
				<Button
					onClick={() => setOpen(!open)}
					variant="outline"
					className="flex justify-center items-center">
					{open ? (
						<span>
							{"Hide Teams"} <ArrowUp className="inline mx-1" />
						</span>
					) : (
						<span>
							{"Select Team"} <ArrowDown className="inline mx-1" />
						</span>
					)}
				</Button>
			</div>

			<div
				className={`transition-all duration-300 ${
					open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
				} overflow-hidden`}>
				<div className="p-4 grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-7 xl:grid-cols-10 gap-2">
					{EPL_TEAMS.filter((team) => teams[team.name]).map((team) => (
						<Card
							key={team.slug}
							onClick={() => handleSelect(team)}
							className="cursor-pointer hover:scale-105 transition-transform rounded-xl shadow-lg dark:bg-gradient-to-tr dark:from-gray-950 dark:to-stone-900 bg-gradient-to-tr from-gray-300 to-stone-200">
							<CardContent className="flex flex-col items-center justify-center p-4">
								<Image
									src={team.logo}
									alt={team.name}
									className="object-contain"
									width={80}
									height={80}
								/>
								<p className="font-semibold text-center text-xs sm:text-sm text-foreground/80">
									{team.name}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export default TeamSelect;
