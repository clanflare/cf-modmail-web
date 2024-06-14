import { useSidebarStateStore } from "@/store";

export const useConfigScreen = () => {
	const { isSidebarOpen } = useSidebarStateStore();

	return {
		isSidebarOpen,
	};
};
