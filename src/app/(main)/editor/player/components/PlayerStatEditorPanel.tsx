"use client";

import type { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { RoleSelector } from "./PlayerEditorRolesSelector";
import PlayerEditorToolbar from "./PlayerEditorToolbar";
import { PlayerStatGroupEditor } from "./PlayerStatGroupEditor";
import { StatsLabelsBankPlayer } from "./StatsLabelsBank";
import ZoneEditorDndProvider from "../../zone/components/ZoneEditorProvider";
import { useSidebar } from "@/components/ui/sidebar";

function PlayerStatEditorPanel() {
	const playerEditor = useSelector((state: RootState) => state.playerEditor);
	const activeRole = playerEditor.activeRole;
	const {open} = useSidebar()
	return (
		<ZoneEditorDndProvider>
			<div className="mb-4">
			<div className={`${open ? 'hidden' : ''}`}>
			<RoleSelector />
			</div>
				<div className="w-full my-4 justify-center flex">
				<StatsLabelsBankPlayer />
					
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<PlayerStatGroupEditor category="pros"  />
					<PlayerStatGroupEditor category="cons" />
					<PlayerStatGroupEditor category="important" />
				</div>
                <div className="my-4">
                    <PlayerEditorToolbar activeRole={activeRole} />
                </div>
			</div>
		</ZoneEditorDndProvider>
	);
}

export default PlayerStatEditorPanel;
