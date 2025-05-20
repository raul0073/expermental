import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChartType = "pizza" | "radar";

interface ChartImages {
  pizza?: string;
  radar?: string;
}

interface PlayersPlotsState {
  [player_name: string]: ChartImages;
}

const initialState: PlayersPlotsState = {};

export const playersPlottingChartSlice = createSlice({
  name: "playersPlottingChart",
  initialState,
  reducers: {
    setPlayerChart(
      state,
      action: PayloadAction<{
        player_name: string;
        chart_type: ChartType;
        image: string;
      }>
    ) {
      const { player_name, chart_type, image } = action.payload;
      if (!state[player_name]) {
        state[player_name] = {};
      }
      state[player_name][chart_type] = image;
    },
    clearPlayerCharts(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },
    clearAllCharts() {
      return {};
    },
  },
});

export const {
  setPlayerChart,
  clearPlayerCharts,
  clearAllCharts,
} = playersPlottingChartSlice.actions;

export default playersPlottingChartSlice.reducer;
