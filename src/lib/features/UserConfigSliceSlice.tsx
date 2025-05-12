
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamTypeInit } from "../Types/Team.Type";

export interface UserConfig {
	team: TeamTypeInit | null;
}


const initialState: UserConfig = {
	team: null,
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
