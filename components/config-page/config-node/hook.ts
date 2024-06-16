import { useMessageConfigStore, useNodeRelationsStore } from "@/store";
import { onTextInputChange } from "@/utils/on-text-input-change";
import { useState } from "react";

interface Args {
	rootId: string;
}

export const useConfigNode = (args: Args) => {
	const { rootId } = args;

	const { nodeRelations } = useNodeRelationsStore();
	const { messageConfigs } = useMessageConfigStore();

	const children = nodeRelations.get(rootId);
	const messageBody = messageConfigs.get(rootId);

	const [activeChild, setActiveChild] = useState<string | null>(
		children && children.length > 0 ? children[0] : null,
	);
	const [messageTitle, setMessageTitle] = useState<string>(
		messageBody?.name ?? "",
	);

	const pickActiveChild = (childId: string) => setActiveChild(childId);

	return {
		activeChild,
		messageTitle,
		pickActiveChild,
		children,
		onMessageTitleChange: onTextInputChange(setMessageTitle),
	};
};
