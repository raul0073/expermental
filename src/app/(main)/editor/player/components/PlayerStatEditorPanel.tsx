"use client";

import type { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import ZoneEditorDndProvider from "../../components/ZoneEditorProvider";
import { RoleSelector } from "./PlayerEditorRolesSelector";
import PlayerEditorToolbar from "./PlayerEditorToolbar";
import { PlayerStatGroupEditor } from "./PlayerStatGroupEditor";
import { StatsLabelsBankPlayer } from "./StatsLabelsBank";

function PlayerStatEditorPanel() {
	const playerEditor = useSelector((state: RootState) => state.playerEditor);
	const activeRole = playerEditor.activeRole;
    console.log(activeRole);
	return (
		<ZoneEditorDndProvider>
			<div className="mb-4">
			<RoleSelector />
				<div className="w-full my-4 justify-center flex">
				<StatsLabelsBankPlayer />
					
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<PlayerStatGroupEditor category="pros"  />
					<PlayerStatGroupEditor category="cons" />
					<PlayerStatGroupEditor category="important" />
				</div>
                <div className="my-4">
                    <PlayerEditorToolbar />
                </div>
			</div>
		</ZoneEditorDndProvider>
	);
}

export default PlayerStatEditorPanel;
