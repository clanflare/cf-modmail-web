"use client";

import { SidebarOption } from "@/types/common";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
	option: SidebarOption;
	isSelected: boolean;
	className?: string;
	iconSize?: number;
	titleClassname?: string;
	iconClassName?: string;
}

const SidebarBtn = (props: Props) => {
	const {
		option,
		isSelected,
		className,
		iconSize,
		titleClassname,
		iconClassName,
	} = props;

	const { Icon } = option;

	return (
		<Link href={option.link}>
			<button
				className={twMerge(
					"w-full flex my-0.5 py-2 px-2 items-center text-muted-foreground bg-background dark:text-muted-dark-foreground dark:bg-dark-background hover:bg-accent dark:hover:bg-dark-accent font-muli rounded-default",
					isSelected
						? "bg-accent dark:bg-dark-accent text-foreground dark:text-dark-foreground"
						: "",
					className,
				)}
				aria-label={`${option.title} link button`}
			>
				<Icon
					size={iconSize ?? 20}
					className={twMerge("mr-1.5", iconClassName)}
				/>
				<p className={twMerge("text-base", titleClassname)}>
					{option.title}
				</p>
			</button>
		</Link>
	);
};

export default SidebarBtn;
