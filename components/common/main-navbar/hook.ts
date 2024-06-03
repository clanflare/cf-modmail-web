import { useSidebarStateStore } from "@/store";
import { useEffect } from "react";

export const useMainNavbar = () => {
	const { isSidebarOpen, toggleSidebarState } = useSidebarStateStore();

	useEffect(() => {
		console.log(isSidebarOpen);
	}, [isSidebarOpen]);

	return {
		toggleSidebarState,
	};
};
