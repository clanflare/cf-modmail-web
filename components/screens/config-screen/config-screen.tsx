"use client";

import { twMerge } from "tailwind-merge";
import { useConfigScreen } from "./hook";

const ConfigScreen = () => {
	const { isSidebarOpen } = useConfigScreen();

	return (
		<main
			className={twMerge(
				`h-screen w-full flex flex-col bg-primary-dark pt-16 px-5`,
				isSidebarOpen ? "md:pl-64" : "",
			)}
		></main>
	);
};

export default ConfigScreen;
