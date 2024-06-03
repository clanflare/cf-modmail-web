import { useSidebarStateStore, useThemeStore } from "@/store";

export const useMainSidebar = () => {
	const { isSidebarOpen } = useSidebarStateStore();
	const { theme, toggleTheme } = useThemeStore();

	return {
		isSidebarOpen,
		theme,
		toggleTheme,
	};
};
