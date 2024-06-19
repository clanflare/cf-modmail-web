import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<"input"> {
	title?: string;
	titleClassName?: string;
	inputClassName?: string;
}

const TextInput = (props: Props) => {
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

			<input
				className={twMerge(
					"px-3 py-2 text-base bg-tertiary-dark text-primary-light focus:outline-primary-light focus:outline-1 outline-none rounded-md",
					title ? "mt-1" : "",
					inputClassName,
				)}
				{...rest}
			/>
		</div>
	);
};

export default TextInput;
