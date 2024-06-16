"use client";

import { TextInput } from "@/components/elements";
import { useConfigNode } from "./hook";

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
		children,
	} = useConfigNode({
		rootId,
	});

	return (
		<div className="w-full flex flex-col">
			<div className="w-full flex flex-col px-5 py-5 bg-secondary-dark rounded-md">
				<TextInput
					value={messageTitle}
					onChange={onMessageTitleChange}
				/>
			</div>
		</div>
	);
};

export default ConfigNode;
