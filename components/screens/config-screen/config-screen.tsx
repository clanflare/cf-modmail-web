"use client";

import { twMerge } from "tailwind-merge";
import { useConfigScreen } from "./hook";
import { CommonHeader } from "@/components/common";
import { SaveIcon } from "lucide-react";

const ConfigScreen = () => {
	const { isSidebarOpen } = useConfigScreen();

	return (
		<main
			className={twMerge(
				`h-screen w-full flex flex-col bg-primary-dark pt-16 px-5`,
				isSidebarOpen ? "md:pl-64" : "",
			)}
		>
			<CommonHeader
				title="Modmail Config"
				button
				buttonProps={{
					title: "Save",
					className: "w-fit",
					LeftIcon: SaveIcon,
					leftIconClassName: "md:mr-2",
					titleClassName: "md:flex hidden",
				}}
			/>
		</main>
	);
};

export default ConfigScreen;
