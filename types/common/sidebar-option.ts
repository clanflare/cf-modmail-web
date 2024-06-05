import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

export interface SidebarOption {
	id: string;
	Icon: IconType | LucideIcon;
	title: string;
	link: string;
}
