import { useSidebarStateStore } from "@/store";

export const useMainSidebar = () => {
	const { isSidebarOpen } = useSidebarStateStore();

	return {
		isSidebarOpen,
	};
};
