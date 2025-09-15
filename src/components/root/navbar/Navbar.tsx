"use client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { SiGoogledocs } from "react-icons/si";
import { ModeToggle } from "../../ui/theme-switcher";
import Logo from "../logo/Logo";
function Navbar() {
	return (
		<section className="navigation fixed top-0 left-0 w-full z-40 border bg-background">
			<div className="px-6 py-2  mx-auto flex justify-between items-center">
				<Logo size="small" />
				<div className="flex gap-4 items-center">
					<h2 className="hidden sm:flex font-default text-muted-foreground text-xs sm:text-sm">
						24-25 Season Visualization
					</h2>
					<DocsIcon />
					<ModeToggle />
				</div>
			</div>
		</section>
	);
}

export default Navbar;



export const DocsIcon = () => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Link href="/docs" className="group flex flex-col">
						<SiGoogledocs className="text-muted-foreground group-hover:text-white/80" /></Link>
				</TooltipTrigger>
				<TooltipContent>
					What am I seeing? Go to docs
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
