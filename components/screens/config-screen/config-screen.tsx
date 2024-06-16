"use client";

import { twMerge } from "tailwind-merge";
import { useConfigScreen } from "./hook";
import { CommonHeader } from "@/components/common";
import { SaveIcon } from "lucide-react";
import { ConfigNode } from "@/components/config-page";

const ConfigScreen = () => {
	const { isSidebarOpen, rootMessage } = useConfigScreen();

	return (
		<main
			className={twMerge(
				`min-h-screen w-full flex flex-col bg-primary-dark pt-16 px-5`,
				isSidebarOpen ? "md:pl-64" : "",
			)}
		>
			<div className="w-full flex justify-center items-center">
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
					className="max-w-[750px] w-full"
				/>
			</div>

			<div className="w-full flex flex-col items-center justify-center mt-4">
				<div className="w-full flex max-w-[750px] px-3">
					{rootMessage ? <ConfigNode rootId="root" /> : <></>}
				</div>
			</div>
		</main>
	);
};

export default ConfigScreen;
