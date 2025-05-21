"use client";
import About from "@/components/root/about/About";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { setActive } from "@/lib/features/ZoneEditorSlice";
import { setActive  as playerEditorActive} from "@/lib/features/PlayerConfigEditorSlice";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { clearSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";
import { clearSelectedZone } from "@/lib/features/SelectedZoneSlice";
import { useDispatch } from "react-redux";

function Page() {
	const { setOpen } = useSidebar();
	const dispatch = useDispatch()
	useEffect(() => {
		setOpen(false)
		dispatch(setActive(false))
		dispatch(clearSelectedPlayer())
		dispatch(clearSelectedZone())
		dispatch(playerEditorActive(false))
	}, []);
	return (
		<section className="editor-home pt-12 sm:pl-12">
			<div className="w-full flex flex-col justify-center items-center sm:flex-row gap-6">
				<Link href={"/editor/player"} className="w-fit flex items-center ">
					<Button variant={"outline"} className="py-8 px-12">
						Player Config Editor
						<ArrowRight />
					</Button>
				</Link>
				<Link href={"/editor/zone"} className="w-fit flex items-center ">
					<Button variant={"outline"} className="py-8 px-12">
						Zones Config Editor
						<ArrowRight />
					</Button>
				</Link>
			</div>
			<About />
		</section>
	);
}

export default Page;
