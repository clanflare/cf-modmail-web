"use client";

import { useMainSidebar } from "./hook";
import { SidebarBtn, SolidBtn } from "@/components/elements";
import { Power } from "lucide-react";
import { MainSidebarOptions } from "@/constants/sidebar-options";

const MainSidebar = () => {
	const { isSidebarOpen, currentPathname } = useMainSidebar();

	return (
		<>
			{isSidebarOpen && (
				<div className="w-64 h-screen fixed top-0 left-0 z-10 bg-secondary-dark flex flex-col px-4 py-2 pt-16">
					<div className="w-full flex-1 flex flex-col">
						{MainSidebarOptions.map((sidebarOption) => (
							<SidebarBtn
								key={sidebarOption.id}
								option={sidebarOption}
								isSelected={
									currentPathname === sidebarOption.link
								}
							/>
						))}
					</div>

					{/* <SolidBtn
						title={theme === "light" ? "Dark" : "Light"}
						className="mb-2"
						LeftIcon={theme === "light" ? Moon : Sun}
						onClick={() => toggleTheme()}
						leftIconClassName="mr-2"
					/> */}

					<SolidBtn
						title="Logout"
						className="bg-primary-red/20 hover:bg-primary-red/30 border border-primary-red"
						titleClassName="text-primary-red"
						LeftIcon={Power}
						leftIconClassName="text-primary-red mr-2"
					/>
				</div>
			)}
		</>
	);
};

export default MainSidebar;
