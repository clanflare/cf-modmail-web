"use client";

import { Menu } from "lucide-react";
import { useMainNavbar } from "@/components/common/main-navbar/hook";

const MainNavbar = () => {
	const { toggleSidebarState } = useMainNavbar();

	return (
		<nav className="w-full fixed top-0 left-0 flex items-center px-5 py-4 bg-background dark:bg-dark-background z-20">
			<button
				className="flex items-center justify-center text-foreground dark:text-dark-foreground"
				aria-label="toggle sidebar"
				onClick={() => toggleSidebarState()}
			>
				<Menu size={23} />
			</button>
		</nav>
	);
};

export default MainNavbar;
