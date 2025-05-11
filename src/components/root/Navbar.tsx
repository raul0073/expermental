"use client";
import ScraperSvgComp from "@/app/assets/svgs/ScraperSvgComp";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { ModeToggle } from "../ui/theme-switcher";

function Navbar() {
	const userTeam = useSelector((state: RootState) => state.userConfig.team);
	return (
		<section className="navigation fixed top-0 left-0 w-full z-40 border bg-background">
			<div className="px-4 py-2  mx-auto flex justify-between items-center">
				<div className="logo text-2xl font-default flex items-center">
					<span className="font-thin tracking-tighter">experi</span>
					<span className="font-semi-bold tracking-tight">mental</span>
					<ScraperSvgComp className="inline mb-2 fill-emerald-700 stroke-black stroke-2" />
				</div>
				<div className="flex gap-4 items-center">
					<h2 className="font-default text-muted-foreground text-xs sm:text-sm">
						{userTeam?.name} Season Visualization
					</h2>
					<ModeToggle />
				</div>
			</div>
		</section>
	);
}

export default Navbar;
