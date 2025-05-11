import { ChannelZone } from "@/components/zones/zones.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ZoneState = {
  selected: (ChannelZone & {
    rating: number;
    //eslint-disable-next-line
    players: any[];
    //eslint-disable-next-line
    team: Record<string, any>;
  }) | null;
};

const initialState: ZoneState = {
  selected: null,
};

export const selectedZoneSlice = createSlice({
  name: "selectedZone",
  initialState,
  reducers: {
    setSelectedZone: (state, action: PayloadAction<ZoneState["selected"]>) => {
      state.selected = action.payload;
    },
    clearSelectedZone: (state) => {
      state.selected = null;
    },
  },
});

export const { setSelectedZone, clearSelectedZone } = selectedZoneSlice.actions;
export default selectedZoneSlice.reducer;
