import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<"input"> {
	inputClassName?: string;
}

const TextInput = (props: Props) => {
	const { inputClassName, className, ...rest } = props;

	return (
		<div
			className={twMerge(
				"w-full flex flex-col font-bahnschrift",
				className,
			)}
		>
			<input
				className={twMerge(
					"px-3 py-2 text-base bg-tertiary-dark text-primary-light focus:outline-primary-light focus:outline-1 outline-none rounded-md",
					inputClassName,
				)}
				{...rest}
			/>
		</div>
	);
};

export default TextInput;
