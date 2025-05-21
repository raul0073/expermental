import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()



import { useEffect, useState } from "react";

export function useWindowSize() {
	const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight]);

	useEffect(() => {
		const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return size;
}