import { ConfigResponse, MessageComponent } from "@/types/api/response";
import { MessageConfig } from "@/types/models";

interface RecursiveParserResponse {
	components: Array<MessageComponent>;
	labels: Array<string>;
}

const recursiveParser = (
	currentChildren: Array<string>,
	childrenNodes: Map<string, Array<string>>,
	messageConfigs: Map<string, MessageConfig>,
): RecursiveParserResponse => {
	const messageComponents: Array<MessageComponent> = [];
	const labels: Array<string> = [];

	for (const child of currentChildren) {
		const config = messageConfigs.get(child);

		if (!config)
			throw new Error("Please create a base component to send something");

		const childNodeIds = childrenNodes.get(child);

		if (!childNodeIds) throw new Error("No children!!");

		const component: MessageComponent = {
			aiInstructions: config.aiInstructions,
			message: {
				content: config.description,
				embeds: config.embeds.map((embed) => ({
					color: embed.color ? embed.color : undefined,
					description: embed.description
						? embed.description
						: undefined,
					image: embed.image_url ? embed.image_url : undefined,
					thumbnail: embed.thumbnail_url
						? embed.thumbnail_url
						: undefined,
					url: embed.url ? embed.url : undefined,
					footer:
						embed.footer?.icon_url || embed.footer?.text
							? {
									iconUrl: embed.footer?.icon_url,
									text: embed.footer.text,
								}
							: undefined,
				})),
			},
			buttons: [],
		};

		const response = recursiveParser(
			childNodeIds,
			childrenNodes,
			messageConfigs,
		);

		for (const responseIndex in response.components) {
			if (
				!response.components[responseIndex] ||
				!response.labels[responseIndex]
			)
				throw new Error("Dumb shit!!");

			component.buttons?.push({
				linkedComponent: response.components[responseIndex],
				label: response.labels[responseIndex],
			});
		}

		labels.push(config.name);
		messageComponents.push(component);
	}

	return {
		components: messageComponents,
		labels,
	};
};

export const parseConfigStates = (
	sourceNodeId: string,
	childrenNodes: Map<string, Array<string>>,
	messageConfigs: Map<string, MessageConfig>,
): ConfigResponse => {
	const sourceConfig = messageConfigs.get(sourceNodeId);

	if (!sourceConfig)
		throw new Error("Please create a base component to send something");

	const sourceChildren = childrenNodes.get(sourceNodeId);

	if (!sourceChildren) throw new Error("No children!!");

	const config: ConfigResponse = {
		// aiSupport: sourceConfig.isAiMessage,
	};

	config["initialMessage"] = {
		aiInstructions: sourceConfig.aiInstructions,
		message: {
			content: sourceConfig.description,
			embeds: sourceConfig.embeds.map((embed) => ({
				color: embed.color ? embed.color : undefined,
				description: embed.description ? embed.description : undefined,
				image: embed.image_url ? embed.image_url : undefined,
				thumbnail: embed.thumbnail_url
					? embed.thumbnail_url
					: undefined,
				url: embed.url ? embed.url : undefined,
				footer:
					embed.footer?.icon_url || embed.footer?.text
						? {
								iconUrl: embed.footer?.icon_url,
								text: embed.footer.text,
							}
						: undefined,
			})),
		},
		buttons: [],
	};

	const response = recursiveParser(
		sourceChildren,
		childrenNodes,
		messageConfigs,
	);

	for (const responseIndex in response.components) {
		if (
			!response.components[responseIndex] ||
			!response.labels[responseIndex]
		)
			throw new Error("Dumb shit!!");

		config.initialMessage.buttons?.push({
			linkedComponent: response.components[responseIndex],
			label: response.labels[responseIndex],
		});
	}

	return config;
};
