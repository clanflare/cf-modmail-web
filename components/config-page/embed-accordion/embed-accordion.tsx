"use client";

import { SolidBtn, TextInput, TextareaInput } from "@/components/elements";
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Embed } from "@/types/models";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Trash } from "lucide-react";
import { useEmbedAccordion } from "./hook";

interface Props {
	configId: string;
	embedIndex: number;
	embed: Embed;
}

const EmbedAccordion = (props: Props) => {
	const { configId, embedIndex, embed } = props;

	const {
		color,
		description,
		footerIconUrl,
		footerText,
		imageUrl,
		onColorChange,
		onColorDeFocus,
		onDescriptionChange,
		onFooterIconUrlChange,
		onFooterIconUrlDeFocus,
		onFooterTextChange,
		onFooterTextDeFocus,
		onImageUrlChange,
		onImageUrlDeFocus,
		onUrlChange,
		onThumbnailUrlChange,
		onThumbnailUrlDeFocus,
		onTitleChange,
		onTitleDeFocus,
		onUrlDeFocus,
		thumbnailUrl,
		title,
		url,
		onDescriptionDeFocus,
	} = useEmbedAccordion({
		configId,
		embed,
		embedIndex,
	});

	return (
		<>
			<AccordionItem value={`${configId}-${embedIndex}`} className="mt-2">
				<AccordionTrigger className="w-full flex no-underline hover:no-underline px-2 bg-tertiary-dark py-3 rounded-lg">
					<div className="w-full flex item-center justify-between no-underline hover:no-underline">
						<p className="flex items-center text-primary-light">
							Embed {embedIndex + 1}
						</p>

						<SolidBtn
							className="p-0 bg-transparent hover:bg-transparent ml-2 w-fit"
							LeftIcon={Trash}
							leftIconClassName="text-primary-red pr-0"
							title=""
						/>
					</div>
				</AccordionTrigger>

				<AccordionContent className="px-4 mt-2 py-2 rounded-md">
					<TextInput
						title="Title"
						onChange={onTitleChange}
						value={title}
						onBlur={onTitleDeFocus}
					/>

					<TextareaInput
						title="Description"
						onChange={onDescriptionChange}
						value={description}
						onBlur={onDescriptionDeFocus}
						className="mt-2"
					/>

					<div className="w-full flex items-end mt-2">
						<TextInput
							title="Color"
							onChange={onColorChange}
							value={color}
							onBlur={onColorDeFocus}
							className="md:flex-grow-0 md:w-52 flex-grow-0 mr-2"
						/>

						<div
							className="w-10 h-10 rounded-sm border border-primary-light"
							style={{
								backgroundColor: color,
							}}
						></div>
					</div>

					<TextInput
						title="URL"
						onChange={onUrlChange}
						value={url}
						onBlur={onUrlDeFocus}
						className="mt-2"
					/>

					<TextInput
						title="Thumbnail URL"
						onChange={onThumbnailUrlChange}
						value={thumbnailUrl}
						onBlur={onThumbnailUrlDeFocus}
						className="mt-2"
					/>

					<TextInput
						title="Image URL"
						onChange={onImageUrlChange}
						value={imageUrl}
						onBlur={onImageUrlDeFocus}
						className="mt-2"
					/>

					<TextInput
						title="Footer Text"
						onChange={onFooterTextChange}
						value={footerText}
						onBlur={onFooterTextDeFocus}
						className="mt-2"
					/>

					<TextInput
						title="Footer Icon URL"
						onChange={onFooterIconUrlChange}
						value={footerIconUrl}
						onBlur={onFooterIconUrlDeFocus}
						className="mt-2"
					/>
				</AccordionContent>
			</AccordionItem>
		</>
	);
};

export default EmbedAccordion;
