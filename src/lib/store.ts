import { configureStore } from '@reduxjs/toolkit'
import selectedPlayerReducer from "@/lib/features/SelectedPlayerSlice";
import selectedZoneReducer from "@/lib/features/SelectedZoneSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      selectedPlayer: selectedPlayerReducer,
      selectedZone: selectedZoneReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']