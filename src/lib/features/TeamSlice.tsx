import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamModel } from "../Types/Team.Type";

interface TeamState {
  [teamName: string]: TeamModel;
}

const initialState: TeamState = {};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam(state, action: PayloadAction<TeamModel>) {
      const teamName = action.payload.name;
      if (!state[teamName]) {
        state[teamName] = action.payload;
      }
    },
    removeTeam(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },
    clearTeams() {
      return {};
    }
  }
});

export const { setTeam, removeTeam, clearTeams } = teamSlice.actions;
export default teamSlice.reducer;
