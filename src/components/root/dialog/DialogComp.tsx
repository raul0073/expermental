"use client";
import { analyzeTeam } from "@/app/services/team.service";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/lib/store";
import { Cog } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { LoadingSpinner } from "../loading/Loading";

function AnalyzeTeamDialogComp() {
	const [loading, setLoading] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState<string | undefined>(
		undefined
	);
	const teams = useSelector((s: RootState) => s.team);
	const user_id = useSelector((s: RootState) => s.userConfig.userId);
	const teams_names = Object.values(teams).map((item) => item.name);
	
	async function runAnalysis() {
        if (!selectedTeam) {
			toast( "Please select a team before running analysis." );
			return;
		}
        if (!user_id) {
			toast("No user ID was provided." );
			return;
		}
		try {
			setLoading(true);
			await analyzeTeam({
				team_name: selectedTeam,
				user_id,
			});

			toast.success(
				"Analysis complete", {
				description: `Successfully analyzed ${teams[selectedTeam].name}`,});

		} catch (error) {
			toast.error("Failed to analyze team");
            console.error(error)
		} finally {
			setLoading(false);
		}
	}
    if(loading) return <LoadingSpinner />
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="px-4 py-2 border rounded">
					Run team analysis with config
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Select a team to run analysis on</DialogTitle>
					<DialogDescription>
						This will trigger a fresh analysis with the current config.
					</DialogDescription>
				</DialogHeader>
				<Select onValueChange={(v) => setSelectedTeam(v)}>
					<SelectTrigger>
						<SelectValue placeholder="Choose a team" />
					</SelectTrigger>
					<SelectContent>
						{teams_names.length > 0 &&
							teams_names.map((t: string, indx: number) => {
								return (
									<SelectItem key={indx} value={t}>
										{t}
									</SelectItem>
								);
							})}
					</SelectContent>
				</Select>
				<div className="w-full flex justify-center items-center mt-6">
					<Button disabled={selectedTeam ? false : true} onClick={runAnalysis}>Run Anlaysis <Cog className="inline"/></Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default AnalyzeTeamDialogComp;
