"use client";

import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<"button"> {
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

const SolidBtn = (props: Props) => {
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
				"w-full bg-primary hover:bg-primary/90 flex items-center justify-center px-4 py-2.5 font-muli text-primary-foreground rounded-md",
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
						"text-primary-foreground mr-1",
						leftIconClassName,
					)}
				/>
			)}

			<p
				className={twMerge(
					"text-primary-foreground text-base",
					titleClassName,
				)}
			>
				{title}
			</p>

			{RightIcon && (
				<RightIcon
					size={rightIconSize ?? 22}
					className={twMerge(
						"text-primary-foreground mr-1",
						rightIconClassName,
					)}
				/>
			)}
		</button>
	);
};

export default SolidBtn;
