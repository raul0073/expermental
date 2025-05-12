"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	useSidebar,
} from "@/components/ui/sidebar";
import { RootState } from "@/lib/store";
import { Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerSidebarSheet } from "./player/player.sidebar";
import { ZoneSidebar } from "./zones/zone.sidebar";
import { clearSelectedPlayer } from "@/lib/features/SelectedPlayerSlice";
import { clearSelectedZone } from "@/lib/features/SelectedZoneSlice";

export function AppSidebar() {
	const player = useSelector(
		(state: RootState) => state.selectedPlayer.selected
	);
	const zone = useSelector((state: RootState) => state.selectedZone.selected);
	const { open, setOpen } = useSidebar();
	const dispatch = useDispatch();
	const previousType = useRef<"player" | "zone" | null>(null);
	const prevOpen = useRef(open);


	useEffect(() => {
		const hasPlayer = !!player;
		const hasZone = !!zone;

		// Determine which type is now active
		const newType = hasPlayer ? "player" : hasZone ? "zone" : null;

		// If switching between player <-> zone, softly reopen
		if (
			open &&
			newType &&
			previousType.current &&
			previousType.current !== newType
		) {
			setOpen(false);
			const timeout = setTimeout(() => {
				setOpen(true);
			}, 150);
			return () => clearTimeout(timeout);
		}

		// Set sidebar open when either selected
		if (newType && !open) {
			setOpen(true);
		}

		// Close sidebar if nothing selected
		if (!hasPlayer && !hasZone) {
			setOpen(false);
		}

		previousType.current = newType;
	}, [player, zone, open, setOpen]);
	useEffect(() => {
		if (prevOpen.current && !open) {
		  dispatch(clearSelectedPlayer());
		  dispatch(clearSelectedZone());
		}
		prevOpen.current = open;
	  }, [open, dispatch]);
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent className="px-2 overflow-hidden">
				<Suspense
					key={
						player
							? `player-${player.name}`
							: zone
							? `zone-${zone.id}`
							: "empty"
					}>
					{player ? (
						<PlayerSidebarSheet playerSelected={player} />
					) : zone ? (
						<ZoneSidebar selectedZone={{ selected: zone }} />
					) : null}
				</Suspense>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
