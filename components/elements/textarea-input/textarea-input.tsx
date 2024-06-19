import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<"textarea"> {
	title?: string;
	titleClassName?: string;
	inputClassName?: string;
}

const TextareaInput = (props: Props) => {
	const { inputClassName, className, titleClassName, title, ...rest } = props;

	return (
		<div
			className={twMerge(
				"w-full flex flex-col font-bahnschrift",
				className,
			)}
		>
			{title && (
				<p
					className={twMerge(
						"text-lg text-primary-light",
						titleClassName,
					)}
				>
					{title}
				</p>
			)}
			<textarea
				className={twMerge(
					"px-3 py-2 text-base bg-tertiary-dark text-primary-light focus:outline-primary-light focus:outline-1 outline-none rounded-md resize-none h-40",
					title ? "mt-1" : "",
					inputClassName,
				)}
				{...rest}
			/>
		</div>
	);
};

export default TextareaInput;
