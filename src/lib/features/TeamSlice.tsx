
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamModel } from "../Types/Team.Type";
import { fetchAllTeamsFromDB } from "@/app/services/team.service";

interface TeamState {
  [teamName: string]: TeamModel;
}

const initialState: TeamState = {};

export const fetchAllTeams = createAsyncThunk(
  "team/fetchAll",
  async () => await fetchAllTeamsFromDB()
);

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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTeams.fulfilled, (state, action) => {
      for (const team of action.payload) {
        state[team.name] = team;
      }
    });
  },
});

export const { setTeam, removeTeam, clearTeams } = teamSlice.actions;
export default teamSlice.reducer;
