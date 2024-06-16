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
					"w-full flex my-1 py-2 px-2 items-center text-secondary-light hover:text-primary-light font-bahnschrift rounded-default",
					isSelected
						? "bg-accent-background text-primary-dark hover:text-primary-dark"
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
