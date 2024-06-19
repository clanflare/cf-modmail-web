import { useMessageConfigStore } from "@/store";
import { Embed } from "@/types/models";
import { onTextInputChange, onTextareaInputChange } from "@/utils";
import { useEffect, useState } from "react";

interface Args {
	configId: string;
	embedIndex: number;
	embed: Embed;
}

export const useEmbedAccordion = (args: Args) => {
	const { embed, configId, embedIndex } = args;

	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [url, setUrl] = useState<string>("");
	const [color, setColor] = useState<string>("");
	const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");
	const [footerText, setFooterText] = useState<string>("");
	const [footerIconUrl, setFooterIconUrl] = useState<string>("");

	const { updateEmbed } = useMessageConfigStore();

	const onTextInputDeFocus =
		(
			key:
				| "title"
				| "description"
				| "url"
				| "color"
				| "thumbnail_url"
				| "image_url"
				| "footer_text"
				| "footer_icon_url",
			value: string,
		) =>
		() => {
			const updatedEmbed = {
				...embed,
			};

			if (key === "footer_text") {
				updatedEmbed["footer"] = {
					text: value,
				};
			} else if (key === "footer_icon_url") {
				updatedEmbed["footer"] = {
					icon_url: value,
				};
			} else {
				updatedEmbed[key] = value;
			}

			updateEmbed(configId, embedIndex, updatedEmbed);
		};

	useEffect(() => {
		if (embed.title && embed.title !== title) setTitle(embed.title);
		if (embed.description && embed.description !== description)
			setDescription(embed.description);
		if (embed.url && embed.url !== url) setUrl(embed.url);
		if (embed.color && embed.color !== color) setColor(embed.color);
		if (embed.thumbnail_url && embed.thumbnail_url !== thumbnailUrl)
			setThumbnailUrl(embed.thumbnail_url);
		if (embed.footer?.icon_url && embed.footer.icon_url !== footerIconUrl)
			setFooterIconUrl(embed.footer.icon_url);
		if (embed.footer?.text && embed.footer.text !== footerText)
			setFooterIconUrl(embed.footer.text);
	}, [embed]);

	return {
		title,
		description,
		url,
		color,
		thumbnailUrl,
		imageUrl,
		footerText,
		footerIconUrl,
		onTitleChange: onTextInputChange(setTitle),
		onDescriptionChange: onTextareaInputChange(setDescription),
		onUrlChange: onTextInputChange(setUrl),
		onColorChange: onTextInputChange(setColor),
		onThumbnailUrlChange: onTextInputChange(setThumbnailUrl),
		onImageUrlChange: onTextInputChange(setImageUrl),
		onFooterTextChange: onTextInputChange(setFooterText),
		onFooterIconUrlChange: onTextInputChange(setFooterIconUrl),
		onTitleDeFocus: onTextInputDeFocus("title", title),
		onUrlDeFocus: onTextInputDeFocus("url", url),
		onColorDeFocus: onTextInputDeFocus("color", color),
		onThumbnailUrlDeFocus: onTextInputDeFocus(
			"thumbnail_url",
			thumbnailUrl,
		),
		onImageUrlDeFocus: onTextInputDeFocus("image_url", imageUrl),
		onFooterTextDeFocus: onTextInputDeFocus("footer_text", footerText),
		onFooterIconUrlDeFocus: onTextInputDeFocus(
			"footer_icon_url",
			footerIconUrl,
		),
		onDescriptionDeFocus: onTextInputDeFocus("description", description),
	};
};
