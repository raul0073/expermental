"use client";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	useSidebar
} from "@/components/ui/sidebar";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PlayerSidebarSheet } from "./player/player.sidebar";
import { ZoneSidebar } from "./zones/zone.sidebar";

export function AppSidebar() {
	const player = useSelector(
		(state: RootState) => state.selectedPlayer.selected
	);
	const zone = useSelector((state: RootState) => state.selectedZone);
	const { setOpen } = useSidebar();

	useEffect(() => {
		if (player && !zone.selected) {
			setOpen(true);
		} else if (!player && zone.selected) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [player?.id, zone.selected, setOpen, player]);
	useEffect(() => {
		
		const shouldOpen = !!player || !!zone.selected;
		setOpen(shouldOpen);
	}, [player, zone.selected, setOpen]);
	return (
		<Sidebar>
	<SidebarHeader />
	<SidebarContent className="px-2 overflow-hidden">
		{player ? (
			<PlayerSidebarSheet playerSelected={player} />
		) : zone.selected ? (
			<ZoneSidebar selectedZone={zone} />
		) : null}
	</SidebarContent>
	<SidebarFooter />
</Sidebar>
	);
}
