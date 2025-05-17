
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamTypeInit } from "../Types/Team.Type";

export interface UserConfig {
	team: TeamTypeInit | null;
	userId: string | null;
}

const initialState: UserConfig = {
	team: null,
	userId: null,
};

const userConfigSlice = createSlice({
	name: "userConfig",
	initialState,
	reducers: {
		setUserTeam(state, action: PayloadAction<TeamTypeInit>) {
			state.team = action.payload;
		},
		setUserId(state, action: PayloadAction<string>) {
			state.userId = action.payload;
		},
	},
});

export const { setUserTeam, setUserId } = userConfigSlice.actions;
export default userConfigSlice.reducer;
