
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ZoneState = {
    selected: {
      id: string;
      label: string;
    } | null;
  };
  
  const initialState: ZoneState = {
    selected: null,
  };
  
  export const selectedZoneSlice = createSlice({
    name: "selectedZone",
    initialState,
    reducers: {
      setSelectedZone: (
        state,
        action: PayloadAction<{ id: string; label: string }>
      ) => {
        state.selected = action.payload;
      },
      clearSelectedZone: (state) => {
        state.selected = null;
      },
    },
  });
  
  export const { setSelectedZone, clearSelectedZone } = selectedZoneSlice.actions;
  export default selectedZoneSlice.reducer;
  