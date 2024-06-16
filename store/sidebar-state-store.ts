import { create } from "zustand";

interface SidebarStateStore {
	isSidebarOpen: boolean;
	toggleSidebarState: () => void;
}

export const useSidebarStateStore = create<SidebarStateStore>()((set) => ({
	isSidebarOpen: false,
	toggleSidebarState: () =>
		set((prev) => ({
			isSidebarOpen: !prev.isSidebarOpen,
		})),
}));
