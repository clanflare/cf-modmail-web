import { ConfigResponse, MessageComponent } from "@/types/api/response";
import { MessageConfig } from "@/types/common";
import { Embed } from "@/types/models";

interface ParseConfigResponse {
	nodeRelations: Map<string, Array<string>>;
	messageConfigs: Map<string, MessageConfig>;
}

interface RecursiveParserResponse {
	config: MessageConfig;
	childrenConfigs: Record<string, MessageConfig>;
	childrenNodeIds: Array<string>;
	childNodeRelations: Record<string, Array<string>>;
}

const recursiveParser = (
	message: MessageComponent | undefined,
	isRoot: boolean,
	label: string,
	isAiSupport?: boolean,
): RecursiveParserResponse => {
	console.log("P0");

	const config: MessageConfig = {
		description: message?.message.content ?? "",
		embeds: [],
		isAiMessage: isRoot ? isAiSupport ?? false : false,
		name: label,
	};

	console.log("P1");

	const embeds = message && message.message.embeds
		? message.message.embeds.map(
				(embed): Embed => ({
					color: embed.color ?? "#fff",
					description: embed.description ?? "",
					title: embed.title ?? "",
					image_url: embed.image ?? "",
					thumbnail_url: embed.thumbnail,
					footer: {
						icon_url: embed.footer?.iconUrl ?? "",
						text: embed.footer?.text ?? "",
					},
				}),
			)
		: [];

	config.embeds = embeds;

	const childIds = message && message.buttons
		? message.buttons.map((_) => crypto.randomUUID())
		: [];

	console.log(config, childIds);

	const childrenResponses = message && message.buttons
		? message.buttons.map((button) =>
				recursiveParser(button.linkedComponent, false, button.label),
			)
		: [];

	const formedChildNodeRelations: Record<string, Array<string>> = {};
	const formedChildrenConfigs: Record<string, MessageConfig> = {};

	for (const index in childrenResponses) {
		const generatedChildId = childIds[index] ?? "";

		formedChildNodeRelations[generatedChildId] =
			childrenResponses[index].childrenNodeIds;
		formedChildrenConfigs[generatedChildId] =
			childrenResponses[index].config;

		for (const key of Object.keys(
			childrenResponses[index].childNodeRelations,
		)) {
			formedChildNodeRelations[key] =
				childrenResponses[index].childNodeRelations[key];
		}

		for (const key of Object.keys(
			childrenResponses[index].childrenConfigs,
		)) {
			formedChildrenConfigs[key] =
				childrenResponses[index].childrenConfigs[key];
		}
	}

	return {
		config,
		childNodeRelations: formedChildNodeRelations,
		childrenConfigs: formedChildrenConfigs,
		childrenNodeIds: childIds,
	};
};

export const parseConfigResponse = (
	oldConfig: ConfigResponse,
): ParseConfigResponse => {
	const { initialMessage, aiSupport } = oldConfig;

	console.log(oldConfig);

	const parsedResponse = recursiveParser(
		initialMessage,
		true,
		"Initial Message",
		aiSupport,
	);

	const { childNodeRelations, childrenConfigs, childrenNodeIds, config } =
		parsedResponse;

	// console.log({
	// 	childNodeRelations,
	// 	childrenConfigs,
	// 	childrenNodeIds,
	// 	config,
	// });

	const nodeRelations = new Map(
		Object.entries({
			...childNodeRelations,
			root: childrenNodeIds,
		}),
	);

	const messageConfigs = new Map(
		Object.entries({
			...childrenConfigs,
			root: config,
		}),
	);

	return {
		nodeRelations,
		messageConfigs,
	};
};
