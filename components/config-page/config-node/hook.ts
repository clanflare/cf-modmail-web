import { useMessageConfigStore, useNodeRelationsStore } from "@/store";
import { MessageConfig } from "@/types/common";
import {
	getInitialMessage,
	onTextInputChange,
	onTextareaInputChange,
	toggleBooleanState,
} from "@/utils";
import { useEffect, useState } from "react";

interface Args {
	rootId: string;
}

interface ChildButton {
	buttonId: string;
	name: string;
}

export const useConfigNode = (args: Args) => {
	const { rootId } = args;

	const { nodeRelations, addNodeChild, removeNodeChild } =
		useNodeRelationsStore();
	const { messageConfigs, setConfig, deleteConfigs, appendEmptyEmbed } =
		useMessageConfigStore();

	const [children, setChildren] = useState<Array<string>>([]);
	const [childButtons, setChildButtons] = useState<Array<ChildButton>>([]);
	const [activeChild, setActiveChild] = useState<string | null>(null);
	const [messageBody, setMessageBody] = useState<MessageConfig | undefined>();
	const [messageTitle, setMessageTitle] = useState<string>("");
	const [messageDescription, setMessageDescription] = useState<string>("");
	const [aiInstructions, setAiInstructions] = useState<string>("");
	const [isCategoryInputActive, setIsCategoryInputActive] =
		useState<boolean>(false);
	const [categoryId, setCategoryId] = useState<string>("");

	const pickActiveChild = (childId: string) => setActiveChild(childId);

	const onTitleInputDeFocus = () => {
		if (messageTitle === messageBody?.name) return;

		setConfig(rootId, {
			isAiMessage: messageBody?.isAiMessage ?? false,
			description: messageBody?.description ?? "",
			name: messageTitle,
			embeds: messageBody?.embeds ?? [],
			aiInstructions: aiInstructions ?? null,
			categoryId: categoryId ?? null,
		});
	};

	const onDescriptionInputDeFocus = () => {
		if (
			messageBody?.description &&
			messageDescription === messageBody.description
		)
			return;

		setConfig(rootId, {
			isAiMessage: messageBody?.isAiMessage ?? false,
			description: messageDescription,
			name: messageBody?.name ?? "",
			embeds: messageBody?.embeds ?? [],
			aiInstructions: aiInstructions ?? null,
			categoryId: categoryId ?? null,
		});
	};

	const onAiInstructionsInputDeFocus = () => {
		if (
			messageBody?.aiInstructions &&
			aiInstructions === messageBody.aiInstructions
		)
			return;

		setConfig(rootId, {
			isAiMessage: messageBody?.isAiMessage ?? false,
			description: messageDescription,
			name: messageBody?.name ?? "",
			embeds: messageBody?.embeds ?? [],
			aiInstructions: aiInstructions ?? null,
			categoryId: categoryId ?? null,
		});
	};

	const onCategoryIdDeFocus = () => {
		if (messageBody?.categoryId && categoryId === messageBody.categoryId)
			return;

		setConfig(rootId, {
			isAiMessage: messageBody?.isAiMessage ?? false,
			description: messageDescription,
			name: messageBody?.name ?? "",
			embeds: messageBody?.embeds ?? [],
			aiInstructions: aiInstructions ?? null,
			categoryId: categoryId ?? null,
		});
	};

	const onAIButtonClick = (newState: boolean) => {
		setConfig(rootId, {
			isAiMessage: newState,
			description: messageBody?.description ?? "",
			name: messageBody?.name ?? "",
			embeds: messageBody?.embeds ?? [],
			aiInstructions: aiInstructions ?? null,
			categoryId: categoryId ?? null,
		});
	};

	const onAddChildClick = () => {
		if (children && children.length === 5) return;

		const newNodeId = crypto.randomUUID();
		const newInitialMessage = getInitialMessage();

		addNodeChild(rootId, newNodeId);
		setConfig(newNodeId, {
			name: newInitialMessage,
			isAiMessage: false,
			description: "",
			embeds: [],
			aiInstructions: null,
			categoryId: null,
		});

		setActiveChild(newNodeId);
	};

	const onDeleteNodeClick = (id: string) => {
		if (children && children.length > 1) {
			if (children.indexOf(id) === 0) {
				setActiveChild(children[1]);
			} else {
				setActiveChild(children[children.indexOf(id) - 1]);
			}
		} else {
			setActiveChild(null);
		}

		const nodesToBeDeleted = removeNodeChild(rootId, id);
		deleteConfigs(nodesToBeDeleted);
	};

	const onAddEmbedClick = () => {
		appendEmptyEmbed(rootId);
	};

	useEffect(() => {
		const fetchedMessageBody = messageConfigs.get(rootId);
		setMessageBody(fetchedMessageBody);
		// console.log(fetchedMessageBody);
		if (fetchedMessageBody) {
			setMessageTitle(fetchedMessageBody.name);
			setMessageDescription(fetchedMessageBody.description);
			setAiInstructions(fetchedMessageBody.aiInstructions ?? "");
			setIsCategoryInputActive(
				fetchedMessageBody.categoryId ? true : false,
			);
			setCategoryId(fetchedMessageBody.categoryId ?? "");
		}

		const fetchedChildren = nodeRelations.get(rootId);

		if (fetchedChildren) {
			setChildren(fetchedChildren);
			setChildButtons(() =>
				fetchedChildren.map((childId) => ({
					buttonId: childId,
					name: messageConfigs.get(childId)?.name ?? "",
				})),
			);
			setActiveChild((prev) =>
				prev && fetchedChildren.includes(prev)
					? prev
					: fetchedChildren.length > 0
						? fetchedChildren[0]
						: null,
			);
		}
	}, [messageConfigs, rootId, nodeRelations]);

	return {
		activeChild,
		messageTitle,
		pickActiveChild,
		onMessageTitleChange: onTextInputChange(setMessageTitle),
		onMessageDescriptionChange: onTextareaInputChange(
			setMessageDescription,
		),
		messageDescription,
		onTitleInputDeFocus,
		onAddChildClick,
		childButtons,
		onDeleteNodeClick,
		onDescriptionInputDeFocus,
		isAIMessageAllowed: messageBody?.isAiMessage,
		onAIButtonClick,
		onAddEmbedClick,
		embeds: messageBody?.embeds ?? [],
		aiInstructions,
		onAiInstructionsChange: onTextareaInputChange(setAiInstructions),
		onAiInstructionsInputDeFocus,
		isCategoryInputActive,
		toggleCategoryInputActive: toggleBooleanState(setIsCategoryInputActive),
		categoryId,
		onCategoryIdChange: onTextInputChange(setCategoryId),
		onCategoryIdDeFocus,
	};
};
