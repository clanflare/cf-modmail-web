import { useSidebarStateStore } from "@/store";

export const useMainNavbar = () => {
	const { toggleSidebarState } = useSidebarStateStore();

	return {
		toggleSidebarState,
	};
};
