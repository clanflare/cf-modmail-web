"use client";

import { SolidBtn, SolidBtnProps } from "@/components/elements";
import { twMerge } from "tailwind-merge";

type Props = { title: string; titleClassName?: string; className?: string } & (
	| {
			button: false;
	  }
	| {
			button: true;
			buttonProps: SolidBtnProps;
	  }
);

const CommonHeader = (props: Props) => {
	const { title, titleClassName, className, button } = props;

	return (
		<div
			className={twMerge(
				"w-full flex justify-between items-center font-bahnschrift px-3",
				className,
			)}
		>
			<p
				className={twMerge(
					"text-xl text-primary-light tracking-wide",
					titleClassName,
				)}
			>
				{title}
			</p>

			{button && <SolidBtn {...props.buttonProps} />}
		</div>
	);
};

export default CommonHeader;
