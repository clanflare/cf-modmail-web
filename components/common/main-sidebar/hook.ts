import { useSidebarStateStore, useThemeStore } from "@/store";
import { usePathname } from "next/navigation";

export const useMainSidebar = () => {
	const { isSidebarOpen } = useSidebarStateStore();
	const { theme, toggleTheme } = useThemeStore();
	const currentPathname = usePathname();

	return {
		isSidebarOpen,
		theme,
		toggleTheme,
		currentPathname,
	};
};
