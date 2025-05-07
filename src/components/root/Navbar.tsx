import ScraperSvgComp from "@/app/assets/svgs/ScraperSvgComp";
import { ModeToggle } from "../ui/theme-switcher";

function Navbar() {
	return (
		<section className="navigation fixed top-0 left-0 w-full z-40 border bg-background">
			<div className="container py-2  mx-auto flex justify-between items-center">
				<div className="logo text-2xl font-default flex items-center">
					<span className="font-thin tracking-tighter">experi</span>
					<span className="font-extrabold tracking-tight">mental</span>
					<ScraperSvgComp className="inline mb-2 fill-emerald-700 stroke-black stroke-2" />
				</div>
				<div className="flex gap-4 items-center">
					<h2 className="font-default">Arsenal Season Visualization</h2>
          <ModeToggle />
				</div>
			</div>
		</section>
	);
}

export default Navbar;
