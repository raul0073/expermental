// features/UserConfigSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamTypeInit } from "../Types/Team.Type";
import { EPL_TEAMS } from "@/components/team-select/teams-data";

export interface UserConfig {
	team: TeamTypeInit;
}

const DEFAULT_TEAM = EPL_TEAMS.find(team => team.slug === "arsenal")!; 

const initialState: UserConfig = {
	team: DEFAULT_TEAM,
};

const userConfigSlice = createSlice({
	name: "userConfig",
	initialState,
	reducers: {
		setUserTeam(state, action: PayloadAction<TeamTypeInit>) {
			state.team = action.payload;
		},
	},
});

export const { setUserTeam } = userConfigSlice.actions;
export default userConfigSlice.reducer;
