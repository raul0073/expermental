import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, PlayersConfig, ScoreConfig, ScoreWeights } from "../Types/PlayerConfig.Type";

interface EditorState {
  activeRole: keyof ScoreConfig;
  draftConfig: PlayersConfig;
  weights: ScoreWeights;
  initial_config: PlayersConfig;
  dirty: boolean;
}

const initialState: EditorState = {
  activeRole: "GK",
  draftConfig: {
    score_config: {
      GK: { pros: {}, cons: {}, important: {} },
      DEF: { pros: {}, cons: {}, important: {} },
      MID: { pros: {}, cons: {}, important: {} },
      FWD: { pros: {}, cons: {}, important: {} },
    },
    score_weights: { pros: 1, cons: -1, important: 2 },
  } as PlayersConfig,
  initial_config: {} as PlayersConfig,
  weights: { pros: 1, cons: -1, important: 2 },
  dirty: false,
};

export const scoreConfigEditorSlice = createSlice({
  name: "scoreConfigEditor",
  initialState,
  reducers: {
    setActiveRole(state, action: PayloadAction<keyof ScoreConfig>) {
      state.activeRole = action.payload;
    },
    setInitPlayerConfig(state, action: PayloadAction<PlayersConfig>) {
      state.initial_config = action.payload;
    },
    addStat(
      state,
      action: PayloadAction<{
        role: keyof ScoreConfig;
        category: Category;
        statType: string;
        key: string;
      }>
    ) {
      const { role, category, statType, key } = action.payload;
    
      // Defensive create
      if (!state.draftConfig.score_config[role]) {
        state.draftConfig.score_config[role] = { pros: {}, cons: {}, important: {} };
      }
    
      if (!state.draftConfig.score_config[role][category]) {
        state.draftConfig.score_config[role][category] = {};
      }
    
      if (!state.draftConfig.score_config[role][category][statType]) {
        state.draftConfig.score_config[role][category][statType] = [];
      }
    
      const group = state.draftConfig.score_config[role][category][statType];
      if (!group.includes(key)) {
        group.push(key);
        state.dirty = true;
      }
    },
    removeStat(
      state,
      action: PayloadAction<{
        role: keyof ScoreConfig;
        category: Category;
        statType: string;
        key: string;
      }>
    ) {
      const { role, category, statType, key } = action.payload;
      const group = state.draftConfig.score_config[role][category][statType] ?? [];
    
      const filtered = group.filter((k) => k !== key);
    
      if (filtered.length === 0) {
        delete state.draftConfig.score_config[role][category][statType];
      } else {
        state.draftConfig.score_config[role][category][statType] = filtered;
      }
    
      state.dirty = true;
    },
    setWeight(
      state,
      action: PayloadAction<{ category: Category; value: number }>
    ) {
      state.weights[action.payload.category] = action.payload.value;
      state.dirty = true;
    },
    setDraft(state, action: PayloadAction<PlayersConfig>) {
      state.draftConfig = action.payload;
      state.weights = action.payload.score_weights;
      state.dirty = false;
    },
    markSaved(state) {
      state.dirty = false;
    },
  },
});

export const {
  setActiveRole,
  addStat,
  removeStat,
  setWeight,
  setDraft,
  markSaved,
  setInitPlayerConfig
} = scoreConfigEditorSlice.actions;

export default scoreConfigEditorSlice.reducer;
