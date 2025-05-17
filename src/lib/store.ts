import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import selectedPlayerReducer from '@/lib/features/SelectedPlayerSlice';
import selectedZoneReducer from '@/lib/features/SelectedZoneSlice';
import userConfigReducer from '@/lib/features/UserConfigSliceSlice';
import teamReducer from '@/lib/features/TeamSlice';
import zoneReducer from '@/lib/features/ZoneEditorSlice';
import playerConfigReducer from '@/lib/features/PlayerConfigEditorSlice';

// Combine reducers
const rootReducer = combineReducers({
	selectedPlayer: selectedPlayerReducer,
	selectedZone: selectedZoneReducer,
	userConfig: userConfigReducer,
	team: teamReducer,
	zoneEditor: zoneReducer,
	playerEditor: playerConfigReducer
});

// Persist config
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['userConfig', 'selectedPlayer', 'selectedZone', 'zoneEditor'],
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create one single store instance
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// Single shared persistor
export const persistor = persistStore(store);

// Types
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

