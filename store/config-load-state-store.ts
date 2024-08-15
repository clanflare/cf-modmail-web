import { create } from "zustand";

interface ConfigLoadStateStore {
	isConfigLoaded: boolean;
	setIsConfigLoaded: (newState?: boolean) => void;
}

export const useConfigLoadStateStore = create<ConfigLoadStateStore>()(
	(set) => ({
		isConfigLoaded: false,
		setIsConfigLoaded: (newState) =>
			set((prev) => ({
				isConfigLoaded: newState === undefined ? !prev : newState,
			})),
	}),
);
