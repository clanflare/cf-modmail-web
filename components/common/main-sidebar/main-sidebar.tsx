"use client";

import { useMainSidebar } from "./hook";

const MainSidebar = () => {
	const { isSidebarOpen } = useMainSidebar();

	return (
		<>
			{isSidebarOpen && (
				<div className="w-64 h-screen fixed top-0 left-0 z-10 bg-card dark:bg-dark-card border-r border-dashed border-foreground/20 dark:border-dark-foreground/20 flex flex-col">
					<div className="w-full flex-1 flex flex-col"></div>
				</div>
			)}
		</>
	);
};

export default MainSidebar;
