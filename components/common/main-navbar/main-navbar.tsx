"use client";

import { Menu } from "lucide-react";

const MainNavbar = () => {
	return (
		<nav className="w-full fixed top-0 left-0 flex items-center px-5 py-4 bg-background dark:bg-dark-background">
			<button
				className="flex items-center justify-center text-foreground dark:text-dark-foreground"
				aria-label="toggle sidebar"
			>
				<Menu size={23} />
			</button>
		</nav>
	);
};

export default MainNavbar;
