import { Embed, MessageConfig } from "@/types/models";
import { create } from "zustand";

interface MessageConfigStore {
	messageConfigs: Map<string, MessageConfig>;
	setConfig: (key: string, config: MessageConfig) => void;
	deleteConfigs: (keys: Array<string>) => void;
	appendEmbed: (key: string, embed: Embed) => void;
	updateEmbed: (key: string, index: number, embed: Embed) => void;
	deleteEmbed: (key: string, index: number) => void;
	appendEmptyEmbed: (key: string) => void;
}

export const useMessageConfigStore = create<MessageConfigStore>()((set) => ({
	messageConfigs: new Map<string, MessageConfig>(),
	setConfig: (key, config) =>
		set((prev) => {
			const newConfigs: Map<string, MessageConfig> = new Map(
				prev.messageConfigs,
			);

			newConfigs.set(key, config);

			return {
				messageConfigs: newConfigs,
			};
		}),
	deleteConfigs: (keys) =>
		set((prev) => {
			const newConfigs: Map<string, MessageConfig> = new Map(
				prev.messageConfigs,
			);

			for (const key of keys) {
				newConfigs.delete(key);
			}

			return {
				messageConfigs: newConfigs,
			};
		}),
	appendEmbed: (key, embed) =>
		set((prev) => {
			const newConfigs: Map<string, MessageConfig> = new Map(
				prev.messageConfigs,
			);

			const oldMessageConfig = newConfigs.get(key);

			if (!oldMessageConfig)
				return {
					messageConfigs: newConfigs,
				};

			newConfigs.set(key, {
				...oldMessageConfig,
				embeds: [embed, ...oldMessageConfig.embeds],
			});

			return {
				messageConfigs: newConfigs,
			};
		}),
	updateEmbed: (key, index, embed) =>
		set((prev) => {
			const newConfigs: Map<string, MessageConfig> = new Map(
				prev.messageConfigs,
			);

			const oldMessageConfig = newConfigs.get(key);

			if (!oldMessageConfig)
				return {
					messageConfigs: newConfigs,
				};

			oldMessageConfig.embeds[index] = embed;

			newConfigs.set(key, {
				...oldMessageConfig,
				embeds: [...oldMessageConfig.embeds],
			});

			return {
				messageConfigs: newConfigs,
			};
		}),
	deleteEmbed: (key, index) =>
		set((prev) => {
			const newConfigs: Map<string, MessageConfig> = new Map(
				prev.messageConfigs,
			);

			const oldMessageConfig = newConfigs.get(key);

			if (!oldMessageConfig)
				return {
					messageConfigs: newConfigs,
				};

			const remainingEmbeds = oldMessageConfig.embeds.filter(
				(_, i) => i !== index,
			);

			newConfigs.set(key, {
				...oldMessageConfig,
				embeds: remainingEmbeds,
			});

			return {
				messageConfigs: newConfigs,
			};
		}),
	appendEmptyEmbed: (key) =>
		set((prev) => {
			const newConfigs: Map<string, MessageConfig> = new Map(
				prev.messageConfigs,
			);

			const oldMessageConfig = newConfigs.get(key);

			if (!oldMessageConfig)
				return {
					messageConfigs: newConfigs,
				};

			newConfigs.set(key, {
				...oldMessageConfig,
				embeds: [
					...oldMessageConfig.embeds,
					{
						title: "",
						description: "",
						image_url: "",
						color: "#fff",
						thumbnail_url: "",
						url: "",
						footer: {
							icon_url: "",
							text: "",
						},
					},
				],
			});

			return {
				messageConfigs: newConfigs,
			};
		}),
}));
