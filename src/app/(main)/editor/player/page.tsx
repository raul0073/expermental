"use client";

import { loadPlayerEditorConfig } from "@/app/services/config.service";
import { setActive, setDraft, setInitPlayerConfig } from "@/lib/features/PlayerConfigEditorSlice";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerStatEditorPanel from "./components/PlayerStatEditorPanel";

export default function PlayerEditorPage() {
	const dispatch = useDispatch();
	const pos = useSelector((state: RootState) => state.playerEditor.activeRole);
	async function loadUserConfig() {
		try {
			const user_id = "anon_test_user_001";
			const data = await loadPlayerEditorConfig(user_id);
			if (data) {
				dispatch(setDraft(data?.players_config));
				dispatch(setInitPlayerConfig(data?.players_config));
			}
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		loadUserConfig();
		dispatch(setActive(true))
	}, []);
	return (
		<div className="flex h-full">
			<div className="flex-1 py-6 px-2">
				<header className="py-2">
					<h2 className="text-2xl font-bold">Player Config Editor</h2>
					<p className="text-muted-foreground text-sm">
						Editing pos: <code>{pos}</code>
					</p>
				</header>
				<PlayerStatEditorPanel />
			</div>
		</div>
	);
}
