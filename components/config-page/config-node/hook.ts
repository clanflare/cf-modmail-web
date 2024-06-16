import { useMessageConfigStore, useNodeRelationsStore } from "@/store";
import { getInitialMessage, onTextInputChange } from "@/utils";
import { useState } from "react";

interface Args {
	rootId: string;
}

export const useConfigNode = (args: Args) => {
	const { rootId } = args;

	const { nodeRelations, addNodeChild } = useNodeRelationsStore();
	const { messageConfigs, setConfig } = useMessageConfigStore();

	const children = nodeRelations.get(rootId);
	const messageBody = messageConfigs.get(rootId);

	const childButtons = children
		? children.map((childId) => ({
				buttonId: childId,
				name: messageConfigs.get(childId)?.name ?? "",
			}))
		: [];

	const [activeChild, setActiveChild] = useState<string | null>(
		children && children.length > 0 ? children[0] : null,
	);
	const [messageTitle, setMessageTitle] = useState<string>(
		messageBody?.name ?? "",
	);

	const pickActiveChild = (childId: string) => setActiveChild(childId);

	const onTitleInputDeFocus = () => {
		if (messageTitle === messageBody?.name) return;

		setConfig(rootId, {
			isAiMessage: messageBody?.isAiMessage ?? false,
			description: messageBody?.description ?? "",
			name: messageTitle,
		});
	};

	const onAddChildClick = () => {
		const newNodeId = crypto.randomUUID();
		const newInitialMessage = getInitialMessage();

		addNodeChild(rootId, newNodeId);
		setConfig(newNodeId, {
			name: newInitialMessage,
			isAiMessage: false,
			description: "",
		});

		setActiveChild(newNodeId);
	};

	return {
		activeChild,
		messageTitle,
		pickActiveChild,
		onMessageTitleChange: onTextInputChange(setMessageTitle),
		onTitleInputDeFocus,
		onAddChildClick,
		childButtons,
	};
};
