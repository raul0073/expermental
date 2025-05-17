'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/lib/store';
import { LoadingSpinner } from '@/components/root/loading/Loading';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate loading={<LoadingSpinner />} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}
