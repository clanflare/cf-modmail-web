"use client";

import { SolidBtn, TextInput } from "@/components/elements";
import { useConfigNode } from "./hook";
import { Plus } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface Props {
	rootId: string;
}

const ConfigNode = (props: Props) => {
	const { rootId } = props;

	const {
		activeChild,
		messageTitle,
		pickActiveChild,
		onMessageTitleChange,
		onTitleInputDeFocus,
		onAddChildClick,
		childButtons,
	} = useConfigNode({
		rootId,
	});

	return (
		<div className="w-full flex flex-col">
			<div className="w-full flex flex-col px-5 py-5 bg-secondary-dark rounded-md">
				<TextInput
					value={messageTitle}
					onChange={onMessageTitleChange}
					onBlur={onTitleInputDeFocus}
				/>
			</div>
			<div className="w-full flex items-center justify-center">
				<div className="w-fit flex items-center mt-5 overflow-x-auto">
					<SolidBtn
						title=""
						LeftIcon={Plus}
						leftIconClassName="mr-0 text-primary-light"
						className="w-fit p-1.5 bg-primary-dark border border-primary-light text-primary-light hover:bg-primary-dark/90 mr-1"
						onClick={onAddChildClick}
					/>

					{childButtons.map((childButton) => (
						<SolidBtn
							key={childButton.buttonId}
							title={childButton.name}
							className={twMerge(
								"w-fit py-1.5 px-2 bg-primary-dark border border-primary-light hover:bg-primary-dark/90 mx-1 min-w-48",
								activeChild === childButton.buttonId
									? "bg-accent-background hover:bg-accent-background/90"
									: "",
							)}
							titleClassName={twMerge(
								"text-primary-light",
								activeChild === childButton.buttonId
									? "text-primary-dark"
									: "",
							)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ConfigNode;
