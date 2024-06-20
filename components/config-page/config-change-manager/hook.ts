import { MESSAGE_CONF_KEY, NODE_REL_KEY } from "@/constants/env-config";
import { useMessageConfigStore, useNodeRelationsStore } from "@/store";
import { useEffect } from "react";

export const useChangeConfigManager = () => {
	const { messageConfigs } = useMessageConfigStore();
	const { nodeRelations } = useNodeRelationsStore();

	useEffect(() => {
		if (messageConfigs) {
			localStorage.setItem(
				MESSAGE_CONF_KEY,
				JSON.stringify(Object.fromEntries(messageConfigs)),
			);
		}
	}, [messageConfigs]);

	useEffect(() => {
		if (nodeRelations) {
			localStorage.setItem(
				NODE_REL_KEY,
				JSON.stringify(Object.fromEntries(nodeRelations)),
			);
		}
	}, [nodeRelations]);
};
