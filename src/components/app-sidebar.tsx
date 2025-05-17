"use client";

import { ZoneEditorSidebar } from "@/app/(main)/editor/components/ZoneEditorSidebar";
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
import { ZoneSidebar } from "./zones/zone.sidebar";

export function AppSidebar() {
  const dispatch = useDispatch();
  const player = useSelector((s: RootState) => s.selectedPlayer.selected);
  const zone   = useSelector((s: RootState) => s.selectedZone.selected);
  const path = usePathname()
  const isEditorRoute = path.includes("editor") && !path.includes("player");


  const { open, toggleSidebar } = useSidebar();

  useEffect(() => {

  }, [open, dispatch]);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-4">
          <span className="font-semibold uppercase text-sm">Menu</span>
          <button
            aria-label="Toggle sidebar"
            onClick={toggleSidebar}
            className="p-1 hover:bg-gray-200 rounded"
          >
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
              : isEditorRoute
              ? "zone-editor"
              : "empty"
          }
        >
          {player ? (
            <PlayerSidebarSheet playerSelected={player} />
          ) : zone ? (
            <ZoneSidebar selectedZone={{ selected: zone }} />
          ) : isEditorRoute ? (
            <ZoneEditorSidebar />
          ) : null}
        </Suspense>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
