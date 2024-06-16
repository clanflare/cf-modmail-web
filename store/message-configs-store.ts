import { MessageConfig } from "@/types/common";
import { create } from "zustand";

interface MessageConfigStore {
	messageConfigs: Map<string, MessageConfig>;
	setConfig: (key: string, config: MessageConfig) => void;
	deleteConfigs: (keys: Array<string>) => void;
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
}));
