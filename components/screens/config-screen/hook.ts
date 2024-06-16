import { useMessageConfigStore, useSidebarStateStore } from "@/store";

export const useConfigScreen = () => {
	const { isSidebarOpen } = useSidebarStateStore();
	const { messageConfigs } = useMessageConfigStore();

	return {
		isSidebarOpen,
		rootMessage: messageConfigs.get("root"),
	};
};
