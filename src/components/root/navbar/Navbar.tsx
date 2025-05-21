"use client";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { ModeToggle } from "../../ui/theme-switcher";
import Logo from "../logo/Logo";

function Navbar() {
	const userTeam = useSelector((state: RootState) => state.userConfig.team);
	return (
		<section className="navigation fixed top-0 left-0 w-full z-40 border bg-background">
			<div className="px-6 py-2  mx-auto flex justify-between items-center">
				<Logo size="small" />
				<div className="flex gap-4 items-center">
					<h2 className="hidden sm:flex font-default text-muted-foreground text-xs sm:text-sm">
						{userTeam?.name} Season Visualization
					</h2>
					<ModeToggle />
				</div>
			</div>
		</section>
	);
}

export default Navbar;
