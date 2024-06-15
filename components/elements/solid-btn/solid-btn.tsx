"use client";

import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export interface SolidBtnProps extends React.ComponentProps<"button"> {
	className?: string;
	onClick?: (e?: React.MouseEvent<HTMLButtonElement> | undefined) => void;
	title: string;
	titleClassName?: string;
	LeftIcon?: LucideIcon | IconType;
	leftIconSize?: number;
	leftIconClassName?: string;
	RightIcon?: LucideIcon | IconType;
	rightIconSize?: number;
	rightIconClassName?: string;
}

const SolidBtn = (props: SolidBtnProps) => {
	const {
		className,
		onClick,
		title,
		titleClassName,
		LeftIcon,
		leftIconSize,
		leftIconClassName,
		RightIcon,
		rightIconSize,
		rightIconClassName,
		...rest
	} = props;

	return (
		<button
			className={twMerge(
				"w-full bg-accent-background hover:bg-accent-background/90 flex items-center justify-center px-4 py-2.5 font-bahnschrift text-primary-dark rounded-md",
				className,
			)}
			aria-label={`${title} button`}
			onClick={onClick}
			{...rest}
		>
			{LeftIcon && (
				<LeftIcon
					size={leftIconSize ?? 22}
					className={twMerge(
						"text-primary-dark mr-1",
						leftIconClassName,
					)}
				/>
			)}

			<p
				className={twMerge(
					"text-primary-dark text-base",
					titleClassName,
				)}
			>
				{title}
			</p>

			{RightIcon && (
				<RightIcon
					size={rightIconSize ?? 22}
					className={twMerge(
						"text-primary-dark mr-1",
						rightIconClassName,
					)}
				/>
			)}
		</button>
	);
};

export default SolidBtn;
