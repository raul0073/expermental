
import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ZonesConfig, ZoneConfig } from "../Types/Zones.Types";
export interface ZoneEditorState {
  active: boolean;
  selectedZoneId: string | null;
  zones_config: ZonesConfig;
  initial_config: ZonesConfig | null;
}

const initialState: ZoneEditorState = {
  active: false,
  selectedZoneId: null,
  zones_config: { zone_config: {}, zone_scalers: {}, zone_players: {} },
  initial_config: null,
};

const zoneEditorSlice = createSlice({
  name: "zoneEditor",
  initialState,
  reducers: {
    setSelectedZoneId(state, action: PayloadAction<string>) {
      state.selectedZoneId = action.payload;
    },
    setActive(state, action: PayloadAction<boolean>) {
      state.active = action.payload;
    },
	setUserZoneConfig(state, action: PayloadAction<ZonesConfig>) {
		state.zones_config = action.payload;
		state.initial_config = structuredClone(action.payload); 
	  },

    setZoneConfig(
      state,
      action: PayloadAction<Record<string, ZoneConfig>>
    ) {
      state.zones_config.zone_config = action.payload;
    },

    setZoneScalers(
      state,
      action: PayloadAction<Record<string, Record<string, number>>>
    ) {
      state.zones_config.zone_scalers = action.payload;
    },

    updateZoneConfigEntry(
      state,
      action: PayloadAction<{
        zoneId: string;
        data: Partial<ZoneConfig>;
      }>
    ) {
      const { zoneId, data } = action.payload;
      
      const prev = state.zones_config.zone_config[zoneId] || {};
      state.zones_config.zone_config[zoneId] = {
        ...prev,
        ...data,
      };
      if (!state.zones_config.zone_scalers) {
        state.zones_config.zone_scalers = {};
      }
      if (!state.zones_config.zone_scalers[zoneId]) {
        state.zones_config.zone_scalers[zoneId] = {};
      }
    
    },

	updateZonePosition(
		state,
		action: PayloadAction<{ zoneId: string; role: string; weight?: number }>
	  ) {
		const { zoneId, role, weight } = action.payload;
		const zone = state.zones_config.zone_config[zoneId];
		if (!zone) return;
	  
		// remove when weight is undefined or null
		if (weight == null) {
		  delete zone.positions[role];
		} else {
		  zone.positions = {
			...zone.positions,
			[role]: weight,
		  };
		}
	  },

    removeStatKey(
      state,
      action: PayloadAction<{
        zoneId: string;
        type: "pros" | "cons";
        source: "team" | "against";
        category: string;
        key: string;
      }>
    ) {
      const { zoneId, type, source, category, key } = action.payload;
      const group =
        state.zones_config.zone_config[zoneId]?.[type]?.[source];

      if (group && group[category]) {
        group[category] = group[category].filter((k) => k !== key);
      }
    },
	clearAll(state) {
		state.zones_config = { zone_config: {}, zone_scalers: {}, zone_players: {} };
	  },
	  resetToInitial(state) {
		if (state.initial_config) {
		  state.zones_config = state.initial_config;
		}
	  },
	  clearZone(
		state,
		action: PayloadAction<{ zoneId: string }>
	  ) {
		const { zoneId } = action.payload;
	
		delete state.zones_config.zone_config[zoneId];
		delete state.zones_config.zone_scalers[zoneId];
		delete state.zones_config.zone_players[zoneId];

	  },
    updateScaler: (
      state,
      action: PayloadAction<{ zoneId: string; key: string; value: number }>
    ) => {
      const { zoneId, key, value } = action.payload;
      // ensure there's at least an empty object
      const prev = state.zones_config.zone_scalers[zoneId] || {};
      state.zones_config.zone_scalers = {
        ...state.zones_config.zone_scalers,
        [zoneId]: {
          ...prev,
          [key]: value,
        },
      }
    }
  }
});

export const {
  setSelectedZoneId,
  setActive,
  clearAll,
  resetToInitial, 
  setUserZoneConfig,
  setZoneConfig,
  setZoneScalers,
  clearZone,
  updateZoneConfigEntry,
  updateZonePosition,
  removeStatKey,
  updateScaler,
} = zoneEditorSlice.actions;

export default zoneEditorSlice.reducer;
