"use client";

import { SolidBtn, TextInput, TextareaInput } from "@/components/elements";
import { useConfigNode } from "./hook";
import { Plus, Trash } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Switch } from "@/components/ui/switch";
import { Accordion } from "@/components/ui/accordion";
import { EmbedAccordion } from "../embed-accordion";

type Props = {
	rootId: string;
} & (
	| {
			isRoot?: false;
			onDeleteNode: (id: string) => void;
	  }
	| {
			isRoot: true;
	  }
);

const ConfigNode = (props: Props) => {
	const { rootId, isRoot } = props;

	const {
		activeChild,
		messageTitle,
		pickActiveChild,
		onMessageTitleChange,
		onTitleInputDeFocus,
		onAddChildClick,
		childButtons,
		onDeleteNodeClick,
		messageDescription,
		onMessageDescriptionChange,
		onDescriptionInputDeFocus,
		isAIMessageAllowed,
		onAIButtonClick,
		onAddEmbedClick,
		embeds,
		aiInstructions,
		onAiInstructionsChange,
		onAiInstructionsInputDeFocus,
	} = useConfigNode({
		rootId,
	});

	return (
		<div className="w-full flex flex-col mt-5">
			<div className="w-full flex flex-col px-5 py-5 bg-secondary-dark rounded-md">
				{isRoot && (
					<>
						<div className="flex items-center">
							<p className="text-base text-primary-light mr-2">
								AI Answers
							</p>
							<Switch
								onCheckedChange={onAIButtonClick}
								checked={isAIMessageAllowed}
							/>
						</div>
					</>
				)}

				<div className="w-full flex items-center mt-5">
					<TextInput
						value={messageTitle}
						onChange={onMessageTitleChange}
						onBlur={onTitleInputDeFocus}
						readOnly={isRoot}
					/>

					{!isRoot && (
						<SolidBtn
							className="p-0 bg-transparent hover:bg-transparent ml-2 w-fit"
							LeftIcon={Trash}
							leftIconClassName="text-primary-red pr-0"
							title=""
							onClick={() => props.onDeleteNode(rootId)}
						/>
					)}
				</div>

				<TextareaInput
					className="mt-5"
					value={messageDescription}
					onChange={onMessageDescriptionChange}
					placeholder="A short description of the message"
					onBlur={onDescriptionInputDeFocus}
				/>

				<TextareaInput
					className="mt-5"
					value={aiInstructions}
					onChange={onAiInstructionsChange}
					placeholder="A short instruction for the ai"
					onBlur={onAiInstructionsInputDeFocus}
				/>

				<div className="w-full flex justify-between items-center mt-5">
					<SolidBtn
						title="Add Embed"
						className="w-fit px-3 py-1 rounded-lg"
						onClick={onAddEmbedClick}
					/>
					<SolidBtn
						title="Attach File"
						className="w-fit px-3 py-1 rounded-lg"
					/>
				</div>

				<Accordion type="single" collapsible>
					{embeds.map((embed, index) => (
						<EmbedAccordion
							key={index}
							configId={rootId}
							embed={embed}
							embedIndex={index}
						/>
					))}
				</Accordion>
			</div>
			<div className="w-full flex items-center justify-center mt-5">
				<div className="w-fit flex items-center overflow-x-auto">
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
							onClick={() =>
								pickActiveChild(childButton.buttonId)
							}
						/>
					))}
				</div>
			</div>

			{activeChild && (
				<ConfigNode
					rootId={activeChild}
					onDeleteNode={onDeleteNodeClick}
				/>
			)}
		</div>
	);
};

export default ConfigNode;
