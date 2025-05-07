
import { Player } from "@/components/player/player.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type SelectedPlayerState = {
  selected: Player | null;
};

const initialState: SelectedPlayerState = {
  selected: null,
};

export const selectedPlayerSlice = createSlice({
  name: "selectedPlayer",
  initialState,
  reducers: {
    setSelectedPlayer: (state, action: PayloadAction<Player>) => {
      state.selected = action.payload;
    },
    clearSelectedPlayer: (state) => {
      state.selected = null;
    },
  },
});

export const { setSelectedPlayer, clearSelectedPlayer } = selectedPlayerSlice.actions;
export default selectedPlayerSlice.reducer;
