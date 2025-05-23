"use client";

import { RoleSelector } from "@/app/(main)/editor/player/components/PlayerEditorRolesSelector";
import { ZoneEditorSidebar } from "@/app/(main)/editor/zone/components/ZoneEditorSidebar";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	useSidebar,
} from "@/components/ui/sidebar";
import { RootState } from "@/lib/store";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerSidebarSheet } from "./player/player.sidebar";
import AboutSidebar from "./root/about/AboutSidebar";
import { ZoneSidebar } from "./zones/zone.sidebar";

export function AppSidebar() {
	const dispatch = useDispatch();
	const player = useSelector((s: RootState) => s.selectedPlayer.selected);
	const zone = useSelector((s: RootState) => s.selectedZone.selected);
	const isZoneEditing = useSelector(
		(state: RootState) => state.zoneEditor.active
	);
	const isPlayerEditing = useSelector(
		(state: RootState) => state.playerEditor.active
	);
	const path = usePathname();
	const isZoneEditorRoute = path.includes("zone");
	const isPlayerEditorRoute = path.includes("player");
	const isEditorHome = path === "/editor";

	const { open, toggleSidebar } = useSidebar();

	useEffect(() => {}, [open, dispatch]);

	return (
		<Sidebar>
			<SidebarHeader className="mt-8">
				<div className="absolute right-4 top-14">
					<button
						aria-label="Toggle sidebar"
						onClick={toggleSidebar}
						className="p-1 rounded">
						<X size={16} />
					</button>
				</div>
			</SidebarHeader>
			<SidebarContent className="px-2 overflow-hidden">
				<Suspense
					key={
						player
							? `player-${player.name}`
							: zone
							? `zone-${zone.id}`
							: isZoneEditorRoute
							? "zone-editor"
							: isPlayerEditorRoute
							? `player-editor`
							: "empty"
					}>
					{player ? (
						<PlayerSidebarSheet playerSelected={player} />
					) : zone ? (
						<ZoneSidebar selectedZone={{ selected: zone }} />
					) : isZoneEditorRoute && isZoneEditing ? (
						<ZoneEditorSidebar />
					) : isPlayerEditing && isPlayerEditorRoute ? (
						<RoleSelector />
					) : isEditorHome ? (
						<AboutSidebar />
					) : (
						<div className="text-muted-foreground text-center text-sm p-6">
							Select a <strong>player</strong> or a <strong>zone</strong> for
							more info.
						</div>
					)}
				</Suspense>
			</SidebarContent>

			<SidebarFooter />
		</Sidebar>
	);
}
