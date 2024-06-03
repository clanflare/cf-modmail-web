"use client";

import { useMainSidebar } from "./hook";
import { SolidBtn } from "@/components/elements";
import { Power } from "lucide-react";

const MainSidebar = () => {
	const { isSidebarOpen } = useMainSidebar();

	return (
		<>
			{isSidebarOpen && (
				<div className="w-64 h-screen fixed top-0 left-0 z-10 bg-card dark:bg-dark-card border-r border-dashed border-foreground/20 dark:border-dark-foreground/20 flex flex-col px-4 py-2">
					<div className="w-full flex-1 flex flex-col"></div>

					<SolidBtn
						title="Logout"
						className="mb-2"
						titleClassName="text-destructive dark:text-destructive"
						LeftIcon={Power}
						leftIconClassName="text-destructive dark:text-destructive mr-2"
					/>

					<SolidBtn
						title="Logout"
						className="bg-destructive/20 dark:bg-destructive/20 hover:bg-destructive/30 dark:hover:dark:bg-destructive/30 border border-destructive"
						titleClassName="text-destructive dark:text-destructive"
						LeftIcon={Power}
						leftIconClassName="text-destructive dark:text-destructive mr-2"
					/>
				</div>
			)}
		</>
	);
};

export default MainSidebar;
